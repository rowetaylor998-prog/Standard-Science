import type { ReactNode } from 'react'
import type { RoutePath } from '../App'

type Props = {
  eyebrow?: string
  title: string
  description?: string
  onNavigate: (route: RoutePath) => void
  children: ReactNode
  actions?: ReactNode
}

export function ComputerScienceSectionFrame({
  eyebrow = 'Computer Science Internet Archive',
  title,
  description,
  onNavigate,
  children,
  actions
}: Props) {
  return (
    <article className="cs-section-page">
      <nav className="cs-breadcrumb" aria-label="Breadcrumb">
        <button type="button" onClick={() => onNavigate('/')}>
          Standard Science
        </button>
        <span>›</span>
        <button type="button" onClick={() => onNavigate('/computer-science')}>
          Computer Science
        </button>
        <span>›</span>
        <strong>{title}</strong>
      </nav>

      <header className="cs-section-header">
        <p>{eyebrow}</p>
        <h1>{title}</h1>
        {description ? <div className="cs-section-description">{description}</div> : null}
        {actions ? <div className="cs-section-actions">{actions}</div> : null}
      </header>

      {children}
    </article>
  )
}
