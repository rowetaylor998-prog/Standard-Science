"""SQLite persistence. One application worker serializes writes with an async lock."""
import hashlib
import os
import secrets
import sqlite3
import time
from datetime import datetime, timezone
from pathlib import Path
from uuid import uuid4
from fastapi import HTTPException


def now():
    return datetime.now(timezone.utc).isoformat()


def identifier():
    return uuid4().hex


def digest(value):
    return hashlib.sha256(value.encode()).hexdigest()


class Store:
    def __init__(self, path=None):
        path = path or os.getenv("MEETINGS_DB_PATH") or str(Path(__file__).resolve().parents[2] / "data/meetings.sqlite3")
        if path != ":memory:":
            Path(path).parent.mkdir(parents=True, exist_ok=True)
        self.db = sqlite3.connect(path, check_same_thread=False)
        self.db.row_factory = sqlite3.Row
        self.db.execute("PRAGMA foreign_keys=ON")
        self.db.execute("PRAGMA journal_mode=WAL")
        self.db.executescript('''
        CREATE TABLE IF NOT EXISTS meeting_sessions (
            id TEXT PRIMARY KEY, token_hash TEXT UNIQUE NOT NULL,
            display_name TEXT NOT NULL, expires_at REAL NOT NULL
        );
        CREATE TABLE IF NOT EXISTS meeting_rooms (
            id TEXT PRIMARY KEY, title TEXT NOT NULL, description TEXT NOT NULL,
            topic TEXT NOT NULL, visibility TEXT NOT NULL, invite_hash TEXT NOT NULL,
            host_id TEXT NOT NULL REFERENCES meeting_sessions(id), host_name TEXT NOT NULL,
            status TEXT NOT NULL DEFAULT 'active', max_participants INTEGER NOT NULL,
            max_speakers INTEGER NOT NULL, created_at TEXT NOT NULL, closed_at TEXT
        );
        CREATE TABLE IF NOT EXISTS meeting_participants (
            id TEXT PRIMARY KEY, room_id TEXT NOT NULL REFERENCES meeting_rooms(id),
            session_id TEXT NOT NULL REFERENCES meeting_sessions(id), display_name TEXT NOT NULL,
            role TEXT NOT NULL, on_stage INTEGER NOT NULL DEFAULT 0,
            forced_muted INTEGER NOT NULL DEFAULT 0, joined_at TEXT NOT NULL,
            left_at TEXT, last_seen REAL NOT NULL
        );
        CREATE UNIQUE INDEX IF NOT EXISTS meeting_active_membership
            ON meeting_participants(room_id, session_id) WHERE left_at IS NULL;
        CREATE TABLE IF NOT EXISTS meeting_messages (
            id TEXT PRIMARY KEY, room_id TEXT NOT NULL REFERENCES meeting_rooms(id),
            sender_id TEXT NOT NULL, sender_name TEXT NOT NULL, content TEXT NOT NULL,
            created_at TEXT NOT NULL
        );
        CREATE INDEX IF NOT EXISTS meeting_message_room ON meeting_messages(room_id, created_at);
        CREATE TABLE IF NOT EXISTS meeting_hands (
            id TEXT PRIMARY KEY, room_id TEXT NOT NULL REFERENCES meeting_rooms(id),
            participant_id TEXT NOT NULL REFERENCES meeting_participants(id),
            created_at TEXT NOT NULL, status TEXT NOT NULL
        );
        CREATE UNIQUE INDEX IF NOT EXISTS meeting_pending_hand
            ON meeting_hands(participant_id) WHERE status='pending';
        ''')
        # Restarted workers have no live sockets; retain rooms/history, not ghosts.
        with self.db:
            self.db.execute("UPDATE meeting_participants SET left_at=? WHERE left_at IS NULL", (now(),))
            self.db.execute("UPDATE meeting_hands SET status='cancelled' WHERE status='pending'")

    def one(self, sql, args=()):
        row = self.db.execute(sql, args).fetchone()
        return dict(row) if row else None

    def all(self, sql, args=()):
        return [dict(row) for row in self.db.execute(sql, args).fetchall()]

    def session(self, token):
        result = self.one("SELECT * FROM meeting_sessions WHERE token_hash=? AND expires_at>?", (digest(token), time.time()))
        if not result:
            raise HTTPException(401, "Guest session expired. Enter your name again.")
        return result

    def create_session(self, name):
        token, sid = secrets.token_urlsafe(32), identifier()
        expiry = time.time() + 86400
        with self.db:
            self.db.execute("INSERT INTO meeting_sessions VALUES (?,?,?,?)", (sid, digest(token), name, expiry))
        return dict(token=token, id=sid, display_name=name, expires_at=expiry)

    def room(self, rid):
        room = self.one("SELECT * FROM meeting_rooms WHERE id=?", (rid,))
        if not room:
            raise HTTPException(404, "Meeting room not found.")
        return room

    def participant(self, rid, sid):
        result = self.one("SELECT * FROM meeting_participants WHERE room_id=? AND session_id=? AND left_at IS NULL", (rid, sid))
        if not result:
            raise HTTPException(403, "Join the room first.")
        return result

    def target(self, rid, pid):
        result = self.one("SELECT * FROM meeting_participants WHERE room_id=? AND id=? AND left_at IS NULL", (rid, pid))
        if not result:
            raise HTTPException(404, "Participant is no longer in this room.")
        return result

    def access(self, room, session=None, invite=""):
        if room['visibility'] == 'public':
            return
        member = session and (room['host_id'] == session['id'] or self.one(
            "SELECT id FROM meeting_participants WHERE room_id=? AND session_id=? AND left_at IS NULL", (room['id'], session['id'])))
        if not member and not secrets.compare_digest(room['invite_hash'], digest(invite)):
            raise HTTPException(404, "Meeting room not found or invitation is missing.")

    def summary(self, room):
        result = {k: v for k, v in room.items() if k not in {'invite_hash', 'host_id'}}
        counts = self.one("SELECT count(*) AS participant_count, coalesce(sum(on_stage),0) AS speaker_count FROM meeting_participants WHERE room_id=? AND left_at IS NULL", (room['id'],))
        return {**result, **counts}

    def list_rooms(self):
        return [self.summary(r) for r in self.all("SELECT * FROM meeting_rooms WHERE visibility='public' AND status='active' ORDER BY created_at DESC LIMIT 100")]

    def snapshot(self, rid):
        return {
            'room': self.summary(self.room(rid)),
            'participants': self.all("SELECT id, display_name, role, on_stage, forced_muted, joined_at FROM meeting_participants WHERE room_id=? AND left_at IS NULL ORDER BY joined_at", (rid,)),
            'hands': self.all("SELECT h.id,h.participant_id,p.display_name,h.created_at FROM meeting_hands h JOIN meeting_participants p ON p.id=h.participant_id WHERE h.room_id=? AND h.status='pending' AND p.left_at IS NULL ORDER BY h.created_at,h.id", (rid,)),
            'messages': list(reversed(self.all("SELECT id,sender_id,sender_name,content,created_at FROM meeting_messages WHERE room_id=? ORDER BY created_at DESC,rowid DESC LIMIT 100", (rid,))))
        }

    def create_room(self, session, data):
        if self.one("SELECT count(*) AS n FROM meeting_rooms WHERE host_id=? AND status='active'", (session['id'],))['n'] >= 3:
            raise HTTPException(429, "Close one of your rooms before creating another (limit 3).")
        rid, invite = identifier(), secrets.token_urlsafe(24)
        with self.db:
            self.db.execute("INSERT INTO meeting_rooms (id,title,description,topic,visibility,invite_hash,host_id,host_name,max_participants,max_speakers,created_at) VALUES (?,?,?,?,?,?,?,?,?,?,?)", (rid, data.title, data.description, data.topic, data.visibility, digest(invite), session['id'], session['display_name'], data.max_participants, data.max_speakers, now()))
        return rid, invite if data.visibility == 'private' else ''

    def join(self, rid, session, invite):
        room = self.room(rid)
        self.access(room, session, invite)
        if room['status'] != 'active':
            raise HTTPException(409, "This room is closed.")
        existing = self.one("SELECT id FROM meeting_participants WHERE room_id=? AND session_id=? AND left_at IS NULL", (rid, session['id']))
        if existing:
            return existing['id']
        counts = self.summary(room)
        if counts['participant_count'] >= room['max_participants']:
            raise HTTPException(409, "The room is full.")
        role = 'host' if room['host_id'] == session['id'] else 'listener'
        stage = int(role == 'host' and counts['speaker_count'] < room['max_speakers'])
        pid = identifier()
        with self.db:
            self.db.execute("INSERT INTO meeting_participants (id,room_id,session_id,display_name,role,on_stage,joined_at,last_seen) VALUES (?,?,?,?,?,?,?,?)", (pid, rid, session['id'], session['display_name'], role, stage, now(), time.time()))
        return pid

    def leave(self, pid):
        with self.db:
            self.db.execute("UPDATE meeting_participants SET left_at=?,on_stage=0 WHERE id=?", (now(), pid))
            self.db.execute("UPDATE meeting_hands SET status='cancelled' WHERE participant_id=? AND status='pending'", (pid,))

    def touch(self, pid):
        with self.db:
            self.db.execute("UPDATE meeting_participants SET last_seen=? WHERE id=?", (time.time(), pid))

    def hand(self, participant, raised):
        with self.db:
            if raised:
                if participant['on_stage']:
                    raise HTTPException(409, "You are already a speaker.")
                self.db.execute("INSERT OR IGNORE INTO meeting_hands VALUES (?,?,?,?,'pending')", (identifier(), participant['room_id'], participant['id'], now()))
            else:
                self.db.execute("UPDATE meeting_hands SET status='cancelled' WHERE participant_id=? AND status='pending'", (participant['id'],))

    def stage(self, p, enabled):
        role = p['role'] if p['role'] in {'host', 'moderator'} else ('speaker' if enabled else 'listener')
        with self.db:
            self.db.execute("UPDATE meeting_participants SET on_stage=?,role=?,forced_muted=0 WHERE id=?", (int(enabled), role, p['id']))
            self.db.execute("UPDATE meeting_hands SET status=? WHERE participant_id=? AND status='pending'", ('approved' if enabled else 'dismissed', p['id']))

    def message(self, p, text):
        msg = dict(id=identifier(), sender_id=p['id'], sender_name=p['display_name'], content=text, created_at=now())
        with self.db:
            self.db.execute("INSERT INTO meeting_messages VALUES (?,?,?,?,?,?)", (msg['id'], p['room_id'], msg['sender_id'], msg['sender_name'], text, msg['created_at']))
        return msg
