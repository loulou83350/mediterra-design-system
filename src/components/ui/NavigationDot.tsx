import { Icon } from './Icon'

// ─── NavigationDotItem ────────────────────────────────────────────────────────

export type DotState = 'off' | 'default' | 'selected'

export interface NavigationDotItemProps {
  state?: DotState
}

export function NavigationDotItem({ state = 'default' }: NavigationDotItemProps) {
  if (state === 'selected') {
    return (
      <div className="h-[14px] w-[26px] rounded-[12px] border-2 border-(--fg-brand_primary) shrink-0" />
    )
  }
  return (
    <div
      className={`w-6 h-6 rounded-full border-2 shrink-0 ${
        state === 'off'
          ? 'border-(--fg-quaterny)'
          : 'border-(--fg-brand_primary)'
      }`}
    />
  )
}

// ─── NavigationDot ───────────────────────────────────────────────────────────

export interface NavigationDotProps {
  count?: number
  selectedIndex?: number
  showNavigation?: boolean
  onChange?: (index: number) => void
}

export function NavigationDot({
  count = 5,
  selectedIndex = 0,
  showNavigation = true,
  onChange,
}: NavigationDotProps) {
  const isFirst = selectedIndex === 0
  const isLast  = selectedIndex === count - 1

  const dots = Array.from({ length: count }, (_, i) => {
    const state: DotState =
      i === selectedIndex ? 'selected' : 'default'
    return state
  })

  return (
    <div className="inline-flex items-center gap-(--gap-M)">

      {/* Prev */}
      {showNavigation && (
        <button
          type="button"
          onClick={() => !isFirst && onChange?.(selectedIndex - 1)}
          className={`p-(--padding-S) rounded-(--radius-S) transition-colors ${
            isFirst
              ? 'opacity-50 pointer-events-none'
              : 'hover:bg-(--bg-secondary) cursor-pointer'
          }`}
          style={{ lineHeight: 0 }}
        >
          <Icon name="IconChevronLeft" size={24} stroke={2} color="var(--fg-secondary)" />
        </button>
      )}

      {/* Dots */}
      <div className="flex items-center gap-(--gap-XS)">
        {dots.map((state, i) => (
          <NavigationDotItem key={i} state={state} />
        ))}
      </div>

      {/* Next */}
      {showNavigation && (
        <button
          type="button"
          onClick={() => !isLast && onChange?.(selectedIndex + 1)}
          className={`p-(--padding-S) rounded-(--radius-S) transition-colors ${
            isLast
              ? 'opacity-50 pointer-events-none'
              : 'hover:bg-(--bg-secondary) cursor-pointer'
          }`}
          style={{ lineHeight: 0 }}
        >
          <Icon name="IconChevronRight" size={24} stroke={2} color="var(--fg-secondary)" />
        </button>
      )}

    </div>
  )
}
