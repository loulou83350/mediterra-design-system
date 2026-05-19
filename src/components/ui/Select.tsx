import type { CSSProperties } from 'react'
import { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Icon } from './Icon'

export interface SelectOption {
  value: string
  label: string
  icon?: string
}

export interface SelectProps {
  label?: string
  showLabel?: boolean
  options: SelectOption[]
  value?: string
  onChange?: (v: string) => void
  placeholder?: string
  errorMessage?: string
  error?: boolean
  disabled?: boolean
  small?: boolean
  leadIcon?: string
}

const textStyle: CSSProperties = {
  fontFamily: 'var(--font-secondary)',
  fontWeight: 400,
  fontSize: 16,
  lineHeight: '24px',
}

export function Select({
  label = 'Label',
  showLabel = true,
  options = [],
  value,
  onChange,
  placeholder = 'Select an option',
  errorMessage = "I'm an error message",
  error = false,
  disabled = false,
  small = false,
  leadIcon,
}: SelectProps) {
  const [open, setOpen] = useState(false)
  const triggerRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const [panelRect, setPanelRect] = useState<{ top: number; left: number; width: number } | null>(null)

  const selected = options.find(o => o.value === value)

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

  function select(opt: SelectOption) {
    onChange?.(opt.value)
    close()
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
              color: selected ? 'var(--text-primary)' : 'var(--text-placeholder)',
            }}
          >
            {selected ? selected.label : placeholder}
          </span>

          <span
            className="shrink-0 transition-transform duration-150"
            style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
          >
            <Icon name="IconChevronDown" size={24} stroke={2} color="var(--fg-tertiary)" />
          </span>
        </div>
      </div>

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
            const isSelected = opt.value === value
            return (
              <div
                key={opt.value}
                className="px-(--padding-M) py-(--padding-S)"
              >
                <div
                  className={`flex items-center gap-(--gap-S) px-(--padding-M) py-(--padding-S) rounded-(--radius-XS) cursor-pointer transition-colors ${isSelected ? 'bg-(--bg-brand_tertiary)' : 'hover:bg-(--bg-brand_tertiary)'}`}
                  onClick={() => select(opt)}
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
