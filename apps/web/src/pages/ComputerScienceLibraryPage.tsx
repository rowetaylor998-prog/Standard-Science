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
      actions={
        <button
          type="button"
          className="cs-primary-action"
          onClick={() => onNavigate('/computer-science/library/reader')}
        >
          Open Personal Reader
        </button>
      }
    >
      <section className="cs-library-principle">
        <h2>Library Principle</h2>
        <p>
          Public pages should contain metadata, public-domain material, open-access works, permissively
          licensed material, or links to lawful external sources. Your private reader can open books and
          documents you already legally possess without uploading them to Standard Science.
        </p>
      </section>

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
