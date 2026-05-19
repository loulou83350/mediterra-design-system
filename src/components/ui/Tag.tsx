import { Icon } from './Icon'

export type TagColor = 'Neutral' | 'Success' | 'Error' | 'Warning'

export interface TagProps {
  color?: TagColor
  highContrast?: boolean
  small?: boolean
  headIcon?: boolean
  headIconName?: string  // any valid Tabler icon name, e.g. 'IconHeart'
  tailIcon?: boolean
  tailIconName?: string  // any valid Tabler icon name, e.g. 'IconInfoCircle'
  label?: string
}

type TokenSet = {
  bg: string
  border?: string
  text: string
  iconColor: string
}

const highContrastMap: Record<TagColor, TokenSet> = {
  Neutral: { bg: 'var(--bg-neutral_primary)',   text: 'var(--text-invert)', iconColor: 'var(--text-invert)' },
  Success: { bg: 'var(--bg-succes_primary)',     text: 'var(--text-invert)', iconColor: 'var(--text-invert)' },
  Error:   { bg: 'var(--bg-error_primary)',      text: 'var(--text-invert)', iconColor: 'var(--text-invert)' },
  Warning: { bg: 'var(--fg-warning_primary)',    text: 'var(--text-invert)', iconColor: 'var(--text-invert)' },
}

const lowContrastMap: Record<TagColor, TokenSet> = {
  Neutral: { bg: 'var(--bg-neutral_tertiary)',  border: 'var(--border-neutral_primary)',  text: 'var(--text-neutral)',  iconColor: 'var(--text-neutral)' },
  Success: { bg: 'var(--bg-succes_tertiary)',   border: 'var(--border-success_primary)',  text: 'var(--text-success)',  iconColor: 'var(--text-success)' },
  Error:   { bg: 'var(--bg-error_tertiary)',    border: 'var(--border-error_primary)',    text: 'var(--text-error)',    iconColor: 'var(--text-error)' },
  Warning: { bg: 'var(--fg-warning_tertiary)', border: 'var(--border-warning_primary)',  text: 'var(--text-warning)',  iconColor: 'var(--text-warning)' },
}

export function Tag({
  color = 'Neutral',
  highContrast = true,
  small = false,
  headIcon = true,
  headIconName = 'IconCircle',
  tailIcon = true,
  tailIconName = 'IconInfoCircle',
  label = 'Label',
}: TagProps) {
  const tokens = highContrast ? highContrastMap[color] : lowContrastMap[color]
  const iconSize = small ? 16 : 20
  const fontSize = small ? 12 : 16
  const lineHeight = small ? '20px' : '24px'
  const labelPadding = small ? 'var(--padding-XXS)' : 'var(--padding-XS)'
  const gap = small ? 'var(--gap-XXS)' : '0px'

  return (
    <div
      className="inline-flex items-center rounded-(--radius-max)"
      style={{
        backgroundColor: tokens.bg,
        border: tokens.border ? `1px solid ${tokens.border}` : undefined,
        paddingTop: 'var(--padding-XS)',
        paddingBottom: 'var(--padding-XS)',
        paddingLeft: 'var(--padding-M)',
        paddingRight: 'var(--padding-M)',
        gap,
      }}
    >
      {headIcon && (
        <Icon name={headIconName as any} size={iconSize} stroke={2} color={tokens.iconColor} />
      )}
      <span
        style={{
          fontFamily: 'var(--font-secondary)',
          fontWeight: 700,
          fontSize,
          lineHeight,
          color: tokens.text,
          whiteSpace: 'nowrap',
          paddingLeft: labelPadding,
          paddingRight: labelPadding,
        }}
      >
        {label}
      </span>
      {tailIcon && (
        <Icon name={tailIconName as any} size={iconSize} stroke={2} color={tokens.iconColor} />
      )}
    </div>
  )
}
