import { useEffect, useMemo, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import type { ChangeEvent } from 'react'
import type { RoutePath } from '../App'
import { AnnotationPanel } from '../components/AnnotationPanel'
import { ComputerScienceSectionFrame } from '../components/ComputerScienceSectionFrame'

type Props = {
  onNavigate: (route: RoutePath) => void
}

type ReaderKind = 'none' | 'pdf' | 'markdown' | 'text'

export function PersonalLibraryReaderPage({ onNavigate }: Props) {
  const [fileName, setFileName] = useState('')
  const [kind, setKind] = useState<ReaderKind>('none')
  const [text, setText] = useState('')
  const [objectUrl, setObjectUrl] = useState('')

  useEffect(() => {
    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl)
      }
    }
  }, [objectUrl])

  const pageId = useMemo(
    () => (fileName ? 'local-reader:' + fileName : 'local-reader:empty'),
    [fileName]
  )

  async function openFile(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) {
      return
    }

    if (objectUrl) {
      URL.revokeObjectURL(objectUrl)
      setObjectUrl('')
    }

    setFileName(file.name)
    const lowerName = file.name.toLowerCase()

    if (file.type === 'application/pdf' || lowerName.endsWith('.pdf')) {
      setKind('pdf')
      setText('')
      setObjectUrl(URL.createObjectURL(file))
      return
    }

    const nextText = await file.text()
    setText(nextText)
    setKind(lowerName.endsWith('.md') || lowerName.endsWith('.markdown') ? 'markdown' : 'text')
  }

  return (
    <ComputerScienceSectionFrame
      title="Personal Reader"
      description="Open a local document that you already legally possess. The file stays on your device; this reader does not upload it to Standard Science."
      onNavigate={onNavigate}
      actions={
        <button
          type="button"
          className="cs-secondary-action"
          onClick={() => onNavigate('/computer-science/library')}
        >
          Back to Library
        </button>
      }
    >
      <section className="personal-reader-controls">
        <label htmlFor="personal-reader-file">Open local file</label>
        <input
          id="personal-reader-file"
          type="file"
          accept=".pdf,.md,.markdown,.txt,text/plain,application/pdf,text/markdown"
          onChange={openFile}
        />
        <p>
          Supported in this first version: PDF, Markdown, and plain text. PDF is displayed locally in
          the browser. Markdown and text use the Standard Science ivory reading layout and can use the
          existing annotation system.
        </p>
      </section>

      {kind === 'none' ? (
        <section className="personal-reader-empty">
          <h2>Nothing open yet</h2>
          <p>
            Choose a local document above. Public Library pages can list bibliographic metadata without
            redistributing copyrighted files; your own legally acquired copies remain private to your
            device.
          </p>
        </section>
      ) : null}

      {kind === 'pdf' && objectUrl ? (
        <>
          <section className="personal-reader-pdf">
            <header>
              <h2>{fileName}</h2>
              <p>
                Local PDF view. Automatic selection capture inside the browser PDF viewer is not yet
                connected to Standard Science annotations, so notes can be entered manually below.
              </p>
            </header>
            <iframe src={objectUrl} title={fileName} />
          </section>
          <AnnotationPanel pageId={pageId} />
        </>
      ) : null}

      {kind === 'markdown' ? (
        <>
          <article className="personal-reader-document">
            <header className="personal-reader-document-title">
              <h1>{fileName}</h1>
            </header>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{text}</ReactMarkdown>
          </article>
          <AnnotationPanel pageId={pageId} />
        </>
      ) : null}

      {kind === 'text' ? (
        <>
          <article className="personal-reader-document">
            <header className="personal-reader-document-title">
              <h1>{fileName}</h1>
            </header>
            <pre className="personal-reader-plain-text">{text}</pre>
          </article>
          <AnnotationPanel pageId={pageId} />
        </>
      ) : null}
    </ComputerScienceSectionFrame>
  )
}
