import React, { useState, useRef, useEffect, useMemo } from 'react'
import { createPortal } from 'react-dom'
import * as TablerIcons from '@tabler/icons-react'
import { Switch } from '../components/ui/Switch'

// ─── Icon catalogue ───────────────────────────────────────────────────────────

const ALL_ICON_NAMES = (Object.keys(TablerIcons) as string[]).filter(k => /^Icon[A-Z]/.test(k))

// ─── Control primitives ───────────────────────────────────────────────────────

interface ControlProps {
  label: string
  children: React.ReactNode
}

export function Control({ label, children }: ControlProps) {
  return (
    <div className="flex flex-col gap-(--gap-XS)">
      <label className="text-xs font-semibold text-(--fg-tertiary) uppercase tracking-widest">{label}</label>
      {children}
    </div>
  )
}

interface ControlSelectProps {
  value: string
  options: string[]
  onChange: (v: string) => void
}

export function ControlSelect({ value, options, onChange }: ControlSelectProps) {
  return (
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      className="h-8 px-(--padding-S) rounded-(--radius-S) border border-(--border-default) text-sm text-(--fg-primary) bg-(--bg-primary) outline-none focus:border-(--border-action) w-full cursor-pointer"
    >
      {options.map(o => <option key={o} value={o}>{o}</option>)}
    </select>
  )
}

interface ControlToggleProps {
  value: boolean
  onChange: (v: boolean) => void
}

export function ControlToggle({ value, onChange }: ControlToggleProps) {
  return <Switch checked={value} onChange={onChange} />
}

// ─── IconPicker ───────────────────────────────────────────────────────────────

interface IconPickerProps {
  value: string
  onChange: (name: string) => void
}

export function IconPicker({ value, onChange }: IconPickerProps) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const triggerRef = useRef<HTMLButtonElement>(null)
  const [dropdownRect, setDropdownRect] = useState<{ top: number; left: number; width: number } | null>(null)

  const filtered = useMemo(() =>
    ALL_ICON_NAMES
      .filter(n => !search || n.toLowerCase().includes(search.toLowerCase()))
      .slice(0, 60),
    [search]
  )

  function handleOpen() {
    if (!triggerRef.current) return
    const r = triggerRef.current.getBoundingClientRect()
    setDropdownRect({ top: r.bottom + 4, left: r.left, width: Math.max(r.width, 220) })
    setOpen(o => !o)
  }

  useEffect(() => {
    if (!open) return
    function handler(e: MouseEvent) {
      const target = e.target as Node
      if (triggerRef.current?.contains(target)) return
      setOpen(false)
      setSearch('')
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  const PreviewIcon = TablerIcons[value as keyof typeof TablerIcons] as React.ComponentType<any> | undefined
  const ChevronIcon = TablerIcons['IconChevronDown'] as React.ComponentType<any>

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={handleOpen}
        className="h-8 w-full flex items-center gap-(--gap-S) px-(--padding-S) rounded-(--radius-S) border border-(--border-default) bg-(--bg-primary) hover:border-(--border-brand) transition-colors"
      >
        <span className="w-4 h-4 flex items-center justify-center shrink-0">
          {PreviewIcon
            ? <PreviewIcon size={16} stroke={2} color="var(--fg-secondary)" />
            : <span className="w-3 h-3 rounded-full bg-(--bg-quaterny)" />
          }
        </span>
        <span className="flex-1 text-left font-mono text-xs text-(--fg-primary) truncate">{value}</span>
        <ChevronIcon size={14} stroke={2} color="var(--fg-tertiary)" />
      </button>

      {open && dropdownRect && createPortal(
        <div
          style={{
            position: 'fixed',
            top: dropdownRect.top,
            left: dropdownRect.left,
            width: dropdownRect.width,
            zIndex: 9999,
          }}
          onMouseDown={e => e.stopPropagation()}
          className="bg-(--bg-primary) border border-(--border-default) rounded-(--radius-M) shadow-lg overflow-hidden"
        >
          <div className="p-(--padding-S) border-b border-(--border-default)">
            <input
              autoFocus
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search icons…"
              className="w-full h-7 px-(--padding-S) rounded-(--radius-S) border border-(--border-default) text-xs text-(--fg-primary) bg-(--bg-secondary) outline-none focus:border-(--border-brand)"
            />
          </div>
          <div className="grid grid-cols-6 gap-0.5 p-(--padding-S) max-h-52 overflow-y-auto">
            {filtered.map(name => {
              const Ic = TablerIcons[name as keyof typeof TablerIcons] as React.ComponentType<any> | undefined
              if (!Ic) return null
              const isActive = name === value
              return (
                <button
                  key={name}
                  type="button"
                  title={name}
                  onClick={() => { onChange(name); setOpen(false); setSearch('') }}
                  className={`flex items-center justify-center rounded-(--radius-S) aspect-square transition-colors ${
                    isActive
                      ? 'bg-(--bg-brand_tertiary)'
                      : 'hover:bg-(--bg-secondary)'
                  }`}
                  style={{ height: 36 }}
                >
                  <Ic
                    size={18}
                    stroke={2}
                    color={isActive ? 'var(--fg-brand_primary)' : 'var(--fg-secondary)'}
                  />
                </button>
              )
            })}
          </div>
          {filtered.length === 0 && (
            <p className="text-xs text-(--fg-tertiary) text-center py-(--padding-L)">No icons found</p>
          )}
        </div>,
        document.body
      )}
    </>
  )
}

// ─── ComponentPage ────────────────────────────────────────────────────────────

interface ComponentPageProps {
  title: string
  description: string
  controls: React.ReactNode
  preview: React.ReactNode
  states: { label: string; node: React.ReactNode }[]
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-semibold text-(--fg-tertiary) uppercase tracking-widest">
      {children}
    </p>
  )
}

