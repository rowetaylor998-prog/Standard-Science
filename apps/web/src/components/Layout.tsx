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

  const shellClassName = isComputerScienceHome
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
