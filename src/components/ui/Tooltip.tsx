import { useState, useRef, useLayoutEffect } from 'react'
import type { CSSProperties, ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { Icon } from './Icon'

// ─── Types ────────────────────────────────────────────────────────────────────

export type TooltipColor = 'Subtle' | 'Contrast' | 'Accent'
export type TooltipType  = 'default' | 'icon' | 'link'
export type TooltipSide  = 'top' | 'bottom' | 'left' | 'right'

export interface TooltipProps {
  color?:       TooltipColor
  type?:        TooltipType
  side?:        TooltipSide
  label?:       string
  linkLabel?:   string
  onLinkClick?: () => void
  onClose?:     () => void
  children:     ReactNode
}

// ─── Token map ────────────────────────────────────────────────────────────────

const TOKEN = {
  Subtle:   {
    bg:        'var(--bg-secondary)',
    border:    '1px solid var(--border-default)',
    text:      'var(--text-primary)',
    triBorder: 'var(--border-default)' as string | null,
  },
  Contrast: {
    bg:        'var(--bg-tooltips)',
    border:    'none',
    text:      'var(--text-invert)',
    triBorder: null as string | null,
  },
  Accent: {
    bg:        'var(--bg-neutral_primary)',
    border:    'none',
    text:      'var(--text-invert)',
    triBorder: null as string | null,
  },
}

// ─── Constants ────────────────────────────────────────────────────────────────

const TRI  = 6   // inner triangle size px
const GAP  = 8   // space between panel and trigger
const EDGE = 8   // minimum distance from viewport edge

// ─── Helpers ─────────────────────────────────────────────────────────────────

function clamp(v: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(v, hi))
}

function resolvePos(
  tr: DOMRect,
  pw: number,
  ph: number,
  reqSide: TooltipSide,
): { x: number; y: number; side: TooltipSide } {
  const vw = window.innerWidth
  const vh = window.innerHeight
  const reach = TRI + GAP

  // Auto-flip if not enough room
  let side = reqSide
  if (side === 'top'    && tr.top    - ph - reach < EDGE)      side = 'bottom'
  if (side === 'bottom' && tr.bottom + ph + reach > vh - EDGE) side = 'top'
  if (side === 'left'   && tr.left   - pw - reach < EDGE)      side = 'right'
  if (side === 'right'  && tr.right  + pw + reach > vw - EDGE) side = 'left'

  let x = 0, y = 0
  switch (side) {
    case 'top':
      x = tr.left + tr.width  / 2 - pw / 2
      y = tr.top  - ph - reach
      break
    case 'bottom':
      x = tr.left + tr.width  / 2 - pw / 2
      y = tr.bottom + reach
      break
    case 'left':
      x = tr.left  - pw - reach
      y = tr.top   + tr.height / 2 - ph / 2
      break
    case 'right':
      x = tr.right + reach
      y = tr.top   + tr.height / 2 - ph / 2
      break
  }

  return {
    x:    clamp(x, EDGE, vw - pw - EDGE),
    y:    clamp(y, EDGE, vh - ph - EDGE),
    side,
  }
}

// ─── CSS triangle ─────────────────────────────────────────────────────────────
// Two layers: outer (border color) + inner (bg color) for Subtle.
// For Contrast/Accent (no border) only the inner renders.

type TriangleProps = {
  side:        TooltipSide
  bgColor:     string
  borderColor: string | null
}

function Triangle({ side, bgColor, borderColor }: TriangleProps) {
  function style(size: number, color: string): CSSProperties {
    const s = `${size}px solid ${color}`
    const t = `${size}px solid transparent`
    const base: CSSProperties = { position: 'absolute', width: 0, height: 0 }

    switch (side) {
      case 'top':
        return { ...base, bottom: -size, left: '50%', transform: 'translateX(-50%)',
          borderLeft: t, borderRight: t, borderTop: s }
      case 'bottom':
        return { ...base, top: -size, left: '50%', transform: 'translateX(-50%)',
          borderLeft: t, borderRight: t, borderBottom: s }
      case 'left':
        return { ...base, right: -size, top: '50%', transform: 'translateY(-50%)',
          borderTop: t, borderBottom: t, borderLeft: s }
      case 'right':
        return { ...base, left: -size, top: '50%', transform: 'translateY(-50%)',
          borderTop: t, borderBottom: t, borderRight: s }
    }
  }

  return (
    <>
      {borderColor && <div style={style(TRI + 1, borderColor)} />}
      <div style={style(TRI, bgColor)} />
    </>
  )
}

