import type { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { SidebarNavigation } from '../components/ui/SidebarNavigation'
import { Icon } from '../components/ui/Icon'

interface AppLayoutProps {
  children: ReactNode
  activeNav: 'Home' | 'Dashboard' | 'Goals' | 'Support'
}

export function AppLayout({ children, activeNav }: AppLayoutProps) {
  const navigate = useNavigate()

  const navItems = [
    { icon: 'IconHome',     label: 'Home',      selected: activeNav === 'Home',      onClick: () => navigate('/app') },
    { icon: 'IconChartBar', label: 'Dashboard', selected: false, disabled: true },
    { icon: 'IconTarget',   label: 'Goals',     selected: false, disabled: true },
    { icon: 'IconHelp',     label: 'Support',   selected: activeNav === 'Support',   onClick: () => navigate('/app/support') },
  ]

  const bottomItems = [
    { icon: 'IconHelpCircle', label: 'Help', disabled: true },
  ]

  // Custom logo slot with Back to DS link above it
  const logoSlot = (
    <div className="flex flex-col gap-(--gap-XS) w-full">
      <button
        type="button"
        onClick={() => navigate('/design')}
        className="flex items-center gap-(--gap-XS) px-(--padding-M) py-(--padding-XS) rounded-(--radius-S) hover:bg-(--bg-secondary) transition-colors cursor-pointer w-full"
        style={{ fontFamily: 'var(--font-secondary)', fontSize: 12, lineHeight: '16px', color: 'var(--fg-tertiary)' }}
      >
        <Icon name="IconChevronLeft" size={14} stroke={2} color="var(--fg-tertiary)" />
        <span>Design System</span>
      </button>
    </div>
  )

  return (
    <div className="flex min-h-screen bg-(--bg-page)">
      {/* Desktop sidebar */}
      <div className="hidden md:block sticky top-0 h-screen flex-shrink-0">
        <SidebarNavigation
          expand={true}
          logo={logoSlot}
          navItems={navItems}
          bottomItems={bottomItems}
          notificationCount={3}
          userName="Jeanne Doe"
          userRole="Product Designer"
        />
      </div>

      {/* Mobile top bar */}
      <div className="flex md:hidden items-center justify-between px-(--padding-L) py-(--padding-M) bg-(--bg-primary) border-b border-(--border-default) fixed top-0 left-0 right-0 z-40">
        <button
          type="button"
          onClick={() => navigate('/design')}
          className="flex items-center gap-(--gap-XS) cursor-pointer"
          style={{ fontFamily: 'var(--font-secondary)', fontSize: 13, color: 'var(--fg-tertiary)' }}
        >
          <Icon name="IconChevronLeft" size={16} stroke={2} color="var(--fg-tertiary)" />
          <span>Design System</span>
        </button>
        <span style={{ fontFamily: 'var(--font-primary)', fontWeight: 800, fontSize: 14, color: 'var(--fg-primary)' }}>
          Mediterra
        </span>
        <div className="w-16" />
      </div>

      <main className="flex-1 overflow-auto mt-0 md:mt-0 pt-[52px] md:pt-0">
        {children}
      </main>
    </div>
  )
}
