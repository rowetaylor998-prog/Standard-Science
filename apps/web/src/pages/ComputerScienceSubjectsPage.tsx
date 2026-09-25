import type { RoutePath } from '../App'
import { ComputerScienceSectionFrame } from '../components/ComputerScienceSectionFrame'
import { computerScienceSubjects } from '../data/computerScienceArchive'

type Props = {
  onNavigate: (route: RoutePath) => void
}

export function ComputerScienceSubjectsPage({ onNavigate }: Props) {
  return (
    <ComputerScienceSectionFrame
      title="Subject Section"
      description="A subject-first map of modern computer science. Start with a field, move into subfields and topics, then connect concepts to primary sources, people, history, and real projects."
      onNavigate={onNavigate}
    >
      <section className="cs-index-section">
        <h2>Core Subject Collections</h2>
        <div className="cs-subject-grid">
          {computerScienceSubjects.map((subject) => (
            <article className="cs-subject-entry" key={subject.title}>
              {subject.route ? (
                <button
                  type="button"
                  className="cs-index-link"
                  onClick={() => onNavigate(subject.route as RoutePath)}
                >
                  {subject.title}
                </button>
              ) : (
                <span className="cs-index-link cs-index-link-future" title="Section under construction">
                  {subject.title}
                </span>
              )}
              <p>{subject.description}</p>
            </article>
          ))}
        </div>
      </section>
    </ComputerScienceSectionFrame>
  )
}
