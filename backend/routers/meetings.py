"""Meeting application state, independent from the SFU media transport."""
import asyncio
import json
import logging
import os
import time
from contextlib import asynccontextmanager

from fastapi import APIRouter, Depends, Header, HTTPException, Request, WebSocket, WebSocketDisconnect
from pydantic import ValidationError
from models.meetings import ChatMessage, CreateRoom, Guest, JoinRoom, ModeratorChange
from services.meetings.media import make_media
from services.meetings.realtime import Hub, RateLimiter
from services.meetings.store import Store, now

router = APIRouter()
log = logging.getLogger(__name__)


class Meetings:
    def __init__(self):
        self.store = Store()
        self.media = make_media()
        self.hub = Hub()
        self.lock = asyncio.Lock()
        self.rates = RateLimiter()

    def changed(self, rid):
        state = self.store.snapshot(rid)
        state.pop('messages')
        self.hub.emit(rid, {'type': 'state', **state})
        self.hub.emit('lobby', {'type': 'rooms', 'rooms': self.store.list_rooms()})

    async def sweep_once(self):
        async with self.lock:
            expired_rooms = self.store.all("""SELECT r.id FROM meeting_rooms r JOIN meeting_sessions s ON s.id=r.host_id
                WHERE r.status='active' AND s.expires_at<?""", (time.time(),))
            for room in expired_rooms:
                try:
                    await self.media.close_room(room['id'])
                except HTTPException:
                    continue
                with self.store.db:
                    self.store.db.execute("UPDATE meeting_rooms SET status='closed',closed_at=? WHERE id=?", (now(), room['id']))
                    self.store.db.execute('UPDATE meeting_participants SET left_at=?,on_stage=0 WHERE room_id=? AND left_at IS NULL', (now(), room['id']))
                    self.store.db.execute("UPDATE meeting_hands SET status='cancelled' WHERE room_id=? AND status='pending'", (room['id'],))
                self.changed(room['id'])
            stale = self.store.all("""SELECT p.* FROM meeting_participants p JOIN meeting_sessions s ON s.id=p.session_id
                WHERE p.left_at IS NULL AND (p.last_seen<? OR s.expires_at<?)""", (time.time() - 45, time.time()))
            for p in stale:
                try:
                    await self.media.remove(p['room_id'], p['id'])
                except HTTPException:
                    log.warning('SFU unavailable during stale participant cleanup; retrying.')
                    continue
                self.store.leave(p['id'])
                self.hub.disconnect(p['id'])
                self.changed(p['room_id'])

    async def sweep(self):
        while True:
            await asyncio.sleep(10)
            await self.sweep_once()


@asynccontextmanager
async def meeting_lifespan(app):
    service = Meetings()
    app.state.meetings = service
    task = asyncio.create_task(service.sweep())
    try:
        yield
    finally:
        task.cancel()
        await asyncio.gather(task, return_exceptions=True)
        await service.hub.close()
        service.store.db.close()


async def service(request: Request):
    return request.app.state.meetings


async def session(request: Request, authorization: str = Header(default='')):
    if not authorization.startswith('Bearer '):
        raise HTTPException(401, 'Enter a display name to get a guest session.')
    return request.app.state.meetings.store.session(authorization[7:])


def active(s, rid, user):
    room = s.store.room(rid)
    if room['status'] != 'active':
        raise HTTPException(409, 'This room is closed.')
    return s.store.participant(rid, user['id'])


def moderator(p):
    if p['role'] not in {'host', 'moderator'}:
        raise HTTPException(403, 'Moderator permission required.')


def manage(actor, target):
    moderator(actor)
    if actor['role'] != 'host' and target['role'] in {'host', 'moderator'} and actor['id'] != target['id']:
        raise HTTPException(403, 'Only the host can manage another moderator.')


@router.post('/sessions', status_code=201)
async def guest(data: Guest, request: Request, s=Depends(service)):
    async with s.lock:
        s.rates.check(('guest', request.client.host if request.client else 'unknown'), 120, 3600)
        return s.store.create_session(data.display_name)


@router.get('')
async def rooms(s=Depends(service)):
    return {'rooms': s.store.list_rooms(), 'audio_enabled': s.media.enabled}


@router.post('', status_code=201)
async def create(data: CreateRoom, user=Depends(session), s=Depends(service)):
    async with s.lock:
        s.rates.check(('create', user['id']), 5, 60)
        rid, invite = s.store.create_room(user, data)
        pid = s.store.join(rid, user, invite)
        s.changed(rid)
        return {'room': s.store.summary(s.store.room(rid)), 'participant_id': pid, 'invite': invite}


