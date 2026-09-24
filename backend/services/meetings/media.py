"""Replaceable SFU boundary. No LiveKit types escape this module."""
import os
from datetime import timedelta
from typing import Protocol
from fastapi import HTTPException


class MediaProvider(Protocol):
    enabled: bool
    async def token(self, room: dict, participant: dict) -> dict: ...
    async def permissions(self, rid: str, pid: str, publish: bool) -> None: ...
    async def remove(self, rid: str, pid: str) -> None: ...
    async def close_room(self, rid: str) -> None: ...


class DisabledMedia:
    enabled = False

    async def token(self, room, participant):
        return {'enabled': False, 'provider': 'disabled', 'reason': 'Audio is not configured. Chat and moderation are available.'}

    async def permissions(self, rid, pid, publish):
        pass

    async def remove(self, rid, pid):
        pass

    async def close_room(self, rid):
        pass


class LiveKitMedia:
    enabled = True

    def __init__(self):
        from livekit import api
        self.api = api
        self.url = os.getenv('LIVEKIT_URL', '')
        self.public_url = os.getenv('LIVEKIT_PUBLIC_URL') or self.url
        self.key = os.getenv('LIVEKIT_API_KEY', '')
        self.secret = os.getenv('LIVEKIT_API_SECRET', '')
        if not all([self.url, self.key, self.secret]):
            raise RuntimeError('LiveKit requires LIVEKIT_URL, LIVEKIT_API_KEY and LIVEKIT_API_SECRET.')

    async def call(self, method, request, missing_ok=False):
        import aiohttp
        async with self.api.LiveKitAPI(self.url, self.key, self.secret, timeout=aiohttp.ClientTimeout(total=5)) as client:
            try:
                return await getattr(client.room, method)(request)
            except self.api.TwirpError as exc:
                if missing_ok and exc.code == 'not_found':
                    return None
                raise HTTPException(503, 'Audio server unavailable. Please retry.') from exc
            except (aiohttp.ClientError, TimeoutError) as exc:
                raise HTTPException(503, 'Audio server unavailable. Please retry.') from exc

    async def token(self, room, participant):
        a = self.api
        await self.call('create_room', a.CreateRoomRequest(name=room['id'], max_participants=room['max_participants'], empty_timeout=60))
        # Always receive-only on connection. /media/ready rechecks CURRENT server
        # permissions before publishing, so old tokens cannot restore speaker rights.
        token = (a.AccessToken(self.key, self.secret)
                 .with_identity(participant['id']).with_name(participant['display_name'])
                 .with_ttl(timedelta(seconds=60))
                 .with_grants(a.VideoGrants(room_join=True, room=room['id'], can_publish=False,
                                           can_subscribe=True, can_publish_data=False,
                                           can_update_own_metadata=False)).to_jwt())
        return {'enabled': True, 'provider': 'livekit', 'url': self.public_url, 'token': token}

    async def permissions(self, rid, pid, publish):
        a = self.api
        await self.call('update_participant', a.UpdateParticipantRequest(
            room=rid, identity=pid, permission=a.ParticipantPermission(
                can_subscribe=True, can_publish=publish, can_publish_data=False,
                can_publish_sources=[a.TrackSource.MICROPHONE] if publish else [])), missing_ok=True)

    async def remove(self, rid, pid):
        await self.call('remove_participant', self.api.RoomParticipantIdentity(room=rid, identity=pid), missing_ok=True)

    async def close_room(self, rid):
        await self.call('delete_room', self.api.DeleteRoomRequest(room=rid), missing_ok=True)


def make_media() -> MediaProvider:
    provider = os.getenv('MEETINGS_MEDIA_PROVIDER', 'disabled')
    if provider == 'disabled':
        return DisabledMedia()
    if provider == 'livekit':
        return LiveKitMedia()
    raise RuntimeError('Unknown MEETINGS_MEDIA_PROVIDER. Use disabled or livekit.')
