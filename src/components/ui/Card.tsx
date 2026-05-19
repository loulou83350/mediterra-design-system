import type { ReactNode, CSSProperties } from 'react'
import { Icon } from './Icon'

type Action = { label: string; onClick: () => void }

// ─── Shared button base ───────────────────────────────────────────────────────
// Same pattern as Button.tsx: className for hover tokens, style for font.

const btnFont: CSSProperties = { fontFamily: 'var(--font-primary)', fontWeight: 800 }

const btnBase = 'inline-flex items-center justify-center border-0 rounded-(--radius-S) transition-colors cursor-pointer whitespace-nowrap text-[16px] leading-6 py-(--padding-S) pl-(--padding-M) pr-(--padding-L)'

const btnStyles = {
  primary:      `${btnBase} bg-(--bg-action) text-(--text-action_white) hover:bg-(--bg-action_hover)`,
  secondary:    `${btnBase} text-(--text-action) hover:bg-(--bg-brand_tertiary)`,
  ctaPrimary:   `${btnBase} bg-(--bg-action_white) text-(--text-action) hover:bg-(--bg-action_white_hover)`,
  ctaSecondary: `${btnBase} text-(--text-action_white) hover:bg-white/10`,
}

// ─── ActionGroup ──────────────────────────────────────────────────────────────

function ActionGroup({
  primary,
  secondary,
  justify = 'end',
}: {
  primary?: Action
  secondary?: Action
  justify?: 'start' | 'end'
}) {
  if (!primary && !secondary) return null
  return (
    <div
      style={{ display: 'flex', gap: 'var(--gap-M)', width: '100%', justifyContent: justify === 'end' ? 'flex-end' : 'flex-start' }}
    >
      {justify === 'end' && secondary && (
        <button type="button" onClick={secondary.onClick} className={btnStyles.secondary} style={btnFont}>{secondary.label}</button>
      )}
      {justify === 'end' && primary && (
        <button type="button" onClick={primary.onClick} className={btnStyles.primary} style={btnFont}>{primary.label}</button>
      )}
      {justify === 'start' && primary && (
        <button type="button" onClick={primary.onClick} className={btnStyles.ctaPrimary} style={btnFont}>{primary.label}</button>
      )}
      {justify === 'start' && secondary && (
        <button type="button" onClick={secondary.onClick} className={btnStyles.ctaSecondary} style={btnFont}>{secondary.label}</button>
      )}
    </div>
  )
}

// ─── Card ─────────────────────────────────────────────────────────────────────

export interface CardProps {
  icon?: string
  showIcon?: boolean
  title?: string
  showTitle?: boolean
  children?: ReactNode
  primaryAction?: Action
  secondaryAction?: Action
}

export function Card({
  icon = 'IconComponents',
  showIcon = true,
  title = 'Title',
  showTitle = true,
  children,
  primaryAction,
  secondaryAction,
}: CardProps) {
  return (
    <div style={{ backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-default)', borderRadius: 'var(--radius-M)', padding: 'var(--padding-XXL)', display: 'flex', flexDirection: 'column', gap: 'var(--gap-L)', width: '100%' }}>
      {showIcon && (
        <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--bg-brand_tertiary)', padding: 'var(--padding-S)', borderRadius: 'var(--radius-XS)', alignSelf: 'flex-start' }}>
          <Icon name={icon as any} size={24} stroke={2} color="var(--fg-brand_primary)" />
        </div>
      )}
      {showTitle && (
        <p style={{ fontFamily: 'var(--font-primary)', fontWeight: 800, fontSize: 18, lineHeight: '24px', color: 'var(--text-primary)', margin: 0 }}>
          {title}
        </p>
      )}
      {children}
      <ActionGroup primary={primaryAction} secondary={secondaryAction} justify="end" />
    </div>
  )
}

// ─── CardImage ────────────────────────────────────────────────────────────────

export interface CardImageProps {
  vertical?: boolean
  imageSrc?: string
  imageAlt?: string
  title?: string
  showTitle?: boolean
  children?: ReactNode
  primaryAction?: Action
  secondaryAction?: Action
}

