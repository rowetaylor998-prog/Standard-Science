import type { RoutePath } from '../App'
import { ComputerScienceSectionFrame } from '../components/ComputerScienceSectionFrame'
import { computerScienceHistory } from '../data/computerScienceArchive'

type Props = {
  onNavigate: (route: RoutePath) => void
}

export function ComputerScienceHistoryPage({ onNavigate }: Props) {
  return (
    <ComputerScienceSectionFrame
      title="History"
      description="History explains how computer science developed through time. Unlike the Library, which preserves works and artifacts, this section builds chronological narratives and connects technical change to institutions, industries, and research communities."
      onNavigate={onNavigate}
    >
      <section className="cs-history-timeline">
        {computerScienceHistory.map((era) => (
          <article className="cs-history-era" key={era.period}>
            <p className="cs-history-period">{era.period}</p>
            <div>
              <h2>{era.title}</h2>
              <p>{era.description}</p>
              <ul>
                {era.milestones.map((milestone) => (
                  <li key={milestone}>{milestone}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </section>
    </ComputerScienceSectionFrame>
  )
}
