import { useEffect, useMemo, useState } from 'react'

const STORAGE_KEY = 'standard_science_annotations_v1'

function createId() {
  if (window.crypto?.randomUUID) return window.crypto.randomUUID()
  return `annotation-${Date.now()}-${Math.random().toString(16).slice(2)}`
}

function readStore() {
  try {
    const parsed = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '{}')
    return parsed && typeof parsed === 'object' ? parsed : {}
  } catch {
    return {}
  }
}

function readAnnotations(pagePath) {
  const items = readStore()[pagePath]
  return Array.isArray(items) ? items : []
}

function writeAnnotations(pagePath, annotations) {
  const store = readStore()
  store[pagePath] = annotations
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(store))
}

function formatTime(value) {
  return new Intl.DateTimeFormat(undefined, { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(value))
}

export function AnnotationPanel({ pageId, targetText = '', targetId = '' }) {
  const pagePath = pageId
  const [isOpen, setIsOpen] = useState(false)
  const [annotationText, setAnnotationText] = useState('')
  const [selectedText, setSelectedText] = useState('')
  const [annotations, setAnnotations] = useState([])
  const [editingId, setEditingId] = useState('')
  const [editingText, setEditingText] = useState('')

  useEffect(() => setAnnotations(readAnnotations(pagePath)), [pagePath])

  const visibleAnnotations = useMemo(
    () => annotations.filter(item => targetId ? item.targetId === targetId : !item.targetId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),
    [annotations, targetId]
  )

  function captureSelectedText() {
    const selection = window.getSelection?.().toString().trim()
    if (selection) setSelectedText(selection)
  }

  function saveAnnotation(event) {
    event.preventDefault()
    const text = annotationText.trim()
    if (!text) return
    const now = new Date().toISOString()
    const item = {
      id: createId(),
      pagePath,
      targetId: targetId || undefined,
      selectedText: selectedText.trim() || targetText || '',
      annotationText: text,
      createdAt: now,
      updatedAt: now
    }
    const next = [...annotations, item]
    setAnnotations(next)
    writeAnnotations(pagePath, next)
    setAnnotationText('')
    setSelectedText('')
  }

  function saveEdit(event, annotation) {
    event.preventDefault()
    const text = editingText.trim()
    if (!text) return
    const next = annotations.map(item => item.id === annotation.id
      ? { ...item, annotationText: text, updatedAt: new Date().toISOString() }
      : item)
    setAnnotations(next)
    writeAnnotations(pagePath, next)
    setEditingId('')
    setEditingText('')
  }

  function remove(id) {
    const next = annotations.filter(item => item.id !== id)
    setAnnotations(next)
    writeAnnotations(pagePath, next)
  }

  return (
    <section className="annotation-panel">
      <button type="button" className="annotation-toggle" onClick={() => setIsOpen(value => !value)}>
        {isOpen ? 'Hide annotations' : `Annotations (${visibleAnnotations.length})`}
      </button>
      {isOpen ? (
        <div className="annotation-body">
          <form className="annotation-form" onSubmit={saveAnnotation}>
            <label>Selected text or page context</label>
            <textarea value={selectedText} onChange={event => setSelectedText(event.target.value)} rows={2} />
            <button type="button" className="annotation-secondary-button" onClick={captureSelectedText}>Use current selection</button>
            <label>Write annotation</label>
            <textarea value={annotationText} onChange={event => setAnnotationText(event.target.value)} rows={4} placeholder="Write your note, question, insight, or disagreement..." />
            <button type="submit">Save annotation</button>
          </form>
          <div className="annotation-list">
            {visibleAnnotations.length === 0 ? <p>No annotations yet.</p> : null}
            {visibleAnnotations.map(annotation => (
              <article className="annotation-item" key={annotation.id}>
                <time dateTime={annotation.createdAt}>{formatTime(annotation.createdAt)}</time>
                {annotation.selectedText ? <p className="annotation-item-target">{annotation.selectedText}</p> : null}
                {editingId === annotation.id ? (
                  <form className="annotation-form annotation-edit-form" onSubmit={event => saveEdit(event, annotation)}>
                    <textarea value={editingText} onChange={event => setEditingText(event.target.value)} rows={4} />
                    <div className="annotation-actions">
                      <button type="submit">Save changes</button>
                      <button type="button" className="annotation-secondary-button" onClick={() => setEditingId('')}>Cancel</button>
                    </div>
                  </form>
                ) : <p>{annotation.annotationText}</p>}
                <div className="annotation-actions">
                  <button type="button" onClick={() => { setEditingId(annotation.id); setEditingText(annotation.annotationText) }}>Edit</button>
                  <button type="button" onClick={() => remove(annotation.id)}>Delete</button>
                </div>
              </article>
            ))}
          </div>
        </div>
      ) : null}
    </section>
  )
}
