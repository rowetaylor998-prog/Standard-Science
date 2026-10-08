import type { RoutePath } from '../App'
import { ComputerScienceSectionFrame } from '../components/ComputerScienceSectionFrame'
import { libraryCollections } from '../data/computerScienceArchive'

type Props = { onNavigate: (route: RoutePath) => void }

type Work = {
  title: string
  authors: string
  type: string
  url: string
  pdf?: string
  note?: string
}

const works: Work[] = [
  {
    title: 'Introduction to Algorithms, Fourth Edition',
    authors: 'Thomas H. Cormen · Charles E. Leiserson · Ronald L. Rivest · Clifford Stein',
    type: 'Book · 2022',
    url: 'https://mitpress.mit.edu/9780262046305/introduction-to-algorithms/',
    note: 'Fourth edition · MIT Press.'
  },
  {
    title: 'CUDA C++ Best Practices Guide',
    authors: 'NVIDIA',
    type: 'Technical guide',
    url: 'https://docs.nvidia.com/cuda/pdf/CUDA_C_Best_Practices_Guide.pdf',
    pdf: 'https://docs.nvidia.com/cuda/cuda-c-best-practices-guide/index.html',
    note: 'Official NVIDIA PDF; HTML documentation is also available.'
  },
  {
    title: 'Attention Is All You Need',
    authors: 'Ashish Vaswani et al. · 2017',
    type: 'Original research paper',
    url: '/papers/attention-is-all-you-need.html',
    pdf: 'https://arxiv.org/pdf/1706.03762v1',
    note: 'Complete MIA-style HTML transcription with formulas, source tables, references, and local annotations.'
  },
  {
    title: 'ImageNet Classification with Deep Convolutional Neural Networks',
    authors: 'Alex Krizhevsky · Ilya Sutskever · Geoffrey E. Hinton · 2012',
    type: 'Original research paper',
    url: '/computer-science/library/imagenet-classification',
    pdf: 'https://proceedings.neurips.cc/paper_files/paper/2012/file/c399862d3b9d6b76c8436e924a68c45b-Paper.pdf',
    note: 'HTML reading page plus the original NeurIPS PDF.'
  }
]

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
            {works.map(work => {
              const isExternal = work.url.startsWith('https://')
              const isStaticHtml = work.url.endsWith('.html')

              return (
                <article className="cs-library-entry" key={work.title}>
                  <h3>
                    {isExternal || isStaticHtml ? (
                      <a
                        href={work.url}
                        target={isExternal ? '_blank' : undefined}
                        rel={isExternal ? 'noopener noreferrer' : undefined}
                      >
                        {work.title}{isExternal ? ' ↗' : ' →'}
                      </a>
                    ) : (
                      <button
                        className="cs-library-open-paper"
                        type="button"
                        onClick={() => onNavigate(work.url as RoutePath)}
                      >
                        {work.title} →
                      </button>
                    )}
                  </h3>
                  <p>{work.authors} · {work.type}</p>
                  {work.note ? <p className="cs-library-detail">{work.note}</p> : null}
                  {work.pdf ? (
                    <p>
                      <a href={work.pdf} target="_blank" rel="noopener noreferrer">
                        {work.title === 'CUDA C++ Best Practices Guide' ? 'Official HTML documentation ↗' : 'Original PDF ↗'}
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
