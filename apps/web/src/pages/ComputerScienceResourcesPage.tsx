import { useMemo, useState } from 'react'
import type { RoutePath } from '../App'
import { ComputerScienceSectionFrame } from '../components/ComputerScienceSectionFrame'
import { computerScienceBookCatalog } from '../data/computerScienceBookCatalog'
import { computerScienceLibraryWorks } from '../data/computerScienceLibrary'
import { researchResources, resourceGroups } from '../data/computerScienceResources'
import './computerScienceResources.css'

type Props = { onNavigate: (route: RoutePath) => void }
type View = 'sources' | 'books'

export function ComputerScienceResourcesPage({ onNavigate }: Props) {
  const [view, setView] = useState<View>('sources')
  const [query, setQuery] = useState('')
  const [selectedGroup, setSelectedGroup] = useState('All')
  const [limit, setLimit] = useState(24)

  const groups = useMemo(
    () => view === 'sources'
      ? resourceGroups.map(group => group.name)
      : Array.from(new Set(computerScienceBookCatalog.map(book => book.layer))),
    [view]
  )

  const term = query.trim().toLowerCase()
  const filteredSources = useMemo(() => researchResources.filter(source =>
    (selectedGroup === 'All' || source.group === selectedGroup) &&
    [source.title, source.group, source.note].join(' ').toLowerCase().includes(term)
  ), [selectedGroup, term])

  const filteredBooks = useMemo(() => computerScienceBookCatalog.filter(book =>
    (selectedGroup === 'All' || book.layer === selectedGroup) &&
    [book.title, book.authors, book.domain, book.priority, book.layer, book.note].join(' ').toLowerCase().includes(term)
  ), [selectedGroup, term])

  const total = view === 'sources' ? filteredSources.length : filteredBooks.length

  function changeView(nextView: View) {
    setView(nextView)
    setQuery('')
    setSelectedGroup('All')
    setLimit(24)
  }

  return (
    <div className="cs-library-photo-background">
      <ComputerScienceSectionFrame
        title="Research Resources"
        description="One searchable entrance to research papers, books, magazines, professional communities, courses, and computing laboratories."
        onNavigate={onNavigate}
      >
        <div className="cs-hub">
          <div className="cs-hub-intro">
            <div>
              <p className="cs-hub-eyebrow">STANDARD SCIENCE · COMPUTER SCIENCE</p>
              <h2>Research & Learning Directory</h2>
              <p>Browse original sources and the existing 200-book knowledge map. The directory is an index, not a mirror of publishers' copyrighted files.</p>
            </div>
            <div className="cs-hub-stat-group" aria-label="Directory size">
              <div><strong>{researchResources.length}</strong><span>Source links</span></div>
              <div><strong>{computerScienceBookCatalog.length}</strong><span>Catalogued books</span></div>
            </div>
          </div>

          <nav className="cs-hub-tabs" aria-label="Resource view">
            <button type="button" className={view === 'sources' ? 'active' : ''} onClick={() => changeView('sources')} aria-current={view === 'sources' ? 'page' : undefined}>Sources & Communities</button>
            <button type="button" className={view === 'books' ? 'active' : ''} onClick={() => changeView('books')} aria-current={view === 'books' ? 'page' : undefined}>200-Book Catalog</button>
            <button type="button" onClick={() => onNavigate('/computer-science/library')}>Existing Library ↗</button>
          </nav>

          {view === 'books' ? (
            <p className="cs-hub-context">
              These 200 titles come from the original 15-layer reading map. Being on this list does <strong>not</strong> mean a PDF has been uploaded or that a legal full-text link is available.
              For already integrated reading pages, see <button type="button" onClick={() => onNavigate('/computer-science/library')}>Existing Library</button>.
            </p>
          ) : (
            <p className="cs-hub-context">
              ACM, IEEE, arXiv, USENIX, company research labs, historical archives, publishers, professional learning, and open-source communities.
              Some external services have membership, registration, or publication fees.
            </p>
          )}

          <div className="cs-hub-toolbar">
            <label htmlFor="cs-hub-search">Search the directory</label>
            <input
              id="cs-hub-search"
              type="search"
              value={query}
              onChange={event => { setQuery(event.target.value); setLimit(24) }}
              placeholder={view === 'books' ? 'Title, author, subject, priority…' : 'Organization, magazine, paper archive, course…'}
            />
          </div>
          <div className="cs-hub-filters" aria-label="Filter by category">
            <button className={selectedGroup === 'All' ? 'active' : ''} type="button" onClick={() => { setSelectedGroup('All'); setLimit(24) }}>All</button>
            {groups.map(group => (
              <button key={group} className={selectedGroup === group ? 'active' : ''} type="button" onClick={() => {setSelectedGroup(group); setLimit(24)}}>{group}</button>
            ))}
          </div>

          <div className="cs-hub-results-title">
            <h2>{view === 'books' ? 'Books & Research Monographs' : selectedGroup === 'All' ? 'Academic & Developer Sources' : selectedGroup}</h2>
            <span>{total} {view === 'books' ? 'books' : 'resources'}</span>
          </div>

          <div className="cs-hub-grid">
            {view === 'sources'
              ? filteredSources.slice(0, limit).map(resource => (
                <article key={resource.id} className="cs-hub-card">
                  <small>{resource.group}</small>
                  <h3><a href={resource.url} target="_blank" rel="noopener noreferrer">{resource.title} <span aria-hidden="true">↗</span></a></h3>
                  <p>{resource.note}</p>
                </article>
              ))
              : filteredBooks.slice(0, limit).map(book => (
                <article key={book.id} className="cs-hub-card cs-hub-book">
                  <small>{book.layer}</small>
                  <h3>{book.title}</h3>
                  <p>{book.authors}</p>
                  <div className="cs-hub-book-meta"><span>{book.domain}</span><span>Priority: {book.priority}</span></div>
                  {book.note ? <p className="cs-hub-book-note">{book.note}</p> : null}
                  <p className="cs-hub-lookup"><a href={`https://search.worldcat.org/search?q=${encodeURIComponent(book.title + ' ' + book.authors.split(';')[0])}`} target="_blank" rel="noopener noreferrer">Find library / publisher edition ↗</a></p>
                </article>
              ))
            }
          </div>

          {total === 0 ? <p className="cs-hub-empty">No matching items. Try another keyword or category.</p> : null}
          {total > limit ? (
            <button className="cs-hub-load-more" type="button" onClick={() => setLimit(old => old + 24)}>
              Show more · {Math.min(24, total - limit)} of {total - limit} remaining
            </button>
          ) : null}

          <aside className="cs-hub-next">
            <h3>Already in the Standard Science Library</h3>
            <p>{computerScienceLibraryWorks.map(work => work.title).join(' · ')}</p>
            <button type="button" onClick={() => onNavigate('/computer-science/library')}>Open existing Library →</button>
          </aside>
        </div>
      </ComputerScienceSectionFrame>
    </div>
  )
}
