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
  image: string
  source: string
  position:
    | 'left-top'
    | 'left-middle'
    | 'left-bottom'
    | 'right-top'
    | 'right-middle'
    | 'right-bottom'
  objectPosition?: string
}

const scientists: Scientist[] = [
  {
    name: 'Alan Turing',
    image:
      'https://commons.wikimedia.org/wiki/Special:FilePath/Alan_Turing_(1912-1954)_in_1936_at_Princeton_University_(b%26w).jpg',
    source:
      'https://commons.wikimedia.org/wiki/File:Alan_Turing_(1912-1954)_in_1936_at_Princeton_University_(b%26w).jpg',
    position: 'left-top',
    objectPosition: 'center 16%'
  },
  {
    name: 'Grace Hopper',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Grace_Hopper.jpg',
    source: 'https://commons.wikimedia.org/wiki/File:Grace_Hopper.jpg',
    position: 'left-middle',
    objectPosition: 'center 18%'
  },
  {
    name: 'Donald Knuth',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Donald_Knuth_DSC00624.jpg',
    source: 'https://commons.wikimedia.org/wiki/File:Donald_Knuth_DSC00624.jpg',
    position: 'left-bottom',
    objectPosition: 'center 17%'
  },
  {
    name: 'John von Neumann',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/John_von_Neumann.jpg',
    source: 'https://commons.wikimedia.org/wiki/File:John_von_Neumann.jpg',
    position: 'right-top',
    objectPosition: 'center 13%'
  },
  {
    name: 'Barbara Liskov',
    image:
      'https://commons.wikimedia.org/wiki/Special:FilePath/Barbara_Liskov_MIT_computer_scientist_2010.jpg',
    source:
      'https://commons.wikimedia.org/wiki/File:Barbara_Liskov_MIT_computer_scientist_2010.jpg',
    position: 'right-middle',
    objectPosition: 'center 15%'
  },
  {
    name: 'Linus Torvalds',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Linus_Torvalds.jpeg',
    source: 'https://commons.wikimedia.org/wiki/File:Linus_Torvalds.jpeg',
    position: 'right-bottom',
    objectPosition: 'center 18%'
  }
]

const mainArchiveLinks: ArchiveLink[] = [
  { label: 'Subjects', route: '/computer-science/subjects', tone: 'gold' },
  { label: 'Library', route: '/computer-science/library', tone: 'gold' },
  { label: 'Computer Scientists', route: '/computer-science/scientists', tone: 'gold' },
  { label: 'History', route: '/computer-science/history', tone: 'gold' },
  { label: 'Practice & Projects', route: '/computer-science/practice-projects', tone: 'gold' }
]

const archiveTools: ArchiveLink[] = [
  { label: 'Open Meetings', route: '/meetings', tone: 'green' },
  { label: 'Lessons', route: '/methods-and-lessons', tone: 'green' },
  { label: 'About the Archive', status: 'future', tone: 'green' },
  { label: 'Search', route: '/computer-science/search', tone: 'orange' }
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
      <section className="cs-archive-stage" aria-label="Computer Science Internet Archive">
        <header className="cs-archive-title">
          <h1>Computer Science Internet Archive</h1>
        </header>

        <div className="cs-archive-red-haze" aria-hidden="true" />

        {scientists.map((scientist) => (
          <figure
            className={`cs-scientist cs-scientist-${scientist.position}`}
            key={scientist.name}
          >
            <a
              href={scientist.source}
              target="_blank"
              rel="noreferrer"
              title={`${scientist.name} — photo source: Wikimedia Commons`}
              aria-label={`${scientist.name}, photo source on Wikimedia Commons`}
            >
              <img
                src={scientist.image}
                alt={scientist.name}
                loading="eager"
                style={{ objectPosition: scientist.objectPosition }}
              />
            </a>
            <figcaption className="cs-visually-hidden">{scientist.name}</figcaption>
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
    </article>
  )
}
