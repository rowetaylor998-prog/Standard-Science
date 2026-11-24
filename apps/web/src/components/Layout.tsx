import type { ReactNode } from 'react'
import type { RoutePath } from '../App'

type LayoutProps = {
  children: ReactNode
  currentRoute: RoutePath
}

export function Layout({ children, currentRoute }: LayoutProps) {
  const isHome = currentRoute === '/'
  const isComputerScienceRoute = currentRoute.startsWith('/computer-science')
  const isComputerScienceHome = currentRoute === '/computer-science'
  const isLessonsHome = currentRoute === '/lessons'

  // Standalone document readers use the approved paper surface; archive indexes do not.
  const isReadingRoute =
    currentRoute === '/computer-science/library/attention-is-all-you-need' ||
    currentRoute === '/computer-science/library/imagenet-classification' ||
    currentRoute === '/computer-science/library/quantum-algorithms' ||
    currentRoute === '/manifesto' ||
    (currentRoute.startsWith('/content/') &&
      currentRoute !== '/content/knowledge/computer-science/algorithms' &&
      !/\/(index|README)(\.md)?$/i.test(currentRoute))

  const shellClassName = isReadingRoute
    ? 'app-shell document-reading-shell'
    : isComputerScienceHome
    ? 'app-shell cs-archive-shell'
    : isComputerScienceRoute
      ? 'app-shell cs-section-shell'
      : isHome
        ? 'app-shell archive-home-shell'
        : isLessonsHome
          ? 'app-shell lessons-archive-shell'
          : 'app-shell'

  return (
    <div className={shellClassName}>
      <main>{children}</main>
    </div>
  )
}
