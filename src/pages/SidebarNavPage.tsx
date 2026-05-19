import { useState } from 'react'
import { SidebarMenuItem, SidebarNavigation } from '../components/ui/SidebarNavigation'
import { ComponentPage, Control, ControlToggle } from './ComponentLayout'

export function SidebarNavPage() {
  const [expand, setExpand] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [showBadge, setShowBadge] = useState(false)
  const [showNotification, setShowNotification] = useState(false)

  const NAV_ITEMS = [
    { icon: 'IconHome', label: 'Home', selected: selectedIndex === 0, onClick: () => setSelectedIndex(0) },
    { icon: 'IconLayoutDashboard', label: 'Dashboard', selected: selectedIndex === 1, onClick: () => setSelectedIndex(1) },
    { icon: 'IconChartBar', label: 'Analytics', selected: selectedIndex === 2, onClick: () => setSelectedIndex(2) },
    { icon: 'IconUsers', label: 'Customers', selected: selectedIndex === 3, onClick: () => setSelectedIndex(3) },
    { icon: 'IconFileText', label: 'Documents', selected: selectedIndex === 4, onClick: () => setSelectedIndex(4) },
  ]

  const BOTTOM_ITEMS = [
    { icon: 'IconSettings', label: 'Settings' },
    { icon: 'IconHelp', label: 'Help' },
  ]

  return (
    <ComponentPage
      title="Sidebar Navigation"
      description="Sidebar Navigation is a vertical navigation menu typically anchored to the left or right side of a desktop interface. It is used for providing quick access to different sections of an application or website. This type of navigation is ideal for applications with multiple levels of hierarchy or a large number of sections."
      controls={
        <>
          <Control label="Expanded"><ControlToggle value={expand} onChange={setExpand} /></Control>
          <Control label="Badge on 1st item"><ControlToggle value={showBadge} onChange={setShowBadge} /></Control>
          <Control label="Notification bell"><ControlToggle value={showNotification} onChange={setShowNotification} /></Control>
        </>
      }
      preview={
        <div style={{ height: 480 }}>
          <SidebarNavigation
            expand={expand}
            navItems={NAV_ITEMS.map((item, i) => ({ ...item, badge: showBadge && i === 0 ? 3 : undefined }))}
            bottomItems={BOTTOM_ITEMS}
            userName="Jeanne Doe"
            userRole="Product Designer"
            notificationCount={showNotification ? 3 : undefined}
          />
        </div>
      }
      states={[
        {
          label: 'SidebarMenuItem — états compact',
          node: (
            <div className="flex gap-(--gap-L) items-start">
              <SidebarMenuItem icon="IconHome" label="Home" state="default" compact />
              <SidebarMenuItem icon="IconHome" label="Home" state="selected" compact />
              <SidebarMenuItem icon="IconHome" label="Home" state="hover" compact />
              <SidebarMenuItem icon="IconBell" label="Alerts" state="default" compact badge={3} />
            </div>
          ),
        },
        {
          label: 'SidebarMenuItem — états expanded',
          node: (
            <div className="flex flex-col gap-(--gap-S) w-52">
              <SidebarMenuItem icon="IconHome" label="Home" state="default" compact={false} />
              <SidebarMenuItem icon="IconHome" label="Home" state="selected" compact={false} />
              <SidebarMenuItem icon="IconHome" label="Home" state="hover" compact={false} />
            </div>
          ),
        },
        {
          label: 'SidebarNavigation — compact',
          node: <div style={{ height: 400 }}><SidebarNavigation expand={false} /></div>,
        },
        {
          label: 'SidebarNavigation — expanded',
          node: (
            <div style={{ height: 400 }}>
              <SidebarNavigation expand={true} userName="Jeanne Doe" userRole="Product Designer" notificationCount={3} />
            </div>
          ),
        },
      ]}
    />
  )
}
