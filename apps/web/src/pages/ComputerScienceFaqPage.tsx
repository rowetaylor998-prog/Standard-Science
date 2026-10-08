import type { RoutePath } from '../App'
import { ComputerScienceSectionFrame } from '../components/ComputerScienceSectionFrame'

type Props = { onNavigate: (route: RoutePath) => void }

const questions = [
  ['What is the Computer Science Internet Archive?', 'A public index for subjects, works, people, history, and practical projects in computer science.'],
  ['Is the Library only for books?', 'No. It can index books, papers, standards, manuals, source code, technical reports, datasets, and other useful technical artifacts.'],
  ['Why do some works open as PDFs while others have HTML pages?', 'Long works can begin as stable links to lawful copies or official sources. Shorter papers can also receive HTML reading pages when that improves navigation and study.'],
  ['Can I annotate material?', 'Manual annotations remain available on supported HTML and Markdown reading pages. Embedded AI tutoring has been removed from Standard Science; use ChatGPT separately when you want AI assistance.']
]

export function ComputerScienceFaqPage({ onNavigate }: Props) {
  return (
    <ComputerScienceSectionFrame
      title="FAQ"
      eyebrow="Computer Science Internet Archive"
      description="Frequently asked questions about the archive."
      onNavigate={onNavigate}
    >
      <section className="cs-faq-list">
        {questions.map(([question, answer]) => (
          <article className="cs-faq-entry" key={question}>
            <h2>{question}</h2>
            <p>{answer}</p>
          </article>
        ))}
      </section>
    </ComputerScienceSectionFrame>
  )
}
