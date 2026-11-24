import { useState } from 'react'
import type { RoutePath } from '../App'
import { ComputerScienceSectionFrame } from '../components/ComputerScienceSectionFrame'
import { subjects, topics, matchesTopic, topicRoute, subjectRoute } from '../data/computerScienceCatalog'
import './computerScienceCatalog.css'

type Props = { onNavigate: (route: RoutePath) => void }
export function ComputerScienceGuidePage({ onNavigate }: Props) {
  const [query,setQuery]=useState('')
  const found=topics.filter(t=>matchesTopic(query,t))
  return <ComputerScienceSectionFrame title="Guide" description="Find your way through computer science. You do not need to know the academic classification before you start." onNavigate={onNavigate}>
    <section className="cs-index-section"><h2>How to Use the Archive</h2><div className="cs-catalog-entrances">
      <article><h3><button className="cs-index-link" onClick={()=>onNavigate('/computer-science/library/subjects')}>Subjects</button></h3><p>Start with a field and explore its topics and works.</p></article>
      <article><h3><button className="cs-index-link" onClick={()=>onNavigate('/computer-science/library/topics')}>Topics</button></h3><p>Start with a specific concept or technology, even if it spans several fields.</p></article>
      <article><h3><button className="cs-index-link" onClick={()=>onNavigate('/computer-science/library/resources')}>Resources</button></h3><p>Find a paper, book, code repository, standard or document directly.</p></article>
    </div></section>
    <section className="cs-index-section"><h2>Where Should I Look?</h2>
      <div className="cs-catalog-filters"><label>Find a topic<input type="search" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Linux, Unix, CUDA, SQL, Python, Transformer…"/></label></div>
      <div className="cs-subject-grid">{(query.trim()?found:topics.filter(t=>['linux','unix','cuda','tcp-ip','python','relational-databases-and-sql','transformer','llvm','quantum-algorithms','graph-algorithms','virtualization-and-containers','web-and-http'].includes(t.id))).map(t=><article className="cs-subject-entry" key={t.id}>
        <button className="cs-index-link" onClick={()=>onNavigate(topicRoute(t.id))}>{t.title}</button><p>{t.description}</p><div className="cs-catalog-tags">{subjects.filter(s=>t.subjectIds.includes(s.id)).map(s=><a key={s.id} href={subjectRoute(s.id)} onClick={e=>{e.preventDefault();onNavigate(subjectRoute(s.id))}}>{s.title}</a>)}</div>
      </article>)}</div>{query.trim()&&!found.length&&<p>No matching topic yet. Try the Library resource index or the external research directory.</p>}
    </section>
    <section className="cs-index-section"><h2>Learning Guide</h2><p>For a first systematic pass, begin with programming and mathematical foundations, then algorithms, architecture and operating systems. Follow your interests into networking, databases, theory, AI or another field; revisit foundations as needed.</p><p>Read an introduction, study the original works, and connect theory with <button className="cs-library-open-paper" onClick={()=>onNavigate('/computer-science/practice-projects')}>Practice &amp; Projects</button>.</p></section>
    <section className="cs-index-section"><h2>Research &amp; Archive Guide</h2><p>Individual works are catalogued once and may be indexed under several topics or subjects. The Library points to original publications, code, and official documents. For journals, publishers, societies, and external archives, use the separate directory.</p><button className="cs-index-link" onClick={()=>onNavigate('/computer-science/resources')}>Research Resources →</button></section>
  </ComputerScienceSectionFrame>
}
