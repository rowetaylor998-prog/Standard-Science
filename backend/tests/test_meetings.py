"""Run: cd backend && .venv/bin/python -m unittest discover -s tests -v"""
import asyncio
import os
import tempfile
import time
import unittest
from concurrent.futures import ThreadPoolExecutor
from contextlib import ExitStack
from unittest.mock import AsyncMock, patch

from fastapi import HTTPException
from fastapi.testclient import TestClient
from main import app
from services.meetings.media import DisabledMedia, LiveKitMedia
from services.meetings.store import Store


class MeetingsTest(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.env = patch.dict(os.environ, MEETINGS_DB_PATH=f'{self.tmp.name}/meetings.sqlite3', MEETINGS_MEDIA_PROVIDER='disabled')
        self.env.start()
        self.client = TestClient(app)
        self.client.__enter__()
        self.service = app.state.meetings
        self.host = self.guest('Host')
        result = self.client.post('/api/meetings', headers=self.headers(self.host), json={'title': 'Scientific discussion'}).json()
        self.rid, self.host_pid = result['room']['id'], result['participant_id']

    def tearDown(self):
        self.client.__exit__(None, None, None)
        self.env.stop()
        self.tmp.cleanup()

    def guest(self, name):
        response = self.client.post('/api/meetings/sessions', json={'display_name': name})
        self.assertEqual(response.status_code, 201, response.text)
        return response.json()

    def headers(self, guest):
        return {'Authorization': f"Bearer {guest['token']}"}

    def post(self, path, guest=None, data=None):
        return self.client.post(f'/api/meetings/{self.rid}{path}', headers=self.headers(guest or self.host), json=data or {})

    def join(self, guest):
        response = self.post('/join', guest)
        self.assertEqual(response.status_code, 200, response.text)
        return response.json()['participant_id']

    def socket(self, stack, guest):
        ws = stack.enter_context(self.client.websocket_connect(f'/api/meetings/{self.rid}/live'))
        ws.send_json({'token': guest['token']})
        self.assertEqual(ws.receive_json()['type'], 'snapshot')
        return ws

    def receive(self, ws, kind):
        for _ in range(30):
            event = ws.receive_json()
            if event['type'] == kind:
                return event
        self.fail(f'No {kind} event')

    def test_core_flow_realtime_permissions_and_close(self):
        listener = self.guest('Listener')
        with ExitStack() as stack:
            host_ws = self.socket(stack, self.host)
            lobby = stack.enter_context(self.client.websocket_connect('/api/meetings/live'))
            self.assertEqual(lobby.receive_json()['rooms'][0]['participant_count'], 1)
            pid = self.join(listener)
            self.assertEqual(self.receive(host_ws, 'state')['room']['participant_count'], 2)
            self.assertEqual(self.receive(lobby, 'rooms')['rooms'][0]['participant_count'], 2)
            guest_ws = self.socket(stack, listener)
            self.assertEqual(self.post(f'/participants/{pid}/promote', listener).status_code, 403)
            self.assertEqual(self.post('/close', listener).status_code, 403)
            self.assertEqual(self.post('/raise-hand', listener).status_code, 200)
            self.assertEqual(self.receive(host_ws, 'state')['hands'][0]['participant_id'], pid)
            self.assertEqual(self.post(f'/participants/{pid}/promote').status_code, 200)
            state = self.receive(host_ws, 'state')
            self.assertEqual(state['hands'], [])
            self.assertEqual(state['room']['speaker_count'], 2)
            self.assertEqual(self.post(f'/participants/{pid}/mute').status_code, 200)
            self.assertTrue(next(p for p in self.receive(host_ws, 'state')['participants'] if p['id'] == pid)['forced_muted'])
            self.assertEqual(self.post(f'/participants/{pid}/demote').status_code, 200)
            self.assertEqual(self.receive(host_ws, 'state')['room']['speaker_count'], 1)
            guest_ws.send_json({'type': 'chat', 'content': '<b>Hello</b> science'})
            self.assertEqual(self.receive(host_ws, 'chat')['message']['content'], 'Hello science')
            self.assertEqual(self.receive(guest_ws, 'chat')['message']['sender_name'], 'Listener')
            self.assertEqual(self.post('/close').status_code, 200)
            self.assertEqual(self.receive(host_ws, 'state')['room']['status'], 'closed')
            self.assertEqual(self.receive(guest_ws, 'state')['room']['participant_count'], 0)
            self.assertEqual(self.post('/join', listener).status_code, 409)

    def test_moderators_and_self_demotion(self):
        user = self.guest('Moderator'); pid = self.join(user)
        target = self.guest('Speaker'); tid = self.join(target)
        self.assertEqual(self.post(f'/participants/{pid}/moderator', data={'enabled': True}).status_code, 200)
        self.assertEqual(self.post(f'/participants/{tid}/promote', user).status_code, 200)
        self.assertEqual(self.post(f'/participants/{self.host_pid}/demote', user).status_code, 403)
        self.assertEqual(self.post(f'/participants/{tid}/moderator', user, {'enabled': True}).status_code, 403)
        self.assertEqual(self.post(f'/participants/{tid}/demote', target).status_code, 200)
        self.assertEqual(self.post(f'/participants/{pid}/moderator', data={'enabled': False}).status_code, 200)
        self.assertEqual(self.post(f'/participants/{tid}/promote', user).status_code, 403)
        self.post(f'/participants/{self.host_pid}/demote')
        self.assertEqual(self.service.store.target(self.rid, self.host_pid)['role'], 'host')

    def test_private_room_invitation_and_no_leak(self):
        response = self.client.post('/api/meetings', headers=self.headers(self.host), json={'title': 'Private', 'visibility': 'private'}).json()
        rid, invite = response['room']['id'], response['invite']
        outsider = self.guest('Outsider')
        self.assertNotIn(rid, [r['id'] for r in self.client.get('/api/meetings').json()['rooms']])
        self.assertEqual(self.client.get(f'/api/meetings/{rid}', headers=self.headers(outsider)).status_code, 404)
        self.assertEqual(self.client.post(f'/api/meetings/{rid}/join', headers=self.headers(outsider), json={}).status_code, 404)
        self.assertEqual(self.client.post(f'/api/meetings/{rid}/join', headers=self.headers(outsider), json={'invite': invite}).status_code, 200)
        result = self.client.get(f'/api/meetings/{rid}', headers=self.headers(outsider)).json()
        self.assertNotIn('invite_hash', str(result))
        self.assertNotIn('token_hash', str(result))

    def test_capacity_atomic_and_speaker_limit(self):
        with self.service.store.db:
            self.service.store.db.execute('UPDATE meeting_rooms SET max_participants=3,max_speakers=1 WHERE id=?', (self.rid,))
        users = [self.guest(f'U{i}') for i in range(8)]
        with ThreadPoolExecutor(max_workers=8) as pool:
            results = list(pool.map(lambda user: self.post('/join', user), users))
        self.assertEqual(sum(r.status_code == 200 for r in results), 2)
        pid = next(r.json()['participant_id'] for r in results if r.status_code == 200)
        self.assertEqual(self.post(f'/participants/{pid}/promote').status_code, 409)
        self.post(f'/participants/{self.host_pid}/demote')
        self.assertEqual(self.post(f'/participants/{pid}/promote').status_code, 200)

    def test_one_hundred_members_and_no_full_mesh(self):
        with ExitStack() as stack:
            sockets = [self.socket(stack, self.host)]
            for n in range(99):
                user = self.guest(f'Listener {n}')
                self.join(user)
                ws = self.socket(stack, user)
                sockets.append(ws)
                # Drain fanout, as real browsers do, to exercise bounded queues.
                for previous in sockets[:-1]:
                    self.receive(previous, 'state')
            self.assertEqual(self.service.store.summary(self.service.store.room(self.rid))['participant_count'], 100)
            extra = self.guest('Overflow')
            self.assertEqual(self.post('/join', extra).status_code, 409)
            sockets[-1].send_json({'type': 'chat', 'content': 'Hello 100 participants'})
            for ws in sockets:
                self.assertEqual(self.receive(ws, 'chat')['message']['content'], 'Hello 100 participants')

    def test_chat_rate_limit_and_reject_forged_role(self):
        user = self.guest('Listener'); self.join(user)
        with ExitStack() as stack:
            ws = self.socket(stack, user)
            ws.send_json({'type': 'promote', 'role': 'host'})
            self.assertEqual(ws.receive_json()['type'], 'error')
            for n in range(5):
                ws.send_json({'type': 'chat', 'content': str(n)})
                self.assertEqual(ws.receive_json()['type'], 'chat')
            ws.send_json({'type': 'chat', 'content': 'too fast'})
            self.assertIn('Too many', ws.receive_json()['message'])
        self.assertEqual(self.service.store.participant(self.rid, user['id'])['role'], 'listener')

    def test_validation_authentication_and_hand_limits(self):
        self.assertEqual(self.client.post('/api/meetings', json={'title': 'X'}).status_code, 401)
        for data in [{'title': ' '}, {'title': 'x', 'max_speakers': 9}, {'title': 'x', 'max_participants': 101}, {'title': 'x', 'role': 'host'}, {'title': 'x', 'max_participants': 2, 'max_speakers': 8}]:
            self.assertEqual(self.client.post('/api/meetings', headers=self.headers(self.host), json=data).status_code, 422)
        user = self.guest('Listener'); self.join(user)
        for _ in range(10):
            self.assertEqual(self.post('/raise-hand', user).status_code, 200)
        self.assertEqual(len(self.service.store.snapshot(self.rid)['hands']), 1)
        self.assertEqual(self.post('/raise-hand', user).status_code, 429)
        with self.client.websocket_connect(f'/api/meetings/{self.rid}/live') as ws:
            ws.send_json({'token': 'forged'})
            event = ws.receive_json()
            self.assertEqual(event['type'], 'error'); self.assertTrue(event['fatal'])

    def test_reconnect_history_and_expired_presence(self):
        user = self.guest('Rejoin'); pid = self.join(user)
        self.post('/raise-hand', user)
        with ExitStack() as stack:
            ws = self.socket(stack, user)
            ws.send_json({'type': 'chat', 'content': 'Persistent message'})
            self.receive(ws, 'chat')
        self.assertEqual(self.join(user), pid)
        with self.client.websocket_connect(f'/api/meetings/{self.rid}/live') as ws:
            ws.send_json({'token': user['token']})
            snap = ws.receive_json()
            self.assertEqual(snap['messages'][0]['content'], 'Persistent message')
            self.assertEqual(snap['hands'][0]['participant_id'], pid)
        with self.service.store.db:
            self.service.store.db.execute('UPDATE meeting_participants SET last_seen=? WHERE id=?', (time.time() - 60, pid))
        self.client.portal.call(self.service.sweep_once)
        self.assertEqual(self.service.store.snapshot(self.rid)['hands'], [])
        self.assertIsNotNone(self.service.store.one('SELECT left_at FROM meeting_participants WHERE id=?', (pid,))['left_at'])

    def test_session_expiry_and_room_expiry(self):
        with self.service.store.db:
            self.service.store.db.execute('UPDATE meeting_sessions SET expires_at=0 WHERE id=?', (self.host['id'],))
        self.assertEqual(self.post('/join').status_code, 401)
        self.client.portal.call(self.service.sweep_once)
        self.assertEqual(self.service.store.room(self.rid)['status'], 'closed')

    def test_media_permissions_fail_closed(self):
        user = self.guest('Speaker'); pid = self.join(user)
        media = DisabledMedia()
        media.permissions = AsyncMock(side_effect=HTTPException(503, 'SFU unavailable'))
        self.service.media = media
        self.assertEqual(self.post(f'/participants/{pid}/promote').status_code, 503)
        self.assertEqual(self.service.store.target(self.rid, pid)['role'], 'listener')
        media.permissions.side_effect = None
        self.post(f'/participants/{pid}/promote')
        media.permissions.side_effect = HTTPException(503, 'SFU unavailable')
        self.assertEqual(self.post(f'/participants/{pid}/demote').status_code, 503)
        self.assertEqual(self.service.store.target(self.rid, pid)['role'], 'speaker')

    def test_media_ready_uses_current_role_not_browser(self):
        user = self.guest('Listener'); pid = self.join(user)
        media = DisabledMedia(); media.permissions = AsyncMock()
        self.service.media = media
        self.assertEqual(self.post('/media/token', user).status_code, 409)
        with ExitStack() as stack:
            self.socket(stack, user)
            self.post('/media/ready', user)
            media.permissions.assert_awaited_with(self.rid, pid, False)
            self.post(f'/participants/{pid}/promote')
            self.post('/media/ready', user)
            media.permissions.assert_awaited_with(self.rid, pid, True)
            self.post(f'/participants/{pid}/mute')
            self.post('/media/ready', user)
            media.permissions.assert_awaited_with(self.rid, pid, False)

    def test_restart_preserves_data_but_clears_presence(self):
        p = self.service.store.target(self.rid, self.host_pid)
        self.service.store.message(p, 'Survives restart')
        second = Store(f'{self.tmp.name}/meetings.sqlite3')
        try:
            self.assertEqual(second.room(self.rid)['title'], 'Scientific discussion')
            self.assertEqual(second.snapshot(self.rid)['messages'][0]['content'], 'Survives restart')
            self.assertEqual(second.snapshot(self.rid)['participants'], [])
            self.assertEqual(second.session(self.host['token'])['id'], self.host['id'])
        finally:
            second.db.close()


class MediaTokenTest(unittest.IsolatedAsyncioTestCase):
    async def test_receive_only_short_lived_tokens_and_microphone_only_grant(self):
        from livekit import api
        with patch.dict(os.environ, LIVEKIT_URL='http://127.0.0.1:7880', LIVEKIT_API_KEY='testkey', LIVEKIT_API_SECRET='test-secret-for-unit-tests-only-32-characters'):
            media = LiveKitMedia(); media.call = AsyncMock()
            result = await media.token({'id': 'r', 'max_participants': 100}, {'id': 'p', 'display_name': 'Guest'})
            claims = api.TokenVerifier(media.key, media.secret).verify(result['token'])
            self.assertFalse(claims.video.can_publish)
            self.assertFalse(claims.video.can_publish_data)
            self.assertEqual(claims.video.room, 'r')
            import jwt
            payload = jwt.decode(result['token'], media.secret, algorithms=['HS256'])
            self.assertLessEqual(payload['exp'] - time.time(), 61)
            await media.permissions('r', 'p', True)
            request = media.call.call_args.args[1]
            self.assertEqual(list(request.permission.can_publish_sources), [api.TrackSource.MICROPHONE])


if __name__ == '__main__':
    unittest.main()
