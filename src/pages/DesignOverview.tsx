import { Link } from 'react-router-dom'
import { Icon } from '../components/ui/Icon'

// ─── Data — mirrors sidebar structure ────────────────────────────────────────

const foundations = [
  { to: '/design/foundations/colors',     label: 'Colors',     icon: 'IconPalette',     desc: '77 semantic tokens' },
  { to: '/design/foundations/typography', label: 'Typography', icon: 'IconLetterCase',  desc: 'Wanted Sans · Open Sans' },
  { to: '/design/foundations/icons',      label: 'Icons',      icon: 'IconSticker',     desc: 'Tabler Icons' },
]

const componentGroups = [
  {
    label: 'Actions',
    icon: 'IconPointer',
    items: [
      { to: '/design/button',             label: 'Button' },
      { to: '/design/destructive-button', label: 'Destructive Button' },
    ],
  },
  {
    label: 'Charts',
    icon: 'IconChartLine',
    items: [
      { to: '/design/bar-chart',   label: 'Bar Chart' },
      { to: '/design/line-chart',  label: 'Line Chart' },
      { to: '/design/radar-chart', label: 'Radar Chart' },
      { to: '/design/stat-card',   label: 'Stat Card' },
      { to: '/design/step-chart',  label: 'Step Chart' },
    ],
  },
  {
    label: 'Controls',
    icon: 'IconToggleLeft',
    items: [
      { to: '/design/checkbox',     label: 'Checkbox' },
      { to: '/design/radio-button', label: 'Radio Button' },
      { to: '/design/switch',       label: 'Switch' },
    ],
  },
  {
    label: 'Display',
    icon: 'IconLayoutGrid',
    items: [
      { to: '/design/avatar',       label: 'Avatar' },
      { to: '/design/badge',        label: 'Badge' },
      { to: '/design/card',         label: 'Card' },
      { to: '/design/chip',         label: 'Chip' },
      { to: '/design/head-icon',    label: 'Head Icon' },
      { to: '/design/list-item',    label: 'List Item' },
      { to: '/design/progress-bar', label: 'Progress Bar' },
      { to: '/design/tag',          label: 'Tag' },
    ],
  },
  {
    label: 'Feedback',
    icon: 'IconBell',
    items: [
      { to: '/design/alert',             label: 'Alert' },
      { to: '/design/global-alert',      label: 'Global Alert' },
      { to: '/design/modal',             label: 'Modal & Drawer' },
      { to: '/design/notification',      label: 'Notification' },
      { to: '/design/notification-item', label: 'Notification Item' },
      { to: '/design/popover',           label: 'Popover' },
      { to: '/design/tips',              label: 'Tips' },
      { to: '/design/tooltip',           label: 'Tooltip' },
    ],
  },
  {
    label: 'Inputs',
    icon: 'IconForms',
    items: [
      { to: '/design/credit-card',  label: 'Credit Card' },
      { to: '/design/file-upload',  label: 'File Upload' },
      { to: '/design/multiselect',  label: 'Multi Select' },
      { to: '/design/numeric',      label: 'Numeric Input' },
      { to: '/design/otp',          label: 'OTP Code' },
      { to: '/design/password',     label: 'Password' },
      { to: '/design/phone',        label: 'Phone Number' },
      { to: '/design/select',       label: 'Select' },
      { to: '/design/textarea',     label: 'Text Area' },
      { to: '/design/text-field',   label: 'Text Field' },
    ],
  },
  {
    label: 'Layout',
    icon: 'IconMap',
    items: [
      { to: '/design/banner',        label: 'Banner' },
      { to: '/design/bottom-bar',    label: 'Bottom Bar' },
      { to: '/design/header-mobile', label: 'Header Mobile' },
      { to: '/design/sidebar-nav',   label: 'Sidebar Navigation' },
      { to: '/design/tab-bar',       label: 'Tab Bar' },
    ],
  },
  {
    label: 'Navigation',
    icon: 'IconArrowsShuffle',
    items: [
      { to: '/design/stepper-circular',   label: 'Circular Stepper' },
      { to: '/design/stepper-horizontal', label: 'Horizontal Stepper' },
      { to: '/design/stepper-vertical',   label: 'Vertical Stepper' },
    ],
  },
  {
    label: 'Page Control',
    icon: 'IconDots',
    items: [
      { to: '/design/navigation-dot', label: 'Navigation Dot' },
      { to: '/design/pagination',     label: 'Pagination' },
    ],
  },
]

const totalComponents = componentGroups.reduce((acc, g) => acc + g.items.length, 0)

