import type { ReactNode, CSSProperties } from 'react'
import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Icon } from './Icon'

// ─── Shared inline button styles ──────────────────────────────────────────────

const btnFont: CSSProperties = { fontFamily: 'var(--font-primary)', fontWeight: 800 }

const modalPrimary   = 'inline-flex items-center justify-center border-0 rounded-(--radius-S) transition-colors cursor-pointer whitespace-nowrap py-(--padding-L) pl-(--padding-XL) pr-(--padding-XXL) text-[18px] leading-6 bg-(--bg-action) text-(--text-action_white) hover:bg-(--bg-action_hover)'
const modalSecondary = 'inline-flex items-center justify-center border-0 rounded-(--radius-S) transition-colors cursor-pointer whitespace-nowrap py-(--padding-L) pl-(--padding-XL) pr-(--padding-XXL) text-[18px] leading-6 text-(--text-action) hover:bg-(--bg-brand_tertiary)'

const drawerPrimary   = 'inline-flex items-center justify-center border-0 rounded-(--radius-S) transition-colors cursor-pointer whitespace-nowrap w-full py-(--padding-S) pl-(--padding-M) pr-(--padding-L) text-[16px] leading-6 bg-(--bg-action) text-(--text-action_white) hover:bg-(--bg-action_hover)'
const drawerSecondary = 'inline-flex items-center justify-center border-0 rounded-(--radius-S) transition-colors cursor-pointer whitespace-nowrap w-full py-(--padding-S) pl-(--padding-M) pr-(--padding-L) text-[16px] leading-6 text-(--text-action) hover:bg-(--bg-brand_tertiary)'

// ─── Modal ────────────────────────────────────────────────────────────────────

export interface ModalProps {
  open: boolean
  onClose: () => void
  type?: 'default' | 'img-vertical' | 'img-horizontal'
  title?: string
  closeAction?: boolean
  children?: ReactNode
  imageSrc?: string
  imageAlt?: string
  primaryAction?: { label: string; onClick: () => void }
  secondaryAction?: { label: string; onClick: () => void }
}

