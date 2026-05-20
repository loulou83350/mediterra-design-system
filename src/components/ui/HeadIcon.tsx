import { Icon } from './Icon'

export type HeadIconColor = 'Brand' | 'Error' | 'Warning' | 'Success' | 'Neutral'

export interface HeadIconProps {
  color?: HeadIconColor
  small?: boolean
  icon?: string
}

const colorMap: Record<HeadIconColor, { bg: string; fg: string }> = {
  Brand:   { bg: 'bg-(--bg-brand_tertiary)',   fg: 'var(--fg-brand_primary)' },
  Error:   { bg: 'bg-(--bg-error_tertiary)',   fg: 'var(--fg-error_primary)' },
  Warning: { bg: 'bg-(--bg-warning_tertiary)', fg: 'var(--fg-warning_primary)' },
  Success: { bg: 'bg-(--bg-succes_tertiary)',  fg: 'var(--fg-succes_primary)' },
  Neutral: { bg: 'bg-(--bg-neutral_tertiary)', fg: 'var(--fg-neutral_primary)' },
}

export function HeadIcon({
  color = 'Brand',
  small = false,
  icon = 'IconAlertCircle',
}: HeadIconProps) {
  const { bg, fg } = colorMap[color]
  const padding = small ? 'p-(--padding-XS)' : 'p-(--padding-S)'
  const iconSize = small ? 16 : 24

  return (
    <div className={`inline-flex items-center justify-center rounded-(--radius-XS) ${bg} ${padding}`}>
      <Icon name={icon} size={iconSize} stroke={2} color={fg} />
    </div>
  )
}
