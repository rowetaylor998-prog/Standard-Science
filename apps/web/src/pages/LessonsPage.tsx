import type { RoutePath } from '../App'

type Props = {
  onNavigate: (route: RoutePath) => void
}

type LessonEntry = {
  title: string
  years?: string
  description: string
  route?: RoutePath
}

const lessons: LessonEntry[] = [
  {
    title: 'Learning Methods',
    description: 'Study systems, review habits, synthesis practices, and methods for building durable understanding.',
    route: '/content/methods-and-lessons/learning-methods'
  },
  {
    title: 'Experience Lessons',
    description: 'Practical lessons from building, learning, organizing, reflecting, and correcting mistakes.',
    route: '/content/methods-and-lessons/experience-lessons'
  },
  {
    title: 'Psychology, Learning, and Collaboration',
    description: 'How people learn together, give feedback, sustain attention, and build shared confidence.',
    route: '/content/methods-and-lessons/psychology-learning-collaboration'
  },
  {
    title: 'Self-control',
    description: 'Practices for directing attention, resisting distraction, and aligning action with long-term goals.'
  },
  {
    title: 'Intelligence and Wisdom',
    description: 'Reasoning, judgment, humility, and applying knowledge in real conditions.'
  },
  {
    title: 'Organization Ability',
    description: 'Coordination, planning, documentation, delegation, and collective execution.'
  },
  {
    title: 'Willpower',
    description: 'Persistence, discipline, recovery, and continuing through difficulty.'
  }
]

export function LessonsPage({ onNavigate }: Props) {
  return (
    <article className="lessons-archive-page">
      <header className="lessons-archive-header">
        <p>Standard Science Internet Archive</p>
        <h1>Lessons</h1>
      </header>

      <nav className="lessons-archive-nav" aria-label="Lessons archive navigation">
        <button type="button" onClick={() => onNavigate('/')}>Standard Science</button>
        <span>·</span>
        <button type="button" onClick={() => onNavigate('/computer-science')}>Computer Science</button>
      </nav>

      <section className="lessons-archive-intro">
        <h2>Lessons Archive</h2>
        <p>
          Practical lessons, methods, and reflections are kept here as a simple archive rather than a dashboard.
        </p>
      </section>

      <div className="lessons-archive-columns">
        {lessons.map((lesson) => (
          <section className="lessons-archive-entry" key={lesson.title}>
            {lesson.route ? (
              <button type="button" onClick={() => onNavigate(lesson.route!)}>
                {lesson.title}
              </button>
            ) : (
              <strong>{lesson.title}</strong>
            )}
            <p>{lesson.description}</p>
          </section>
        ))}
      </div>
    </article>
  )
}