export function Modal({
  open,
  onClose,
  type = 'default',
  title = 'Title',
  closeAction = true,
  children,
  imageSrc,
  imageAlt = '',
  primaryAction,
  secondaryAction,
}: ModalProps) {
  useEffect(() => {
    if (!open) return
    function handleKey(e: KeyboardEvent) { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [open, onClose])

  if (!open) return null

  const isHorizontal = type === 'img-horizontal'
  const hasImage = type === 'img-vertical' || type === 'img-horizontal'

  const panelMaxW = isHorizontal ? 'max-w-[900px]' : 'max-w-[600px]'

  const header = (
    <div className="flex items-center justify-between gap-(--gap-M)">
      <h4 style={{ fontFamily: 'var(--font-primary)', fontWeight: 800, fontSize: 18, lineHeight: '24px', color: 'var(--text-primary)', margin: 0 }}>
        {title}
      </h4>
      {closeAction && (
        <button type="button" onClick={onClose} className="shrink-0 flex items-center justify-center w-6 h-6 rounded-(--radius-S) hover:bg-(--bg-secondary) transition-colors border-0 bg-transparent cursor-pointer">
          <Icon name="IconX" size={24} stroke={2} color="var(--fg-secondary)" />
        </button>
      )}
    </div>
  )

  const actions = (primaryAction || secondaryAction) && (
    <div className="flex items-center justify-end gap-(--gap-M) px-(--padding-XXL) pb-(--padding-XXL)">
      {secondaryAction && (
        <button type="button" onClick={secondaryAction.onClick} className={modalSecondary} style={btnFont}>
          {secondaryAction.label}
        </button>
      )}
      {primaryAction && (
        <button type="button" onClick={primaryAction.onClick} className={modalPrimary} style={btnFont}>
          {primaryAction.label}
        </button>
      )}
    </div>
  )

  const contentArea = (
    <div className="flex flex-col gap-(--gap-XXL) p-(--padding-XXL)">
      {header}
      {children && <div>{children}</div>}
    </div>
  )

  return createPortal(
    <div
      className="fixed inset-0 flex items-center justify-center p-(--padding-L)"
      style={{ backgroundColor: 'var(--bg-overlay)', zIndex: 1000 }}
      onClick={onClose}
    >
      <div
        className={`${panelMaxW} w-full bg-(--bg-primary) border border-(--border-default) rounded-(--radius-M) overflow-hidden flex flex-col`}
        onClick={e => e.stopPropagation()}
      >
        {hasImage && !isHorizontal && (
          <div className="w-full" style={{ height: 280, flexShrink: 0 }}>
            {imageSrc
              ? <img src={imageSrc} alt={imageAlt} className="w-full h-full object-cover" />
              : <div className="w-full h-full bg-(--bg-brand_tertiary)" />
            }
          </div>
        )}

        {isHorizontal ? (
          <div className="flex flex-1 min-h-0">
            <div className="w-1/2 shrink-0 self-stretch">
              {imageSrc
                ? <img src={imageSrc} alt={imageAlt} className="w-full h-full object-cover" />
                : <div className="w-full h-full bg-(--bg-brand_tertiary)" style={{ minHeight: 320 }} />
              }
            </div>
            <div className="flex-1 flex flex-col">
              {contentArea}
              {actions}
            </div>
          </div>
        ) : (
          <>
            {contentArea}
            {actions}
          </>
        )}
      </div>
    </div>,
    document.body
  )
}

// ─── Drawer ───────────────────────────────────────────────────────────────────

export interface DrawerProps {
  open: boolean
  onClose: () => void
  title?: string
  closeAction?: boolean
  children?: ReactNode
  imageSrc?: string
  imageAlt?: string
  primaryAction?: { label: string; onClick: () => void }
  secondaryAction?: { label: string; onClick: () => void }
}

export function Drawer({
  open,
  onClose,
  title = 'Title',
  closeAction = true,
  children,
  imageSrc,
  imageAlt = '',
  primaryAction,
  secondaryAction,
}: DrawerProps) {
  useEffect(() => {
    if (!open) return
    function handleKey(e: KeyboardEvent) { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [open, onClose])

  if (!open) return null

  const hasImage = !!imageSrc
  const overlayBlur = !hasImage ? 'backdrop-blur-[8px]' : ''

  return createPortal(
    <div
      className={`fixed inset-0 flex flex-col justify-end ${overlayBlur}`}
      style={{ backgroundColor: 'var(--bg-overlay)', zIndex: 1000 }}
      onClick={onClose}
    >
      <div
        className="w-full bg-(--bg-primary) border border-(--border-default) rounded-tl-(--radius-M) rounded-tr-(--radius-M) overflow-hidden flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {hasImage && (
          <div className="w-full" style={{ height: 250, flexShrink: 0 }}>
            <img src={imageSrc} alt={imageAlt} className="w-full h-full object-cover" />
          </div>
        )}

        {/* Content */}
        <div className="flex flex-col gap-(--gap-L) p-(--padding-L)">
          <div className="flex items-center justify-between gap-(--gap-M)">
            <h4 style={{ fontFamily: 'var(--font-primary)', fontWeight: 800, fontSize: 18, lineHeight: '24px', color: 'var(--text-primary)', margin: 0 }}>
              {title}
            </h4>
            {closeAction && (
              <button type="button" onClick={onClose} className="shrink-0 flex items-center justify-center w-6 h-6 rounded-(--radius-S) hover:bg-(--bg-secondary) transition-colors border-0 bg-transparent cursor-pointer">
                <Icon name="IconX" size={24} stroke={2} color="var(--fg-secondary)" />
              </button>
            )}
          </div>
          {children && <div>{children}</div>}
        </div>

        {/* Actions — vertical, full-width, separated by border */}
        {(primaryAction || secondaryAction) && (
          <div className="flex flex-col gap-(--gap-S) border-t border-(--border-default) p-(--padding-L)">
            {primaryAction && (
              <button type="button" onClick={primaryAction.onClick} className={drawerPrimary} style={btnFont}>
                {primaryAction.label}
              </button>
            )}
            {secondaryAction && (
              <button type="button" onClick={secondaryAction.onClick} className={drawerSecondary} style={btnFont}>
                {secondaryAction.label}
              </button>
            )}
          </div>
        )}
      </div>
    </div>,
    document.body
  )
}
