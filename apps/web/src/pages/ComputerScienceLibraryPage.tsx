import type { RoutePath } from '../App'
import { ComputerScienceSectionFrame } from '../components/ComputerScienceSectionFrame'
import { libraryCollections } from '../data/computerScienceArchive'

type Props = { onNavigate: (route: RoutePath) => void }

const works = [
  { title: 'Introduction to Algorithms, Fourth Edition', authors: 'Thomas H. Cormen, Charles E. Leiserson, Ronald L. Rivest, Clifford Stein', type: 'Book', url: 'https://mitpress.mit.edu/9780262046305/introduction-to-algorithms/' },
  { title: 'CUDA C++ Best Practices Guide', authors: 'NVIDIA', type: 'Technical documentation', url: 'https://docs.nvidia.com/cuda/cuda-c-best-practices-guide/' },
  { title: 'Attention Is All You Need', authors: 'Ashish Vaswani et al. · 2017', type: 'Paper', url: '/computer-science/library/attention-is-all-you-need' },
  { title: 'ImageNet Classification with Deep Convolutional Neural Networks', authors: 'Alex Krizhevsky, Ilya Sutskever, Geoffrey E. Hinton · 2012', type: 'Paper', url: '/computer-science/library/imagenet-classification' }
]

export function ComputerScienceLibraryPage({ onNavigate }: Props) {
  return (
    <div className="cs-library-photo-background">
      <ComputerScienceSectionFrame title="Library" onNavigate={onNavigate}
        description="Books, papers, technical documents, and historical works.">
        <section className="cs-index-section">
          <h2>Selected Works</h2>
          <div className="cs-library-collections">
            {works.map(work => (
              <article className="cs-library-entry" key={work.title}>
                <h3><a href={work.url} target={work.url.startsWith('http') ? '_blank' : undefined} rel={work.url.startsWith('http') ? 'noopener noreferrer' : undefined}>{work.title}</a></h3>
                <p>{work.authors} · {work.type}</p>
              </article>
            ))}
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