export function ComponentPage({ title, description, controls, preview, states }: ComponentPageProps) {
  return (
    <div className="flex flex-col min-h-screen">

      {/* Header */}
      <header className="px-(--padding-XXXL) pt-(--padding-XXXL) pb-(--padding-XXL) border-b border-(--border-default) bg-(--bg-primary)">
        <h1 style={{ fontFamily: 'var(--font-primary)', fontSize: 32, lineHeight: '40px', fontWeight: 800 }}>
          {title}
        </h1>
        <p className="mt-(--gap-S) text-sm text-(--fg-secondary) max-w-lg leading-relaxed">
          {description}
        </p>
      </header>

      <div className="flex flex-1">

        {/* Main content */}
        <div className="flex-1 min-w-0 p-(--padding-XXXL) flex flex-col gap-(--gap-XXXL)">

          {/* Playground */}
          <section className="flex flex-col gap-(--gap-M)">
            <SectionLabel>Playground</SectionLabel>
            <div className="bg-(--bg-primary) border border-(--border-default) rounded-(--radius-L) p-(--padding-XXXL) flex items-center justify-center min-h-48">
              {preview}
            </div>
          </section>

          {/* States */}
          <section className="flex flex-col gap-(--gap-M)">
            <SectionLabel>All states</SectionLabel>
            <div className="flex flex-col gap-(--gap-S)">
              {states.map(({ label, node }) => (
                <div key={label} className="bg-(--bg-primary) border border-(--border-default) rounded-(--radius-L) overflow-hidden">
                  <div className="px-(--padding-L) py-(--padding-S) border-b border-(--border-default) bg-(--bg-secondary)">
                    <p className="text-xs font-medium text-(--fg-tertiary)">{label}</p>
                  </div>
                  <div className="p-(--padding-XL) flex flex-wrap items-center gap-(--gap-M)">
                    {node}
                  </div>
                </div>
              ))}
            </div>
          </section>

        </div>

        {/* Controls sidebar */}
        <aside className="w-64 shrink-0 border-l border-(--border-default) bg-(--bg-primary) flex flex-col">
          <div className="px-(--padding-L) py-(--padding-M) border-b border-(--border-default)">
            <p className="text-xs font-semibold text-(--fg-tertiary) uppercase tracking-widest">Controls</p>
          </div>
          <div className="p-(--padding-L) flex flex-col gap-(--gap-L) overflow-y-auto">
            {controls}
          </div>
        </aside>

      </div>
    </div>
  )
}
