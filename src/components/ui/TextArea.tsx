import type { CSSProperties } from 'react'

export interface TextAreaProps {
  label?: string
  showLabel?: boolean
  placeholder?: string
  errorMessage?: string
  error?: boolean
  disabled?: boolean
  small?: boolean
  counter?: boolean
  maxLength?: number
  value?: string
  onChange?: (v: string) => void
  rows?: number
}

const textStyle: CSSProperties = {
  fontFamily: 'var(--font-secondary)',
  fontWeight: 400,
  fontSize: 16,
  lineHeight: '24px',
}

export function TextArea({
  label = 'Label',
  showLabel = true,
  placeholder = "I'm a placeholder",
  errorMessage = "I'm an error message",
  error = false,
  disabled = false,
  small = false,
  counter = true,
  maxLength = 2000,
  value,
  onChange,
  rows = 4,
}: TextAreaProps) {
  const wrapperCls = [
    'flex flex-col gap-(--gap-XS) w-full',
    disabled ? 'opacity-50 pointer-events-none' : '',
  ].filter(Boolean).join(' ')

  const containerCls = [
    'flex flex-col border rounded-(--radius-S) transition-colors overflow-hidden w-full',
    error
      ? 'bg-(--bg-error_tertiary) border-(--border-error_primary) focus-within:border-(--border-action)'
      : 'bg-(--bg-primary) border-(--border-default) hover:border-(--border-action_hover) focus-within:border-(--border-action)',
  ].join(' ')

  const paddingCls = small
    ? 'px-(--padding-L) py-(--padding-S)'
    : 'px-(--padding-XXL) py-(--padding-L)'

  const currentLength = value?.length ?? 0

  return (
    <div className={wrapperCls}>
      {showLabel && (
        <span style={{ ...textStyle, color: 'var(--text-primary)' }}>
          {label}
        </span>
      )}

      <div className={containerCls}>
        <textarea
          value={value}
          onChange={e => onChange?.(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          rows={rows}
          maxLength={maxLength}
          className={`bg-transparent outline-none resize-none ${paddingCls}`}
          style={{
            ...textStyle,
            color: 'var(--text-primary)',
          }}
        />
      </div>

      <div className="flex items-start gap-(--gap-S)">
        {error && (
          <span className="flex-1" style={{ ...textStyle, color: 'var(--text-error)' }}>
            {errorMessage}
          </span>
        )}
        {counter && (
          <span className="shrink-0 ml-auto" style={{ ...textStyle, color: 'var(--text-tertiary)', fontSize: 14 }}>
            {currentLength}/{maxLength}
          </span>
        )}
      </div>
    </div>
  )
}
