import { Icon } from './Icon'

export interface GlobalAlertProps {
  title?: string
  description?: string
  mobile?: boolean
  showAction?: boolean
  actionLabel?: string
  onActionClick?: () => void
}

const titleStyleDesktop = {
  fontFamily: 'var(--font-primary)',
  fontWeight: 800,
  fontSize: 18,
  lineHeight: '24px',
  color: 'var(--text-primary)',
}

const descStyle = {
  fontFamily: 'var(--font-secondary)',
  fontWeight: 400,
  fontSize: 16,
  lineHeight: '24px',
  color: 'var(--text-secondary)',
}

const btnShadow = '0 0 8px rgba(0, 152, 227, 0.2), 0 0 5px rgba(0, 152, 227, 0.25)'

export function GlobalAlert({
  title = 'Message Title',
  description = 'Message description',
  mobile = false,
  showAction = true,
  actionLabel = 'Action 1',
  onActionClick,
}: GlobalAlertProps) {
  if (mobile) {
    return (
      <div className="bg-(--bg-tertiary) border-b border-(--border-default) flex flex-col gap-(--gap-M) p-(--padding-L) w-full">
        {/* Title + description */}
        <div className="flex flex-col gap-(--gap-S)">
          <p style={titleStyleDesktop}>{title}</p>
          <p style={descStyle}>{description}</p>
        </div>

        {/* Action button */}
        {showAction && (
          <button
            type="button"
            onClick={onActionClick}
            className="self-start bg-(--bg-action) hover:bg-(--bg-action_hover) rounded-(--radius-S) pl-(--padding-M) pr-(--padding-L) py-(--padding-S) transition-colors cursor-pointer"
            style={{
              fontFamily: 'var(--font-primary)',
              fontWeight: 800,
              fontSize: 16,
              lineHeight: '24px',
              color: 'var(--text-action_white)',
              boxShadow: btnShadow,
            }}
          >
            {actionLabel}
          </button>
        )}
      </div>
    )
  }

  // Desktop
  return (
    <div className="bg-(--bg-tertiary) border-b border-(--border-default) flex items-start gap-(--gap-XXL) px-(--padding-XXL) py-(--padding-M) w-full">
      {/* Icon + text */}
      <div className="flex items-start gap-(--gap-S) flex-1 min-w-0">
        <Icon name="IconInfoCircle" size={24} stroke={2} color="var(--fg-brand_primary)" className="shrink-0 mt-0.5" />
        <div className="flex flex-col gap-(--gap-S)">
          <p style={titleStyleDesktop}>{title}</p>
          <p style={descStyle}>{description}</p>
        </div>
      </div>

      {/* Action button */}
      {showAction && (
        <button
          type="button"
          onClick={onActionClick}
          className="shrink-0 bg-(--bg-action) hover:bg-(--bg-action_hover) rounded-(--radius-S) pl-(--padding-XL) pr-(--padding-XXL) py-(--padding-L) transition-colors cursor-pointer"
          style={{
            fontFamily: 'var(--font-primary)',
            fontWeight: 800,
            fontSize: 18,
            lineHeight: '24px',
            color: 'var(--text-action_white)',
            boxShadow: btnShadow,
          }}
        >
          {actionLabel}
        </button>
      )}
    </div>
  )
}
