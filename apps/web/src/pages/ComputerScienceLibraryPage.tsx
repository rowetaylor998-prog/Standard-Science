import type { RoutePath } from '../App'
import { ComputerScienceSectionFrame } from '../components/ComputerScienceSectionFrame'
import { libraryCollections } from '../data/computerScienceArchive'

type Props = {
  onNavigate: (route: RoutePath) => void
}

export function ComputerScienceLibraryPage({ onNavigate }: Props) {
  return (
    <ComputerScienceSectionFrame
      title="Library"
      description="The Library is an archive of works and technical artifacts: books, papers, source code, RFCs, standards, manuals, lecture notes, datasets, benchmarks, and historical documents. It indexes what to read and inspect; Computer Scientists indexes who did the work."
      onNavigate={onNavigate}
    >
      <section className="cs-index-section">
        <h2>Collections</h2>
        <div className="cs-library-collections">
          {libraryCollections.map((collection) => (
            <article className="cs-library-entry" key={collection.title}>
              <h3>{collection.title}</h3>
              <p>{collection.description}</p>
              <p className="cs-library-examples">
                <strong>Examples:</strong> {collection.examples.join(' · ')}
              </p>
            </article>
          ))}
        </div>
      </section>
    </ComputerScienceSectionFrame>
  )
}
