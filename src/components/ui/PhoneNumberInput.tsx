import type { CSSProperties } from 'react'

export interface PhoneNumberInputProps {
  label?: string
  showLabel?: boolean
  flagEmoji?: string
  dialCode?: string
  placeholder?: string
  value?: string
  onChange?: (v: string) => void
  errorMessage?: string
  error?: boolean
  disabled?: boolean
  small?: boolean
}

const textStyle: CSSProperties = {
  fontFamily: 'var(--font-secondary)',
  fontWeight: 400,
  fontSize: 16,
  lineHeight: '24px',
}

export function PhoneNumberInput({
  label = 'Label',
  showLabel = true,
  flagEmoji = '🇫🇷',
  dialCode = '+33',
  placeholder = '06 12 34 56 78',
  value,
  onChange,
  errorMessage = "I'm an error message",
  error = false,
  disabled = false,
  small = false,
}: PhoneNumberInputProps) {
  const containerCls = [
    'flex items-center border rounded-(--radius-S) transition-colors overflow-hidden w-full',
    small ? 'px-(--padding-L) py-(--padding-S) gap-(--gap-S)' : 'px-(--padding-XXL) py-(--padding-L) gap-(--gap-S)',
    disabled ? 'opacity-50 pointer-events-none' : '',
    error
      ? 'bg-(--bg-error_tertiary) border-(--border-error_primary) focus-within:border-(--border-action)'
      : 'bg-(--bg-primary) border-(--border-default) hover:border-(--border-action_hover) focus-within:border-(--border-action)',
  ].filter(Boolean).join(' ')

  return (
    <div className="flex flex-col gap-(--gap-XS) w-full">
      {showLabel && (
        <span style={{ ...textStyle, color: 'var(--text-secondary)', opacity: disabled ? 0.5 : 1 }}>
          {label}
        </span>
      )}

      <div className={containerCls}>
        <span
          className="shrink-0 text-center leading-none select-none"
          style={{ fontSize: 18, width: 24 }}
          aria-hidden
        >
          {flagEmoji}
        </span>

        <span
          className="shrink-0"
          style={{ ...textStyle, color: 'var(--text-placeholder)' }}
        >
          {dialCode}
        </span>

        <input
          type="tel"
          value={value}
          onChange={e => onChange?.(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          className="flex-1 min-w-0 bg-transparent outline-none"
          style={{ ...textStyle, color: 'var(--text-primary)' }}
        />
      </div>

      {error && (
        <span style={{ ...textStyle, color: 'var(--text-error)' }}>
          {errorMessage}
        </span>
      )}
    </div>
  )
}
