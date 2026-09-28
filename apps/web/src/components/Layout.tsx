import type { ReactNode } from 'react'
import type { RoutePath } from '../App'
import { AITutorWidget } from './AITutorWidget'
import { Navigation } from './Navigation'
import { ExternalResources } from './ExternalResources'

type LayoutProps = {
  children: ReactNode
  currentRoute: RoutePath
  onNavigate: (route: RoutePath) => void
}

export function Layout({ children, currentRoute, onNavigate }: LayoutProps) {
  const isStandardScienceHome = currentRoute === '/'
  const isLegacyStandardScienceHome = currentRoute === '/legacy-home'
  const isComputerScienceRoute = currentRoute.startsWith('/computer-science')
  const isComputerScienceHome = currentRoute === '/computer-science'
  const isArchivePortal = isStandardScienceHome || isLegacyStandardScienceHome || isComputerScienceRoute

  const shellClassName = isComputerScienceHome
    ? 'app-shell cs-archive-shell'
    : isComputerScienceRoute
      ? 'app-shell cs-section-shell'
      : isStandardScienceHome
        ? 'app-shell science-home-shell'
        : isLegacyStandardScienceHome
          ? 'app-shell archive-home-shell'
          : 'app-shell'

  return (
    <div className={shellClassName}>
      {!isArchivePortal && <Navigation currentRoute={currentRoute} onNavigate={onNavigate} />}
      {!isArchivePortal && <ExternalResources />}
      <main>{children}</main>
      {!isArchivePortal && <AITutorWidget />}
    </div>
  )
}
