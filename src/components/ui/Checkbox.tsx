import { useRef, useEffect } from 'react'
import { Icon } from './Icon'

export type CheckboxState = 'off' | 'on' | 'partial'

export interface CheckboxProps {
  state?: CheckboxState
  label?: string
  showLabel?: boolean
  onChange?: (next: CheckboxState) => void
}

const boxBase = 'relative w-6 h-6 rounded-(--radius-XS) border flex items-center justify-center shrink-0 transition-colors'

const boxStyles: Record<CheckboxState, string> = {
  off:     `${boxBase} bg-white border-(--border-default) group-hover:bg-(--bg-brand_tertiary) group-hover:border-(--border-brand)`,
  on:      `${boxBase} bg-(--bg-succes_primary) border-transparent group-hover:bg-(--bg-action)`,
  partial: `${boxBase} bg-(--bg-warning_primary) border-transparent group-hover:bg-(--bg-action)`,
}

export function Checkbox({
  state = 'off',
  label = 'Choice 1',
  showLabel = true,
  onChange,
}: CheckboxProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = state === 'partial'
      inputRef.current.checked = state === 'on'
    }
  }, [state])

  function handleChange() {
    if (!onChange) return
    onChange(state === 'off' ? 'on' : 'off')
  }

  return (
    <label
      className="inline-flex items-center gap-(--gap-S) cursor-pointer group select-none"
      style={{ userSelect: 'none' }}
    >
      <input
        ref={inputRef}
        type="checkbox"
        className="sr-only"
        onChange={handleChange}
      />
      <div className={boxStyles[state]}>
        {state === 'on' && <Icon name="IconCheck" size={14} stroke={2.5} color="white" />}
        {state === 'partial' && <Icon name="IconMinus" size={14} stroke={2.5} color="white" />}
      </div>
      {showLabel && (
        <span style={{ fontFamily: 'var(--font-secondary)', fontWeight: 400, fontSize: 16, lineHeight: '24px', color: 'var(--text-primary)' }}>
          {label}
        </span>
      )}
    </label>
  )
}
