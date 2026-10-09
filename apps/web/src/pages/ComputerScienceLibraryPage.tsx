import type { RoutePath } from '../App'
import { ComputerScienceSectionFrame } from '../components/ComputerScienceSectionFrame'
import { libraryCollections } from '../data/computerScienceArchive'
import { computerScienceLibraryWorks } from '../data/computerScienceLibrary'

type Props = { onNavigate: (route: RoutePath) => void }

export function ComputerScienceLibraryPage({ onNavigate }: Props) {
  return (
    <div className="cs-library-photo-background">
      <ComputerScienceSectionFrame
        title="Library"
        onNavigate={onNavigate}
        description="Books, papers, technical documents, and historical works.">
        <section className="cs-index-section">
          <h2>Selected Works</h2>
          <div className="cs-library-collections">
            {computerScienceLibraryWorks.map(work => {
              const metadata = [work.authors.join(' · '), work.year, work.kind].filter(Boolean).join(' · ')

              return (
                <article className="cs-library-entry" key={work.id}>
                  <h3>
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
                  </h3>

                  <p>{metadata}</p>

                  {work.subjects.length ? (
                    <p className="cs-library-detail">
                      <strong>Subjects:</strong> {work.subjects.join(' · ')}
                    </p>
                  ) : null}

                  {work.note ? <p className="cs-library-detail">{work.note}</p> : null}

                  {work.pdf ? (
                    <p>
                      <a href={work.pdf} target="_blank" rel="noopener noreferrer">
                        {work.pdfLabel ?? 'PDF ↗'}
                      </a>
                    </p>
                  ) : null}
                </article>
              )
            })}
          </div>
        </section>

        <section className="cs-index-section">
          <h2>Collections</h2>
          <div className="cs-library-collections">
            {libraryCollections.map(collection => (
              <article className="cs-library-entry" key={collection.title}>
                <h3>{collection.title}</h3>
                <p>{collection.description}</p>
                <p className="cs-library-examples"><strong>Examples:</strong> {collection.examples.join(' · ')}</p>
              </article>
            ))}
          </div>
        </section>
      </ComputerScienceSectionFrame>
    </div>
  )
}
