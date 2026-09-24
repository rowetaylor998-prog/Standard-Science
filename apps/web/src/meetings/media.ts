import { Room, RoomEvent, Track } from 'livekit-client'
import type { GuestSession } from './api'
import { meetingRequest } from './api'

export type AudioState = { muted: boolean; speaking: boolean }
export interface MeetingMedia {
  connect(): Promise<void>
  setMicrophone(enabled: boolean): Promise<void>
  startAudio(): Promise<void>
  disconnect(): Promise<void>
}

/** Vendor-specific code stays here; application state uses a separate socket. */
export function createMeetingMedia(rid: string, guest: GuestSession, container: HTMLElement,
  onState: (states: Record<string, AudioState>) => void, onStatus: (status: string) => void): MeetingMedia {
  const room = new Room({ adaptiveStream: true, dynacast: true })
  let stopped = false
  const update = () => {
    const states: Record<string, AudioState> = {}
    for (const p of [room.localParticipant, ...room.remoteParticipants.values()]) {
      states[p.identity] = { muted: !p.isMicrophoneEnabled, speaking: p.isSpeaking }
    }
    if (!stopped) onState(states)
  }
  room.on(RoomEvent.TrackSubscribed, track => {
    if (track.kind === Track.Kind.Audio) container.appendChild(track.attach())
    update()
  })
  room.on(RoomEvent.TrackUnsubscribed, track => { track.detach().forEach(el => el.remove()); update() })
  room.on(RoomEvent.ActiveSpeakersChanged, update)
  room.on(RoomEvent.TrackMuted, update)
  room.on(RoomEvent.TrackUnmuted, update)
  room.on(RoomEvent.LocalTrackPublished, update)
  room.on(RoomEvent.LocalTrackUnpublished, update)
  room.on(RoomEvent.ParticipantConnected, update)
  room.on(RoomEvent.ParticipantDisconnected, update)
  room.on(RoomEvent.Reconnecting, () => onStatus('Audio reconnecting…'))
  room.on(RoomEvent.Reconnected, () => {
    meetingRequest(`/${rid}/media/ready`, guest, {}).then(() => onStatus('Audio connected')).catch(() => onStatus('Reconnect audio to restore permissions'))
  })
  room.on(RoomEvent.Disconnected, () => { if (!stopped) { onStatus('Audio disconnected — connect again'); onState({}) } })
  room.on(RoomEvent.AudioPlaybackStatusChanged, () => {
    if (!room.canPlaybackAudio) onStatus('Click Enable sound to hear speakers')
  })
  return {
    async connect() {
      const config = await meetingRequest<{ enabled: boolean; url: string; token: string; reason?: string }>(`/${rid}/media/token`, guest, {})
      if (!config.enabled) throw new Error(config.reason || 'Audio is not configured.')
      if (stopped) return
      await room.connect(config.url, config.token)
      if (stopped) { await room.disconnect(); return }
      await meetingRequest(`/${rid}/media/ready`, guest, {})
      onStatus('Audio connected')
      update()
    },
    async setMicrophone(enabled) { await room.localParticipant.setMicrophoneEnabled(enabled); update() },
    async startAudio() { await room.startAudio(); onStatus('Audio connected') },
    async disconnect() { stopped = true; await room.disconnect(); container.replaceChildren() }
  }
}
