import { useState } from 'react'
import { Icon } from './Icon'

export interface SwitchProps {
  checked?: boolean
  onChange?: (v: boolean) => void
  label?: string
  showInfoIcon?: boolean
  twoChoice?: boolean
  choice1?: string
  choice2?: string
  disabled?: boolean
}

const labelStyle = {
  fontFamily: 'var(--font-secondary)',
  fontWeight: 400,
  fontSize: 16,
  lineHeight: '24px',
}

export function Switch({
  checked = false,
  onChange,
  label,
  showInfoIcon = false,
  twoChoice = false,
  choice1 = 'Choice 1',
  choice2 = 'Choice 2',
  disabled = false,
}: SwitchProps) {
  const [hovered, setHovered] = useState(false)

  const trackColor =
    hovered
      ? 'bg-(--bg-action)'
      : checked && !twoChoice
        ? 'bg-(--bg-succes_primary)'
        : checked
          ? 'bg-(--bg-action)'
          : 'bg-(--fg-quaterny)'

  const thumbCls = checked ? 'translate-x-[21px]' : 'translate-x-[3px]'

  return (
    <div className={`flex items-center gap-(--gap-S) ${disabled ? 'opacity-50 pointer-events-none' : ''}`}>

      {/* Left label */}
      {twoChoice ? (
        <div className="flex items-center gap-(--gap-XS)">
          <span style={{
            ...labelStyle,
            color: checked ? 'var(--text-tertiary)' : 'var(--text-primary)',
          }}>
            {choice1}
          </span>
          {showInfoIcon && (
            <Icon name="IconInfoCircle" size={16} stroke={2} color="var(--fg-tertiary)" />
          )}
        </div>
      ) : label ? (
        <div className="flex items-center gap-(--gap-XS)">
          <span style={{ ...labelStyle, color: 'var(--text-primary)' }}>{label}</span>
          {showInfoIcon && (
            <Icon name="IconInfoCircle" size={16} stroke={2} color="var(--fg-tertiary)" />
          )}
        </div>
      ) : null}

      {/* Toggle pill */}
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange?.(!checked)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={`relative w-10 h-[22px] rounded-full transition-colors cursor-pointer shrink-0 p-0 border-0 outline-none ${trackColor}`}
      >
        <span
          className={`absolute top-[3px] left-0 w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${thumbCls}`}
        />
      </button>

      {/* Right label (2-choice only) */}
      {twoChoice && (
        <div className="flex items-center gap-(--gap-XS)">
          <span style={{
            ...labelStyle,
            color: checked ? 'var(--text-primary)' : 'var(--text-tertiary)',
          }}>
            {choice2}
          </span>
          {showInfoIcon && (
            <Icon name="IconInfoCircle" size={16} stroke={2} color="var(--fg-tertiary)" />
          )}
        </div>
      )}
    </div>
  )
}
