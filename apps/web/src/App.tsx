import { useEffect, useMemo, useState } from 'react'
import { Layout } from './components/Layout'
import { HomePage } from './pages/HomePage'
import { LessonsPage } from './pages/LessonsPage'
import { ComputerScienceArchivePage } from './pages/ComputerScienceArchivePage'
import { ComputerScienceSubjectsPage } from './pages/ComputerScienceSubjectsPage'
import { ComputerScienceLibraryPage } from './pages/ComputerScienceLibraryPage'
import { ComputerScientistsPage } from './pages/ComputerScientistsPage'
import { ComputerScienceHistoryPage } from './pages/ComputerScienceHistoryPage'
import { ComputerScienceProjectsPage } from './pages/ComputerScienceProjectsPage'
import { ComputerScienceSearchPage } from './pages/ComputerScienceSearchPage'
import { MarkdownContentPage } from './pages/MarkdownContentPage'

const routes = {
  '/': HomePage,
  '/lessons': LessonsPage,
  '/computer-science': ComputerScienceArchivePage,
  '/computer-science/subjects': ComputerScienceSubjectsPage,
  '/computer-science/subjects/algorithms': () => (
    <MarkdownContentPage
      contentPath="/content/knowledge/computer-science/algorithms"
      title="Algorithms & Data Structures"
    />
  ),
  '/computer-science/library': ComputerScienceLibraryPage,
  '/computer-science/scientists': ComputerScientistsPage,
  '/computer-science/history': ComputerScienceHistoryPage,
  '/computer-science/practice-projects': ComputerScienceProjectsPage,
  '/computer-science/search': ComputerScienceSearchPage,
  '/manifesto': () => (
    <MarkdownContentPage contentPath="/content/manifesto/homepage-manifesto" title="Manifesto" />
  ),
  '/content/methods-and-lessons/learning-methods': () => (
    <MarkdownContentPage contentPath="/content/methods-and-lessons/learning-methods" title="Lessons" />
  ),
  '/content/methods-and-lessons/experience-lessons': () => (
    <MarkdownContentPage contentPath="/content/methods-and-lessons/experience-lessons" title="Lessons" />
  ),
  '/content/methods-and-lessons/psychology-learning-collaboration': () => (
    <MarkdownContentPage
      contentPath="/content/methods-and-lessons/psychology-learning-collaboration"
      title="Lessons"
    />
  ),
  '/content/knowledge/computer-science/introduction': () => (
    <MarkdownContentPage contentPath="/content/knowledge/computer-science/introduction" title="Computer Science" />
  ),
  '/content/knowledge/computer-science/algorithms': () => (
    <MarkdownContentPage contentPath="/content/knowledge/computer-science/algorithms" title="Computer Science" />
  )
}

export type StaticRoutePath = keyof typeof routes
export type ContentRoutePath = `/content/${string}`
export type RoutePath = StaticRoutePath | ContentRoutePath

function getRoute(pathname: string): RoutePath {
  if (pathname in routes) {
    return pathname as StaticRoutePath
  }

  if (pathname.startsWith('/content/')) {
    return pathname as ContentRoutePath
  }

  return '/'
}

export function App() {
  const [route, setRoute] = useState<RoutePath>(() => getRoute(window.location.pathname))

  useEffect(() => {
    const handlePopState = () => setRoute(getRoute(window.location.pathname))
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const Page = useMemo(() => {
    if (route.startsWith('/content/') && !(route in routes)) {
      return () => <MarkdownContentPage contentPath={route} title="Archive" />
    }

    return routes[route as StaticRoutePath]
  }, [route])

  function navigate(nextRoute: RoutePath) {
    window.history.pushState({}, '', nextRoute)
    setRoute(nextRoute)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <Layout currentRoute={route}>
      <Page onNavigate={navigate} />
    </Layout>
  )
}
