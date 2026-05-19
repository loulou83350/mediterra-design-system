import { Icon } from './Icon'

export type ProgressBarVariant = 'default' | 'warning'

export interface ProgressBarProps {
  value: number
  currentDisplay?: number
  maxDisplay?: number
  showScore?: boolean
  variant?: ProgressBarVariant
}

export function ProgressBar({
  value,
  currentDisplay,
  maxDisplay = 100,
  showScore = true,
  variant = 'default',
}: ProgressBarProps) {
  const current = currentDisplay ?? value

  let fillColor: string
  if (value >= 100) {
    fillColor = 'var(--fg-succes_primary)'
  } else if (variant === 'warning') {
    fillColor = 'var(--fg-warning_primary)'
  } else {
    fillColor = 'var(--fg-brand_primary)'
  }

  return (
    <div className="flex items-center gap-(--gap-S) w-full">
      {/* Track */}
      <div className="flex-1 h-[4px] rounded-(--radius-max) bg-(--bg-quaterny) relative overflow-hidden">
        <div
          className="absolute left-0 top-0 h-full rounded-(--radius-max) transition-all"
          style={{ width: `${Math.min(100, value)}%`, backgroundColor: fillColor }}
        />
      </div>

      {/* Score */}
      {showScore && (
        <div className="shrink-0 flex items-center">
          {value >= 100 ? (
            <Icon name="IconCircleCheck" size={20} stroke={2} color="var(--fg-succes_primary)" />
          ) : variant === 'warning' ? (
            <Icon name="IconAlertTriangle" size={20} stroke={2} color="var(--fg-warning_primary)" />
          ) : (
            <span className="flex items-baseline gap-[1px]">
              <span style={{ fontFamily: 'var(--font-secondary)', fontWeight: 700, fontSize: 14, lineHeight: '20px', color: 'var(--text-secondary)' }}>
                {current}
              </span>
              <span style={{ fontFamily: 'var(--font-secondary)', fontWeight: 400, fontSize: 12, lineHeight: '16px', color: 'var(--text-tertiary)' }}>
                /{maxDisplay}
              </span>
            </span>
          )}
        </div>
      )}
    </div>
  )
}
