import type { RoutePath } from '../App'

type PageProps = {
  onNavigate: (route: RoutePath) => void
}

type Portrait = {
  name: string
  src: string
  objectPosition: string
  mirrored?: boolean
}

const leftPortraits: Portrait[] = [
  {
    name: 'Xi Jinping',
    src: 'https://commons.wikimedia.org/wiki/Special:FilePath/Xi_Jinping_portrait_2019_%28cropped%29.jpg?width=640',
    objectPosition: '50% 18%',
    mirrored: true
  },
  {
    name: 'Donald Trump',
    src: 'https://commons.wikimedia.org/wiki/Special:FilePath/Donald_Trump_October_2020_%28cropped%29.jpg?width=640',
    objectPosition: '50% 20%',
    mirrored: true
  },
  {
    name: 'Jensen Huang',
    src: 'https://commons.wikimedia.org/wiki/Special:FilePath/Jensen_huang_stanford_2026-04-30_008.jpg?width=640',
    objectPosition: '50% 24%',
    mirrored: true
  }
]

const rightPortraits: Portrait[] = [
  {
    name: 'Elon Musk',
    src: 'https://commons.wikimedia.org/wiki/Special:FilePath/Elon_Musk_Royal_Society_crop.jpg?width=640',
    objectPosition: '50% 24%',
    mirrored: true
  },
  {
    name: 'Jeffrey Epstein',
    src: 'https://commons.wikimedia.org/wiki/Special:FilePath/Epstein_2013_mugshot.jpg?width=640',
    objectPosition: '50% 17%'
  },
  {
    name: 'Peter Thiel',
    src: 'https://commons.wikimedia.org/wiki/Special:FilePath/Peter_Thiel_by_Gage_Skidmore.jpg?width=640',
    objectPosition: '50% 18%'
  }
]

function PortraitStack({ portraits, side }: { portraits: Portrait[]; side: 'left' | 'right' }) {
  return (
    <div className={`science-home-portrait-stack science-home-portraits-${side}`} aria-label={`${side} portrait column`}>
      {portraits.map((portrait) => (
        <figure className="science-home-portrait-frame" key={portrait.name}>
          <img
            src={portrait.src}
            alt={portrait.name}
            className={portrait.mirrored ? 'science-home-portrait-image mirrored' : 'science-home-portrait-image'}
            style={{ objectPosition: portrait.objectPosition }}
            loading="eager"
            referrerPolicy="no-referrer"
          />
        </figure>
      ))}
    </div>
  )
}

function HomeTextLink({
  children,
  route,
  className,
  onNavigate
}: {
  children: string
  route?: RoutePath
  className: string
  onNavigate: (route: RoutePath) => void
}) {
  if (!route) {
    return <span className={className}>{children}</span>
  }

  return (
    <button type="button" className={className} onClick={() => onNavigate(route)}>
      {children}
    </button>
  )
}

export function HomePage({ onNavigate }: PageProps) {
  return (
    <div className="standard-science-home">
      <section className="science-home-top" aria-labelledby="standard-science-title">
        <PortraitStack portraits={leftPortraits} side="left" />

        <div className="science-home-center">
          <h1 id="standard-science-title" className="science-home-title">
            Standard Science
          </h1>

          <div className="science-home-theory-map">
            <HomeTextLink
              route="/knowledge"
              className="science-home-text-action science-home-major"
              onNavigate={onNavigate}
            >
              Theory
            </HomeTextLink>

            <section className="science-home-field-group" aria-label="Philosophy">
              <HomeTextLink className="science-home-field" onNavigate={onNavigate}>
                Philosophy
              </HomeTextLink>
            </section>

            <section className="science-home-field-group" aria-label="Natural Science">
              <HomeTextLink className="science-home-field" onNavigate={onNavigate}>
                Natural Science
              </HomeTextLink>
              <div className="science-home-subject-row">
                <span>Mathematics</span>
                <span>Physics</span>
                <HomeTextLink
                  route="/computer-science"
                  className="science-home-text-action science-home-subject-link"
                  onNavigate={onNavigate}
                >
                  Computer Science
                </HomeTextLink>
              </div>
            </section>

            <section className="science-home-field-group" aria-label="Social Science">
              <HomeTextLink className="science-home-field" onNavigate={onNavigate}>
                Social Science
              </HomeTextLink>
              <div className="science-home-subject-row science-home-social-row">
                <span>Politics</span>
                <span>Economics</span>
                <span>Military</span>
                <span>Ideology</span>
              </div>
            </section>
          </div>

          <HomeTextLink
            route="/methods-and-lessons"
            className="science-home-text-action science-home-major science-home-lessons"
            onNavigate={onNavigate}
          >
            Lessons
          </HomeTextLink>
        </div>

        <PortraitStack portraits={rightPortraits} side="right" />
      </section>

      <section className="science-home-practice" aria-label="Practice">
        <HomeTextLink
          route="/works"
          className="science-home-text-action science-home-major"
          onNavigate={onNavigate}
        >
          Practice
        </HomeTextLink>
      </section>

      <section className="science-home-trilogy" aria-labelledby="science-home-trilogy-title">
        <button
          type="button"
          id="science-home-trilogy-title"
          className="science-home-text-action science-home-trilogy-title"
          onClick={() => onNavigate('/manifesto')}
        >
          《争霸三部曲》
        </button>
        <div className="science-home-trilogy-parts" aria-label="Trilogy parts">
          <span>One</span>
          <span>Two</span>
          <span>Three</span>
        </div>
      </section>
    </div>
  )
}
