import { Icon } from './Icon'

export interface BottomNavItemProps {
  icon?: string
  label?: string
  selected?: boolean
  badge?: number
  onClick?: () => void
  className?: string
}

export interface BottomBarItem {
  icon: string
  label: string
  selected?: boolean
  badge?: number
  onClick?: () => void
}

export interface BottomBarProps {
  items?: BottomBarItem[]
}

export function BottomNavItem({
  icon = 'IconHome',
  label = 'Home',
  selected = false,
  badge,
  onClick,
  className,
}: BottomNavItemProps) {
  return (
    <div
      onClick={onClick}
      className={`flex flex-col items-center justify-center px-(--padding-S) py-(--padding-XS) rounded-(--radius-S) relative cursor-pointer transition-colors ${selected ? 'bg-(--bg-brand_primary)' : 'hover:bg-(--bg-secondary)'} ${className ?? ''}`}
    >
      <Icon name={icon as any} size={24} stroke={2} color={selected ? 'white' : 'var(--fg-secondary)'} />
      <span style={{
        fontFamily: 'var(--font-secondary)',
        fontWeight: 400,
        fontSize: 10,
        lineHeight: '12px',
        color: selected ? 'white' : 'var(--text-secondary)',
        whiteSpace: 'nowrap',
      }}>{label}</span>
      {!!badge && badge > 0 && (
        <div
          className="absolute bg-(--fg-error_primary) rounded-(--radius-max) h-4 min-w-4 flex items-center justify-center overflow-hidden"
          style={{
            top: 0,
            left: 'calc(50% + 2px)',
            color: 'var(--text-invert)',
            fontFamily: 'var(--font-secondary)',
            fontSize: 10,
            lineHeight: '12px',
            padding: '0 3px',
          }}
        >
          {badge > 99 ? '99+' : badge}
        </div>
      )}
    </div>
  )
}

const DEFAULT_ITEMS: BottomBarItem[] = [
  { icon: 'IconHome', label: 'Home', selected: true },
  { icon: 'IconSearch', label: 'Search' },
  { icon: 'IconHeart', label: 'Saved' },
  { icon: 'IconBell', label: 'Alerts' },
  { icon: 'IconUser', label: 'Profile' },
]

export function BottomBar({ items = DEFAULT_ITEMS }: BottomBarProps) {
  return (
    <div
      className="flex gap-(--gap-S) items-start px-(--padding-M) py-(--padding-S) border-t border-(--border-default) bg-(--bg-primary) w-full"
      style={{ backdropFilter: 'blur(20px)' }}
    >
      {items.map((item, i) => (
        <BottomNavItem key={i} {...item} className="flex-1" />
      ))}
    </div>
  )
}
