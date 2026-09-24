"""Bounded WebSocket fanout and process-local rate limits (single worker MVP)."""
import asyncio
import time
from collections import deque
from dataclasses import dataclass, field
from fastapi import HTTPException, WebSocket


class RateLimiter:
    def __init__(self):
        self.entries = {}

    def check(self, key, limit, window):
        now = time.monotonic()
        if len(self.entries) > 10000:
            self.entries = {k: v for k, v in self.entries.items() if v and v[-1] > now - 3600}
            if len(self.entries) > 10000 and key not in self.entries:
                raise HTTPException(429, 'Server is busy. Please retry later.')
        events = self.entries.setdefault(key, deque())
        while events and events[0] <= now - window:
            events.popleft()
        if len(events) >= limit:
            raise HTTPException(429, 'Too many requests. Please wait and try again.')
        events.append(now)


@dataclass(eq=False)
class Connection:
    socket: WebSocket
    room_id: str
    participant_id: str = ''
    queue: asyncio.Queue = field(default_factory=lambda: asyncio.Queue(maxsize=32))
    writer: asyncio.Task | None = None
    close_code: int = 1013

    async def send(self):
        try:
            while True:
                await asyncio.wait_for(self.socket.send_json(await self.queue.get()), 5)
        except (Exception, asyncio.CancelledError):
            try:
                await self.socket.close(code=self.close_code)
            except Exception:
                pass

    def push(self, event):
        try:
            self.queue.put_nowait(event)
        except asyncio.QueueFull:
            if self.writer:
                self.writer.cancel()


class Hub:
    def __init__(self):
        self.connections = set()

    def add(self, socket, room_id, participant_id=''):
        if participant_id:
            for old in list(self.connections):
                if old.participant_id == participant_id:
                    old.close_code = 4001
                    self.remove(old)
        connection = Connection(socket, room_id, participant_id)
        connection.writer = asyncio.create_task(connection.send())
        self.connections.add(connection)
        return connection

    def remove(self, connection):
        self.connections.discard(connection)
        if connection.writer:
            connection.writer.cancel()

    def emit(self, room_id, event):
        for connection in list(self.connections):
            if connection.room_id == room_id:
                connection.push(event)

    def has(self, pid):
        return any(c.participant_id == pid for c in self.connections)

    def disconnect(self, pid):
        for c in list(self.connections):
            if c.participant_id == pid:
                self.remove(c)

    async def close(self):
        tasks = [c.writer for c in self.connections if c.writer]
        for c in list(self.connections):
            self.remove(c)
        await asyncio.gather(*tasks, return_exceptions=True)
