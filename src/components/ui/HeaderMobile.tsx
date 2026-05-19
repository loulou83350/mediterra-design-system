import type { ReactNode, CSSProperties } from 'react'
import { Icon } from './Icon'

export interface HeaderMobileTab { label: string }

export interface HeaderMobileProps {
  type?: 'childpage' | 'main'
  showStatusBar?: boolean
  showBackButton?: boolean
  onBackClick?: () => void
  showCloseButton?: boolean
  onCloseClick?: () => void
  showHeaderIcon?: boolean
  headerIcon?: string
  title?: string
  showSubtitle?: boolean
  subtitle?: string
  searchSlot?: ReactNode
  tabs?: HeaderMobileTab[]
  selectedTab?: number
  showTabs?: boolean
}

export function HeaderMobile({
  type = 'childpage',
  showStatusBar = true,
  showBackButton = true,
  onBackClick,
  showCloseButton = true,
  onCloseClick,
  showHeaderIcon = true,
  headerIcon = 'IconAlertCircle',
  title = 'Label',
  showSubtitle = true,
  subtitle = 'Sub content',
  searchSlot,
  tabs = [{ label: 'Current' }, { label: 'Coming soon' }, { label: 'Done' }],
  selectedTab = 0,
  showTabs = true,
}: HeaderMobileProps) {
  const statusBar = (
    <div style={{ height: 47 }} className="relative flex items-center w-full overflow-hidden px-(--padding-L)">
      <span style={{ fontFamily: 'var(--font-secondary)', fontWeight: 600, fontSize: 15, color: 'var(--text-primary)' }}>9:41</span>
      <div className="flex items-center gap-[5px] ml-auto">
        <Icon name="IconSignal" size={16} stroke={2} color="var(--fg-primary)" />
        <Icon name="IconWifi" size={16} stroke={2} color="var(--fg-primary)" />
        <Icon name="IconBattery1" size={20} stroke={2} color="var(--fg-primary)" />
      </div>
    </div>
  )

  const childpageHeader = (
    <div className="flex items-center gap-(--gap-M) p-(--padding-L)">
      {showBackButton && (
        <button type="button" onClick={onBackClick} className="p-(--padding-S) rounded-(--radius-S) hover:bg-(--bg-secondary) cursor-pointer transition-colors shrink-0">
          <Icon name="IconArrowLeft" size={24} stroke={2} color="var(--fg-secondary)" />
        </button>
      )}
      <div className="flex items-center gap-(--gap-S) flex-1 min-w-0">
        {showHeaderIcon && (
          <div className="bg-(--bg-brand_tertiary) p-(--padding-S) rounded-(--radius-XS) shrink-0">
            <Icon name={headerIcon as any} size={24} stroke={2} color="var(--fg-brand_primary)" />
          </div>
        )}
        <div className="flex flex-col flex-1 min-w-0">
          <span style={{ fontFamily: 'var(--font-primary)', fontWeight: 800, fontSize: 18, lineHeight: '24px', color: 'var(--text-primary)' }}>{title}</span>
          {showSubtitle && (
            <span style={{ fontFamily: 'var(--font-secondary)', fontWeight: 700, fontSize: 14, lineHeight: '20px', color: 'var(--text-tertiary)' }}>{subtitle}</span>
          )}
        </div>
      </div>
      {showCloseButton && (
        <button type="button" onClick={onCloseClick} className="p-(--padding-S) rounded-(--radius-S) hover:bg-(--bg-secondary) cursor-pointer transition-colors shrink-0">
          <Icon name="IconX" size={24} stroke={2} color="var(--fg-secondary)" />
        </button>
      )}
    </div>
  )

  const mainContentRow = type === 'main' && searchSlot ? (
    <div className="flex items-center gap-(--gap-L) px-(--padding-L) py-(--padding-M)">
      {searchSlot}
    </div>
  ) : null

  const tabsBlock = showTabs && tabs && tabs.length > 0 ? (
    <div className="flex border-b-2 border-(--border-default) w-full">
      {tabs.map((tab, i) => (
        <div
          key={i}
          className={`flex-1 flex items-center justify-center px-(--padding-M) ${i === (selectedTab ?? 0) ? 'border-b-2 border-(--border-action)' : ''}`}
        >
          <div className="flex items-center py-(--padding-S)">
            <span style={{
              fontFamily: 'var(--font-secondary)',
              fontWeight: i === (selectedTab ?? 0) ? 700 : 400,
              fontSize: 16,
              lineHeight: '24px',
              color: i === (selectedTab ?? 0) ? 'var(--text-primary)' : 'var(--text-secondary)',
            }}>{tab.label}</span>
          </div>
        </div>
      ))}
    </div>
  ) : null

  return (
    <div className="bg-(--bg-primary) border-b border-(--border-default) w-full flex flex-col overflow-hidden">
      {showStatusBar && statusBar}
      {type === 'childpage' && childpageHeader}
      {mainContentRow}
      {tabsBlock}
    </div>
  )
}
