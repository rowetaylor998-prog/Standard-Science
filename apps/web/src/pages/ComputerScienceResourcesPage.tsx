import { useMemo, useState } from 'react'
import type { RoutePath } from '../App'
import { ComputerScienceSectionFrame } from '../components/ComputerScienceSectionFrame'
import { researchResources, resourceGroups } from '../data/computerScienceResources'
import './computerScienceResources.css'

type Props = { onNavigate: (route: RoutePath) => void }

export function ComputerScienceResourcesPage({ onNavigate }: Props) {
  const [query, setQuery] = useState('')
  const [selectedGroup, setSelectedGroup] = useState('All')
  const [limit, setLimit] = useState(24)

  const term = query.trim().toLowerCase()
  const filteredResources = useMemo(
    () => researchResources.filter(resource =>
      (selectedGroup === 'All' || resource.group === selectedGroup) &&
      [resource.title, resource.group, resource.note].join(' ').toLowerCase().includes(term)
    ),
    [selectedGroup, term]
  )

  return (
    <div className="cs-library-photo-background">
      <ComputerScienceSectionFrame
        title="Research Resources"
        description="One searchable entrance to research papers, publishers, magazines, academic communities, courses, and computing laboratories."
        onNavigate={onNavigate}
      >
        <div className="cs-hub">
          <div className="cs-hub-intro">
            <div>
              <p className="cs-hub-eyebrow">STANDARD SCIENCE · COMPUTER SCIENCE</p>
              <h2>Research & Learning Directory</h2>
              <p>A single place to find publications, academic societies, professional education, and company research portals.</p>
            </div>
            <div className="cs-hub-stat-group" aria-label="Directory size">
              <div><strong>{researchResources.length}</strong><span>Source links</span></div>
              <div><strong>{resourceGroups.length}</strong><span>Categories</span></div>
            </div>
          </div>

          <div className="cs-hub-context">
            ACM · IEEE · arXiv · USENIX · MIT Press · Springer · company research labs · professional learning.
            Some external services require registration or membership.
            <button type="button" onClick={() => onNavigate('/computer-science/library')}> Open the existing Library →</button>
          </div>

          <div className="cs-hub-toolbar">
            <label htmlFor="cs-hub-search">Search resources</label>
            <input
              id="cs-hub-search"
              type="search"
              value={query}
              onChange={event => { setQuery(event.target.value); setLimit(24) }}
              placeholder="Organization, magazine, paper archive, course…"
            />
          </div>

          <div className="cs-hub-filters" aria-label="Filter by resource category">
            <button className={selectedGroup === 'All' ? 'active' : ''} type="button" onClick={() => { setSelectedGroup('All'); setLimit(24) }}>All</button>
            {resourceGroups.map(group => (
              <button
                key={group.name}
                className={selectedGroup === group.name ? 'active' : ''}
                type="button"
                onClick={() => { setSelectedGroup(group.name); setLimit(24) }}
                title={group.description}
              >{group.name}</button>
            ))}
          </div>

          <div className="cs-hub-results-title">
            <h2>{selectedGroup === 'All' ? 'Academic & Developer Sources' : selectedGroup}</h2>
            <span>{filteredResources.length} resources</span>
          </div>

          <div className="cs-hub-grid">
            {filteredResources.slice(0, limit).map(resource => (
              <article key={resource.id} className="cs-hub-card">
                <small>{resource.group}</small>
                <h3>
                  <a href={resource.url} target="_blank" rel="noopener noreferrer">
                    {resource.title} <span aria-hidden="true">↗</span>
                  </a>
                </h3>
                <p>{resource.note}</p>
              </article>
            ))}
          </div>

          {filteredResources.length === 0 ? <p className="cs-hub-empty">No matching resources. Try another keyword or category.</p> : null}
          {filteredResources.length > limit ? (
            <button className="cs-hub-load-more" type="button" onClick={() => setLimit(previous => previous + 24)}>
              Show more · {Math.min(24, filteredResources.length - limit)} of {filteredResources.length - limit} remaining
            </button>
          ) : null}
        </div>
      </ComputerScienceSectionFrame>
    </div>
  )
}