const figmaResources = [
  {
    href: 'https://www.figma.com/community/file/1593216685653010664',
    label: 'Starter Kit',
    desc: 'Basic elements & tokens to get started quickly',
    badge: 'Figma Community',
  },
  {
    href: 'https://www.figma.com/community/file/1419957907153131320',
    label: 'Full Component Library',
    desc: 'Complete file with all components',
    badge: 'Figma Community',
  },
]

// ─── Component ────────────────────────────────────────────────────────────────

export function DesignOverview() {
  return (
    <div className="p-(--padding-XXXL) flex flex-col gap-(--gap-XXXL) max-w-5xl">

      {/* Hero */}
      <div className="flex flex-col gap-(--gap-L)">
        <div className="flex items-start justify-between">
          <div>
            <h1 style={{ fontFamily: 'var(--font-primary)', fontSize: 40, lineHeight: '48px', fontWeight: 800 }}>
              Mediterra
            </h1>
            <p style={{ fontFamily: 'var(--font-primary)', fontSize: 40, lineHeight: '48px', fontWeight: 800, color: 'var(--fg-quaterny)' }}>
              Design System
            </p>
          </div>
          <div className="flex flex-col items-end gap-(--gap-S) mt-(--gap-S)">
            <div className="flex items-center gap-(--gap-M)">
              <span className="flex items-center gap-(--gap-XS) text-xs text-(--fg-tertiary)">
                <span className="w-1.5 h-1.5 rounded-full bg-(--bg-action) inline-block" />
                Vite + React + TypeScript
              </span>
              <span className="flex items-center gap-(--gap-XS) text-xs text-(--fg-tertiary)">
                <span className="w-1.5 h-1.5 rounded-full bg-(--bg-succes_primary) inline-block" />
                Tailwind CSS v4
              </span>
              <span className="flex items-center gap-(--gap-XS) text-xs text-(--fg-tertiary)">
                <span className="w-1.5 h-1.5 rounded-full bg-(--bg-warning_primary) inline-block" />
                Tabler Icons
              </span>
            </div>
            <p className="text-sm text-(--fg-tertiary)">
              {foundations.length} foundations · {totalComponents} components
            </p>
          </div>
        </div>
      </div>

      {/* Foundations */}
      <section className="flex flex-col gap-(--gap-L)">
        <h2 style={{ fontFamily: 'var(--font-primary)', fontSize: 18, fontWeight: 800, color: 'var(--fg-primary)' }}>
          Foundations
        </h2>
        <div className="grid grid-cols-3 gap-(--gap-M)">
          {foundations.map(({ to, label, icon, desc }) => (
            <Link key={to} to={to} className="no-underline group">
              <div className="bg-(--bg-primary) border border-(--border-default) rounded-(--radius-M) p-(--padding-XL) flex items-center gap-(--gap-M) hover:border-(--border-action) transition-colors">
                <div className="w-9 h-9 rounded-(--radius-S) bg-(--bg-brand_tertiary) flex items-center justify-center shrink-0">
                  <Icon name={icon} size={18} stroke={2} color="var(--fg-brand_primary)" />
                </div>
                <div className="min-w-0">
                  <p style={{ fontFamily: 'var(--font-primary)', fontWeight: 700, fontSize: 15 }} className="text-(--fg-primary)">{label}</p>
                  <p className="text-xs text-(--fg-tertiary) mt-0.5">{desc}</p>
                </div>
                <Icon name="IconChevronRight" size={16} stroke={2} color="var(--fg-quaterny)" className="ml-auto shrink-0 group-hover:text-(--fg-brand_primary) transition-colors" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Figma Resources */}
      <section className="flex flex-col gap-(--gap-L)">
        <h2 style={{ fontFamily: 'var(--font-primary)', fontSize: 18, fontWeight: 800, color: 'var(--fg-primary)' }}>
          Figma Resources
        </h2>
        <div className="grid grid-cols-2 gap-(--gap-M)">
          {figmaResources.map(({ href, label, desc, badge }) => (
            <a key={href} href={href} target="_blank" rel="noopener noreferrer" className="no-underline group">
              <div className="bg-(--bg-primary) border border-(--border-default) rounded-(--radius-M) p-(--padding-XL) flex items-center gap-(--gap-M) hover:border-(--border-action) transition-colors">
                {/* Figma logo */}
                <div className="w-9 h-9 rounded-(--radius-S) bg-(--bg-secondary) flex items-center justify-center shrink-0">
                  <svg width="16" height="22" viewBox="0 0 38 57" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 28.5C19 25.9804 20.0009 23.5641 21.7825 21.7825C23.5641 20.0009 25.9804 19 28.5 19C31.0196 19 33.4359 20.0009 35.2175 21.7825C36.9991 23.5641 38 25.9804 38 28.5C38 31.0196 36.9991 33.4359 35.2175 35.2175C33.4359 36.9991 31.0196 38 28.5 38C25.9804 38 23.5641 36.9991 21.7825 35.2175C20.0009 33.4359 19 31.0196 19 28.5Z" fill="#1ABCFE"/>
                    <path d="M0 47.5C0 44.9804 1.00089 42.5641 2.78249 40.7825C4.56408 39.0009 6.98044 38 9.5 38H19V47.5C19 50.0196 17.9991 52.4359 16.2175 54.2175C14.4359 55.9991 12.0196 57 9.5 57C6.98044 57 4.56408 55.9991 2.78249 54.2175C1.00089 52.4359 0 50.0196 0 47.5Z" fill="#0ACF83"/>
                    <path d="M19 0V19H28.5C31.0196 19 33.4359 17.9991 35.2175 16.2175C36.9991 14.4359 38 12.0196 38 9.5C38 6.98044 36.9991 4.56408 35.2175 2.78249C33.4359 1.00089 31.0196 0 28.5 0H19Z" fill="#FF7262"/>
                    <path d="M0 9.5C0 12.0196 1.00089 14.4359 2.78249 16.2175C4.56408 17.9991 6.98044 19 9.5 19H19V0H9.5C6.98044 0 4.56408 1.00089 2.78249 2.78249C1.00089 4.56408 0 6.98044 0 9.5Z" fill="#F24E1E"/>
                    <path d="M0 28.5C0 31.0196 1.00089 33.4359 2.78249 35.2175C4.56408 36.9991 6.98044 38 9.5 38H19V19H9.5C6.98044 19 4.56408 20.0009 2.78249 21.7825C1.00089 23.5641 0 25.9804 0 28.5Z" fill="#A259FF"/>
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-(--gap-S)">
                    <p style={{ fontFamily: 'var(--font-primary)', fontWeight: 700, fontSize: 15 }} className="text-(--fg-primary)">{label}</p>
                    <span className="text-[10px] font-semibold px-(--padding-XS) py-[2px] rounded bg-(--bg-brand_tertiary) text-(--fg-brand_primary) uppercase tracking-wider shrink-0">{badge}</span>
                  </div>
                  <p className="text-xs text-(--fg-tertiary) mt-0.5">{desc}</p>
                </div>
                <Icon name="IconExternalLink" size={16} stroke={2} color="var(--fg-quaterny)" className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Components */}
      <section className="flex flex-col gap-(--gap-XL)">
        <h2 style={{ fontFamily: 'var(--font-primary)', fontSize: 18, fontWeight: 800, color: 'var(--fg-primary)' }}>
          Components
        </h2>

        <div className="flex flex-col gap-(--gap-XL)">
          {componentGroups.map(group => (
            <div key={group.label} className="flex flex-col gap-(--gap-M)">

              {/* Group header */}
              <div className="flex items-center gap-(--gap-S)">
                <div className="w-6 h-6 rounded-(--radius-XS) bg-(--bg-secondary) flex items-center justify-center">
                  <Icon name={group.icon} size={14} stroke={2} color="var(--fg-tertiary)" />
                </div>
                <p className="text-xs font-semibold text-(--fg-tertiary) uppercase tracking-widest">{group.label}</p>
                <div className="flex-1 h-px bg-(--border-default)" />
                <p className="text-xs text-(--fg-quaterny)">{group.items.length}</p>
              </div>

              {/* Items grid */}
              <div className="grid grid-cols-4 gap-(--gap-S)">
                {group.items.map(({ to, label }) => (
                  <Link key={to} to={to} className="no-underline group">
                    <div className="bg-(--bg-primary) border border-(--border-default) rounded-(--radius-M) px-(--padding-L) py-(--padding-M) flex items-center justify-between hover:border-(--border-action) hover:bg-(--bg-brand_tertiary) transition-colors">
                      <p className="text-sm text-(--fg-primary) group-hover:text-(--fg-brand_primary) transition-colors" style={{ fontFamily: 'var(--font-secondary)', fontWeight: 500 }}>
                        {label}
                      </p>
                      <Icon name="IconArrowRight" size={14} stroke={2} color="var(--fg-quaterny)" className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </Link>
                ))}
              </div>

            </div>
          ))}
        </div>
      </section>

    </div>
  )
}
