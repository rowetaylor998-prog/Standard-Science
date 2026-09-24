export type GuestSession = { token: string; id: string; display_name: string; expires_at: number }
export type MeetingRoom = {
  id: string; title: string; description: string; topic: string; visibility: 'public' | 'private'
  host_name: string; status: 'active' | 'closed'; max_participants: number; max_speakers: number
  participant_count: number; speaker_count: number; created_at: string
}
export type Participant = {
  id: string; display_name: string; role: 'host' | 'moderator' | 'speaker' | 'listener'
  on_stage: number; forced_muted: number; joined_at: string
}
export type Hand = { id: string; participant_id: string; display_name: string; created_at: string }
export type Message = { id: string; sender_id: string; sender_name: string; content: string; created_at: string }
export type Snapshot = { room: MeetingRoom; participants: Participant[]; hands: Hand[]; messages: Message[]; participant_id: string; audio_enabled: boolean }
export type MeetingEvent =
  | ({ type: 'snapshot' } & Snapshot)
  | { type: 'state'; room: MeetingRoom; participants: Participant[]; hands: Hand[] }
  | { type: 'rooms'; rooms: MeetingRoom[]; audio_enabled?: boolean }
  | { type: 'chat'; message: Message }
  | { type: 'error'; message: string; fatal?: boolean }
  | { type: 'pong' }

// Vite and Nginx proxy this same-origin API, including WebSocket upgrades.
const base = (import.meta.env.VITE_MEETINGS_API_BASE_URL || '').replace(/\/$/, '')
export function meetingUrl(path = '') { return `${base}/api/meetings${path}` }
export function socketUrl(path: string) {
  const url = new URL(meetingUrl(path), window.location.origin)
  url.protocol = url.protocol === 'https:' ? 'wss:' : 'ws:'
  return url.toString()
}
export async function meetingRequest<T>(path: string, guest?: GuestSession | null, body?: unknown, method?: string): Promise<T> {
  const response = await fetch(meetingUrl(path), {
    method: method || (body === undefined ? 'GET' : 'POST'),
    headers: { 'Content-Type': 'application/json', ...(guest ? { Authorization: `Bearer ${guest.token}` } : {}) },
    body: body === undefined ? undefined : JSON.stringify(body)
  })
  const data = await response.json()
  if (!response.ok) throw new Error(typeof data.detail === 'string' ? data.detail : 'Please check the form values and try again.')
  return data as T
}
export function readGuest(): GuestSession | null {
  try {
    const guest = JSON.parse(sessionStorage.getItem('meeting-guest') || 'null')
    return guest?.token && guest.expires_at * 1000 > Date.now() ? guest : null
  } catch { return null }
}

/** Reconnecting application socket. Heartbeats only; no state polling. */
export function connectState(path: string, token: string | null,
  onEvent: (event: MeetingEvent) => void, onStatus: (status: string) => void) {
  let stopped = false, ws: WebSocket | null = null
  let retry: ReturnType<typeof setTimeout> | undefined
  let heartbeat: ReturnType<typeof setInterval> | undefined
  let attempts = 0
  const connect = () => {
    if (stopped) return
    onStatus(attempts ? 'Reconnecting…' : 'Connecting…')
    ws = new WebSocket(socketUrl(path))
    ws.onopen = () => {
      if (token) ws?.send(JSON.stringify({ token }))
      heartbeat = setInterval(() => {
        if (ws?.readyState === WebSocket.OPEN) ws.send(token ? JSON.stringify({ type: 'ping' }) : 'ping')
      }, 15000)
    }
    ws.onmessage = event => {
      try {
        const data: MeetingEvent = JSON.parse(event.data)
        if (data.type === 'snapshot' || data.type === 'rooms') { attempts = 0; onStatus('Connected') }
        if (data.type === 'error' && data.fatal) { stopped = true; onStatus('Disconnected'); ws?.close() }
        onEvent(data)
      } catch { onStatus('Invalid server response') }
    }
    ws.onerror = () => onStatus('Connection interrupted')
    ws.onclose = event => {
      if (event.code === 4001) {
        stopped = true; onStatus('Disconnected')
        onEvent({ type: 'error', message: 'This guest is connected in another tab. Rejoin here or use a separate guest identity.', fatal: true })
      }
      clearInterval(heartbeat)
      if (!stopped) {
        onStatus('Reconnecting…')
        retry = setTimeout(connect, Math.min(1000 * 2 ** attempts++, 10000))
      }
    }
  }
  connect()
  return {
    send(event: unknown) {
      if (ws?.readyState !== WebSocket.OPEN) throw new Error('Reconnect before sending a message.')
      ws.send(JSON.stringify(event))
    },
    close() { stopped = true; clearTimeout(retry); clearInterval(heartbeat); ws?.close() }
  }
}
