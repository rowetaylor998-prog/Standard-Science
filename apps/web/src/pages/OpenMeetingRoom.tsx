import { useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { PageHeader } from '../components/PageHeader'
import { connectState, meetingRequest, readGuest } from '../meetings/api'
import type { GuestSession, MeetingRoom, Participant, Snapshot } from '../meetings/api'
import type { AudioState, MeetingMedia } from '../meetings/media'
import '../meetings/styles.css'

const errorText = (error: unknown) => error instanceof Error ? error.message : 'Something went wrong. Please retry.'
const dateText = (value: string) => new Date(value).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
const selectedRoom = () => new URLSearchParams(window.location.search).get('room') || ''
const selectedInvite = () => new URLSearchParams(window.location.hash.slice(1)).get('invite') || ''

export function OpenMeetingRoom() {
  const [guest, setGuest] = useState<GuestSession | null>(readGuest)
  const [rid, setRid] = useState(selectedRoom)
  const [invite, setInvite] = useState(selectedInvite)
  const [rooms, setRooms] = useState<MeetingRoom[]>([])
  const [status, setStatus] = useState('Connecting…')
  const [showCreate, setShowCreate] = useState(false)
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    const pop = () => { setRid(selectedRoom()); setInvite(selectedInvite()) }
    window.addEventListener('popstate', pop)
    return () => window.removeEventListener('popstate', pop)
  }, [])
  useEffect(() => {
    if (rid) return
    const connection = connectState('/live', null, event => {
      if (event.type === 'rooms') setRooms(event.rooms)
    }, setStatus)
    return () => connection.close()
  }, [rid])
  useEffect(() => {
    if (!guest) return
    const timer = setTimeout(() => { setGuest(null); sessionStorage.removeItem('meeting-guest') }, Math.max(0, guest.expires_at * 1000 - Date.now()))
    return () => clearTimeout(timer)
  }, [guest])

  function select(id: string, code = '') {
    const url = new URL(window.location.href)
    url.search = id ? new URLSearchParams({ room: id }).toString() : ''
    url.hash = code ? new URLSearchParams({ invite: code }).toString() : ''
    window.history.pushState({}, '', url)
    setRid(id); setInvite(code); setError(''); setShowCreate(false)
  }
  async function identify(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(true); setError('')
    try {
      const name = new FormData(event.currentTarget).get('display_name')
      const session = await meetingRequest<GuestSession>('/sessions', null, { display_name: name })
      sessionStorage.setItem('meeting-guest', JSON.stringify(session)); setGuest(session)
    } catch (err) { setError(errorText(err)) } finally { setBusy(false) }
  }
  async function create(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(true); setError('')
    const form = new FormData(event.currentTarget)
    try {
      const result = await meetingRequest<{ room: MeetingRoom; invite: string }>('', guest, {
        title: form.get('title'), description: form.get('description'), topic: form.get('topic'),
        visibility: form.get('visibility'), max_participants: Number(form.get('max_participants')),
        max_speakers: Number(form.get('max_speakers'))
      })
      select(result.room.id, result.invite)
    } catch (err) { setError(errorText(err)) } finally { setBusy(false) }
  }

  if (rid && guest) return <RoomView key={`${rid}:${guest.id}`} rid={rid} invite={invite} guest={guest} onLeave={() => select('')} />
  return (
    <section className="meeting-page">
      <PageHeader eyebrow="Standard Science · Community" title="Open Meeting Room" description="A shared space for lectures, study groups and thoughtful scientific discussion. Listen first, raise your hand, and join the conversation." />
      {error && <p className="meeting-error" role="alert">{error}</p>}
      {!guest ? <form className="meeting-card meeting-identity" onSubmit={identify}>
        <h2>{rid ? 'Join this meeting' : 'Your place in the conversation'}</h2>
        <p>Choose a display name. No account is required. This guest identity lasts 24 hours in this browser tab.</p>
        <label>Display name<input name="display_name" required maxLength={60} autoComplete="nickname" /></label>
        <button className="meeting-primary" disabled={busy}>{busy ? 'Joining…' : rid ? 'Join room' : 'Continue as guest'}</button>
        {rid && <button type="button" onClick={() => select('')}>Back to rooms</button>}
      </form> : <div className="meeting-toolbar"><span>Joining as <strong>{guest.display_name}</strong></span>
        <button onClick={() => setShowCreate(!showCreate)}>{showCreate ? 'Cancel' : 'Create Room'}</button>
        <button onClick={() => { sessionStorage.removeItem('meeting-guest'); setGuest(null) }}>Change name</button>
      </div>}
      {showCreate && guest && <form className="meeting-card meeting-form" onSubmit={create}>
        <h2>Create a room</h2>
        <label>Room title<input name="title" required maxLength={120} placeholder="e.g. Introduction to Algorithms study group" /></label>
        <label>Description<textarea name="description" maxLength={1000} rows={3} /></label>
        <label>Topic / category<input name="topic" defaultValue="General" required maxLength={80} /></label>
        <div className="meeting-form-row">
          <label>Visibility<select name="visibility"><option value="public">Public — listed for everyone</option><option value="private">Private — invitation link only</option></select></label>
          <label>Maximum participants<input name="max_participants" type="number" min={2} max={100} defaultValue={100} required /></label>
          <label>Maximum speakers<input name="max_speakers" type="number" min={1} max={8} defaultValue={8} required /></label>
        </div>
        <p className="meeting-note">Speaker slots include the host while on stage. Everyone enters with their microphone off.</p>
        <button className="meeting-primary" disabled={busy}>{busy ? 'Creating…' : 'Create and enter'}</button>
      </form>}
      {!rid && <>
        <div className="meeting-toolbar"><h2>Active public rooms</h2><span className="meeting-badge" role="status">{status}</span></div>
        {status !== 'Connected' && <p className="meeting-note">Connecting to the meeting service. The list updates automatically when connected.</p>}
        {status === 'Connected' && !rooms.length && <div className="meeting-card meeting-empty"><h3>A quiet room is a beginning.</h3><p>Create the first discussion and invite others to join.</p></div>}
        <div className="meeting-room-grid">{rooms.map(room => <article className="meeting-card" key={room.id}>
          <div className="meeting-toolbar"><span className="meeting-badge">{room.topic}</span><span className="meeting-status">● {room.status}</span></div>
          <h2>{room.title}</h2><p>{room.description || 'An open community conversation.'}</p>
          <p className="meeting-note">Hosted by {room.host_name}</p>
          <div className="meeting-toolbar"><span>{room.participant_count}/{room.max_participants} participants · {room.speaker_count}/{room.max_speakers} speakers</span>
            <button onClick={() => select(room.id)} disabled={room.participant_count >= room.max_participants}>{room.participant_count >= room.max_participants ? 'Room full' : 'Join'}</button></div>
        </article>)}</div>
      </>}
    </section>
  )
}

