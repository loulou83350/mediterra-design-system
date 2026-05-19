import { useState } from 'react'
import { TabItem, TabBar } from '../components/ui/TabBar'
import { ComponentPage, Control, ControlToggle } from './ComponentLayout'

export function TabBarPage() {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [mobile, setMobile] = useState(false)
  const [tabCount, setTabCount] = useState(3)

  const inputCls = 'h-8 px-(--padding-M) rounded-(--radius-S) border border-(--border-default) text-sm text-(--fg-primary) bg-(--bg-primary) outline-none focus:border-(--border-brand) w-full'

  const tabs = Array.from({ length: tabCount }, (_, i) => ({ label: `Tab ${i + 1}` }))

  return (
    <ComponentPage
      title="Tab Bar"
      description="Tabs are a navigation component used to switch between different views or sections within the same context. Tabs are commonly used to organize content that belongs to a single category but is too extensive to display at once."
      controls={
        <>
          <Control label="Mobile"><ControlToggle value={mobile} onChange={setMobile} /></Control>
          <Control label="Tab count">
            <select value={tabCount} onChange={e => setTabCount(Number(e.target.value))} className={inputCls}>
              {[3, 4, 5, 6].map(n => <option key={n} value={n}>{n} tabs</option>)}
            </select>
          </Control>
          <Control label="Selected tab">
            <select value={selectedIndex} onChange={e => setSelectedIndex(Number(e.target.value))} className={inputCls}>
              {tabs.map((t, i) => <option key={i} value={i}>{t.label}</option>)}
            </select>
          </Control>
        </>
      }
      preview={
        <div className={mobile ? 'w-[375px]' : 'w-full'}>
          <TabBar tabs={tabs} selectedIndex={selectedIndex} mobile={mobile} onTabChange={setSelectedIndex} />
        </div>
      }
      states={[
        {
          label: 'TabItem — 3 états',
          node: (
            <div className="flex gap-(--gap-XXL) border-b-2 border-(--border-default)">
              <TabItem label="Default" state="default" />
              <TabItem label="Hover" state="hover" />
              <TabItem label="Selected" state="selected" />
            </div>
          ),
        },
        {
          label: 'TabItem — avec badge & status',
          node: (
            <div className="flex gap-(--gap-XXL) border-b-2 border-(--border-default)">
              <TabItem label="Tab Item" state="selected" type="badge" badgeCount={3} />
              <TabItem label="Tab Item" state="default" type="badge" badgeCount={3} />
              <TabItem label="Tab Item" state="selected" type="status" statusLabel="Success" />
              <TabItem label="Tab Item" state="default" type="status" statusLabel="Success" />
            </div>
          ),
        },
        {
          label: 'TabBar desktop — 3 tabs',
          node: (
            <div className="w-full">
              <TabBar tabs={[{ label: 'Overview' }, { label: 'Analytics' }, { label: 'Reports' }]} selectedIndex={0} />
            </div>
          ),
        },
        {
          label: 'TabBar mobile — 4 tabs',
          node: (
            <div className="w-[375px]">
              <TabBar tabs={[{ label: 'Tab' }, { label: 'Tab' }, { label: 'Tab' }, { label: 'Tab' }]} selectedIndex={1} mobile />
            </div>
          ),
        },
      ]}
    />
  )
}
