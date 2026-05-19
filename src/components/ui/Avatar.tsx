import React from 'react'
import { Icon } from './Icon'

export type AvatarSize = 'S' | 'M' | 'L' | 'XL'
export type AvatarType = 'Image' | 'Letter' | 'Empty'
export type AvatarColor = 'brand' | 'success' | 'warning' | 'error' | 'neutral'

// ─── Sizes ───────────────────────────────────────────────────────────────────

const sizeMap: Record<AvatarSize, { px: number; iconSize: number }> = {
  S:  { px: 32, iconSize: 20 },
  M:  { px: 40, iconSize: 24 },
  L:  { px: 48, iconSize: 24 },
  XL: { px: 64, iconSize: 24 },
}

const overlapMap: Record<AvatarSize, number> = {
  S: 16, M: 20, L: 24, XL: 32,
}

const colorMap: Record<AvatarColor, { bg: string; fg: string }> = {
  brand:   { bg: 'var(--bg-brand_secondary)',   fg: 'var(--fg-secondary)' },
  success: { bg: 'var(--bg-succes_secondary)',  fg: 'var(--fg-succes_primary)' },
  warning: { bg: 'var(--bg-warning_secondary)', fg: 'var(--fg-warning_primary)' },
  error:   { bg: 'var(--bg-error_secondary)',   fg: 'var(--fg-error_primary)' },
  neutral: { bg: 'var(--bg-quaterny)',          fg: 'var(--fg-tertiary)' },
}

// ─── Avatar ──────────────────────────────────────────────────────────────────

export interface AvatarProps {
  size?: AvatarSize
  type?: AvatarType
  color?: AvatarColor
  src?: string
  alt?: string
  initials?: string
  className?: string
  style?: React.CSSProperties
}

export function Avatar({
  size = 'M',
  type = 'Empty',
  color = 'brand',
  src,
  alt = '',
  initials = '?',
  className = '',
  style,
}: AvatarProps) {
  const { px, iconSize } = sizeMap[size]

  const base = [
    'relative rounded-(--radius-max) overflow-hidden shrink-0 flex items-center justify-center',
    className,
  ].join(' ')

  const dim = { width: px, height: px, ...style }

  if (type === 'Image' && src) {
    return (
      <div className={base} style={dim}>
        <img src={src} alt={alt} className="absolute inset-0 w-full h-full object-cover" />
      </div>
    )
  }

  const { bg, fg } = colorMap[color]

  return (
    <div className={base} style={{ ...dim, backgroundColor: bg }}>
      {type === 'Letter' ? (
        <span style={{
          fontFamily: 'var(--font-secondary)',
          fontWeight: 700,
          fontSize: 16,
          lineHeight: '24px',
          color: fg,
        }}>
          {initials.charAt(0).toUpperCase()}
        </span>
      ) : (
        <Icon name="IconUser" size={iconSize} stroke={2} color={fg} />
      )}
    </div>
  )
}

// ─── AvatarLabel ─────────────────────────────────────────────────────────────

export interface AvatarLabelProps {
  size?: AvatarSize
  type?: AvatarType
  color?: AvatarColor
  src?: string
  alt?: string
  initials?: string
  name: string
  title?: string
  verified?: boolean
  className?: string
}

export function AvatarLabel({
  size = 'S',
  type = 'Image',
  color,
  src,
  alt,
  initials,
  name,
  title,
  verified = false,
  className = '',
}: AvatarLabelProps) {
  return (
    <div className={`flex items-center gap-(--gap-S) ${className}`}>
      <Avatar size={size} type={type} color={color} src={src} alt={alt} initials={initials} />
      <div className="flex flex-col gap-0 items-start justify-center">
        <div className="flex items-center gap-(--gap-XS)">
          <span style={{
            fontFamily: 'var(--font-secondary)',
            fontWeight: 700,
            fontSize: 14,
            lineHeight: '20px',
            color: 'var(--text-primary)',
            whiteSpace: 'nowrap',
          }}>
            {name}
          </span>
          {verified && (
            <Icon name="IconDiscountCheck" size={20} stroke={2} color="var(--fg-brand_primary)" />
          )}
        </div>
        {title && (
          <span style={{
            fontFamily: 'var(--font-secondary)',
            fontWeight: 400,
            fontSize: 14,
            lineHeight: '20px',
            color: 'var(--text-secondary)',
            whiteSpace: 'nowrap',
          }}>
            {title}
          </span>
        )}
      </div>
    </div>
  )
}

// ─── AvatarGroup ─────────────────────────────────────────────────────────────

export interface AvatarGroupProps {
  size?: AvatarSize
  avatars: { src: string; alt?: string }[]
  max?: number
  extra?: number
  className?: string
}

export function AvatarGroup({
  size = 'S',
  avatars,
  max = 4,
  extra,
  className = '',
}: AvatarGroupProps) {
  const { px } = sizeMap[size]
  const overlap = overlapMap[size]

  const toShow = avatars.slice(0, max)
  const remainder = extra ?? Math.max(0, avatars.length - max)
  const showCounter = remainder > 0

  const counterFontSize = size === 'XL' ? 16 : size === 'S' ? 12 : 14
  const counterLineHeight = size === 'XL' ? '24px' : '20px'

  return (
    <div className={`flex items-center ${className}`}>
      {toShow.map((av, i) => {
        const isLast = i === toShow.length - 1 && !showCounter
        return (
          <Avatar
            key={i}
            size={size}
            type="Image"
            src={av.src}
            alt={av.alt}
            style={{
              marginRight: isLast ? 0 : -overlap,
              zIndex: toShow.length - i,
              outline: '2px solid var(--bg-primary)',
            }}
          />
        )
      })}
      {showCounter && (
        <div
          className="shrink-0 flex items-center justify-center rounded-(--radius-max) bg-(--bg-brand_tertiary) border border-(--border-brand)"
          style={{ width: px, height: px, zIndex: 0 }}
        >
          <span style={{
            fontFamily: 'var(--font-secondary)',
            fontWeight: 700,
            fontSize: counterFontSize,
            lineHeight: counterLineHeight,
            color: 'var(--text-brand)',
          }}>
            +{remainder}
          </span>
        </div>
      )}
    </div>
  )
}
