import { useState } from 'react'
import { BottomNavItem, BottomBar } from '../components/ui/BottomBar'
import type { BottomBarItem } from '../components/ui/BottomBar'
import { ComponentPage, Control, ControlToggle } from './ComponentLayout'

export function BottomBarPage() {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [showBadge, setShowBadge] = useState(false)
  const [badgeIndex, setBadgeIndex] = useState(2)

  const inputCls = 'h-8 px-(--padding-M) rounded-(--radius-S) border border-(--border-default) text-sm text-(--fg-primary) bg-(--bg-primary) outline-none focus:border-(--border-brand) w-full'

  const ITEMS: BottomBarItem[] = [
    { icon: 'IconHome', label: 'Home', selected: selectedIndex === 0, badge: showBadge && badgeIndex === 0 ? 3 : undefined, onClick: () => setSelectedIndex(0) },
    { icon: 'IconSearch', label: 'Search', selected: selectedIndex === 1, badge: showBadge && badgeIndex === 1 ? 3 : undefined, onClick: () => setSelectedIndex(1) },
    { icon: 'IconHeart', label: 'Saved', selected: selectedIndex === 2, badge: showBadge && badgeIndex === 2 ? 3 : undefined, onClick: () => setSelectedIndex(2) },
    { icon: 'IconBell', label: 'Alerts', selected: selectedIndex === 3, badge: showBadge && badgeIndex === 3 ? 12 : undefined, onClick: () => setSelectedIndex(3) },
    { icon: 'IconUser', label: 'Profile', selected: selectedIndex === 4, onClick: () => setSelectedIndex(4) },
  ]

  return (
    <ComponentPage
      title="Bottom Bar"
      description="Bottom Bar Navigation is a common navigation pattern used in mobile applications. It is a horizontal bar located at the bottom of the screen, providing access to the main sections of the app."
      controls={
        <>
          <Control label="Selected item">
            <select value={selectedIndex} onChange={e => setSelectedIndex(Number(e.target.value))} className={inputCls}>
              {['Home', 'Search', 'Saved', 'Alerts', 'Profile'].map((l, i) => <option key={i} value={i}>{l}</option>)}
            </select>
          </Control>
          <Control label="Show badge"><ControlToggle value={showBadge} onChange={setShowBadge} /></Control>
          {showBadge && (
            <Control label="Badge on item">
              <select value={badgeIndex} onChange={e => setBadgeIndex(Number(e.target.value))} className={inputCls}>
                {['Home', 'Search', 'Saved', 'Alerts'].map((l, i) => <option key={i} value={i}>{l}</option>)}
              </select>
            </Control>
          )}
        </>
      }
      preview={<div className="w-[375px]"><BottomBar items={ITEMS} /></div>}
      states={[
        {
          label: 'BottomNavItem — états',
          node: (
            <div className="flex gap-(--gap-L) items-start">
              <BottomNavItem icon="IconHome" label="Home" selected={false} />
              <BottomNavItem icon="IconHome" label="Home" selected={true} />
              <BottomNavItem icon="IconBell" label="Alerts" selected={false} badge={3} />
              <BottomNavItem icon="IconBell" label="Alerts" selected={true} badge={12} />
            </div>
          ),
        },
        {
          label: 'BottomBar — 5 items',
          node: <div className="w-[375px]"><BottomBar /></div>,
        },
      ]}
    />
  )
}
