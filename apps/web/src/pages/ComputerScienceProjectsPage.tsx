import type { RoutePath } from '../App'
import { ComputerScienceSectionFrame } from '../components/ComputerScienceSectionFrame'
import { practiceProjects } from '../data/computerScienceArchive'

type Props = {
  onNavigate: (route: RoutePath) => void
}

const levels = ['Foundation', 'Applied', 'Capstone'] as const

export function ComputerScienceProjectsPage({ onNavigate }: Props) {
  return (
    <ComputerScienceSectionFrame
      title="Practice & Projects"
      description="Practice should connect theory to modern technology. The goal is not to repeat toy exercises forever, but to build measurable systems, simulations, experiments, and engineering artifacts that make computer science useful in the real world."
      onNavigate={onNavigate}
    >
      <section className="cs-project-principles">
        <h2>Project Rule</h2>
        <p>
          Every project should connect to explicit subjects, produce a concrete artifact, and include a
          way to test whether it actually works. Simulations are preferred when physical systems would be
          expensive, unsafe, inaccessible, or unnecessary for learning.
        </p>
      </section>

      {levels.map((level) => (
        <section className="cs-project-level" key={level}>
          <h2>{level}</h2>
          <div className="cs-project-grid">
            {practiceProjects
              .filter((project) => project.level === level)
              .map((project) => (
                <article className="cs-project-card" key={project.title}>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <p>
                    <strong>Subjects:</strong> {project.subjects.join(' · ')}
                  </p>
                  <p>
                    <strong>Deliverable:</strong> {project.outcome}
                  </p>
                </article>
              ))}
          </div>
        </section>
      ))}
    </ComputerScienceSectionFrame>
  )
}
