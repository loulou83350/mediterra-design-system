import React from 'react'
import { Icon } from './Icon'
import { Button } from './Button'

export type TipsState = 'Default' | 'Success' | 'Warning' | 'Error'

export interface TipsProps {
  state?: TipsState
  children: React.ReactNode
  vertical?: boolean
  showIcon?: boolean
  action?: { label: string; onClick: () => void }
  className?: string
}

const config: Record<TipsState, {
  bg: string
  border: string
  icon: React.ComponentProps<typeof Icon>['name']
  iconColor: string
}> = {
  Default: { bg: 'bg-(--bg-neutral_tertiary)', border: 'border-(--border-neutral_primary)',  icon: 'IconInfoCircle',    iconColor: 'var(--fg-brand_primary)' },
  Success: { bg: 'bg-(--bg-succes_tertiary)',  border: 'border-(--border-success_primary)',  icon: 'IconCircleCheck',   iconColor: 'var(--fg-succes_primary)' },
  Warning: { bg: 'bg-(--bg-warning_tertiary)', border: 'border-(--border-warning_primary)',  icon: 'IconAlertTriangle', iconColor: 'var(--fg-warning_primary)' },
  Error:   { bg: 'bg-(--bg-error_tertiary)',   border: 'border-(--border-error_primary)',    icon: 'IconAlertCircle',   iconColor: 'var(--fg-error_primary)' },
}

export function Tips({
  state = 'Default',
  children,
  vertical = false,
  showIcon = true,
  action,
  className = '',
}: TipsProps) {
  const { bg, border, icon, iconColor } = config[state]

  if (vertical) {
    return (
      <div className={['border rounded-(--radius-M) p-(--padding-L) flex flex-col gap-(--gap-L)', bg, border, className].join(' ')}>
        <div className="flex items-start gap-(--gap-S)">
          {showIcon && <Icon name={icon} size={24} stroke={2} color={iconColor} className="shrink-0" />}
          <p style={{ fontFamily: 'var(--font-secondary)', fontWeight: 400, fontSize: 16, lineHeight: '24px', color: 'var(--text-primary)' }}>
            {children}
          </p>
        </div>
        {action && (
          <div className="flex" style={{ paddingLeft: showIcon ? 32 : 0 }}>
            <Button variant="Primary" small showIcon={false} onClick={action.onClick}>
              {action.label}
            </Button>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className={['border rounded-(--radius-M) py-(--padding-M) px-(--padding-L) flex items-center gap-(--gap-S)', bg, border, className].join(' ')}>
      {showIcon && <Icon name={icon} size={24} stroke={2} color={iconColor} className="shrink-0" />}
      <p className="flex-1 min-w-0" style={{ fontFamily: 'var(--font-secondary)', fontWeight: 400, fontSize: 16, lineHeight: '24px', color: 'var(--text-primary)' }}>
        {children}
      </p>
      {action && (
        <Button variant="Primary" small showIcon={false} onClick={action.onClick} className="shrink-0">
          {action.label}
        </Button>
      )}
    </div>
  )
}