function RoomView({ rid, invite, guest, onLeave }: { rid: string; invite: string; guest: GuestSession; onLeave: () => void }) {
  const [state, setState] = useState<Snapshot | null>(null)
  const [status, setStatus] = useState('Joining…')
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')
  const [busy, setBusy] = useState(false)
  const [tab, setTab] = useState<'Participants' | 'Hand Raise Queue' | 'Chat'>('Participants')
  const [chat, setChat] = useState('')
  const [audioStatus, setAudioStatus] = useState('Audio not connected')
  const [audioStates, setAudioStates] = useState<Record<string, AudioState>>({})
  const [audioReady, setAudioReady] = useState(false)
  const [audioBusy, setAudioBusy] = useState(false)
  const [retry, setRetry] = useState(0)
  const socket = useRef<ReturnType<typeof connectState> | null>(null)
  const media = useRef<MeetingMedia | null>(null)
  const audioContainer = useRef<HTMLDivElement>(null)
  const chatEnd = useRef<HTMLDivElement>(null)
  const mounted = useRef(true)
  const me = state?.participants.find(p => p.id === state.participant_id)
  const canManage = me?.role === 'host' || me?.role === 'moderator'
  const closed = state?.room.status === 'closed'
  const connected = status === 'Connected' && !closed
  const raised = state?.hands.some(h => h.participant_id === me?.id)

  useEffect(() => {
    let cancelled = false
    mounted.current = true
    setError(''); setStatus('Joining…'); setAudioReady(false); setAudioStates({})
    meetingRequest<Snapshot>(`/${rid}/join`, guest, { invite }).then(snapshot => {
      if (cancelled) return
      setState(snapshot)
      socket.current = connectState(`/${rid}/live`, guest.token, event => {
        if (event.type === 'snapshot') { setState(event); setError('') }
        if (event.type === 'state') setState(prev => prev ? { ...prev, ...event } : prev)
        if (event.type === 'chat') setState(prev => prev ? { ...prev, messages: [...prev.messages.filter(m => m.id !== event.message.id), event.message].slice(-100) } : prev)
        if (event.type === 'error') setError(event.message)
      }, setStatus)
    }).catch(err => { if (!cancelled) { setError(errorText(err)); setStatus('Not joined') } })
    return () => {
      cancelled = true; mounted.current = false
      socket.current?.close(); socket.current = null
      void media.current?.disconnect(); media.current = null
      // Lease expiry handles refresh/unmount without StrictMode leave/join races.
    }
  }, [rid, guest, invite, retry])
  useEffect(() => { if (tab === 'Chat') chatEnd.current?.scrollIntoView({ block: 'nearest' }) }, [state?.messages.length, tab])
  useEffect(() => {
    if (!connected || !me?.on_stage || me?.forced_muted) void media.current?.setMicrophone(false).catch(() => {})
    if (closed) { socket.current?.close(); void media.current?.disconnect(); setAudioReady(false) }
  }, [connected, me?.on_stage, me?.forced_muted, closed])

  async function run(path: string, body: unknown = {}, method = 'POST') {
    setBusy(true); setError('')
    try { await meetingRequest(`/${rid}${path}`, guest, body, method) }
    catch (err) { setError(errorText(err)) }
    finally { setBusy(false) }
  }
  async function leave() {
    setBusy(true); setError('')
    try {
      await media.current?.disconnect(); media.current = null; setAudioReady(false); setAudioStates({})
      await meetingRequest(`/${rid}/leave`, guest, {})
      socket.current?.close(); onLeave()
    } catch (err) { setError(errorText(err)); setBusy(false) }
  }
  async function copyInvite() {
    const url = new URL('/meetings', window.location.origin)
    url.searchParams.set('room', rid)
    if (invite) url.hash = new URLSearchParams({ invite }).toString()
    try { await navigator.clipboard.writeText(url.toString()); setNotice('Invitation link copied.') }
    catch { setNotice(`Copy this invitation: ${url}`) }
  }
  async function connectAudio() {
    setAudioBusy(true); setError('')
    try {
      await media.current?.disconnect()
      const { createMeetingMedia } = await import('../meetings/media')
      if (!mounted.current || !audioContainer.current) return
      const adapter = createMeetingMedia(rid, guest, audioContainer.current, setAudioStates, value => {
        setAudioStatus(value)
        if (value.startsWith('Audio disconnected')) setAudioReady(false)
      })
      media.current = adapter
      await adapter.connect()
      if (mounted.current && media.current === adapter) setAudioReady(true)
    } catch (err) { setAudioReady(false); setError(errorText(err)); await media.current?.disconnect(); media.current = null }
    finally { setAudioBusy(false) }
  }
  async function microphone() {
    setAudioBusy(true); setError('')
    try { await media.current?.setMicrophone(audioStates[me!.id]?.muted !== false) }
    catch (err) { setError(`Microphone: ${errorText(err)}`) }
    finally { setAudioBusy(false) }
  }
  function sendChat(event: FormEvent) {
    event.preventDefault(); setError('')
    try { socket.current?.send({ type: 'chat', content: chat }); setChat('') }
    catch (err) { setError(errorText(err)) }
  }
  function controls(p: Participant) {
    if (!canManage || (me?.role !== 'host' && ['host', 'moderator'].includes(p.role) && p.id !== me?.id)) return null
    return <div className="meeting-actions">
      {p.on_stage ? <><button disabled={busy || !connected} onClick={() => run(`/participants/${p.id}/demote`)}>Return to Listener</button>
        <button disabled={busy || !connected} onClick={() => run(`/participants/${p.id}/${p.forced_muted ? 'promote' : 'mute'}`)}>{p.forced_muted ? 'Allow microphone' : 'Mute speaker'}</button></> :
        <button disabled={busy || !connected || (state?.room.speaker_count || 0) >= (state?.room.max_speakers || 0)} onClick={() => run(`/participants/${p.id}/promote`)}>Promote to Speaker</button>}
      {me?.role === 'host' && p.role !== 'host' && <button disabled={busy || !connected} onClick={() => run(`/participants/${p.id}/moderator`, { enabled: p.role !== 'moderator' })}>{p.role === 'moderator' ? 'Remove moderator' : 'Make moderator'}</button>}
    </div>
  }
  return <section className="meeting-page">
    <div className="meeting-toolbar"><span className="eyebrow">Open Meeting Room</span><span className="meeting-badge" role="status">{closed ? 'Room closed' : status}</span></div>
    {error && <p className="meeting-error" role="alert">{error}</p>}
    {notice && <p className="meeting-notice" role="status">{notice}</p>}
    {!state ? <div className="meeting-card"><p>{status}</p><button onClick={onLeave}>Back to rooms</button><button onClick={() => setRetry(n => n + 1)}>Retry joining</button></div> : <>
      <header className="meeting-room-header"><div><h1>{state.room.title}</h1><p>{state.room.description}</p>
        <p className="meeting-note">{state.room.topic} · {state.room.visibility} · Hosted by {state.room.host_name} · {state.room.participant_count}/{state.room.max_participants} participants · {state.room.speaker_count}/{state.room.max_speakers} speakers</p></div>
        <div className="meeting-actions"><button onClick={copyInvite}>Copy invitation link</button><button disabled={busy} onClick={leave}>Leave room</button></div>
      </header>
      {status === 'Disconnected' && <button onClick={() => setRetry(n => n + 1)}>Rejoin room</button>}
      {closed && <p className="meeting-notice">The host has closed this room. You can return to the room list.</p>}
      {!state.audio_enabled && <p className="meeting-notice">Audio is not enabled on this server yet. You can use text chat, raise hands and manage speakers.</p>}
      <div className="meeting-layout">
        <section className="meeting-card meeting-stage" aria-label="Current speakers"><div className="meeting-toolbar"><h2>Discussion stage</h2><span>{state.room.speaker_count} / {state.room.max_speakers}</span></div>
          <p className="meeting-note">Listen, reflect, and raise your hand to contribute.</p>
          <div className="meeting-speakers">{state.participants.filter(p => p.on_stage).map(p => <article key={p.id} className={`meeting-speaker ${audioStates[p.id]?.speaking ? 'is-speaking' : ''}`}>
            <div className="meeting-avatar" aria-hidden="true">{p.display_name.slice(0, 1).toUpperCase()}</div>
            <strong>{p.display_name}{p.id === me?.id ? ' (you)' : ''}</strong><span className="meeting-badge">{p.role}</span>
            <span className="meeting-note">{p.forced_muted ? 'Muted by moderator' : audioStates[p.id]?.speaking ? 'Speaking' : audioStates[p.id] ? audioStates[p.id].muted ? 'Mic off' : 'Mic on' : 'Audio not connected'}</span>
          </article>)}</div>
          {!state.room.speaker_count && <p className="meeting-empty">The stage is open. A moderator can invite a speaker.</p>}
          {state.audio_enabled && !closed && <div className="meeting-audio"><p role="status">{audioStatus}</p><button disabled={audioBusy || !connected} onClick={connectAudio}>{audioBusy ? 'Connecting…' : audioReady ? 'Reconnect audio' : 'Connect audio'}</button>
            {audioReady && <button onClick={() => media.current?.startAudio().catch(err => setError(errorText(err)))}>Enable sound</button>}</div>}
        </section>
        <aside className="meeting-card meeting-side">
          <div className="meeting-tabs" role="tablist" aria-label="Meeting panels">{(['Participants', 'Hand Raise Queue', 'Chat'] as const).map(t => <button key={t} id={`meeting-tab-${t.replace(/ /g, '-')}`} role="tab" aria-selected={tab === t} aria-controls="meeting-panel" onClick={() => setTab(t)}>{t}{t === 'Hand Raise Queue' ? ` (${state.hands.length})` : ''}</button>)}</div>
          <div id="meeting-panel" role="tabpanel" aria-labelledby={`meeting-tab-${tab.replace(/ /g, '-')}`}>
            {tab === 'Participants' && <ul className="meeting-participants">{state.participants.map(p => <li key={p.id}><div className="meeting-toolbar"><strong>{p.display_name}{p.id === me?.id ? ' (you)' : ''}</strong><span className="meeting-badge">{p.role}</span></div>
              <span className="meeting-note">{p.on_stage ? p.forced_muted ? 'Muted by moderator' : audioStates[p.id] ? audioStates[p.id].muted ? 'Mic off' : 'Mic on' : 'Audio not connected' : 'Listening'}</span>{controls(p)}</li>)}</ul>}
            {tab === 'Hand Raise Queue' && <><p className="meeting-note">Requests are shown in the order received.</p><ol className="meeting-hands">{state.hands.map(h => <li key={h.id}><strong>{h.display_name}</strong> <time>{dateText(h.created_at)}</time>
              {canManage && <div className="meeting-actions"><button disabled={busy || !connected || state.room.speaker_count >= state.room.max_speakers} onClick={() => run(`/participants/${h.participant_id}/promote`)}>Approve</button><button disabled={busy || !connected} onClick={() => run(`/participants/${h.participant_id}/demote`)}>Dismiss</button></div>}</li>)}</ol>{!state.hands.length && <p>No hands raised yet.</p>}</>}
            {tab === 'Chat' && <><div className="meeting-chat" role="log" aria-label="Room chat" aria-live="polite">{state.messages.map(msg => <article key={msg.id}><strong>{msg.sender_name}</strong> <time dateTime={msg.created_at}>{dateText(msg.created_at)}</time><p>{msg.content}</p></article>)}{!state.messages.length && <p>Start the conversation.</p>}<div ref={chatEnd} /></div>
              <form onSubmit={sendChat} className="meeting-chat-form"><label htmlFor="meeting-message">Message</label><textarea id="meeting-message" maxLength={2000} value={chat} onChange={e => setChat(e.target.value)} rows={2} required disabled={!connected} /><button disabled={!connected || !chat.trim()}>Send</button><small>Plain text · up to 5 messages per 10 seconds</small></form></>}
          </div>
        </aside>
      </div>
      {!closed && <footer className="meeting-controls"><span>{me?.display_name} · {me?.role}</span>
        {me?.on_stage ? <><button disabled={!connected || !audioReady || audioBusy || !!me.forced_muted} onClick={microphone}>{audioStates[me.id]?.muted === false ? 'Mute microphone' : 'Unmute microphone'}</button><button disabled={busy || !connected} onClick={() => run(`/participants/${me.id}/demote`)}>Return to Listener</button></> : <button disabled={busy || !connected} onClick={() => run('/raise-hand', undefined, raised ? 'DELETE' : 'POST')}>{raised ? 'Lower Hand' : 'Raise Hand'}</button>}
        <button onClick={() => setTab('Chat')}>Chat</button>{canManage && <button onClick={() => setTab('Hand Raise Queue')}>Manage queue ({state.hands.length})</button>}
        {me?.role === 'host' && <button className="meeting-danger" disabled={busy || !connected} onClick={() => { if (window.confirm('Close this room for everyone?')) void run('/close') }}>Close room</button>}
        <button disabled={busy} onClick={leave}>Leave</button>
      </footer>}
    </>}
    <div ref={audioContainer} className="meeting-audio-elements" />
  </section>
}
