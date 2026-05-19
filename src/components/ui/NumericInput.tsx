import type { CSSProperties } from 'react'
import { Icon } from './Icon'

export interface NumericInputProps {
  label?: string
  showLabel?: boolean
  helperText?: string
  showHelperText?: boolean
  errorMessage?: string
  error?: boolean
  disabled?: boolean
  small?: boolean
  value?: number
  onChange?: (v: number) => void
  min?: number
  max?: number
  step?: number
}

const textStyle: CSSProperties = {
  fontFamily: 'var(--font-secondary)',
  fontWeight: 400,
  fontSize: 16,
  lineHeight: '24px',
}

export function NumericInput({
  label = 'Label',
  showLabel = true,
  helperText = "I'm an information",
  showHelperText = true,
  errorMessage = "I'm an error message",
  error = false,
  disabled = false,
  small = false,
  value,
  onChange,
  min,
  max,
  step = 1,
}: NumericInputProps) {
  function increment() {
    const next = (value ?? 0) + step
    onChange?.(max !== undefined ? Math.min(max, next) : next)
  }

  function decrement() {
    const next = (value ?? 0) - step
    onChange?.(min !== undefined ? Math.max(min, next) : next)
  }

  const containerCls = [
    'flex items-center border rounded-(--radius-S) transition-colors overflow-hidden w-full',
    small ? 'py-0' : '',
    disabled ? 'opacity-50 pointer-events-none' : '',
    error
      ? 'bg-(--bg-error_tertiary) border-(--border-error_primary) focus-within:border-(--border-action)'
      : 'bg-(--bg-primary) border-(--border-default) hover:border-(--border-action_hover) focus-within:border-(--border-action)',
  ].filter(Boolean).join(' ')

  const inputPaddingCls = small
    ? 'pl-(--padding-L) py-(--padding-S)'
    : 'pl-(--padding-XXL) py-(--padding-L)'

  return (
    <div className="flex flex-col gap-(--gap-XS) w-full">
      {showLabel && (
        <span style={{ ...textStyle, color: 'var(--text-secondary)', opacity: disabled ? 0.5 : 1 }}>
          {label}
        </span>
      )}

      <div className={containerCls}>
        <input
          type="number"
          value={value ?? ''}
          onChange={e => {
            const parsed = parseFloat(e.target.value)
            if (!isNaN(parsed)) onChange?.(parsed)
          }}
          disabled={disabled}
          min={min}
          max={max}
          step={step}
          className={`flex-1 min-w-0 bg-transparent outline-none ${inputPaddingCls}`}
          style={{
            ...textStyle,
            color: 'var(--text-primary)',
            MozAppearance: 'textfield' as any,
            appearance: 'none' as any,
            WebkitAppearance: 'none' as any,
          }}
        />

        <div className={`flex items-center gap-(--gap-XXS) ${small ? 'px-(--padding-XS)' : 'px-(--padding-S)'} shrink-0`}>
          <button
            type="button"
            onClick={decrement}
            disabled={disabled || (min !== undefined && (value ?? 0) <= min)}
            className="p-(--padding-S) rounded-(--radius-S) hover:bg-(--bg-secondary) transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Icon name="IconMinus" size={small ? 16 : 24} stroke={2} color="var(--fg-secondary)" />
          </button>
          <button
            type="button"
            onClick={increment}
            disabled={disabled || (max !== undefined && (value ?? 0) >= max)}
            className="p-(--padding-S) rounded-(--radius-S) hover:bg-(--bg-secondary) transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Icon name="IconPlus" size={small ? 16 : 24} stroke={2} color="var(--fg-secondary)" />
          </button>
        </div>
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
