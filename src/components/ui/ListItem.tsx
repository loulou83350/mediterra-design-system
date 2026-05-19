import type { ReactNode } from 'react'
import { Icon } from './Icon'
import { Tag } from './Tag'

export type ListItemVariant = 'default' | 'multiple-action' | 'action' | 'tag' | 'placeholder'

export interface ListItemProps {
  variant?: ListItemVariant
  title?: string
  subtitle?: string
  showSubtitle?: boolean
  headIcon?: string
  showHeadIcon?: boolean

  // variant === 'multiple-action'
  onMenuClick?: () => void

  // variant === 'action'
  actionLabel?: string
  actionIcon?: string
  onActionClick?: () => void

  // variant === 'tag'
  tagLabel?: string

  // variant === 'placeholder'
  tailContent?: ReactNode
}

const titleStyle = {
  fontFamily: 'var(--font-secondary)',
  fontWeight: 700,
  fontSize: 16,
  lineHeight: '24px',
  color: 'var(--text-primary)',
}

const subtitleStyle = {
  fontFamily: 'var(--font-secondary)',
  fontWeight: 400,
  fontSize: 14,
  lineHeight: '20px',
  color: 'var(--text-secondary)',
}

export function ListItem({
  variant = 'default',
  title = 'Title',
  subtitle = 'Lorem ipsum dolor sit amet, consectetur.',
  showSubtitle = true,
  headIcon = 'IconPlus',
  showHeadIcon = true,
  onMenuClick,
  actionLabel = 'Download',
  actionIcon = 'IconDownload',
  onActionClick,
  tagLabel = 'Label',
  tailContent,
}: ListItemProps) {
  const isAction = variant === 'action'

  const contentBlock = (
    <div className="flex items-center gap-(--gap-M) flex-1 min-w-0">
      {showHeadIcon && (
        <Icon name={headIcon} size={24} stroke={2} color="var(--fg-secondary)" className="shrink-0" />
      )}
      <div className="flex flex-col flex-1 min-w-0">
        <span style={titleStyle}>{title}</span>
        {showSubtitle && (
          <span className="truncate" style={subtitleStyle}>{subtitle}</span>
        )}
      </div>
    </div>
  )

  if (isAction) {
    return (
      <div className="bg-(--bg-primary) p-(--padding-L) w-full flex flex-col gap-(--gap-M)">
        {contentBlock}
        <div className="flex items-center gap-(--gap-M)">
          {showHeadIcon && <div className="w-6 h-6 shrink-0" />}
          <button
            type="button"
            onClick={onActionClick}
            className="flex items-center border-2 border-(--border-action) rounded-(--radius-S) pl-(--padding-M) pr-(--padding-L) py-(--padding-S) gap-(--gap-XS) cursor-pointer transition-colors hover:bg-(--bg-brand_tertiary)"
          >
            <Icon name={actionIcon ?? 'IconDownload'} size={24} stroke={2} color="var(--text-action)" />
            <span style={{
              fontFamily: 'var(--font-primary)',
              fontWeight: 800,
              fontSize: 16,
              lineHeight: '24px',
              color: 'var(--text-action)',
              paddingLeft: 'var(--padding-XS)',
            }}>
              {actionLabel}
            </span>
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-(--bg-primary) p-(--padding-L) w-full flex items-center gap-(--gap-M)">
      {contentBlock}

      {variant === 'multiple-action' && (
        <button
          type="button"
          onClick={onMenuClick}
          className="p-(--padding-S) rounded-(--radius-S) hover:bg-(--bg-secondary) cursor-pointer shrink-0 transition-colors"
        >
          <Icon name="IconDotsVertical" size={24} stroke={2} color="var(--fg-secondary)" />
        </button>
      )}

      {variant === 'tag' && (
        <Tag
          color="Success"
          highContrast={false}
          small={true}
          label={tagLabel ?? 'Label'}
          headIcon={false}
          tailIcon={false}
        />
      )}

      {variant === 'placeholder' && (
        tailContent ?? (
          <div className="w-12 h-12 rounded-(--radius-S) bg-(--bg-secondary) shrink-0" />
        )
      )}
    </div>
  )
}
