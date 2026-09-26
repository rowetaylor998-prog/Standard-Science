import { useState } from 'react'
import type { FormEvent } from 'react'
import type { RoutePath } from '../App'
import { searchContent } from '../api'
import type { ContentSearchItem } from '../api'
import { ComputerScienceSectionFrame } from '../components/ComputerScienceSectionFrame'

type Props = {
  onNavigate: (route: RoutePath) => void
}

export function ComputerScienceSearchPage({ onNavigate }: Props) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<ContentSearchItem[]>([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)
  const [error, setError] = useState('')

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const value = query.trim()

    if (!value) {
      setResults([])
      setSearched(false)
      return
    }

    setLoading(true)
    setError('')
    setSearched(true)

    try {
      const data = await searchContent(value)
      setResults(data.items)
    } catch (searchError) {
      setError(
        searchError instanceof Error
          ? searchError.message
          : 'Search is unavailable. Start the backend and try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <ComputerScienceSectionFrame
      title="Search the Archive"
      description="Search is the cross-index entrance to the archive. Today it searches the Markdown content engine; later it will unify Subjects, Library works, Computer Scientists, History, Projects, and Lessons."
      onNavigate={onNavigate}
    >
      <section className="cs-search-panel">
        <form onSubmit={submit}>
          <label htmlFor="cs-archive-search">Search query</label>
          <div>
            <input
              id="cs-archive-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Try virtual memory, algorithms, distributed systems..."
            />
            <button type="submit" disabled={loading}>
              {loading ? 'Searching…' : 'Search'}
            </button>
          </div>
        </form>

        {error ? <p className="cs-search-error">{error}</p> : null}

        {searched && !loading && !error ? (
          <div className="cs-search-results">
            <p>
              {results.length
                ? String(results.length) + ' result' + (results.length === 1 ? '' : 's')
                : 'No results found.'}
            </p>
            {results.map((item) => (
              <article key={item.path}>
                <div>
                  <h2>{item.title}</h2>
                  <p>{item.snippet}</p>
                  <code>{item.path}</code>
                </div>
                <button type="button" onClick={() => onNavigate(item.path as RoutePath)}>
                  Open
                </button>
              </article>
            ))}
          </div>
        ) : null}
      </section>
    </ComputerScienceSectionFrame>
  )
}
