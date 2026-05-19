import { useState } from 'react'
import { HeaderMobile } from '../components/ui/HeaderMobile'
import { Icon } from '../components/ui/Icon'
import { ComponentPage, Control, ControlToggle, IconPicker } from './ComponentLayout'

export function HeaderMobilePage() {
  const [type, setType] = useState<'childpage' | 'main'>('childpage')
  const [showStatusBar, setShowStatusBar] = useState(true)
  const [showBackButton, setShowBackButton] = useState(true)
  const [showCloseButton, setShowCloseButton] = useState(true)
  const [showHeaderIcon, setShowHeaderIcon] = useState(true)
  const [headerIcon, setHeaderIcon] = useState('IconAlertCircle')
  const [showSubtitle, setShowSubtitle] = useState(true)
  const [showTabs, setShowTabs] = useState(true)
  const [selectedTab, setSelectedTab] = useState(0)

  const inputCls = 'h-8 px-(--padding-M) rounded-(--radius-S) border border-(--border-default) text-sm text-(--fg-primary) bg-(--bg-primary) outline-none focus:border-(--border-brand) w-full'

  const DEFAULT_TABS = [{ label: 'Current' }, { label: 'Coming soon' }, { label: 'Done' }]

  const searchSlot = (
    <div className="flex-1 h-8 rounded-(--radius-S) bg-(--bg-secondary) border border-(--border-default) flex items-center px-(--padding-M) gap-(--gap-S)">
      <Icon name="IconSearch" size={16} stroke={2} color="var(--fg-tertiary)" />
      <span style={{ fontSize: 14, color: 'var(--text-placeholder)', fontFamily: 'var(--font-secondary)' }}>Search…</span>
    </div>
  )

  return (
    <ComponentPage
      title="Header Mobile"
      description="Navigation Header is a horizontal bar at the top of a mobile interface, providing essential navigation controls and other contextual actions. It is crucial for applications where the user needs to move between screens or access top-level actions."
      controls={
        <>
          <Control label="Type">
            <select value={type} onChange={e => setType(e.target.value as any)} className={inputCls}>
              <option value="childpage">Childpage</option>
              <option value="main">Main Page</option>
            </select>
          </Control>
          <Control label="Status Bar"><ControlToggle value={showStatusBar} onChange={setShowStatusBar} /></Control>
          {type === 'childpage' && <>
            <Control label="Back Button"><ControlToggle value={showBackButton} onChange={setShowBackButton} /></Control>
            <Control label="Close Button"><ControlToggle value={showCloseButton} onChange={setShowCloseButton} /></Control>
            <Control label="Header Icon"><ControlToggle value={showHeaderIcon} onChange={setShowHeaderIcon} /></Control>
            {showHeaderIcon && <Control label="Icon"><IconPicker value={headerIcon} onChange={setHeaderIcon} /></Control>}
            <Control label="Subtitle"><ControlToggle value={showSubtitle} onChange={setShowSubtitle} /></Control>
          </>}
          <Control label="Tabs"><ControlToggle value={showTabs} onChange={setShowTabs} /></Control>
          {showTabs && (
            <Control label="Selected tab">
              <select value={selectedTab} onChange={e => setSelectedTab(Number(e.target.value))} className={inputCls}>
                {DEFAULT_TABS.map((t, i) => <option key={i} value={i}>{t.label}</option>)}
              </select>
            </Control>
          )}
        </>
      }
      preview={
        <div className="w-[375px]">
          <HeaderMobile
            type={type}
            showStatusBar={showStatusBar}
            showBackButton={showBackButton}
            showCloseButton={showCloseButton}
            showHeaderIcon={showHeaderIcon}
            headerIcon={headerIcon}
            showSubtitle={showSubtitle}
            tabs={DEFAULT_TABS}
            selectedTab={selectedTab}
            showTabs={showTabs}
            searchSlot={type === 'main' ? searchSlot : undefined}
          />
        </div>
      }
      states={[
        {
          label: 'Childpage — full',
          node: <div className="w-[375px]"><HeaderMobile type="childpage" tabs={DEFAULT_TABS} selectedTab={0} /></div>,
        },
        {
          label: 'Childpage — sans icône ni subtitle',
          node: (
            <div className="w-[375px]">
              <HeaderMobile type="childpage" showHeaderIcon={false} showSubtitle={false} tabs={DEFAULT_TABS} selectedTab={1} />
            </div>
          ),
        },
        {
          label: 'Main Page Header',
          node: (
            <div className="w-[375px]">
              <HeaderMobile
                type="main"
                tabs={DEFAULT_TABS}
                selectedTab={0}
                searchSlot={
                  <div className="flex-1 h-8 rounded-(--radius-S) bg-(--bg-secondary) border border-(--border-default) flex items-center px-(--padding-M) gap-(--gap-S)">
                    <Icon name="IconSearch" size={16} stroke={2} color="var(--fg-tertiary)" />
                    <span style={{ fontSize: 14, color: 'var(--text-placeholder)', fontFamily: 'var(--font-secondary)' }}>Search…</span>
                  </div>
                }
              />
            </div>
          ),
        },
        {
          label: 'Sans status bar, sans tabs',
          node: <div className="w-[375px]"><HeaderMobile type="childpage" showStatusBar={false} showTabs={false} /></div>,
        },
      ]}
    />
  )
}