# Static socket routes must precede /{rid}.
@router.websocket('/live')
async def lobby(ws: WebSocket):
    s = ws.app.state.meetings
    await ws.accept()
    c = None
    try:
        async with s.lock:
            s.rates.check(('socket', ws.client.host if ws.client else 'unknown'), 300, 60)
            c = s.hub.add(ws, 'lobby')
            c.push({'type': 'rooms', 'rooms': s.store.list_rooms(), 'audio_enabled': s.media.enabled})
        while True:
            raw = await asyncio.wait_for(ws.receive_text(), 45)
            if len(raw) > 100 or raw != 'ping':
                await ws.close(1008)
                break
            s.rates.check(('lobby-ping', id(c)), 10, 60)
            c.push({'type': 'pong'})
    except (WebSocketDisconnect, TimeoutError, HTTPException):
        pass
    finally:
        if c:
            s.hub.remove(c)
        try:
            await ws.close()
        except Exception:
            pass


@router.get('/{rid}')
async def detail(rid: str, invite: str = '', user=Depends(session), s=Depends(service)):
    room = s.store.room(rid)
    s.store.access(room, user, invite)
    # Preview does not expose chat before joining.
    return {'room': s.store.summary(room), 'audio_enabled': s.media.enabled}


@router.post('/{rid}/join')
async def join(rid: str, data: JoinRoom, user=Depends(session), s=Depends(service)):
    async with s.lock:
        s.rates.check(('join', user['id']), 20, 60)
        pid = s.store.join(rid, user, data.invite)
        s.store.touch(pid)
        s.changed(rid)
        return {'participant_id': pid, **s.store.snapshot(rid), 'audio_enabled': s.media.enabled}


@router.post('/{rid}/leave')
async def leave(rid: str, user=Depends(session), s=Depends(service)):
    async with s.lock:
        p = s.store.one('SELECT * FROM meeting_participants WHERE room_id=? AND session_id=? AND left_at IS NULL', (rid, user['id']))
        if p:
            await s.media.remove(rid, p['id'])
            s.store.leave(p['id'])
            s.changed(rid)
            s.hub.disconnect(p['id'])
        return {'ok': True}


@router.post('/{rid}/raise-hand')
async def raise_hand(rid: str, user=Depends(session), s=Depends(service)):
    async with s.lock:
        p = active(s, rid, user)
        s.rates.check(('hand', p['id']), 10, 30)
        s.store.hand(p, True)
        s.changed(rid)
        return {'ok': True}


@router.delete('/{rid}/raise-hand')
async def lower_hand(rid: str, user=Depends(session), s=Depends(service)):
    async with s.lock:
        p = active(s, rid, user)
        s.rates.check(('hand', p['id']), 10, 30)
        s.store.hand(p, False)
        s.changed(rid)
        return {'ok': True}


@router.post('/{rid}/participants/{pid}/promote')
async def promote(rid: str, pid: str, user=Depends(session), s=Depends(service)):
    async with s.lock:
        actor, target = active(s, rid, user), s.store.target(rid, pid)
        manage(actor, target)
        room = s.store.room(rid)
        if not target['on_stage'] and s.store.summary(room)['speaker_count'] >= room['max_speakers']:
            raise HTTPException(409, 'All speaker slots are occupied.')
        await s.media.permissions(rid, pid, True)
        s.store.stage(target, True)
        s.changed(rid)
        return {'ok': True}


@router.post('/{rid}/participants/{pid}/demote')
async def demote(rid: str, pid: str, user=Depends(session), s=Depends(service)):
    async with s.lock:
        actor, target = active(s, rid, user), s.store.target(rid, pid)
        if actor['id'] != pid:
            manage(actor, target)
        await s.media.permissions(rid, pid, False)
        s.store.stage(target, False)
        s.changed(rid)
        return {'ok': True}


@router.post('/{rid}/participants/{pid}/mute')
async def mute(rid: str, pid: str, user=Depends(session), s=Depends(service)):
    async with s.lock:
        manage(active(s, rid, user), s.store.target(rid, pid))
        # Revoke publication, not just a UI mute. Host must restore permission.
        await s.media.permissions(rid, pid, False)
        with s.store.db:
            s.store.db.execute('UPDATE meeting_participants SET forced_muted=1 WHERE id=?', (pid,))
        s.changed(rid)
        return {'ok': True}


@router.post('/{rid}/participants/{pid}/moderator')
async def set_moderator(rid: str, pid: str, data: ModeratorChange, user=Depends(session), s=Depends(service)):
    async with s.lock:
        actor, target = active(s, rid, user), s.store.target(rid, pid)
        if actor['role'] != 'host' or target['role'] == 'host':
            raise HTTPException(403, 'Only the host can assign or remove other moderators.')
        role = 'moderator' if data.enabled else ('speaker' if target['on_stage'] else 'listener')
        with s.store.db:
            s.store.db.execute('UPDATE meeting_participants SET role=? WHERE id=?', (role, pid))
        s.changed(rid)
        return {'ok': True}


