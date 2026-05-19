import { Icon } from './Icon'

export type NotificationItemType = 'Neutral' | 'Error' | 'Success' | 'Warning'

export interface NotificationItemProps {
  type?: NotificationItemType
  recent?: boolean
  description?: string
  notificationDate?: string
  topSpacing?: boolean
  botSpacing?: boolean
  showActionGroup?: boolean
  actionLabel?: string
  onActionClick?: () => void
}

type TypeTokens = {
  boxBg: string
  icon: string
  iconColor: string
}

const typeMap: Record<NotificationItemType, TypeTokens> = {
  Neutral: {
    boxBg: 'bg-(--bg-neutral_tertiary)',
    icon: 'IconBell',
    iconColor: 'var(--fg-brand_primary)',
  },
  Error: {
    boxBg: 'bg-(--bg-error_tertiary)',
    icon: 'IconAlertCircle',
    iconColor: 'var(--fg-error_primary)',
  },
  Success: {
    boxBg: 'bg-(--bg-succes_tertiary)',
    icon: 'IconCircleCheck',
    iconColor: 'var(--fg-succes_primary)',
  },
  Warning: {
    boxBg: 'bg-(--bg-warning_tertiary)',
    icon: 'IconAlertTriangle',
    iconColor: 'var(--fg-warning_primary)',
  },
}

const descStyle = {
  fontFamily: 'var(--font-secondary)',
  fontWeight: 400,
  fontSize: 14,
  lineHeight: '20px',
  color: 'var(--text-primary)',
}

const dateStyle = {
  fontFamily: 'var(--font-secondary)',
  fontWeight: 400,
  fontSize: 12,
  lineHeight: '16px',
  color: 'var(--text-secondary)',
}

export function NotificationItem({
  type = 'Neutral',
  recent = false,
  description = 'You got a new notification, let see what\'s behind',
  notificationDate = '2h ago',
  topSpacing = false,
  botSpacing = false,
  showActionGroup = true,
  actionLabel = 'Claim',
  onActionClick,
}: NotificationItemProps) {
  const { boxBg, icon, iconColor } = typeMap[type]

  return (
    <div className={`w-full flex flex-col ${recent ? 'bg-(--bg-tertiary)' : ''}`}>
      {topSpacing && <div className="h-2 shrink-0 w-full" />}

      <div className="flex items-center gap-(--gap-M) px-(--padding-L) py-(--padding-M)">
        {/* Icon box */}
        <div className={`${boxBg} p-(--padding-S) rounded-(--radius-XS) shrink-0`}>
          <Icon name={icon} size={24} stroke={2} color={iconColor} />
        </div>

        {/* Text */}
        <div className="flex flex-col flex-1 min-w-0">
          <p style={descStyle}>{description}</p>
          <p style={dateStyle}>{notificationDate}</p>
        </div>
      </div>

      {/* Action button — only when recent */}
      {recent && showActionGroup && (
        <div className="pl-[52px] pt-(--padding-M) pb-(--padding-M) px-(--padding-L)">
          <button
            type="button"
            onClick={onActionClick}
            className="bg-(--bg-action) hover:bg-(--bg-action_hover) rounded-(--radius-S) pl-(--padding-M) pr-(--padding-L) py-(--padding-S) transition-colors cursor-pointer"
            style={{
              fontFamily: 'var(--font-primary)',
              fontWeight: 800,
              fontSize: 16,
              lineHeight: '24px',
              color: 'var(--text-action_white)',
            }}
          >
            {actionLabel}
          </button>
        </div>
      )}

      {botSpacing && <div className="h-2 shrink-0 w-full" />}
    </div>
  )
}
