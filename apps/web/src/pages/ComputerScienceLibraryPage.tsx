import { useState } from 'react'
import type { ReactNode } from 'react'
import type { RoutePath } from '../App'
import { ComputerScienceSectionFrame } from '../components/ComputerScienceSectionFrame'
import type { LibraryWork } from '../data/computerScienceLibrary'
import { subjects, topics, resources, resourceKinds, subjectRoute, topicRoute, subjectsForWork, topicsForWork, worksForSubject, worksForTopic, matches, matchesTopic, matchesWork, type LibraryView, type LibraryDetailRoute } from '../data/computerScienceCatalog'
import './computerScienceCatalog.css'

type Props = { onNavigate: (route: RoutePath) => void }
const libraryRoot = '/computer-science/library'
const views = [
  { id:'subjects', title:'Subjects', description:'Explore the 17 core fields of computer science.' },
  { id:'topics', title:'Topics', description:'Find a specific technology, theory, or research problem across fields.' },
  { id:'resources', title:'Resources', description:'Search original papers, books, source code, standards and technical documents.' }
] as const
function NavLink({ to, onNavigate, children }: Props & { to: RoutePath; children: ReactNode }) {
  return <a href={to} onClick={e => { if(e.button===0 && !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey){ e.preventDefault(); onNavigate(to) } }}>{children}</a>
}
function LibraryNav({ onNavigate }: Props) {
  return <nav className="cs-catalog-nav" aria-label="Library navigation">
    <NavLink to={libraryRoot} onNavigate={onNavigate}>Library</NavLink>
    <NavLink to="/computer-science/library/subjects" onNavigate={onNavigate}>Subjects</NavLink>
    <NavLink to="/computer-science/library/topics" onNavigate={onNavigate}>Topics</NavLink>
    <NavLink to="/computer-science/library/resources" onNavigate={onNavigate}>Resources</NavLink>
    <NavLink to="/computer-science/guide" onNavigate={onNavigate}>Guide</NavLink>
  </nav>
}
function LibraryWorkEntry({
  work,
  onNavigate
}: {
  work: LibraryWork
  onNavigate: (route: RoutePath) => void
}) {
  const metadata = [work.authors.join(' · '), work.year, work.kind].filter(Boolean).join(' · ')

  return (
    <div className="cs-library-work">
      <h4>
        {work.openMode === 'route' ? (
          <button
            className="cs-library-open-paper"
            type="button"
            onClick={() => onNavigate(work.url as RoutePath)}
          >
            {work.title} →
          </button>
        ) : (
          <a
            href={work.url}
            target={work.openMode === 'external' ? '_blank' : undefined}
            rel={work.openMode === 'external' ? 'noopener noreferrer' : undefined}
          >
            {work.title}{work.openMode === 'external' ? ' ↗' : ' →'}
          </a>
        )}
      </h4>

      <p>{metadata}</p>

      {work.note ? <p className="cs-library-detail">{work.note}</p> : null}

      {work.pdf ? (
        <p className="cs-library-source-links">
          <a href={work.pdf} target="_blank" rel="noopener noreferrer">
            {work.pdfLabel ?? 'PDF ↗'}
          </a>
          {work.license ? <span> · {work.license}</span> : null}
        </p>
      ) : null}
    </div>
  )
}