// ─── Component ────────────────────────────────────────────────────────────────

export function Tooltip({
  color     = 'Contrast',
  type      = 'default',
  side:     sideProp = 'top',
  label     = 'Tooltip text',
  linkLabel = 'Learn more',
  onLinkClick,
  onClose,
  children,
}: TooltipProps) {
  const [visible, setVisible] = useState(false)
  const [ready,   setReady]   = useState(false)
  const [pos, setPos] = useState<{ x: number; y: number; side: TooltipSide }>({
    x: 0, y: 0, side: sideProp,
  })

  const triggerRef = useRef<HTMLDivElement>(null)
  const panelRef   = useRef<HTMLDivElement>(null)
  const hideTimer  = useRef<ReturnType<typeof setTimeout>>(undefined)

  const tok = TOKEN[color]

  function show() {
    clearTimeout(hideTimer.current)
    setReady(false)
    setVisible(true)
  }

  function hide() {
    hideTimer.current = setTimeout(() => {
      setVisible(false)
      setReady(false)
    }, 80)
  }

  function cancelHide() {
    clearTimeout(hideTimer.current)
  }

  // Measure panel after first render, then position it correctly
  useLayoutEffect(() => {
    if (!visible || !panelRef.current || !triggerRef.current) return
    const tr = triggerRef.current.getBoundingClientRect()
    const pr = panelRef.current.getBoundingClientRect()
    setPos(resolvePos(tr, pr.width, pr.height, sideProp))
    setReady(true)
  }, [visible, sideProp])

  const textSt: CSSProperties = {
    fontFamily: 'var(--font-secondary)',
    fontWeight: 400,
    fontSize:   14,
    lineHeight: '20px',
    color:      tok.text,
  }

  const panelSt: CSSProperties = {
    position:     'fixed',
    left:         pos.x,
    top:          pos.y,
    zIndex:       9999,
    opacity:      ready ? 1 : 0,
    transition:   ready ? 'opacity 100ms ease' : 'none',
    background:   tok.bg,
    border:       tok.border,
    borderRadius: 'var(--radius-M)',
    padding:      'var(--padding-L)',
    maxWidth:     240,
    minWidth:     80,
    overflow:     'visible',
    // Only interactive types need pointer-events (icon has close btn, link has click)
    pointerEvents: type !== 'default' ? 'auto' : 'none',
  }

  return (
    <div
      ref={triggerRef}
      style={{ display: 'inline-flex', position: 'relative' }}
      onMouseEnter={show}
      onMouseLeave={hide}
    >
      {children}

      {visible && createPortal(
        <div
          ref={panelRef}
          style={panelSt}
          onMouseEnter={cancelHide}
          onMouseLeave={hide}
        >
          <Triangle side={pos.side} bgColor={tok.bg} borderColor={tok.triBorder} />

          {type === 'icon' && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--gap-S)' }}>
              <span style={textSt}>{label}</span>
              <button
                type="button"
                onClick={onClose}
                style={{ background: 'none', border: 'none', padding: 2, cursor: 'pointer',
                  borderRadius: 4, display: 'flex', opacity: 1 }}
              >
                <Icon name="IconX" size={20} stroke={2} color={tok.text} />
              </button>
            </div>
          )}

          {type === 'link' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <span style={textSt}>{label}</span>
              <span
                onClick={onLinkClick}
                style={{ ...textSt, textDecoration: 'underline', cursor: 'pointer' }}
              >
                {linkLabel}
              </span>
            </div>
          )}

          {type === 'default' && (
            <span style={textSt}>{label}</span>
          )}
        </div>,
        document.body,
      )}
    </div>
  )
}
