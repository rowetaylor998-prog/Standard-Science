import type { RoutePath } from '../App'

type PageProps = {
  onNavigate: (route: RoutePath) => void
}

type SubjectItem = {
  label: string
  route?: RoutePath
  emphasis?: boolean
}

const naturalScience: SubjectItem[] = [
  { label: 'Mathematics' },
  { label: 'Physics' },
  { label: 'Chemistry' },
  { label: 'Biology' },
  {
    label: 'Computer Science',
    route: '/computer-science',
    emphasis: true
  },
  { label: 'Artificial Intelligence', emphasis: true }
]

const socialScience: SubjectItem[] = [
  { label: 'Economics' },
  { label: 'Political Science' },
  { label: 'Law' },
  { label: 'Military Science' },
  { label: 'Political Thought & Ideology' }
]

const marxPortrait = '/marx-home.webp'

function SubjectEntry({
  item,
  onNavigate
}: {
  item: SubjectItem
  onNavigate: (route: RoutePath) => void
}) {
  if (item.route) {
    return (
      <button
        type="button"
        className={item.emphasis ? 'archive-subject-link primary' : 'archive-subject-link'}
        onClick={() => onNavigate(item.route!)}
      >
        {item.label}
      </button>
    )
  }

  return (
    <span
      className={item.emphasis ? 'archive-subject-link future primary' : 'archive-subject-link future'}
      title="Archive under construction"
      aria-label={`${item.label}, archive under construction`}
    >
      {item.label}
    </span>
  )
}

export function HomePage({ onNavigate }: PageProps) {
  return (
    <div className="archive-home">
      <section className="archive-orbit" aria-labelledby="standard-science-title">
        <div className="archive-philosophy">
          <span className="archive-major-field future" title="Archive under construction">
            Philosophy
          </span>
        </div>

        <section className="archive-domain archive-domain-natural" aria-labelledby="natural-science-title">
          <h2 id="natural-science-title">Natural Science</h2>
          <div className="archive-subject-list">
            {naturalScience.map((item) => (
              <SubjectEntry key={item.label} item={item} onNavigate={onNavigate} />
            ))}
          </div>
        </section>

        <div className="archive-center">
          <div className="archive-mark" aria-label="Temporary Standard Science mark">
            <div className="archive-mark-ring">
              <img
                src={marxPortrait}
                alt="Karl Marx"
                className="archive-mark-image"
              />
              <svg className="archive-mark-seal" viewBox="0 0 400 400" aria-hidden="true">
                <defs>
                  <path id="archive-mark-top-arc" d="M 42 200 A 158 158 0 0 1 358 200" />
                  <path id="archive-mark-bottom-arc" d="M 358 200 A 158 158 0 0 1 42 200" />
                </defs>
                <text className="archive-mark-seal-text">
                  <textPath href="#archive-mark-top-arc" startOffset="50%" textAnchor="middle">
                    STANDARD SCIENCE
                  </textPath>
                </text>
                <text className="archive-mark-seal-text">
                  <textPath href="#archive-mark-bottom-arc" startOffset="50%" textAnchor="middle">
                    INTERNET ARCHIVE
                  </textPath>
                </text>
              </svg>
            </div>
            <div className="archive-mark-copy">
              <h1 id="standard-science-title">Standard Science</h1>
              <p>Open Knowledge Archive</p>
            </div>
          </div>
          <p className="archive-mark-note">
            Standard Science Internet Archive
          </p>
        </div>

        <section className="archive-domain archive-domain-social" aria-labelledby="social-science-title">
          <h2 id="social-science-title">Social Science</h2>
          <div className="archive-subject-list">
            {socialScience.map((item) => (
              <SubjectEntry key={item.label} item={item} onNavigate={onNavigate} />
            ))}
          </div>
        </section>
      </section>

      <section className="archive-manifesto" aria-labelledby="manifesto-title">
        <p className="archive-section-kicker">Manifesto</p>
        <h2 id="manifesto-title">Knowledge should belong to everyone.</h2>
        <p>
          Standard Science is an open and free knowledge project built around learning, practice,
          verification, discussion, and contribution. We begin with Computer Science and Artificial
          Intelligence, then expand carefully as the archive becomes useful in practice.
        </p>
        <button type="button" className="archive-text-action" onClick={() => onNavigate('/manifesto')}>
          Read the Manifesto →
        </button>
      </section>

      <nav className="archive-utility-nav" aria-label="Standard Science utilities">
        <button type="button" onClick={() => onNavigate('/computer-science/search')}>
          Search
        </button>
        <button type="button" onClick={() => onNavigate('/lessons')}>
          Lessons
        </button>
        <button type="button" onClick={() => onNavigate('/computer-science/library')}>
          Library
        </button>
        <a
          href="https://github.com/rowetaylor998-prog/Standard-Science/blob/main/CONTRIBUTING.md"
          target="_blank"
          rel="noreferrer"
        >
          Contribute
        </a>
        <button type="button" onClick={() => onNavigate('/manifesto')}>
          About
        </button>
      </nav>
    </div>
  )
}