@router.post('/{rid}/close')
async def close(rid: str, user=Depends(session), s=Depends(service)):
    async with s.lock:
        room = s.store.room(rid)
        if room['host_id'] != user['id']:
            raise HTTPException(403, 'Only the host can close this room.')
        await s.media.close_room(rid)
        with s.store.db:
            s.store.db.execute("UPDATE meeting_rooms SET status='closed',closed_at=? WHERE id=?", (now(), rid))
            s.store.db.execute('UPDATE meeting_participants SET left_at=?,on_stage=0 WHERE room_id=? AND left_at IS NULL', (now(), rid))
            s.store.db.execute("UPDATE meeting_hands SET status='cancelled' WHERE room_id=? AND status='pending'", (rid,))
        s.changed(rid)
        return {'ok': True}


@router.post('/{rid}/media/token')
async def media_token(rid: str, user=Depends(session), s=Depends(service)):
    async with s.lock:
        p = active(s, rid, user)
        s.rates.check(('media-token', p['id']), 10, 60)
        if not s.hub.has(p['id']):
            raise HTTPException(409, 'Connect to the room before connecting audio.')
        return await s.media.token(s.store.room(rid), p)


@router.post('/{rid}/media/ready')
async def media_ready(rid: str, user=Depends(session), s=Depends(service)):
    async with s.lock:
        p = active(s, rid, user)
        s.rates.check(('media-ready', p['id']), 30, 60)
        if not s.hub.has(p['id']):
            raise HTTPException(409, 'Reconnect to the meeting first.')
        await s.media.permissions(rid, p['id'], bool(p['on_stage'] and not p['forced_muted']))
        return {'ok': True}


@router.websocket('/{rid}/live')
async def room_socket(ws: WebSocket, rid: str):
    s = ws.app.state.meetings
    await ws.accept()
    c = None
    try:
        # Token stays out of URLs, history, reverse-proxy logs and referrers.
        raw = await asyncio.wait_for(ws.receive_text(), 10)
        if len(raw) > 1024:
            raise HTTPException(400, 'Invalid authentication frame.')
        auth = json.loads(raw)
        user = s.store.session(auth.get('token', ''))
        async with s.lock:
            p = active(s, rid, user)
            s.rates.check(('connect', p['id']), 30, 60)
            c = s.hub.add(ws, rid, p['id'])
            s.store.touch(p['id'])
            c.push({'type': 'snapshot', 'participant_id': p['id'], 'audio_enabled': s.media.enabled, **s.store.snapshot(rid)})
        while True:
            raw = await asyncio.wait_for(ws.receive_text(), 45)
            if len(raw) > 10000:
                raise HTTPException(413, 'Message is too large.')
            try:
                async with s.lock:
                    user = s.store.session(auth.get('token', ''))
                    p = active(s, rid, user)
                    s.rates.check(('frames', p['id']), 100, 60)
                    s.store.touch(p['id'])
                    event = json.loads(raw)
                    if event.get('type') == 'ping':
                        c.push({'type': 'pong'})
                    elif event.get('type') == 'chat':
                        s.rates.check(('chat', p['id']), 5, 10)
                        data = ChatMessage(content=event.get('content'))
                        msg = s.store.message(p, data.content)
                        s.hub.emit(rid, {'type': 'chat', 'message': msg})
                    else:
                        raise HTTPException(400, 'Unknown event. Roles and speaking state cannot be supplied by clients.')
            except (HTTPException, ValidationError, ValueError, AttributeError) as exc:
                fatal = isinstance(exc, HTTPException) and exc.status_code in {401, 403, 409}
                event = {'type': 'error', 'message': exc.detail if isinstance(exc, HTTPException) else 'Invalid message.', 'fatal': fatal}
                if fatal:
                    await ws.send_json(event)
                    break
                c.push(event)
    except (WebSocketDisconnect, TimeoutError):
        pass
    except (HTTPException, ValueError, AttributeError) as exc:
        try:
            await ws.send_json({'type': 'error', 'message': exc.detail if isinstance(exc, HTTPException) else 'Invalid authentication.', 'fatal': True})
        except Exception:
            pass
    finally:
        if c:
            s.hub.remove(c)
        try:
            await ws.close()
        except Exception:
            pass
        # Lease expires after 45s without heartbeat. A refresh can rejoin during
        # that window, retaining its role, speaker slot and pending hand.
