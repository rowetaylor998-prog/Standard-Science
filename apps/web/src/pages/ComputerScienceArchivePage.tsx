import type { RoutePath } from '../App'

type PageProps = {
  onNavigate: (route: RoutePath) => void
}

type ArchiveLink = {
  label: string
  route?: RoutePath
  href?: string
  status?: 'future'
  tone?: 'gold' | 'green' | 'orange'
}

type Scientist = {
  name: string
  role: string
  image: string
  source: string
  position: 'left-top' | 'left-middle' | 'left-bottom' | 'right-top' | 'right-middle' | 'right-bottom'
  objectPosition?: string
}

const scientists: Scientist[] = [
  {
    name: 'Alan Turing',
    role: 'Computation',
    image:
      'https://commons.wikimedia.org/wiki/Special:FilePath/Alan_Turing_(1912-1954)_in_1936_at_Princeton_University_(b%26w).jpg',
    source:
      'https://commons.wikimedia.org/wiki/File:Alan_Turing_(1912-1954)_in_1936_at_Princeton_University_(b%26w).jpg',
    position: 'left-top',
    objectPosition: 'center 20%'
  },
  {
    name: 'Grace Hopper',
    role: 'Programming Languages',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Grace_Hopper.jpg',
    source: 'https://commons.wikimedia.org/wiki/File:Grace_Hopper.jpg',
    position: 'left-middle',
    objectPosition: 'center 18%'
  },
  {
    name: 'Donald Knuth',
    role: 'Algorithms',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Donald_Knuth_DSC00624.jpg',
    source: 'https://commons.wikimedia.org/wiki/File:Donald_Knuth_DSC00624.jpg',
    position: 'left-bottom',
    objectPosition: 'center 18%'
  },
  {
    name: 'John von Neumann',
    role: 'Architecture',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/John_von_Neumann.jpg',
    source: 'https://commons.wikimedia.org/wiki/File:John_von_Neumann.jpg',
    position: 'right-top',
    objectPosition: 'center 14%'
  },
  {
    name: 'Barbara Liskov',
    role: 'Abstraction & Systems',
    image:
      'https://commons.wikimedia.org/wiki/Special:FilePath/Barbara_Liskov_MIT_computer_scientist_2010.jpg',
    source:
      'https://commons.wikimedia.org/wiki/File:Barbara_Liskov_MIT_computer_scientist_2010.jpg',
    position: 'right-middle',
    objectPosition: 'center 18%'
  },
  {
    name: 'Linus Torvalds',
    role: 'Operating Systems & Open Source',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Linus_Torvalds.jpeg',
    source: 'https://commons.wikimedia.org/wiki/File:Linus_Torvalds.jpeg',
    position: 'right-bottom',
    objectPosition: 'center 18%'
  }
]

const mainArchiveLinks: ArchiveLink[] = [
  { label: 'Subjects', route: '/repositories/computer-technical-systems', tone: 'gold' },
  { label: 'Library', route: '/knowledge', tone: 'gold' },
  { label: 'Computer Scientists', status: 'future', tone: 'gold' },
  { label: 'History', status: 'future', tone: 'gold' },
  { label: 'Practice & Projects', status: 'future', tone: 'gold' }
]

const archiveTools: ArchiveLink[] = [
  { label: 'AI Tutor', status: 'future', tone: 'green' },
  { label: 'Open Meetings', route: '/meetings', tone: 'green' },
  { label: 'Lessons', route: '/methods-and-lessons', tone: 'green' },
  { label: 'About the Archive', route: '/manifesto', tone: 'green' },
  { label: 'Search', route: '/knowledge', tone: 'orange' },
  { label: 'Archive of Sparks', route: '/works/archive-of-sparks', tone: 'green' }
]

function ArchiveEntry({
  item,
  onNavigate
}: {
  item: ArchiveLink
  onNavigate: (route: RoutePath) => void
}) {
  const className = `cs-archive-entry ${item.tone ?? 'gold'}${item.status === 'future' ? ' future' : ''}`

  if (item.route) {
    return (
      <button type="button" className={className} onClick={() => onNavigate(item.route!)}>
        {item.label}
      </button>
    )
  }

  if (item.href) {
    return (
      <a className={className} href={item.href}>
        {item.label}
      </a>
    )
  }

  return (
    <span className={className} title="Archive section under construction">
      {item.label}
    </span>
  )
}

export function ComputerScienceArchivePage({ onNavigate }: PageProps) {
  return (
    <article className="cs-archive-page">
      <header className="cs-archive-title">
        <h1>Computer Science Internet Archive</h1>
        <p>An open archive for learning, building, testing, and sharing computer science.</p>
      </header>

      <section className="cs-archive-stage" aria-label="Computer Science Internet Archive">
        {scientists.map((scientist) => (
          <figure
            className={`cs-scientist cs-scientist-${scientist.position}`}
            key={scientist.name}
          >
            <a href={scientist.source} target="_blank" rel="noreferrer" title="Photo source: Wikimedia Commons">
              <img
                src={scientist.image}
                alt={scientist.name}
                loading="eager"
                style={{ objectPosition: scientist.objectPosition }}
              />
            </a>
            <figcaption>
              <strong>{scientist.name}</strong>
              <span>{scientist.role}</span>
            </figcaption>
          </figure>
        ))}

        <nav className="cs-archive-primary" aria-label="Computer Science archive sections">
          {mainArchiveLinks.map((item) => (
            <ArchiveEntry key={item.label} item={item} onNavigate={onNavigate} />
          ))}
        </nav>

        <nav className="cs-archive-tools" aria-label="Computer Science archive tools">
          {archiveTools.map((item) => (
            <ArchiveEntry key={item.label} item={item} onNavigate={onNavigate} />
          ))}
        </nav>
      </section>

      <footer className="cs-archive-footer">
        <p>
          Portraits are linked to their source pages on Wikimedia Commons. Sections marked as under
          construction are preserved as part of the archive map while their contents are being built.
        </p>
      </footer>
    </article>
  )
}
