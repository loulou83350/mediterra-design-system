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
    label: 'Inputs',
    icon: 'IconForms',
    items: [
      { to: '/design/text-field',  label: 'Text Field' },
      { to: '/design/password',    label: 'Password' },
      { to: '/design/otp',         label: 'Pin Code' },
      { to: '/design/select',      label: 'Dropdown' },
      { to: '/design/numeric',     label: 'Numeric Input' },
      { to: '/design/textarea',    label: 'Text Area' },
      { to: '/design/multiselect', label: 'Multi Select' },
      { to: '/design/phone',       label: 'Phone Number' },
      { to: '/design/credit-card', label: 'Credit Card' },
      { to: '/design/file-upload', label: 'File Upload' },
    ],
  },
  {
    label: 'Controls',
    icon: 'IconToggleLeft',
    items: [
      { to: '/design/checkbox',     label: 'Checkbox' },
      { to: '/design/switch',       label: 'Switch' },
      { to: '/design/radio-button', label: 'Radio Button' },
    ],
  },
  {
    label: 'Display',
    icon: 'IconLayoutGrid',
    items: [
      { to: '/design/avatar',        label: 'Avatar' },
      { to: '/design/badge',         label: 'Badge' },
      { to: '/design/card',          label: 'Card' },
      { to: '/design/tag',           label: 'Tag' },
      { to: '/design/chip',          label: 'Chip' },
      { to: '/design/progress-bar',  label: 'Progress Bar' },
      { to: '/design/list-item',     label: 'List Item' },
      { to: '/design/head-icon',     label: 'Head Icon' },
    ],
  },
  {
    label: 'Feedback',
    icon: 'IconBell',
    items: [
      { to: '/design/alert',             label: 'Alert' },
      { to: '/design/notification',      label: 'Notification' },
      { to: '/design/tips',              label: 'Tips' },
      { to: '/design/modal',             label: 'Modal & Drawer' },
      { to: '/design/notification-item', label: 'Notification Item' },
      { to: '/design/global-alert',      label: 'Global Alert' },
      { to: '/design/tooltip',           label: 'Tooltip' },
      { to: '/design/popover',           label: 'Popover' },
    ],
  },
  {
    label: 'Progress',
    icon: 'IconChartBar',
    items: [
      { to: '/design/stepper-horizontal', label: 'Horizontal Stepper' },
      { to: '/design/stepper-vertical',   label: 'Vertical Stepper' },
      { to: '/design/stepper-circular',   label: 'Circular Stepper' },
    ],
  },
  {
    label: 'Navigation',
    icon: 'IconMap',
    items: [
      { to: '/design/header-mobile', label: 'Header Mobile' },
      { to: '/design/bottom-bar',    label: 'Bottom Bar' },
      { to: '/design/tab-bar',       label: 'Tab Bar' },
      { to: '/design/sidebar-nav',   label: 'Sidebar Navigation' },
      { to: '/design/banner',        label: 'Banner' },
    ],
  },
  {
    label: 'Page Control',
    icon: 'IconLayoutGrid',
    items: [
      { to: '/design/navigation-dot', label: 'Navigation Dot' },
      { to: '/design/pagination',     label: 'Pagination' },
    ],
  },
  {
    label: 'Charts',
    icon: 'IconChartLine',
    items: [
      { to: '/design/stat-card',   label: 'Stat Card' },
      { to: '/design/radar-chart', label: 'Radar Chart' },
      { to: '/design/line-chart',  label: 'Line Chart' },
      { to: '/design/step-chart',  label: 'Step Chart' },
      { to: '/design/bar-chart',   label: 'Bar Chart' },
    ],
  },
]

const totalComponents = componentGroups.reduce((acc, g) => acc + g.items.length, 0)

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
