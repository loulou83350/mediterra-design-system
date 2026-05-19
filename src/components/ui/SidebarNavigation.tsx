import type { ReactNode, CSSProperties } from 'react'
import { Icon } from './Icon'
import { AvatarLabel } from './Avatar'

export type SidebarMenuItemState = 'default' | 'selected' | 'hover'

export interface SidebarMenuItemProps {
  icon?: string
  label?: string
  state?: SidebarMenuItemState
  compact?: boolean
  badge?: number
  onClick?: () => void
}

export interface SidebarNavItem {
  icon: string
  label: string
  selected?: boolean
  badge?: number
  onClick?: () => void
}

export interface SidebarNavigationProps {
  expand?: boolean
  logo?: ReactNode
  navItems?: SidebarNavItem[]
  bottomItems?: SidebarNavItem[]
  userName?: string
  userRole?: string
  userAvatar?: string
  notificationCount?: number
  onNotificationClick?: () => void
}

const stateClasses: Record<SidebarMenuItemState, string> = {
  default: 'hover:bg-(--bg-secondary)',
  selected: 'bg-(--bg-brand_tertiary) border border-(--border-action)',
  hover: 'border border-(--border-action_hover)',
}

const iconColors: Record<SidebarMenuItemState, string> = {
  default: 'var(--fg-secondary)',
  selected: 'var(--fg-brand_primary)',
  hover: 'var(--fg-secondary)',
}

const labelColors: Record<SidebarMenuItemState, { color: string; fontWeight: number }> = {
  default: { color: 'var(--text-secondary)', fontWeight: 400 },
  selected: { color: 'var(--text-brand)', fontWeight: 700 },
  hover: { color: 'var(--text-primary)', fontWeight: 400 },
}

export function SidebarMenuItem({
  icon = 'IconHome',
  label = 'Home',
  state = 'default',
  compact = true,
  badge,
  onClick,
}: SidebarMenuItemProps) {
  const lStyle = labelColors[state]
  return (
    <div
      onClick={onClick}
      className={`flex ${compact ? 'flex-col items-center gap-(--gap-XS)' : 'items-center gap-(--gap-S)'} p-(--padding-S) rounded-(--radius-S) relative cursor-pointer w-full transition-colors ${stateClasses[state]}`}
    >
      <Icon name={icon as any} size={24} stroke={2} color={iconColors[state]} />
      {!compact && (
        <span style={{ fontFamily: 'var(--font-secondary)', ...lStyle, fontSize: 16, lineHeight: '24px', whiteSpace: 'nowrap' }}>
          {label}
        </span>
      )}
      {!!badge && badge > 0 && (
        <div
          className="absolute bg-(--fg-error_primary) rounded-(--radius-max) h-4 min-w-4 flex items-center justify-center overflow-hidden"
          style={{
            top: 2,
            left: compact ? 'calc(50% + 6px)' : 22,
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

const DefaultLogo = () => (
  <div
    className="w-9 h-9 bg-(--bg-brand_primary) rounded-(--radius-S) flex items-center justify-center shrink-0"
    style={{ color: 'white', fontFamily: 'var(--font-primary)', fontWeight: 800, fontSize: 18 }}
  >
    B
  </div>
)

const DEFAULT_NAV: SidebarNavItem[] = [
  { icon: 'IconHome', label: 'Home', selected: true },
  { icon: 'IconLayoutDashboard', label: 'Dashboard' },
  { icon: 'IconChartBar', label: 'Analytics' },
  { icon: 'IconUsers', label: 'Customers' },
  { icon: 'IconFileText', label: 'Documents' },
  { icon: 'IconSettings', label: 'Settings' },
  { icon: 'IconFolder', label: 'Projects' },
]

const DEFAULT_BOTTOM: SidebarNavItem[] = [
  { icon: 'IconSettings', label: 'Settings' },
  { icon: 'IconHelp', label: 'Help' },
  { icon: 'IconLogout', label: 'Log out' },
]

export function SidebarNavigation({
  expand = false,
  logo,
  navItems = DEFAULT_NAV,
  bottomItems = DEFAULT_BOTTOM,
  userName = 'Jeanne Doe',
  userRole = 'Product Designer',
  userAvatar,
  notificationCount,
  onNotificationClick,
}: SidebarNavigationProps) {
  return (
    <div
      className={`bg-(--bg-primary) border-r border-(--border-default) flex flex-col justify-between py-(--padding-XXL) px-(--padding-M) overflow-hidden transition-all ${expand ? 'items-start w-52' : 'items-center w-16'}`}
      style={{ backdropFilter: 'blur(20px)', minHeight: 400 }}
    >
      {/* Top section */}
      <div className={`flex flex-col gap-(--gap-L) w-full ${expand ? 'items-start' : 'items-center'}`}>
        {/* Logo row */}
        {expand ? (
          <div className="flex items-center justify-between w-full">
            {logo ?? <DefaultLogo />}
            {notificationCount !== undefined && (
              <div className="relative">
                <button
                  type="button"
                  onClick={onNotificationClick}
                  className="p-(--padding-S) rounded-(--radius-S) hover:bg-(--bg-secondary) cursor-pointer transition-colors"
                >
                  <Icon name="IconBell" size={24} stroke={2} color="var(--fg-secondary)" />
                </button>
                {notificationCount > 0 && (
                  <div
                    className="absolute bg-(--fg-error_primary) rounded-(--radius-max) h-4 min-w-4 flex items-center justify-center"
                    style={{
                      top: 2,
                      left: 20,
                      color: 'var(--text-invert)',
                      fontFamily: 'var(--font-secondary)',
                      fontSize: 10,
                      padding: '0 3px',
                    }}
                  >
                    {notificationCount > 99 ? '99+' : notificationCount}
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          logo ?? <DefaultLogo />
        )}

        {/* Nav items */}
        <div className={`flex flex-col gap-(--gap-M) w-full ${expand ? 'items-start' : 'items-center'}`}>
          {navItems.map((item, i) => (
            <SidebarMenuItem
              key={i}
              icon={item.icon}
              label={item.label}
              state={item.selected ? 'selected' : 'default'}
              compact={!expand}
              badge={item.badge}
              onClick={item.onClick}
            />
          ))}
        </div>
      </div>

      {/* Bottom section */}
      <div className={`flex flex-col gap-(--gap-M) w-full ${expand ? 'items-start' : 'items-center'}`}>
        {bottomItems.map((item, i) => (
          <SidebarMenuItem
            key={i}
            icon={item.icon}
            label={item.label}
            state={item.selected ? 'selected' : 'default'}
            compact={!expand}
            badge={item.badge}
            onClick={item.onClick}
          />
        ))}
        {/* User */}
        {expand ? (
          <AvatarLabel
            type={userAvatar ? 'Image' : 'Letter'}
            src={userAvatar}
            initials={userName ? userName[0] : 'J'}
            name={userName ?? ''}
            title={userRole}
            size="S"
          />
        ) : (
          <div className="w-10 h-10 rounded-(--radius-max) bg-(--bg-brand_secondary) flex items-center justify-center overflow-hidden cursor-pointer">
            {userAvatar
              ? <img src={userAvatar} alt={userName} className="w-full h-full object-cover" />
              : <span style={{ fontFamily: 'var(--font-secondary)', fontWeight: 700, fontSize: 14, color: 'var(--text-secondary)' }}>{userName?.[0] ?? 'J'}</span>
            }
          </div>
        )}
      </div>
    </div>
  )
}
