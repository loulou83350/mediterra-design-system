import React, { useState, useEffect } from 'react'
import { Icon } from './Icon'
import { Button } from './Button'

export type AlertVariant = 'Error' | 'Success' | 'Warning' | 'Neutral'

export interface AlertProps {
  variant?: AlertVariant
  title: string
  description?: string
  primaryAction?: { label: string; onClick: () => void }
  secondaryAction?: { label: string; onClick: () => void }
  onClose?: () => void
  duration?: number
  className?: string
}

const config: Record<AlertVariant, {
  bg: string
  border: string
  icon: React.ComponentProps<typeof Icon>['name']
  iconColor: string
  progressColor: string
}> = {
  Error:   { bg: 'bg-(--bg-error_tertiary)',   border: 'border-(--border-error_primary)',    icon: 'IconAlertCircle',   iconColor: 'var(--fg-error_primary)',   progressColor: 'var(--border-error_primary)' },
  Success: { bg: 'bg-(--bg-succes_tertiary)',  border: 'border-(--border-success_primary)',  icon: 'IconCircleCheck',   iconColor: 'var(--fg-succes_primary)',  progressColor: 'var(--border-success_primary)' },
  Warning: { bg: 'bg-(--bg-warning_tertiary)', border: 'border-(--border-warning_primary)',  icon: 'IconAlertTriangle', iconColor: 'var(--fg-warning_primary)', progressColor: 'var(--border-warning_primary)' },
  Neutral: { bg: 'bg-(--bg-neutral_tertiary)', border: 'border-(--border-neutral_primary)',  icon: 'IconInfoCircle',    iconColor: 'var(--fg-brand_primary)',   progressColor: 'var(--border-neutral_primary)' },
}

export function Alert({
  variant = 'Neutral',
  title,
  description,
  primaryAction,
  secondaryAction,
  onClose,
  duration,
  className = '',
}: AlertProps) {
  const [visible, setVisible] = useState(true)
  const [barWidth, setBarWidth] = useState(100)

  useEffect(() => {
    if (!duration) return
    const closeTimer = setTimeout(() => {
      setVisible(false)
      onClose?.()
    }, duration)
    const raf = requestAnimationFrame(() => requestAnimationFrame(() => setBarWidth(0)))
    return () => { clearTimeout(closeTimer); cancelAnimationFrame(raf) }
  }, [duration])

  if (!visible) return null

  const { bg, border, icon, iconColor, progressColor } = config[variant]
  const hasActions = primaryAction || secondaryAction

  return (
    <div
      className={[
        'relative border rounded-(--radius-S) p-(--padding-XXL)',
        'flex items-start gap-(--gap-S) overflow-hidden',
        bg, border, className,
      ].join(' ')}
    >
      <Icon name={icon} size={24} stroke={2} color={iconColor} className="shrink-0" />

      <div className="flex-1 min-w-0 flex flex-col gap-(--gap-L)">
        <div className="flex flex-col gap-(--gap-XS)">
          <p style={{ fontFamily: 'var(--font-secondary)', fontWeight: 700, fontSize: 16, lineHeight: '24px', color: 'var(--text-primary)' }}>
            {title}
          </p>
          {description && (
            <p style={{ fontFamily: 'var(--font-secondary)', fontWeight: 400, fontSize: 16, lineHeight: '24px', color: 'var(--text-secondary)' }}>
              {description}
            </p>
          )}
        </div>

        {hasActions && (
          <div className="flex items-center gap-(--gap-M)">
            {primaryAction && (
              <Button variant="Primary" small showIcon={false} onClick={primaryAction.onClick}>
                {primaryAction.label}
              </Button>
            )}
            {secondaryAction && (
              <Button variant="Tertiary" small showIcon={false} onClick={secondaryAction.onClick}>
                {secondaryAction.label}
              </Button>
            )}
          </div>
        )}
      </div>

      <button
        type="button"
        onClick={() => { setVisible(false); onClose?.() }}
        className="shrink-0 text-(--fg-tertiary) hover:text-(--fg-primary) transition-colors cursor-pointer"
      >
        <Icon name="IconX" size={24} stroke={2} />
      </button>

      {duration && (
        <div
          className="absolute bottom-0 left-0 h-0.5"
          style={{
            width: `${barWidth}%`,
            backgroundColor: progressColor,
            transition: `width ${duration}ms linear`,
          }}
        />
      )}
    </div>
  )
}
