const resources = [
  { label: '马克思主义文库', href: 'https://www.marxists.org/chinese/' },
  { label: 'Wikipedia 维基百科', href: 'https://zh.wikipedia.org/' },
  { label: 'Z-library', href: 'https://zlib.bz/#tags' }
]

export function ExternalResources() {
  return (
    <nav className="external-resources" aria-label="外部资源">
      <span className="external-resources-label">外部资源</span>
      <div className="external-resources-links">
        {resources.map(({ label, href }) => (
          <a key={href} href={href} target="_blank" rel="noopener noreferrer">
            {label} <span aria-hidden="true">↗</span>
            <span className="external-resources-sr-only">（在新标签页打开）</span>
          </a>
        ))}
      </div>
    </nav>
  )
}
