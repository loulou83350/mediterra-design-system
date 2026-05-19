import type { CSSProperties } from 'react'
import { useState } from 'react'
import { Icon } from './Icon'

export interface PasswordInputProps {
  label?: string
  showLabel?: boolean
  helperText?: string
  showHelperText?: boolean
  errorMessage?: string
  error?: boolean
  disabled?: boolean
  small?: boolean
  value?: string
  onChange?: (v: string) => void
}

const textStyle: CSSProperties = {
  fontFamily: 'var(--font-secondary)',
  fontWeight: 400,
  fontSize: 16,
  lineHeight: '24px',
}

export function PasswordInput({
  label = 'Password',
  showLabel = true,
  helperText = "I'm an information",
  showHelperText = true,
  errorMessage = "I'm an error message",
  error = false,
  disabled = false,
  small = false,
  value,
  onChange,
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false)

  const containerCls = [
    'flex items-center border rounded-(--radius-S) transition-colors overflow-hidden w-full',
    small ? 'pl-(--padding-L) pr-0' : 'pl-(--padding-XXL) pr-(--padding-S)',
    small ? 'py-0' : 'py-(--padding-S)',
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
        <input
          type={showPassword ? 'text' : 'password'}
          value={value}
          onChange={e => onChange?.(e.target.value)}
          placeholder="Password"
          disabled={disabled}
          className="flex-1 min-w-0 bg-transparent outline-none"
          style={{
            ...textStyle,
            color: 'var(--text-primary)',
            padding: small ? 'var(--padding-S) 0' : '0',
          }}
        />
        <button
          type="button"
          onClick={() => setShowPassword(s => !s)}
          className="shrink-0 flex items-center justify-center p-(--padding-S) rounded-(--radius-S) hover:bg-(--bg-secondary) transition-colors border-0 bg-transparent cursor-pointer"
          tabIndex={-1}
        >
          <Icon
            name={showPassword ? 'IconEye' : 'IconEyeOff'}
            size={24}
            stroke={2}
            color="var(--fg-secondary)"
          />
        </button>
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
