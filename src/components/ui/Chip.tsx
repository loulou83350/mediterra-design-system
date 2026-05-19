import { Icon } from './Icon'

export type ChipColor = 'Neutral' | 'Success' | 'Error' | 'Warning'

export interface ChipProps {
  color?: ChipColor
  active?: boolean
  disabled?: boolean
  label?: string
  tailIcon?: boolean
  avatarSrc?: string
  onRemove?: () => void
  onClick?: () => void
}

const colorMap: Record<ChipColor, {
  default: string
  hover: string
  active: string
  border: string
  text: string
}> = {
  Neutral: {
    default: 'bg-(--bg-neutral_tertiary)',
    hover:   'hover:bg-(--bg-neutral_secondary)',
    active:  'bg-(--bg-neutral_primary)',
    border:  'border border-(--border-neutral_primary)',
    text:    'var(--text-neutral)',
  },
  Success: {
    default: 'bg-(--bg-succes_tertiary)',
    hover:   'hover:bg-(--bg-succes_secondary)',
    active:  'bg-(--bg-succes_primary)',
    border:  'border border-(--border-success_primary)',
    text:    'var(--text-success)',
  },
  Error: {
    default: 'bg-(--bg-error_tertiary)',
    hover:   'hover:bg-(--bg-error_secondary)',
    active:  'bg-(--bg-error_primary)',
    border:  'border border-(--border-error_primary)',
    text:    'var(--text-error)',
  },
  Warning: {
    default: 'bg-(--fg-warning_tertiary)',
    hover:   'hover:bg-(--fg-warning_secondary)',
    active:  'bg-(--fg-warning_primary)',
    border:  'border border-(--border-warning_primary)',
    text:    'var(--text-warning)',
  },
}

export function Chip({
  color = 'Neutral',
  active = false,
  disabled = false,
  label = 'Label',
  tailIcon = true,
  avatarSrc,
  onRemove,
  onClick,
}: ChipProps) {
  const tokens = colorMap[color]
  const textColor = active ? 'var(--text-invert)' : tokens.text
  const iconColor = active ? 'var(--text-invert)' : tokens.text

  const containerCls = [
    'inline-flex items-center transition-colors rounded-(--radius-max)',
    'py-(--padding-XS)',
    avatarSrc ? 'pl-(--padding-XS) pr-(--padding-M)' : 'px-(--padding-M)',
    active
      ? tokens.active
      : `${tokens.default} ${tokens.hover} ${tokens.border}`,
    disabled ? 'opacity-50 pointer-events-none' : 'cursor-pointer',
  ].join(' ')

  return (
    <div
      className={containerCls}
      onClick={!disabled ? onClick : undefined}
    >
      {avatarSrc && (
        <img
          src={avatarSrc}
          alt=""
          className="w-6 h-6 rounded-(--radius-max) object-cover shrink-0"
        />
      )}
      <span
        className="px-(--padding-XS) shrink-0"
        style={{
          fontFamily: 'var(--font-secondary)',
          fontWeight: 700,
          fontSize: 16,
          lineHeight: '24px',
          color: textColor,
          whiteSpace: 'nowrap',
        }}
      >
        {label}
      </span>
      {tailIcon && (
        <button
          type="button"
          onClick={e => { e.stopPropagation(); if (!disabled) onRemove?.() }}
          className="shrink-0 w-5 h-5 flex items-center justify-center"
        >
          <Icon name="IconX" size={16} stroke={2} color={iconColor} />
        </button>
      )}
    </div>
  )
}