function WorkList({ works, onNavigate }: Props & { works: LibraryWork[] }) {
  if(!works.length) return <p className="cs-catalog-empty">No works catalogued here yet. This collection will grow as sources are added.</p>
  return <div className="cs-library-work-list">{works.map(work => <article className="cs-catalog-work" key={work.id}>
    <LibraryWorkEntry work={work} onNavigate={onNavigate} />
    <div className="cs-catalog-tags">{subjectsForWork(work).map(s=><NavLink key={s.id} to={subjectRoute(s.id)} onNavigate={onNavigate}>{s.title}</NavLink>)}{topicsForWork(work).map(t=><NavLink key={t.id} to={topicRoute(t.id)} onNavigate={onNavigate}>{t.title}</NavLink>)}</div>
  </article>)}</div>
}
function TopicList({ items, onNavigate }: Props & { items: typeof topics }) {
  return <div className="cs-subject-grid">{items.map(topic=><article className="cs-subject-entry" key={topic.id}>
    <h3 className="cs-catalog-item-title"><NavLink to={topicRoute(topic.id)} onNavigate={onNavigate}>{topic.title}</NavLink></h3>
    <p>{topic.description}</p>
    <p className="cs-catalog-meta">{worksForTopic(topic.id).length} resources</p>
  </article>)}</div>
}
function SubjectList({ items, onNavigate }: Props & { items: typeof subjects }) {
  return <div className="cs-subject-grid">{items.map(subject=><article className="cs-subject-entry" key={subject.id}>
    <h3 className="cs-catalog-item-title"><NavLink to={subjectRoute(subject.id)} onNavigate={onNavigate}>{subject.title}</NavLink></h3>
    <p>{subject.description}</p>
    <p className="cs-catalog-meta">{topics.filter(t=>t.subjectIds.includes(subject.id)).length} topics · {worksForSubject(subject.id).length} resources</p>
  </article>)}</div>
}
export function ComputerScienceLibraryPage({ onNavigate, initialView }: Props & { initialView?: LibraryView }) {
  const [query,setQuery]=useState('')
  const [kind,setKind]=useState('All')
  const [subject,setSubject]=useState('All')
  const [limit,setLimit]=useState(40)
  const filteredWorks=resources.filter(w=>(kind==='All'||w.kind===kind)&&(subject==='All'||subjectsForWork(w).some(s=>s.id===subject))&&matchesWork(query,w))
  const filteredTopics=topics.filter(t=>(subject==='All'||t.subjectIds.includes(subject))&&matchesTopic(query,t))
  const filteredSubjects=subjects.filter(s=>matches(query,[s.title,s.description]))
  return <ComputerScienceSectionFrame title={initialView ? views.find(v=>v.id===initialView)!.title : 'Library'} description={initialView ? views.find(v=>v.id===initialView)!.description : 'A subject-first archive with independent topic and resource indexes. Explore knowledge from any starting point.'} onNavigate={onNavigate}>
    <LibraryNav onNavigate={onNavigate}/>
    {!initialView ? <>
      <section className="cs-index-section"><h2>Explore the Library</h2><div className="cs-catalog-entrances">
        {views.map(view=><article key={view.id}><h3><NavLink to={`/computer-science/library/${view.id}` as RoutePath} onNavigate={onNavigate}>{view.title}</NavLink></h3><p>{view.description}</p><p className="cs-catalog-meta">{view.id==='subjects'?subjects.length:view.id==='topics'?topics.length:resources.length} entries</p></article>)}
      </div></section>
      <section className="cs-index-section"><h2>Core Subject Collections</h2><SubjectList items={subjects} onNavigate={onNavigate}/></section>
      <p className="cs-catalog-help">Not sure where to start? <NavLink to="/computer-science/guide" onNavigate={onNavigate}>Read the Guide</NavLink>. Looking for ACM, IEEE or publishers? <NavLink to="/computer-science/resources" onNavigate={onNavigate}>Research Resources</NavLink>.</p>
    </> : <>
      <div className="cs-catalog-filters">
        <label>Search {initialView}<input type="search" value={query} onChange={e=>{setQuery(e.target.value);setLimit(40)}} placeholder={initialView==='resources'?'Title, author, year, topic…':'Name or keyword…'}/></label>
        {initialView!=='subjects' && <label>Subject<select value={subject} onChange={e=>{setSubject(e.target.value);setLimit(40)}}><option value="All">All subjects</option>{subjects.map(s=><option key={s.id} value={s.id}>{s.title}</option>)}</select></label>}
        {initialView==='resources' && <label>Resource type<select value={kind} onChange={e=>{setKind(e.target.value);setLimit(40)}}><option value="All">All types</option>{resourceKinds.map(k=><option key={k}>{k}</option>)}</select></label>}
      </div>
      <section className="cs-index-section">
        <p className="cs-catalog-meta">{initialView==='subjects'?filteredSubjects.length:initialView==='topics'?filteredTopics.length:filteredWorks.length} results</p>
        {initialView==='subjects' && (filteredSubjects.length?<SubjectList items={filteredSubjects} onNavigate={onNavigate}/>:<p>No matching subjects.</p>)}
        {initialView==='topics' && (filteredTopics.length?<TopicList items={filteredTopics.slice(0,limit)} onNavigate={onNavigate}/>:<p>No matching topics.</p>)}
        {initialView==='resources' && (filteredWorks.length?<WorkList works={filteredWorks.slice(0,limit)} onNavigate={onNavigate}/>:<p>No matching resources.</p>)}
        {(initialView==='topics'?filteredTopics.length:initialView==='resources'?filteredWorks.length:0)>limit && <button className="cs-index-link" type="button" onClick={()=>setLimit(n=>n+40)}>Show more</button>}
      </section>
    </>}
  </ComputerScienceSectionFrame>
}
export function ComputerScienceLibraryDetailPage({ onNavigate, route }: Props & { route: LibraryDetailRoute }) {
  const id=route.split('/').pop()
  const subject=route.includes('/subjects/')?subjects.find(s=>s.id===id):undefined
  const topic=route.includes('/topics/')?topics.find(t=>t.id===id):undefined
  return <ComputerScienceSectionFrame title={subject?.title??topic?.title??'Collection not found'} description={subject?.description??topic?.description} onNavigate={onNavigate}>
    <LibraryNav onNavigate={onNavigate}/>
    {subject && <>
      <section className="cs-index-section"><h2>Introduction</h2><p>{subject.description}</p>{subject.route && <p><NavLink to={subject.route as RoutePath} onNavigate={onNavigate}>Read the existing subject notes →</NavLink></p>}</section>
      <section className="cs-index-section"><h2>Topics</h2><TopicList items={topics.filter(t=>t.subjectIds.includes(subject.id))} onNavigate={onNavigate}/></section>
      <section className="cs-index-section"><h2>Resources</h2><WorkList works={worksForSubject(subject.id)} onNavigate={onNavigate}/></section>
    </>}
    {topic && <>
      <section className="cs-index-section"><h2>Introduction</h2><p>{topic.description}</p>{topic.aliases.length>0&&<p className="cs-catalog-meta">Also indexed as: {topic.aliases.join(' · ')}</p>}</section>
      <section className="cs-index-section"><h2>Related Subjects</h2><SubjectList items={subjects.filter(s=>topic.subjectIds.includes(s.id))} onNavigate={onNavigate}/></section>
      <section className="cs-index-section"><h2>Resources</h2><WorkList works={worksForTopic(topic.id)} onNavigate={onNavigate}/></section>
      <section className="cs-index-section"><h2>Related Topics</h2><TopicList items={topics.filter(t=>t.id!==topic.id&&t.subjectIds.some(s=>topic.subjectIds.includes(s))).slice(0,12)} onNavigate={onNavigate}/></section>
    </>}
    {!subject&&!topic&&<p>This entry does not exist. Use the Library navigation to find a collection.</p>}
  </ComputerScienceSectionFrame>
}
