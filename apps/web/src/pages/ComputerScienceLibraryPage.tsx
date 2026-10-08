import type { RoutePath } from '../App'
import { ComputerScienceSectionFrame } from '../components/ComputerScienceSectionFrame'
import { libraryCollections } from '../data/computerScienceArchive'

type Props = { onNavigate: (route: RoutePath) => void }

const works = [
  {
    title: 'Introduction to Algorithms, Fourth Edition',
    authors: 'Thomas H. Cormen · Charles E. Leiserson · Ronald L. Rivest · Clifford Stein',
    type: 'Book · 2022',
    url: 'https://mitpress.mit.edu/9780262046305/introduction-to-algorithms/',
    note: 'Official MIT Press book record. This is not an open-access full-text PDF.'
  },
  {
    title: 'CUDA C++ Best Practices Guide',
    authors: 'NVIDIA',
    type: 'Technical guide · updated online',
    url: 'https://docs.nvidia.com/cuda/cuda-c-best-practices-guide/',
    note: 'Complete, freely available official NVIDIA documentation.'
  },
  {
    title: 'Attention Is All You Need',
    authors: 'Ashish Vaswani et al. · 2017',
    type: 'Original research paper',
    url: '/computer-science/library/attention-is-all-you-need',
    pdf: 'https://arxiv.org/pdf/1706.03762v1',
    note: 'Read the ivory-paper HTML overview, or open the original 2017 PDF.'
  },
  {
    title: 'ImageNet Classification with Deep Convolutional Neural Networks',
    authors: 'Alex Krizhevsky · Ilya Sutskever · Geoffrey E. Hinton · 2012',
    type: 'Original research paper',
    url: '/computer-science/library/imagenet-classification',
    pdf: 'https://proceedings.neurips.cc/paper_files/paper/2012/file/c399862d3b9d6b76c8436e924a68c45b-Paper.pdf',
    note: 'Read the ivory-paper HTML overview, or open the original NeurIPS PDF.'
  }
]

export function ComputerScienceLibraryPage({ onNavigate }: Props) {
  return (
    <div className="cs-library-photo-background">
      <ComputerScienceSectionFrame
        title="Library"
        onNavigate={onNavigate}
        description="Original books, research papers and technical documents. Select a title to open its reading source.">
        <section className="cs-index-section">
          <h2>Selected Works</h2>
          <div className="cs-library-collections">
            {works.map(work => {
              const isExternal = work.url.startsWith('https://')
              return (
                <article className="cs-library-entry" key={work.title}>
                  <h3>
                    {isExternal ? (
                      <a href={work.url} target="_blank" rel="noopener noreferrer">{work.title} ↗</a>
                    ) : (
                      <button
                        className="cs-library-open-paper"
                        type="button"
                        onClick={() => onNavigate(work.url as RoutePath)}
                      >{work.title} →</button>
                    )}
                  </h3>
                  <p>{work.authors} · {work.type}</p>
                  <p className="cs-library-detail">{work.note}</p>
                  {'pdf' in work && work.pdf ? (
                    <p><a href={work.pdf} target="_blank" rel="noopener noreferrer">Read original PDF ↗</a></p>
                  ) : null}
                </article>
              )
            })}
          </div>
          <p className="cs-library-detail">The earlier signed download URLs were temporary and are no longer reliable. Bibliographic entries therefore point to stable publisher or official documentation pages, with readable titles rather than long raw URLs.</p>
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
