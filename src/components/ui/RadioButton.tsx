import { useState } from 'react'

export interface RadioButtonProps {
  checked?: boolean
  onChange?: () => void
  label?: string
  showLabel?: boolean
  disabled?: boolean
  name?: string
  value?: string
}

const labelStyle = {
  fontFamily: 'var(--font-secondary)',
  fontWeight: 400,
  fontSize: 16,
  lineHeight: '24px',
  color: 'var(--text-primary)',
  userSelect: 'none' as const,
}

export function RadioButton({
  checked = false,
  onChange,
  label = 'Choice',
  showLabel = true,
  disabled = false,
  name,
  value,
}: RadioButtonProps) {
  const [hovered, setHovered] = useState(false)

  // Outer ring color
  const outerCls =
    checked
      ? hovered
        ? 'bg-(--bg-action) border-0'
        : 'bg-(--bg-succes_primary) border-0'
      : hovered
        ? 'border-2 border-(--fg-brand_primary)'
        : 'border-2 border-(--fg-quaterny)'

  return (
    <label
      className={`inline-flex items-center gap-(--gap-S) cursor-pointer ${disabled ? 'opacity-50 pointer-events-none' : ''}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Hidden native input for accessibility */}
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={() => onChange?.()}
        className="sr-only"
        disabled={disabled}
      />

      {/* Visual radio */}
      <div className={`relative w-6 h-6 rounded-full transition-colors shrink-0 flex items-center justify-center ${outerCls}`}>
        {checked && (
          <div className="w-2 h-2 rounded-full bg-white shrink-0" />
        )}
      </div>

      {showLabel && (
        <span style={labelStyle}>{label}</span>
      )}
    </label>
  )
}
