import type { CSSProperties } from 'react'
import { Tag } from './Tag'
import { Notification } from './Notification'

export type TabItemState = 'default' | 'hover' | 'selected'
export type TabItemType = 'default' | 'badge' | 'status'

export interface TabItemProps {
  label?: string
  state?: TabItemState
  type?: TabItemType
  badgeCount?: number
  statusLabel?: string
  onClick?: () => void
  className?: string
}

export interface TabBarTab {
  label: string
  type?: TabItemType
  badgeCount?: number
  statusLabel?: string
}

export interface TabBarProps {
  tabs?: TabBarTab[]
  selectedIndex?: number
  mobile?: boolean
  onTabChange?: (index: number) => void
}

export function TabItem({
  label = 'Tab Item',
  state = 'default',
  type = 'default',
  badgeCount,
  statusLabel = 'Success',
  onClick,
  className,
}: TabItemProps) {
  const borderCls = state === 'selected'
    ? 'border-b-2 border-(--border-action)'
    : state === 'hover'
      ? 'border-b-2 border-(--border-action_hover)'
      : ''

  const labelStyle: CSSProperties = {
    fontFamily: 'var(--font-secondary)',
    fontWeight: state === 'selected' ? 700 : 400,
    fontSize: 16,
    lineHeight: '24px',
    color: state === 'default' ? 'var(--text-secondary)' : 'var(--text-primary)',
    whiteSpace: 'nowrap',
  }

  return (
    <div
      onClick={onClick}
      className={`flex items-center justify-center px-(--padding-M) py-0 relative cursor-pointer ${borderCls} ${className ?? ''}`}
    >
      <div className={`flex items-center py-(--padding-S) ${type !== 'default' ? 'gap-(--gap-S)' : ''}`}>
        <span style={labelStyle}>{label}</span>
        {type === 'badge' && <Notification size="M" count={badgeCount ?? 3} />}
        {type === 'status' && (
          <Tag color="Success" highContrast={false} small label={statusLabel} headIcon={false} tailIcon={false} />
        )}
      </div>
    </div>
  )
}

const DEFAULT_TABS: TabBarTab[] = [
  { label: 'Tab Item' },
  { label: 'Tab Item' },
  { label: 'Tab Item' },
]

export function TabBar({
  tabs = DEFAULT_TABS,
  selectedIndex = 0,
  mobile = false,
  onTabChange,
}: TabBarProps) {
  return (
    <div className={`border-b-2 border-(--border-default) flex ${mobile ? 'w-full' : 'pl-(--padding-M) pr-(--padding-XXL) w-full'}`}>
      {tabs.map((tab, i) => (
        <TabItem
          key={i}
          label={tab.label}
          type={tab.type}
          badgeCount={tab.badgeCount}
          statusLabel={tab.statusLabel}
          state={i === selectedIndex ? 'selected' : 'default'}
          onClick={() => onTabChange?.(i)}
          className={mobile ? 'flex-1 min-w-0' : 'shrink-0'}
        />
      ))}
    </div>
  )
}