export function CardImage({
  vertical = true,
  imageSrc,
  imageAlt = '',
  title = 'Title',
  showTitle = true,
  children,
  primaryAction,
  secondaryAction,
}: CardImageProps) {
  return (
    <div style={{ backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-default)', borderRadius: 'var(--radius-M)', overflow: 'hidden', display: 'flex', flexDirection: vertical ? 'column' : 'row', width: '100%' }}>
      <div style={{ backgroundColor: 'var(--bg-brand_tertiary)', flexShrink: 0, overflow: 'hidden', ...(vertical ? { height: 250, width: '100%' } : { width: '40%', alignSelf: 'stretch' }) }}>
        {imageSrc && <img src={imageSrc} alt={imageAlt} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />}
      </div>
      <div style={{ padding: 'var(--padding-XXL)', display: 'flex', flexDirection: 'column', gap: 'var(--gap-L)', flex: 1 }}>
        {showTitle && (
          <p style={{ fontFamily: 'var(--font-primary)', fontWeight: 800, fontSize: 18, lineHeight: '24px', color: 'var(--text-primary)', margin: 0 }}>
            {title}
          </p>
        )}
        {children}
        <ActionGroup primary={primaryAction} secondary={secondaryAction} justify="end" />
      </div>
    </div>
  )
}

// ─── EmptyState ───────────────────────────────────────────────────────────────

export interface EmptyStateProps {
  background?: boolean
  illustrationSrc?: string
  title?: string
  subtitle?: string
  action?: Action
}

export function EmptyState({
  background = true,
  illustrationSrc,
  title = 'Nothing here',
  subtitle = 'This place is empty',
  action,
}: EmptyStateProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--gap-XXL)', textAlign: 'center', width: '100%', ...(background ? { backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-brand)', borderRadius: 'var(--radius-S)', padding: 'var(--padding-XXL)' } : {}) }}>
      <div style={{ width: 96, height: 96, borderRadius: 'var(--radius-S)', backgroundColor: 'var(--bg-brand_tertiary)', overflow: 'hidden', flexShrink: 0 }}>
        {illustrationSrc && <img src={illustrationSrc} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
      </div>
      <p style={{ fontFamily: 'var(--font-primary)', fontWeight: 800, fontSize: 24, lineHeight: '32px', color: 'var(--text-primary)', margin: 0 }}>{title}</p>
      <p style={{ fontFamily: 'var(--font-secondary)', fontWeight: 400, fontSize: 16, lineHeight: '24px', color: 'var(--text-secondary)', maxWidth: 800, margin: 0 }}>{subtitle}</p>
      {action && (
        <button
          type="button"
          onClick={action.onClick}
          className={`${btnBase} text-[18px] py-(--padding-L) pl-(--padding-XL) pr-(--padding-XXL) bg-(--bg-action) text-(--text-action_white) hover:bg-(--bg-action_hover)`}
          style={{ ...btnFont, boxShadow: '0 0 8px rgba(0,152,227,0.2), 0 0 5px rgba(0,152,227,0.25)' }}
        >
          {action.label}
        </button>
      )}
    </div>
  )
}

// ─── CardCTA ──────────────────────────────────────────────────────────────────

export interface CardCTAProps {
  children?: ReactNode
  primaryAction?: Action
  secondaryAction?: Action
}

export function CardCTA({ children, primaryAction, secondaryAction }: CardCTAProps) {
  return (
    <div style={{ background: 'linear-gradient(135deg, var(--bg-brand_secondary), var(--bg-brand_primary))', border: '1px solid var(--border-default)', borderRadius: 'var(--radius-M)', padding: 'var(--padding-XXL)', display: 'flex', flexDirection: 'column', gap: 'var(--gap-L)', width: '100%' }}>
      {children}
      <ActionGroup primary={primaryAction} secondary={secondaryAction} justify="start" />
    </div>
  )
}
