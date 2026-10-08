import type { RoutePath } from '../App'

type PageProps = { onNavigate: (route: RoutePath) => void }

const books = [
  {
    title: 'Introduction to Algorithms, Fourth Edition',
    authors: 'Thomas H. Cormen · Charles E. Leiserson · Ronald L. Rivest · Clifford Stein',
    label: 'TEXTBOOK · 2022',
    description: 'Algorithms, data structures, analysis, and rigorous algorithm design.',
    href: 'https://mitpress.mit.edu/9780262046305/introduction-to-algorithms/',
    source: 'MIT Press · official book page'
  },
  {
    title: 'CUDA C++ Best Practices Guide',
    authors: 'NVIDIA',
    label: 'TECHNICAL GUIDE · LIVING DOCUMENT',
    description: 'GPU programming, memory access, profiling, parallel execution, and optimization.',
    href: 'https://docs.nvidia.com/cuda/cuda-c-best-practices-guide/',
    source: 'NVIDIA · official documentation'
  }
]

const papers = [
  {
    title: 'Attention Is All You Need',
    authors: 'Ashish Vaswani et al.',
    label: 'RESEARCH PAPER · 2017',
    description: 'The original Transformer architecture, attention, and sequence modeling.',
    path: '/library/attention-is-all-you-need' as RoutePath,
    pdf: 'https://arxiv.org/pdf/1706.03762v1'
  },
  {
    title: 'ImageNet Classification with Deep Convolutional Neural Networks',
    authors: 'Alex Krizhevsky · Ilya Sutskever · Geoffrey E. Hinton',
    label: 'RESEARCH PAPER · 2012',
    description: 'AlexNet and the GPU-powered breakthrough in large-scale image classification.',
    path: '/library/alexnet' as RoutePath,
    pdf: 'https://proceedings.neurips.cc/paper_files/paper/2012/file/c399862d3b9d6b76c8436e924a68c45b-Paper.pdf'
  }
]

export function LibraryPage({ onNavigate }: PageProps) {
  return (
    <div className="reading-library">
      <header className="library-intro">
        <p className="library-kicker">STANDARD SCIENCE / READING ROOM</p>
        <h1>Library of Science</h1>
        <p>Original works, official sources, and readable research pages. A working first edition of our open reading room.</p>
      </header>
      <section className="library-section" aria-labelledby="books-heading">
        <div className="library-section-heading">
          <span className="library-section-no">01</span>
          <div><h2 id="books-heading">Books & Technical References</h2><p>Titles are links. No raw download URLs are displayed.</p></div>
        </div>
        <div className="library-list">
          {books.map(book => (
            <article className="library-entry" key={book.title}>
              <span className="library-meta">{book.label}</span>
              <h3><a href={book.href} target="_blank" rel="noopener noreferrer">{book.title}</a></h3>
              <p className="library-byline">{book.authors}</p>
              <p>{book.description}</p>
              <span className="library-source">{book.source} ↗</span>
            </article>
          ))}
        </div>
        <p className="library-notice">The previously supplied temporary PDF download links have expired. Stable official pages are used instead; the MIT Press book page is not a free full-text PDF.</p>
      </section>
      <section className="library-section" aria-labelledby="papers-heading">
        <div className="library-section-heading">
          <span className="library-section-no">02</span>
          <div><h2 id="papers-heading">Original Research Papers</h2><p>Read an HTML sample in the cream-paper style or open the authoritative PDF.</p></div>
        </div>
        <div className="library-list">
          {papers.map(paper => (
            <article className="library-entry" key={paper.title}>
              <span className="library-meta">{paper.label}</span>
              <h3><button type="button" className="library-title-button" onClick={() => onNavigate(paper.path)}>{paper.title}</button></h3>
              <p className="library-byline">{paper.authors}</p>
              <p>{paper.description}</p>
              <div className="library-entry-actions">
                <button type="button" onClick={() => onNavigate(paper.path)}>Read HTML sample →</button>
                <a href={paper.pdf} target="_blank" rel="noopener noreferrer">Original PDF ↗</a>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
