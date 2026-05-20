import { useState } from 'react'
import { Icon } from './Icon'

// ─── PageItem ─────────────────────────────────────────────────────────────────

export type PageItemState = 'default' | 'selected' | 'hover'

export interface PageItemProps {
  page: number | string
  state?: PageItemState
  onClick?: () => void
}

const pageTextStyle = {
  fontFamily: 'var(--font-secondary)',
  fontWeight: 700,
  fontSize: 16,
  lineHeight: '24px',
  textAlign: 'center' as const,
}

export function PageItem({ page, state = 'default', onClick }: PageItemProps) {
  const [hovered, setHovered] = useState(false)

  const effectiveState: PageItemState =
    state === 'selected' ? 'selected' : hovered ? 'hover' : 'default'

  const bgCls =
    effectiveState === 'selected'
      ? 'bg-(--bg-brand_primary)'
      : effectiveState === 'hover'
        ? 'bg-(--bg-action_hover)'
        : ''

  const textColor =
    effectiveState === 'selected' || effectiveState === 'hover'
      ? 'var(--text-action_white)'
      : 'var(--text-tertiary)'

  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`w-10 h-10 flex items-center justify-center rounded-(--radius-S) transition-colors shrink-0 ${bgCls} ${state !== 'selected' ? 'cursor-pointer' : ''}`}
    >
      <span style={{ ...pageTextStyle, color: textColor }}>{page}</span>
    </button>
  )
}

// ─── Pagination ───────────────────────────────────────────────────────────────

export interface PaginationProps {
  currentPage?: number
  totalPages?: number
  showGoToFirst?: boolean
  showGoToLast?: boolean
  onChange?: (page: number) => void
}

/** Returns the list of page numbers / '...' strings to display */
function getPageNumbers(current: number, total: number): (number | '...')[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1)
  }

  const pages: (number | '...')[] = []

  pages.push(1)

  if (current > 3) {
    pages.push('...')
  }

  const start = Math.max(2, current - 1)
  const end   = Math.min(total - 1, current + 1)

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  if (current < total - 2) {
    pages.push('...')
  }

  pages.push(total)

  return pages
}

function NavButton({
  icon,
  disabled,
  onClick,
}: {
  icon: string
  disabled: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-10 h-10 flex items-center justify-center rounded-(--radius-S) transition-colors shrink-0 ${
        disabled
          ? 'opacity-50 pointer-events-none'
          : 'hover:bg-(--bg-secondary) cursor-pointer'
      }`}
      style={{ lineHeight: 0 }}
    >
      <Icon name={icon} size={24} stroke={2} color="var(--fg-secondary)" />
    </button>
  )
}

export function Pagination({
  currentPage = 1,
  totalPages = 200,
  showGoToFirst = true,
  showGoToLast = true,
  onChange,
}: PaginationProps) {
  const isFirst = currentPage === 1
  const isLast  = currentPage === totalPages

  const pages = getPageNumbers(currentPage, totalPages)

  return (
    <div className="inline-flex items-center gap-(--gap-XXL)">

      {/* Prev group */}
      <div className="flex items-center gap-(--gap-XS)">
        {showGoToFirst && (
          <NavButton icon="IconChevronsLeft" disabled={isFirst} onClick={() => onChange?.(1)} />
        )}
        <NavButton icon="IconChevronLeft" disabled={isFirst} onClick={() => onChange?.(currentPage - 1)} />
      </div>

      {/* Pages */}
      <div className="flex items-center gap-(--gap-M)">
        {pages.map((p, i) =>
          p === '...'
            ? (
              <PageItem key={`ellipsis-${i}`} page="..." state="default" />
            )
            : (
              <PageItem
                key={p}
                page={p}
                state={p === currentPage ? 'selected' : 'default'}
                onClick={() => onChange?.(p as number)}
              />
            )
        )}
      </div>

      {/* Next group */}
      <div className="flex items-center gap-(--gap-XS)">
        <NavButton icon="IconChevronRight" disabled={isLast} onClick={() => onChange?.(currentPage + 1)} />
        {showGoToLast && (
          <NavButton icon="IconChevronsRight" disabled={isLast} onClick={() => onChange?.(totalPages)} />
        )}
      </div>

    </div>
  )
}
