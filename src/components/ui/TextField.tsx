import type { CSSProperties } from 'react'
import { Icon } from './Icon'

export interface TextFieldProps {
  label?: string
  showLabel?: boolean
  placeholder?: string
  helperText?: string
  showHelperText?: boolean
  errorMessage?: string
  error?: boolean
  disabled?: boolean
  small?: boolean
  leadIcon?: string
  value?: string
  onChange?: (v: string) => void
  type?: string
}

const textStyle: CSSProperties = {
  fontFamily: 'var(--font-secondary)',
  fontWeight: 400,
  fontSize: 16,
  lineHeight: '24px',
}

export function TextField({
  label = 'Label',
  showLabel = true,
  placeholder = "I'm a placeholder",
  helperText = "I'm an information",
  showHelperText = true,
  errorMessage = "I'm an error message",
  error = false,
  disabled = false,
  small = false,
  leadIcon,
  value,
  onChange,
  type = 'text',
}: TextFieldProps) {
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
        <span
          style={{ ...textStyle, color: 'var(--text-secondary)', opacity: disabled ? 0.5 : 1 }}
        >
          {label}
        </span>
      )}

      <div className={containerCls}>
        {leadIcon && (
          <Icon name={leadIcon} size={24} stroke={2} color="var(--fg-tertiary)" />
        )}
        <input
          type={type}
          value={value}
          onChange={e => onChange?.(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          className="flex-1 min-w-0 bg-transparent outline-none"
          style={{
            ...textStyle,
            color: 'var(--text-primary)',
          }}
        />
      </div>

      {error
        ? (
          <span style={{ ...textStyle, color: 'var(--text-error)' }}>
            {errorMessage}
          </span>
        )
        : showHelperText && helperText && (
          <span style={{ ...textStyle, color: 'var(--text-tertiary)' }}>
            {helperText}
          </span>
        )
      }
    </div>
  )
}
