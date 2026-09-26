import type { RoutePath } from '../App'
import { ComputerScienceSectionFrame } from '../components/ComputerScienceSectionFrame'
import { computerScientists } from '../data/computerScienceArchive'

type Props = {
  onNavigate: (route: RoutePath) => void
}

export function ComputerScientistsPage({ onNavigate }: Props) {
  return (
    <ComputerScienceSectionFrame
      title="Computer Scientists"
      description="A biographical index of people who shaped computation, systems, software, networks, artificial intelligence, and the modern computing world. This section stores people; the Library stores their works."
      onNavigate={onNavigate}
    >
      <section className="cs-index-section">
        <h2>Selected Computer Scientists</h2>
        <div className="cs-scientist-index">
          {computerScientists.map((scientist) => (
            <article className="cs-scientist-index-entry" key={scientist.name}>
              <h3>
                {scientist.name} {scientist.years ? <span>({scientist.years})</span> : null}
              </h3>
              <p>{scientist.note}</p>
              <p className="cs-scientist-fields">{scientist.fields.join(' · ')}</p>
            </article>
          ))}
        </div>
      </section>
    </ComputerScienceSectionFrame>
  )
}
