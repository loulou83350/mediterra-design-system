import { Icon } from './Icon'

export interface BannerProps {
  title?:             string
  description?:       string
  expand?:            boolean
  onToggle?:          () => void
  showExpandCollapse?: boolean
  imageSrc?:          string
  imageAlt?:          string
  primaryAction?:     { label: string; onClick: () => void }
  secondaryAction?:   { label: string; onClick: () => void }
  showLoader?:        boolean
}

const btnFont = { fontFamily: 'var(--font-primary)', fontWeight: 800 }

export function Banner({
  title              = 'Message Title',
  description        = 'Message description',
  expand             = true,
  onToggle,
  showExpandCollapse = true,
  imageSrc,
  imageAlt           = '',
  primaryAction,
  secondaryAction,
  showLoader         = false,
}: BannerProps) {

  // ─── Shared action buttons ────────────────────────────────────────────────
  function Actions({ size = 16 }: { size?: number }) {
    if (!primaryAction && !secondaryAction) return null
    return (
      <div className="flex items-center gap-(--gap-M)">
        {primaryAction && (
          <button
            type="button"
            onClick={primaryAction.onClick}
            className="bg-(--bg-action) hover:bg-(--bg-action_hover) text-(--text-action_white) rounded-(--radius-S) pl-(--padding-M) pr-(--padding-L) py-(--padding-S) transition-colors cursor-pointer"
            style={{ ...btnFont, fontSize: size, lineHeight: '24px' }}
          >
            {primaryAction.label}
          </button>
        )}
        {secondaryAction && (
          <button
            type="button"
            onClick={secondaryAction.onClick}
            className="text-(--text-tertiary) hover:bg-(--bg-secondary) rounded-(--radius-S) pl-(--padding-M) pr-(--padding-L) py-(--padding-S) transition-colors cursor-pointer"
            style={{ ...btnFont, fontSize: size, lineHeight: '24px' }}
          >
            {secondaryAction.label}
          </button>
        )}
      </div>
    )
  }

  return (
    <div
      className="bg-(--bg-tertiary) border-t border-(--border-default) w-full overflow-hidden relative"
      style={{
        maxHeight:  expand ? '800px' : '64px',
        transition: 'max-height 420ms cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >

      {/* ── EXPANDED layout ── */}
      <div
        className="flex items-start gap-(--gap-XXL) p-(--padding-XXL)"
        style={{
          opacity:       expand ? 1 : 0,
          transition:    expand
            ? 'opacity 220ms ease 180ms'   // fade in after height grows
            : 'opacity 150ms ease 0ms',    // fade out first
          pointerEvents: expand ? 'auto' : 'none',
        }}
      >
        {/* Left: text + actions */}
        <div className="flex-1 min-w-0 flex flex-col gap-(--gap-L)">
          <p style={{
            fontFamily: 'var(--font-primary)',
            fontWeight: 800,
            fontSize:   32,
            lineHeight: '40px',
            color:      'var(--text-primary)',
          }}>
            {title}
          </p>
          <p style={{
            fontFamily: 'var(--font-secondary)',
            fontWeight: 400,
            fontSize:   16,
            lineHeight: '24px',
            color:      'var(--text-secondary)',
          }}>
            {description}
          </p>
          <Actions size={16} />
        </div>

        {/* Right: image / placeholder */}
        <div className="flex-1 min-w-0 self-stretch rounded-(--radius-min) overflow-hidden bg-(--bg-brand_tertiary)">
          {imageSrc && (
            <img src={imageSrc} alt={imageAlt} className="w-full h-full object-cover" />
          )}
        </div>

        {/* Chevron */}
        {showExpandCollapse && (
          <button
            type="button"
            onClick={onToggle}
            className="shrink-0 hover:bg-(--bg-secondary) rounded-(--radius-S) p-(--padding-XS) transition-colors cursor-pointer"
            style={{ lineHeight: 0 }}
          >
            <div
              className="transition-transform duration-[420ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
              style={{ transform: expand ? 'rotate(0deg)' : 'rotate(180deg)' }}
            >
              <Icon name="IconChevronDown" size={24} stroke={2} color="var(--fg-secondary)" />
            </div>
          </button>
        )}
      </div>

      {/* ── COLLAPSED layout — absolute so it sits within the clipped 64px ── */}
      <div
        className="absolute inset-0 flex items-center gap-(--gap-XXL) px-(--padding-XXL)"
        style={{
          opacity:       expand ? 0 : 1,
          transition:    expand
            ? 'opacity 150ms ease 0ms'     // fade out first
            : 'opacity 220ms ease 180ms',  // fade in after height shrinks
          pointerEvents: expand ? 'none' : 'auto',
          height:        '64px',
        }}
      >
        {/* Optional loader */}
        {showLoader && (
          <div className="shrink-0">
            <Icon
              name="IconLoader"
              size={48}
              stroke={1.5}
              color="var(--fg-brand_primary)"
              className="animate-spin"
            />
          </div>
        )}

        {/* Title + description */}
        <div className="flex-1 min-w-0 flex items-center gap-(--gap-L)">
          <p className="shrink-0" style={{
            fontFamily: 'var(--font-secondary)',
            fontWeight: 700,
            fontSize:   16,
            lineHeight: '24px',
            color:      'var(--text-secondary)',
          }}>
            {title}
          </p>
          <p className="flex-1 min-w-0 truncate" style={{
            fontFamily: 'var(--font-secondary)',
            fontWeight: 400,
            fontSize:   16,
            lineHeight: '24px',
            color:      'var(--text-secondary)',
          }}>
            {description}
          </p>
        </div>

        {/* Actions */}
        {(primaryAction || secondaryAction) && (
          <div className="shrink-0">
            <Actions size={16} />
          </div>
        )}

        {/* Chevron */}
        {showExpandCollapse && (
          <button
            type="button"
            onClick={onToggle}
            className="shrink-0 hover:bg-(--bg-secondary) rounded-(--radius-S) p-(--padding-XS) transition-colors cursor-pointer"
            style={{ lineHeight: 0 }}
          >
            <div
              className="transition-transform duration-[420ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
              style={{ transform: expand ? 'rotate(0deg)' : 'rotate(180deg)' }}
            >
              <Icon name="IconChevronDown" size={24} stroke={2} color="var(--fg-secondary)" />
            </div>
          </button>
        )}
      </div>
    </div>
  )
}
