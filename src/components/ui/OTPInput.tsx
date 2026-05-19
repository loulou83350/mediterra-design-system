import type { CSSProperties } from 'react'
import { useRef, useState } from 'react'

export interface OTPInputProps {
  label?: string
  showLabel?: boolean
  length?: number
  errorMessage?: string
  error?: boolean
  value?: string
  onChange?: (v: string) => void
}

const textStyle: CSSProperties = {
  fontFamily: 'var(--font-secondary)',
  fontWeight: 400,
  fontSize: 16,
  lineHeight: '24px',
}

export function OTPInput({
  label = 'Label',
  showLabel = true,
  length = 6,
  errorMessage = "I'm an error message",
  error = false,
  value = '',
  onChange,
}: OTPInputProps) {
  const chars = Array.from({ length }, (_, i) => value[i] ?? '')
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null)
  const refs = useRef<(HTMLInputElement | null)[]>([])

  function handleKeyDown(index: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (/^\d$/.test(e.key)) {
      e.preventDefault()
      const next = chars.map((c, i) => (i === index ? e.key : c)).join('')
      onChange?.(next)
      if (index < length - 1) refs.current[index + 1]?.focus()
    } else if (e.key === 'Backspace') {
      e.preventDefault()
      if (chars[index]) {
        const next = chars.map((c, i) => (i === index ? '' : c)).join('')
        onChange?.(next)
      } else if (index > 0) {
        const next = chars.map((c, i) => (i === index - 1 ? '' : c)).join('')
        onChange?.(next)
        refs.current[index - 1]?.focus()
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      refs.current[index - 1]?.focus()
    } else if (e.key === 'ArrowRight' && index < length - 1) {
      refs.current[index + 1]?.focus()
    }
  }

  function handlePaste(e: React.ClipboardEvent) {
    e.preventDefault()
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length)
    if (!pasted) return
    const next = Array.from({ length }, (_, i) => pasted[i] ?? chars[i] ?? '').join('')
    onChange?.(next)
    const nextFocus = Math.min(pasted.length, length - 1)
    refs.current[nextFocus]?.focus()
  }

  function cellCls(index: number): string {
    const isFocused = focusedIndex === index
    if (error) {
      if (isFocused) return 'bg-(--bg-primary) border-(--border-action)'
      return 'bg-(--bg-error_tertiary) border-(--border-error_primary)'
    }
    if (isFocused) return 'bg-(--bg-primary) border-(--border-action)'
    return 'bg-(--bg-primary) border-(--border-default)'
  }

  return (
    <div className="flex flex-col gap-(--gap-XS) w-full">
      {showLabel && (
        <span style={{ ...textStyle, color: 'var(--text-secondary)' }}>
          {label}
        </span>
      )}

      <div className="flex gap-(--gap-XS) w-full" onPaste={handlePaste}>
        {chars.map((char, index) => (
          <input
            key={index}
            ref={el => { refs.current[index] = el }}
            type="text"
            inputMode="numeric"
            readOnly
            value={char}
            onChange={() => {}}
            onKeyDown={e => handleKeyDown(index, e)}
            onFocus={() => setFocusedIndex(index)}
            onBlur={() => setFocusedIndex(null)}
            className={`flex-1 min-w-0 border rounded-(--radius-S) transition-colors text-center outline-none py-(--padding-L) cursor-text ${cellCls(index)}`}
            style={{ ...textStyle, color: 'var(--text-primary)' }}
          />
        ))}
      </div>

      {error && (
        <span style={{ ...textStyle, color: 'var(--text-error)' }}>
          {errorMessage}
        </span>
      )}
    </div>
  )
}
