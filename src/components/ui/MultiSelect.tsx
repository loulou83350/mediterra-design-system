import type { CSSProperties } from 'react'
import { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Icon } from './Icon'

export interface MultiSelectOption {
  value: string
  label: string
  icon?: string
}

export interface MultiSelectProps {
  label?: string
  showLabel?: boolean
  options: MultiSelectOption[]
  value?: string[]
  onChange?: (v: string[]) => void
  placeholder?: string
  errorMessage?: string
  error?: boolean
  disabled?: boolean
  small?: boolean
  leadIcon?: string
  maxVisible?: number
}

const textStyle: CSSProperties = {
  fontFamily: 'var(--font-secondary)',
  fontWeight: 400,
  fontSize: 16,
  lineHeight: '24px',
}

const chipTextStyle: CSSProperties = {
  fontFamily: 'var(--font-secondary)',
  fontWeight: 700,
  fontSize: 16,
  lineHeight: '24px',
}

export function MultiSelect({
  label = 'Label',
  showLabel = true,
  options = [],
  value = [],
  onChange,
  placeholder = 'Select options',
  errorMessage = "I'm an error message",
  error = false,
  disabled = false,
  small = false,
  leadIcon,
  maxVisible = 3,
}: MultiSelectProps) {
  const [open, setOpen] = useState(false)
  const triggerRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const [panelRect, setPanelRect] = useState<{ top: number; left: number; width: number } | null>(null)

  const selectedSet = new Set(value)

  function calcRect() {
    if (!triggerRef.current) return null
    const r = triggerRef.current.getBoundingClientRect()
    return { top: r.bottom + 4, left: r.left, width: r.width }
  }

  function openPanel() {
    const rect = calcRect()
    if (!rect) return
    setPanelRect(rect)
    setOpen(true)
  }

  function close() {
    setOpen(false)
  }

  function toggle(optValue: string) {
    const next = new Set(selectedSet)
    if (next.has(optValue)) next.delete(optValue)
    else next.add(optValue)
    onChange?.(Array.from(next))
  }

  function remove(optValue: string) {
    onChange?.(value.filter(v => v !== optValue))
  }

  useEffect(() => {
    if (!open) return
    function handleKey(e: KeyboardEvent) { if (e.key === 'Escape') close() }
    function handleMouseDown(e: MouseEvent) {
      const target = e.target as Node
      if (triggerRef.current?.contains(target)) return
      if (panelRef.current?.contains(target)) return
      close()
    }
    function updatePosition() {
      const rect = calcRect()
      if (rect) setPanelRect(rect)
    }
    document.addEventListener('keydown', handleKey)
    document.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('scroll', updatePosition, true)
    window.addEventListener('resize', updatePosition)
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('scroll', updatePosition, true)
      window.removeEventListener('resize', updatePosition)
    }
  }, [open])

  const triggerCls = [
    'flex items-center border rounded-(--radius-S) transition-colors cursor-pointer w-full select-none',
    small ? 'px-(--padding-L) py-(--padding-S) gap-(--gap-S)' : 'px-(--padding-XXL) py-(--padding-L) gap-(--gap-S)',
    disabled ? 'opacity-50 pointer-events-none' : '',
    open
      ? 'bg-(--bg-primary) border-(--border-action)'
      : error
        ? 'bg-(--bg-error_tertiary) border-(--border-error_primary)'
        : 'bg-(--bg-primary) border-(--border-default) hover:border-(--border-action_hover)',
  ].filter(Boolean).join(' ')

  const visibleChips = value.slice(0, maxVisible)
  const overflowCount = value.length - maxVisible

  const selectedLabels = value.map(v => options.find(o => o.value === v)?.label ?? v)
  const displayText = value.length === 0
    ? placeholder
    : selectedLabels.slice(0, maxVisible).join(', ') + (overflowCount > 0 ? ` +${overflowCount}` : '')

  return (
    <div className="flex flex-col gap-(--gap-XS) w-full">
      {showLabel && (
        <span style={{ ...textStyle, color: 'var(--text-primary)', opacity: disabled ? 0.5 : 1 }}>
          {label}
        </span>
      )}

      <div className="relative w-full">
        <div
          ref={triggerRef}
          className={triggerCls}
          onClick={disabled ? undefined : open ? close : openPanel}
        >
          {leadIcon && (
            <Icon name={leadIcon} size={24} stroke={2} color="var(--fg-tertiary)" />
          )}

          <span
            className="flex-1 min-w-0 truncate"
            style={{
              ...textStyle,
              color: value.length > 0 ? 'var(--text-primary)' : 'var(--text-placeholder)',
            }}
          >
            {displayText}
          </span>

          <span
            className="shrink-0 transition-transform duration-150"
            style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
          >
            <Icon name="IconChevronDown" size={24} stroke={2} color="var(--fg-tertiary)" />
          </span>
        </div>
      </div>

      {/* Chips below trigger */}
      {value.length > 0 && (
        <div className="flex flex-wrap gap-(--gap-S)">
          {visibleChips.map(v => {
            const opt = options.find(o => o.value === v)
            return (
              <div
                key={v}
                className="inline-flex items-center gap-(--gap-XS) rounded-(--radius-max) py-(--padding-XS) px-(--padding-M)"
                style={{ backgroundColor: 'var(--bg-neutral_primary)' }}
              >
                <span style={{ ...chipTextStyle, color: 'var(--text-invert)' }}>
                  {opt?.label ?? v}
                </span>
                <button
                  type="button"
                  onClick={() => remove(v)}
                  className="cursor-pointer opacity-80 hover:opacity-100 transition-opacity"
                >
                  <Icon name="IconX" size={16} stroke={2} color="var(--text-invert)" />
                </button>
              </div>
            )
          })}
          {overflowCount > 0 && (
            <div
              className="inline-flex items-center rounded-(--radius-max) py-(--padding-XS) px-(--padding-M)"
              style={{ backgroundColor: 'var(--bg-neutral_secondary)' }}
            >
              <span style={{ ...chipTextStyle, color: 'var(--text-neutral)' }}>
                +{overflowCount}
              </span>
            </div>
          )}
        </div>
      )}

      {error && !open && (
        <span style={{ ...textStyle, color: 'var(--text-error)' }}>
          {errorMessage}
        </span>
      )}

      {open && panelRect && createPortal(
        <div
          ref={panelRef}
          style={{
            position: 'fixed',
            top: panelRect.top,
            left: panelRect.left,
            width: panelRect.width,
            zIndex: 9999,
          }}
          className="bg-(--bg-primary) border border-(--border-action) rounded-(--radius-S) shadow-lg overflow-hidden py-(--padding-XS)"
        >
          {options.map(opt => {
            const isSelected = selectedSet.has(opt.value)
            return (
              <div
                key={opt.value}
                className="px-(--padding-M) py-(--padding-S)"
              >
                <div
                  className={`flex items-center gap-(--gap-S) px-(--padding-M) py-(--padding-S) rounded-(--radius-XS) cursor-pointer transition-colors ${isSelected ? 'bg-(--bg-brand_tertiary)' : 'hover:bg-(--bg-brand_tertiary)'}`}
                  onClick={() => toggle(opt.value)}
                >
                  {opt.icon && (
                    <Icon name={opt.icon} size={24} stroke={2} color="var(--fg-tertiary)" />
                  )}
                  <span
                    className="flex-1 min-w-0 truncate"
                    style={{ ...textStyle, color: 'var(--text-primary)' }}
                  >
                    {opt.label}
                  </span>
                  {isSelected && (
                    <Icon name="IconCircleCheck" size={20} stroke={2} color="var(--fg-brand_primary)" />
                  )}
                </div>
              </div>
            )
          })}
        </div>,
        document.body
      )}
    </div>
  )
}
