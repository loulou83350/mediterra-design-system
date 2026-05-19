export type CircularStepperState = 'progress' | 'success' | 'error'

export interface CircularStepperProps {
  currentStep: number
  totalSteps: number
  stepName?: string
  state?: CircularStepperState
  onDetailsClick?: () => void
}

export function CircularStepper({
  currentStep,
  totalSteps,
  stepName,
  state = 'progress',
  onDetailsClick,
}: CircularStepperProps) {
  const r = 20
  const circumference = 2 * Math.PI * r
  const progress = totalSteps > 0 ? (currentStep / totalSteps) * 100 : 0
  const dashOffset = circumference - (progress / 100) * circumference

  const arcColor =
    state === 'success'
      ? 'var(--fg-succes_primary)'
      : state === 'error'
        ? 'var(--fg-error_primary)'
        : 'var(--fg-brand_primary)'

  const centerTextColor =
    state === 'success'
      ? 'var(--text-success)'
      : state === 'error'
        ? 'var(--text-error)'
        : 'var(--text-primary)'

  return (
    <div className="flex items-center gap-(--gap-M)">
      {/* SVG + overlay */}
      <div className="relative w-12 h-12 shrink-0">
        <svg width={48} height={48}>
          {/* Track */}
          <circle
            cx={24}
            cy={24}
            r={r}
            stroke="var(--bg-quaterny)"
            strokeWidth={3}
            fill="none"
          />
          {/* Arc */}
          <circle
            cx={24}
            cy={24}
            r={r}
            stroke={arcColor}
            strokeWidth={3}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            transform="rotate(-90 24 24)"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span style={{ fontFamily: 'var(--font-secondary)', fontWeight: 700, fontSize: 16, lineHeight: '24px', color: centerTextColor }}>
            {currentStep}
          </span>
          <span style={{ fontFamily: 'var(--font-secondary)', fontWeight: 400, fontSize: 12, lineHeight: '16px', color: 'var(--text-tertiary)' }}>
            /{totalSteps}
          </span>
        </div>
      </div>

      {/* Content right */}
      <div className="flex flex-col">
        {stepName && (
          <span style={{ fontFamily: 'var(--font-secondary)', fontWeight: 700, fontSize: 16, lineHeight: '24px', color: 'var(--text-primary)' }}>
            {stepName}
          </span>
        )}
        {onDetailsClick && (
          <button
            type="button"
            onClick={onDetailsClick}
            className="underline cursor-pointer text-left"
            style={{ fontFamily: 'var(--font-secondary)', fontWeight: 600, fontSize: 16, lineHeight: '24px', color: 'var(--text-link)' }}
          >
            Progress details
          </button>
        )}
      </div>
    </div>
  )
}
