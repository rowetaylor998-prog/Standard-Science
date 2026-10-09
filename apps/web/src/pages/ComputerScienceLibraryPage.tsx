import type { RoutePath } from '../App'
import { ComputerScienceSectionFrame } from '../components/ComputerScienceSectionFrame'
import { libraryCollections } from '../data/computerScienceArchive'
import { computerScienceLibraryWorks, type LibraryWork } from '../data/computerScienceLibrary'

type Props = { onNavigate: (route: RoutePath) => void }

function LibraryWorkEntry({
  work,
  onNavigate
}: {
  work: LibraryWork
  onNavigate: (route: RoutePath) => void
}) {
  const metadata = [work.authors.join(' · '), work.year, work.kind].filter(Boolean).join(' · ')

  return (
    <div className="cs-library-work">
      <h4>
        {work.openMode === 'route' ? (
          <button
            className="cs-library-open-paper"
            type="button"
            onClick={() => onNavigate(work.url as RoutePath)}
          >
            {work.title} →
          </button>
        ) : (
          <a
            href={work.url}
            target={work.openMode === 'external' ? '_blank' : undefined}
            rel={work.openMode === 'external' ? 'noopener noreferrer' : undefined}
          >
            {work.title}{work.openMode === 'external' ? ' ↗' : ' →'}
          </a>
        )}
      </h4>

      <p>{metadata}</p>

      {work.note ? <p className="cs-library-detail">{work.note}</p> : null}

      {work.pdf ? (
        <p className="cs-library-source-links">
          <a href={work.pdf} target="_blank" rel="noopener noreferrer">
            {work.pdfLabel ?? 'PDF ↗'}
          </a>
          {work.license ? <span> · {work.license}</span> : null}
        </p>
      ) : null}
    </div>
  )
}

export function ComputerScienceLibraryPage({ onNavigate }: Props) {
  return (
    <div className="cs-library-photo-background">
      <ComputerScienceSectionFrame
        title="Library"
        onNavigate={onNavigate}
        description="Books, papers, technical documents, and historical works.">
        <section className="cs-index-section">
          <h2>Collections</h2>
          <div className="cs-library-collections">
            {libraryCollections.map(collection => {
              const works = computerScienceLibraryWorks.filter(work => work.collection === collection.title)

              return (
                <article className="cs-library-entry" key={collection.title}>
                  <h3>{collection.title}</h3>
                  <p>{collection.description}</p>
                  <p className="cs-library-examples"><strong>Examples:</strong> {collection.examples.join(' · ')}</p>

                  {works.length ? (
                    <div className="cs-library-work-list">
                      {works.map(work => (
                        <LibraryWorkEntry key={work.id} work={work} onNavigate={onNavigate} />
                      ))}
                    </div>
                  ) : null}
                </article>
              )
            })}
          </div>
        </section>
      </ComputerScienceSectionFrame>
    </div>
  )
}
