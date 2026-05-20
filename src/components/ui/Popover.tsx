import { useState, useRef, useLayoutEffect, useEffect } from 'react'
import type { CSSProperties, ReactNode } from 'react'
import { createPortal } from 'react-dom'

// ─── Types ────────────────────────────────────────────────────────────────────

export type PopoverSide = 'Center' | 'Left' | 'Right'

export interface PopoverProps {
  /** Horizontal alignment relative to trigger */
  side?:        PopoverSide
  /** true = panel above trigger, false = below */
  top?:         boolean
  title?:       string
  children?:    ReactNode
  actionLabel?: string
  showAction?:  boolean
  onAction?:    () => void
  /** The element that triggers the popover on click */
  trigger:      ReactNode
  /** Controlled open state (optional) */
  open?:        boolean
  onOpenChange?: (v: boolean) => void
}

// ─── Constants ────────────────────────────────────────────────────────────────

const PANEL_W = 400
const TRI     = 7    // triangle size (slightly larger than tooltip)
const GAP     = 8
const EDGE    = 8

// ─── Helpers ─────────────────────────────────────────────────────────────────

function clamp(v: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(v, hi))
}

function resolvePos(
  tr:       DOMRect,
  pw:       number,
  ph:       number,
  side:     PopoverSide,
  topProp:  boolean,
): { x: number; y: number; effectiveTop: boolean; triX: number } {
  const vw = window.innerWidth
  const vh = window.innerHeight
  const reach = TRI + GAP

  // Auto-flip vertically if not enough room
  let effectiveTop = topProp
  if (effectiveTop  && tr.top    - ph - reach < EDGE)      effectiveTop = false
  if (!effectiveTop && tr.bottom + ph + reach > vh - EDGE) effectiveTop = true

  const y = effectiveTop
    ? tr.top    - ph - reach
    : tr.bottom + reach

  // Horizontal: align based on side, then clamp
  let x: number
  switch (side) {
    case 'Center': x = tr.left + tr.width / 2 - pw / 2; break
    case 'Left':   x = tr.left;                          break
    case 'Right':  x = tr.right - pw;                    break
  }
  const cx = clamp(x, EDGE, vw - pw - EDGE)

  // Triangle always points to trigger center, regardless of panel clamping
  const trigCenterX = tr.left + tr.width / 2
  const triX = clamp(trigCenterX - cx, TRI + 8, pw - TRI - 8)

  return {
    x:           cx,
    y:           clamp(y, EDGE, vh - ph - EDGE),
    effectiveTop,
    triX,
  }
}

// ─── Component ────────────────────────────────────────────────────────────────

export function Popover({
  side        = 'Center',
  top:  topProp = true,
  title       = 'Label',
  children,
  actionLabel = 'Action',
  showAction  = true,
  onAction,
  trigger,
  open:        openProp,
  onOpenChange,
}: PopoverProps) {
  const [openState, setOpenState] = useState(false)
  const open = openProp !== undefined ? openProp : openState

  const [ready, setReady] = useState(false)
  const [pos, setPos] = useState<{
    x: number; y: number; effectiveTop: boolean; triX: number
  } | null>(null)

  const triggerRef = useRef<HTMLDivElement>(null)
  const panelRef   = useRef<HTMLDivElement>(null)

  function setOpen(next: boolean) {
    if (onOpenChange) onOpenChange(next)
    else setOpenState(next)
    if (!next) setReady(false)
  }

  function toggle() { setOpen(!open) }
  function close()  { setOpen(false) }

  // Measure + position after panel renders
  useLayoutEffect(() => {
    if (!open || !panelRef.current || !triggerRef.current) return
    const tr = triggerRef.current.getBoundingClientRect()
    const pr = panelRef.current.getBoundingClientRect()
    setPos(resolvePos(tr, pr.width, pr.height, side, topProp))
    setReady(true)
  }, [open, side, topProp])

  // Close on Escape or outside click
  useEffect(() => {
    if (!open) return
    function onKey(e: KeyboardEvent) { if (e.key === 'Escape') close() }
    function onDown(e: MouseEvent) {
      const t = e.target as Node
      if (triggerRef.current?.contains(t)) return
      if (panelRef.current?.contains(t))   return
      close()
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('mousedown', onDown)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('mousedown', onDown)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  const effectiveTop = pos?.effectiveTop ?? topProp
  const triX         = pos?.triX ?? PANEL_W / 2

  const titleSt: CSSProperties = {
    fontFamily: 'var(--font-secondary)',
    fontWeight: 700,
    fontSize:   14,
    lineHeight: '20px',
    color:      'var(--text-primary)',
    margin:     0,
  }

  const actionSt: CSSProperties = {
    fontFamily: 'var(--font-primary)',
    fontWeight: 800,
    fontSize:   16,
    lineHeight: '24px',
    color:      'var(--text-action)',
    background: 'none',
    border:     'none',
    padding:    0,
    cursor:     'pointer',
    display:    'inline',
  }

  // CSS triangle: two overlapping divs for the "bordered" effect
  function triStyle(size: number, color: string): CSSProperties {
    const s = `${size}px solid ${color}`
    const t = `${size}px solid transparent`
    return effectiveTop
      ? { position: 'absolute', width: 0, height: 0,
          bottom:      -size,
          left:        triX,
          transform:   'translateX(-50%)',
          borderLeft:  t, borderRight: t, borderTop: s }
      : { position: 'absolute', width: 0, height: 0,
          top:         -size,
          left:        triX,
          transform:   'translateX(-50%)',
          borderLeft:  t, borderRight: t, borderBottom: s }
  }

  return (
    <div ref={triggerRef} style={{ display: 'inline-flex', position: 'relative' }}>
      <div onClick={toggle} style={{ display: 'inline-flex', cursor: 'pointer' }}>
        {trigger}
      </div>

      {open && createPortal(
        <div
          ref={panelRef}
          style={{
            position:     'fixed',
            left:         pos?.x ?? 0,
            top:          pos?.y ?? 0,
            width:        PANEL_W,
            zIndex:       9999,
            opacity:      ready ? 1 : 0,
            transition:   ready ? 'opacity 120ms ease' : 'none',
            background:   'var(--bg-primary)',
            border:       '1px solid var(--border-brand)',
            borderRadius: 'var(--radius-S)',
            padding:      'var(--padding-L)',
            overflow:     'visible',
            boxShadow:    '0 4px 24px rgba(0,0,0,0.10)',
          }}
        >
          {/* Triangle — outer (border-brand color) */}
          <div style={triStyle(TRI + 1, 'var(--border-brand)')} />
          {/* Triangle — inner (bg-primary color), covers the interior */}
          <div style={triStyle(TRI, 'var(--bg-primary)')} />

          {/* Content */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--gap-S)' }}>
            <p style={titleSt}>{title}</p>

            {children && (
              <div style={{ color: 'var(--text-secondary)' }}>
                {children}
              </div>
            )}

            {showAction && (
              <button type="button" style={actionSt} onClick={onAction}>
                {actionLabel}
              </button>
            )}
          </div>
        </div>,
        document.body,
      )}
    </div>
  )
}
