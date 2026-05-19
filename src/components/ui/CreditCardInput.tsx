import type { CSSProperties } from 'react'
import { Icon } from './Icon'

export interface CreditCardInputProps {
  label?: string
  showLabel?: boolean
  helperText?: string
  showHelperText?: boolean
  cardNumber?: string
  onCardNumberChange?: (v: string) => void
  expiry?: string
  onExpiryChange?: (v: string) => void
  ccv?: string
  onCcvChange?: (v: string) => void
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

export function CreditCardInput({
  label = 'Credit card information',
  showLabel = true,
  helperText = "I'm an information",
  showHelperText = true,
  cardNumber,
  onCardNumberChange,
  expiry,
  onExpiryChange,
  ccv,
  onCcvChange,
  errorMessage = "I'm an error message",
  error = false,
  disabled = false,
  small = false,
}: CreditCardInputProps) {
  const containerCls = [
    'flex items-center border rounded-(--radius-S) transition-colors overflow-hidden w-full',
    small ? 'px-(--padding-L) py-(--padding-S) gap-(--gap-S)' : 'px-(--padding-XXL) py-(--padding-L) gap-(--gap-S)',
    disabled ? 'opacity-50 pointer-events-none' : '',
    error
      ? 'bg-(--bg-error_tertiary) border-(--border-error_primary) focus-within:border-(--border-action)'
      : 'bg-(--bg-primary) border-(--border-default) hover:border-(--border-action_hover) focus-within:border-(--border-action)',
  ].filter(Boolean).join(' ')

  const inputStyle: CSSProperties = {
    ...textStyle,
    color: 'var(--text-primary)',
    background: 'transparent',
    outline: 'none',
    minWidth: 0,
  }

  return (
    <div className="flex flex-col gap-(--gap-XS) w-full">
      {showLabel && (
        <span style={{ ...textStyle, color: 'var(--text-secondary)', opacity: disabled ? 0.5 : 1 }}>
          {label}
        </span>
      )}

      <div className={containerCls}>
        <Icon name="IconCreditCard" size={24} stroke={2} color="var(--fg-tertiary)" />

        <input
          type="text"
          inputMode="numeric"
          maxLength={19}
          value={cardNumber}
          onChange={e => {
            const digits = e.target.value.replace(/\D/g, '').slice(0, 16)
            const formatted = digits.replace(/(.{4})/g, '$1 ').trimEnd()
            onCardNumberChange?.(formatted)
          }}
          placeholder="1234 5678 9012 3456"
          disabled={disabled}
          className="flex-1"
          style={inputStyle}
        />

        <input
          type="text"
          inputMode="numeric"
          maxLength={5}
          value={expiry}
          onChange={e => {
            const raw = e.target.value.replace(/\D/g, '').slice(0, 4)
            const formatted = raw.length > 2 ? raw.slice(0, 2) + '/' + raw.slice(2) : raw
            onExpiryChange?.(formatted)
          }}
          onKeyDown={e => {
            // Allow backspace to delete the slash cleanly
            if (e.key === 'Backspace' && expiry?.endsWith('/')) {
              e.preventDefault()
              onExpiryChange?.(expiry.slice(0, -1))
            }
          }}
          placeholder="MM/YY"
          disabled={disabled}
          className="shrink-0 text-center"
          style={{ ...inputStyle, width: 52 }}
        />

        <input
          type="text"
          inputMode="numeric"
          maxLength={4}
          value={ccv}
          onChange={e => {
            const digits = e.target.value.replace(/\D/g, '').slice(0, 4)
            onCcvChange?.(digits)
          }}
          placeholder="CVC"
          disabled={disabled}
          className="shrink-0 text-center"
          style={{ ...inputStyle, width: 40 }}
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
