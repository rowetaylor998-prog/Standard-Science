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
  const isArchiveHome = currentRoute === '/' || currentRoute === '/computer-science'

  return (
    <div className={isArchiveHome ? 'app-shell archive-home-shell' : 'app-shell'}>
      {!isArchiveHome && <Navigation currentRoute={currentRoute} onNavigate={onNavigate} />}
      {!isArchiveHome && <ExternalResources />}
      <main>{children}</main>
      {!isArchiveHome && <AITutorWidget />}
    </div>
  )
}
