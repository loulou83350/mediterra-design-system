import { BrowserRouter, Routes, Route, NavLink, Navigate } from 'react-router-dom'
import { useState } from 'react'
import * as TablerIcons from '@tabler/icons-react'
import { Agentation } from 'agentation'
import './index.css'

import { DesignOverview } from './pages/DesignOverview'
import { ButtonPage } from './pages/ButtonPage'
import { BadgePage } from './pages/BadgePage'
import { InputPage } from './pages/InputPage'
import { CheckboxPage } from './pages/CheckboxPage'
import { CardPage } from './pages/CardPage'
import { DestructiveButtonPage } from './pages/DestructiveButtonPage'
import { AlertPage } from './pages/AlertPage'
import { TipsPage } from './pages/TipsPage'
import { AvatarPage } from './pages/AvatarPage'
import { NotificationPage } from './pages/NotificationPage'
import { TagPage } from './pages/TagPage'
import { ChipPage } from './pages/ChipPage'
import { ModalPage } from './pages/ModalPage'
import { TextFieldPage } from './pages/TextFieldPage'
import { PasswordInputPage } from './pages/PasswordInputPage'
import { OTPInputPage } from './pages/OTPInputPage'
import { SelectPage } from './pages/SelectPage'
import { NumericInputPage } from './pages/NumericInputPage'
import { TextAreaPage } from './pages/TextAreaPage'
import { MultiSelectPage } from './pages/MultiSelectPage'
import { PhoneNumberInputPage } from './pages/PhoneNumberInputPage'
import { CreditCardInputPage } from './pages/CreditCardInputPage'
import { ListItemPage } from './pages/ListItemPage'
import { NotificationItemPage } from './pages/NotificationItemPage'
import { BannerPage } from './pages/BannerPage'
import { GlobalAlertPage } from './pages/GlobalAlertPage'
import { SwitchPage } from './pages/SwitchPage'
import { TooltipPage } from './pages/TooltipPage'
import { PopoverPage } from './pages/PopoverPage'
import { FileUploadPage } from './pages/FileUploadPage'
import { ProgressBarPage } from './pages/ProgressBarPage'
import { HorizontalStepperPage } from './pages/HorizontalStepperPage'
import { VerticalStepperPage } from './pages/VerticalStepperPage'
import { CircularStepperPage } from './pages/CircularStepperPage'
import { HeaderMobilePage } from './pages/HeaderMobilePage'
import { BottomBarPage } from './pages/BottomBarPage'
import { TabBarPage } from './pages/TabBarPage'
import { SidebarNavPage } from './pages/SidebarNavPage'
import { RadioButtonPage } from './pages/RadioButtonPage'
import { HeadIconPage } from './pages/HeadIconPage'
import { NavigationDotPage } from './pages/NavigationDotPage'
import { PaginationPage } from './pages/PaginationPage'
import { StatCardPage } from './pages/StatCardPage'
import { RadarChartPage } from './pages/RadarChartPage'
import { LineChartPage } from './pages/LineChartPage'
import { StepChartPage } from './pages/StepChartPage'
import { BarChartPage } from './pages/BarChartPage'
import { ColorsPage } from './pages/foundations/ColorsPage'
import { TypographyPage } from './pages/foundations/TypographyPage'
import { IconsPage } from './pages/foundations/IconsPage'
import { ScreenOnboarding } from './screens/ScreenOnboarding'
import { ScreenSupportList } from './screens/ScreenSupportList'
import { ScreenSupportCreate } from './screens/ScreenSupportCreate'
import { ScreenHome } from './screens/ScreenHome'
import { ScreenMobileDashboard } from './screens/ScreenMobileDashboard'
import { ScreenMobilePotType } from './screens/ScreenMobilePotType'
import { ScreenQuestionForm } from './screens/ScreenQuestionForm'

type SidebarItem  = { to: string; label: string; end?: boolean }
type SidebarGroup = { label: string; items: SidebarItem[] }
type SidebarSection = {
  label: string | null
  items?: SidebarItem[]
  groups?: SidebarGroup[]
}

const APP_PREVIEW_SECTION: SidebarSection = {
  label: 'App Preview',
  items: [
    { to: '/app',                 label: 'Home' },
    { to: '/app/onboarding',      label: 'Onboarding' },
    { to: '/app/support',         label: 'Support List' },
    { to: '/app/support/new',     label: 'Create Template' },
    { to: '/app/mobile',          label: 'Mobile Dashboard' },
    { to: '/app/mobile/pot-type', label: 'Mobile Pot Type' },
    { to: '/app/question-form',   label: 'Question Form' },
  ],
}

const sidebarSections: SidebarSection[] = [
  {
    label: null,
    items: [{ to: '/design', label: 'Overview', end: true }],
  },
  ...(import.meta.env.DEV ? [APP_PREVIEW_SECTION] : []),
  {
    label: 'Foundations',
    items: [
      { to: '/design/foundations/colors',     label: 'Colors' },
      { to: '/design/foundations/typography', label: 'Typography' },
      { to: '/design/foundations/icons',      label: 'Icons' },
    ],
  },
  {
    label: 'Components',
    groups: [
      {
        label: 'Actions',
        items: [
          { to: '/design/button',             label: 'Button' },
          { to: '/design/destructive-button', label: 'Destructive Button' },
        ],
      },
      {
        label: 'Charts',
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
        items: [
          { to: '/design/checkbox',     label: 'Checkbox' },
          { to: '/design/radio-button', label: 'Radio Button' },
          { to: '/design/switch',       label: 'Switch' },
        ],
      },
      {
        label: 'Display',
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
        items: [
          { to: '/design/stepper-circular',   label: 'Circular Stepper' },
          { to: '/design/stepper-horizontal', label: 'Horizontal Stepper' },
          { to: '/design/stepper-vertical',   label: 'Vertical Stepper' },
        ],
      },
      {
        label: 'Page Control',
        items: [
          { to: '/design/navigation-dot', label: 'Navigation Dot' },
          { to: '/design/pagination',     label: 'Pagination' },
        ],
      },
    ],
  },
]

const ChevronDown = TablerIcons['IconChevronDown'] as React.ComponentType<any>

// ─── Theme switcher ───────────────────────────────────────────────────────────

type ColorPreset = {
  name: string
  swatch: string
  primary: string
  hover: string
  secondary: string
  tertiary: string
  border: string
}

const COLOR_PRESETS: ColorPreset[] = [
  { name: 'Blue',    swatch: '#0baeec', primary: '#0baeec', hover: '#0170a3', secondary: '#b9e8fe', tertiary: '#f0faff', border: '#35c5fb' },
  { name: 'Violet',  swatch: '#7c3aed', primary: '#7c3aed', hover: '#5b21b6', secondary: '#ddd6fe', tertiary: '#f5f3ff', border: '#a78bfa' },
  { name: 'Emerald', swatch: '#059669', primary: '#059669', hover: '#047857', secondary: '#a7f3d0', tertiary: '#ecfdf5', border: '#6ee7b7' },
  { name: 'Amber',   swatch: '#d97706', primary: '#d97706', hover: '#b45309', secondary: '#fde68a', tertiary: '#fffbeb', border: '#fcd34d' },
  { name: 'Rose',    swatch: '#e11d48', primary: '#e11d48', hover: '#be123c', secondary: '#fecdd3', tertiary: '#fff1f2', border: '#fda4af' },
]

type RadiusPreset = { name: string; XS: string; S: string; M: string; L: string; XL: string }

const RADIUS_PRESETS: RadiusPreset[] = [
  { name: 'Sharp',   XS: '2px',  S: '4px',  M: '6px',  L: '8px',  XL: '12px' },
  { name: 'Default', XS: '4px',  S: '8px',  M: '12px', L: '16px', XL: '24px' },
  { name: 'Soft',    XS: '6px',  S: '12px', M: '16px', L: '20px', XL: '28px' },
  { name: 'Round',   XS: '10px', S: '16px', M: '22px', L: '28px', XL: '36px' },
]

function applyColor(p: ColorPreset) {
  const r = document.documentElement
  const map: Record<string, string> = {
    '--bg-brand_primary': p.primary, '--fg-brand_primary': p.primary,
    '--bg-action': p.primary, '--fg-action': p.primary,
    '--text-action': p.primary, '--text-brand': p.primary,
    '--text-link': p.primary, '--text-neutral': p.primary,
    '--fg-neutral_primary': p.primary, '--bg-neutral_primary': p.primary,
    '--bg-action_hover': p.hover, '--fg-action_hover': p.hover,
    '--text-action_hover': p.hover, '--text-link_hover': p.hover,
    '--bg-brand_secondary': p.secondary, '--fg-brand_secondary': p.secondary,
    '--bg-action_white_hover': p.secondary, '--bg-neutral_secondary': p.secondary,
    '--fg-neutral_secondary': p.secondary,
    '--bg-brand_tertiary': p.tertiary, '--fg-brand_tertiary': p.tertiary,
    '--bg-neutral_tertiary': p.tertiary, '--fg-neutral_tertiary': p.tertiary,
    '--border-action': p.border, '--border-brand': p.border,
    '--border-neutral_primary': p.border,
  }
  Object.entries(map).forEach(([k, v]) => r.style.setProperty(k, v))
}

function applyRadius(p: RadiusPreset) {
  const r = document.documentElement
  r.style.setProperty('--radius-XS', p.XS)
  r.style.setProperty('--radius-S', p.S)
  r.style.setProperty('--radius-M', p.M)
  r.style.setProperty('--radius-L', p.L)
  r.style.setProperty('--radius-XL', p.XL)
}

function ThemeSwitcher() {
  const [open, setOpen] = useState(false)
  const [activeColor, setActiveColor] = useState('Blue')
  const [activeRadius, setActiveRadius] = useState('Default')

  function selectColor(p: ColorPreset) {
    setActiveColor(p.name)
    applyColor(p)
  }

  function selectRadius(p: RadiusPreset) {
    setActiveRadius(p.name)
    applyRadius(p)
  }

  return (
    <div style={{ borderBottom: '1px solid var(--border-default)' }}>
      {/* Trigger row */}
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-(--padding-L) py-(--padding-M) hover:bg-(--bg-secondary) transition-colors cursor-pointer"
      >
        <div className="flex items-center gap-(--gap-S)">
          {/* Live color dot */}
          <span
            className="w-3 h-3 rounded-full shrink-0 transition-colors"
            style={{ background: COLOR_PRESETS.find(p => p.name === activeColor)?.primary ?? 'var(--bg-action)' }}
          />
          <span style={{ fontFamily: 'var(--font-secondary)', fontWeight: 600, fontSize: 12, color: 'var(--fg-tertiary)' }}>
            Theme
          </span>
        </div>
        <ChevronDown
          size={12}
          stroke={2}
          color="var(--fg-quaterny)"
          style={{ transform: open ? 'rotate(0deg)' : 'rotate(-90deg)', transition: 'transform 150ms ease' }}
        />
      </button>

      {/* Panel */}
      {open && (
        <div className="flex flex-col gap-(--gap-M) px-(--padding-L) pb-(--padding-M)">
          {/* Colors */}
          <div className="flex flex-col gap-(--gap-XS)">
            <span style={{ fontFamily: 'var(--font-secondary)', fontWeight: 600, fontSize: 10, color: 'var(--fg-quaterny)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Color
            </span>
            <div className="flex items-center gap-(--gap-S)">
              {COLOR_PRESETS.map(p => (
                <button
                  key={p.name}
                  type="button"
                  title={p.name}
                  onClick={() => selectColor(p)}
                  className="cursor-pointer transition-transform hover:scale-110"
                  style={{
                    width: 20, height: 20,
                    borderRadius: '50%',
                    background: p.swatch,
                    border: activeColor === p.name ? '2px solid var(--fg-primary)' : '2px solid transparent',
                    outline: activeColor === p.name ? '1px solid var(--bg-primary)' : 'none',
                    outlineOffset: -3,
                    padding: 0,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Radius */}
          <div className="flex flex-col gap-(--gap-XS)">
            <span style={{ fontFamily: 'var(--font-secondary)', fontWeight: 600, fontSize: 10, color: 'var(--fg-quaterny)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Radius
            </span>
            <div className="flex items-center gap-(--gap-XS)">
              {RADIUS_PRESETS.map(p => (
                <button
                  key={p.name}
                  type="button"
                  onClick={() => selectRadius(p)}
                  className="cursor-pointer transition-colors flex-1"
                  style={{
                    padding: '3px 0',
                    borderRadius: p.M,
                    fontSize: 10,
                    fontFamily: 'var(--font-secondary)',
                    fontWeight: 600,
                    border: activeRadius === p.name
                      ? '1.5px solid var(--border-action)'
                      : '1.5px solid var(--border-default)',
                    background: activeRadius === p.name ? 'var(--bg-brand_tertiary)' : 'transparent',
                    color: activeRadius === p.name ? 'var(--fg-brand_primary)' : 'var(--fg-tertiary)',
                  }}
                >
                  {p.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `flex items-center px-(--padding-M) py-(--padding-S) rounded-(--radius-S) text-sm font-medium transition-colors ${
    isActive
      ? 'bg-(--bg-brand_tertiary) text-(--fg-brand_primary)'
      : 'text-(--fg-primary) hover:bg-(--bg-secondary)'
  }`

function SidebarNavLink({ to, label, end }: SidebarItem) {
  return (
    <NavLink to={to} end={end} className={navLinkClass}>
      {label}
    </NavLink>
  )
}

function Sidebar() {
  const allGroupLabels = sidebarSections.flatMap(s => s.groups?.map(g => g.label) ?? [])
  const [openGroups, setOpenGroups] = useState<Set<string>>(() => new Set(allGroupLabels))

  function toggleGroup(label: string) {
    setOpenGroups(prev => {
      const next = new Set(prev)
      if (next.has(label)) next.delete(label)
      else next.add(label)
      return next
    })
  }

  return (
    <aside className="w-56 shrink-0 bg-(--bg-primary) border-r border-(--border-default) flex flex-col h-screen sticky top-0 overflow-y-auto">
      {/* Header */}
      <div className="px-(--padding-L) py-(--padding-M) border-b border-(--border-default) flex items-center gap-(--gap-S)">
        <svg width="22" height="17" viewBox="0 0 22 16.8173" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
          <path d="M22 13.8691V16.812C21.8876 16.8152 21.7774 16.8173 21.6671 16.8173C19.4368 16.8173 17.5215 16.1217 15.9495 14.7433C14.2946 16.1947 12.2585 16.8881 9.87589 16.811V13.868C11.9477 13.9589 13.5637 13.2496 14.8165 11.702L15.9495 10.3024L17.0815 11.702C18.33 13.2443 19.9387 13.9536 22 13.8691Z" fill="var(--fg-brand_primary)"/>
          <path d="M22 3.56664V6.50959C21.8876 6.51276 21.7774 6.51487 21.6671 6.51487C19.4368 6.51487 17.5215 5.8193 15.9495 4.44085C14.2946 5.89224 12.2585 6.5857 9.87589 6.50853V3.56558C11.9477 3.65649 13.5637 2.94718 14.8165 1.39959L15.9495 0L17.0815 1.39959C18.33 2.94189 19.9387 3.6512 22 3.56664Z" fill="var(--fg-brand_primary)"/>
          <path d="M12.1241 8.50326V11.4462C12.0118 11.4494 11.9015 11.4515 11.7912 11.4515C9.56089 11.4515 7.64556 11.1788 6.07361 9.80031C4.4187 11.2517 2.38261 11.5223 0 11.4452V8.5022C2.07179 8.59311 3.68785 8.30664 4.94058 6.75905L6.07361 5.35946L7.20558 6.75905C8.45412 8.30136 10.0628 8.58783 12.1241 8.50326Z" fill="var(--fg-brand_primary)"/>
        </svg>
        <p style={{ fontFamily: 'var(--font-primary)', fontWeight: 800, fontSize: 15, lineHeight: '20px', color: 'var(--fg-primary)' }}>
          Mediterra
        </p>
      </div>

      <ThemeSwitcher />

      <nav className="flex flex-col p-(--padding-S) gap-(--gap-XS) flex-1">
        {sidebarSections.map(({ label, items, groups }) => (
          <div key={label ?? 'root'} className="flex flex-col">

            {/* Section label */}
            {label && (
              <p className="px-(--padding-M) pt-(--padding-M) pb-(--padding-XS) text-xs font-semibold text-(--fg-tertiary) uppercase tracking-widest">
                {label}
              </p>
            )}

            {/* Flat items (Overview, Foundations) */}
            {items?.map(item => <SidebarNavLink key={item.to} {...item} />)}

            {/* Collapsible groups (Components) */}
            {groups?.map(group => {
              const isOpen = openGroups.has(group.label)
              return (
                <div key={group.label} className="flex flex-col">
                  <button
                    type="button"
                    onClick={() => toggleGroup(group.label)}
                    className="flex items-center justify-between px-(--padding-M) py-(--padding-S) rounded-(--radius-S) text-xs font-semibold text-(--fg-tertiary) uppercase tracking-widest hover:bg-(--bg-secondary) transition-colors cursor-pointer"
                  >
                    <span>{group.label}</span>
                    <ChevronDown
                      size={12}
                      stroke={2}
                      color="var(--fg-tertiary)"
                      style={{
                        transform: isOpen ? 'rotate(0deg)' : 'rotate(-90deg)',
                        transition: 'transform 150ms ease',
                        flexShrink: 0,
                      }}
                    />
                  </button>
                  {isOpen && (
                    <div className="flex flex-col pl-(--padding-S)">
                      {group.items.map(item => <SidebarNavLink key={item.to} {...item} />)}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        ))}
      </nav>
    </aside>
  )
}

function DesignLayout() {
  return (
    <div className="flex min-h-screen bg-(--bg-page)">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <Routes>
          <Route path="/design"                        element={<DesignOverview />} />
          <Route path="/design/foundations/colors"     element={<ColorsPage />} />
          <Route path="/design/foundations/typography" element={<TypographyPage />} />
          <Route path="/design/foundations/icons"      element={<IconsPage />} />
          <Route path="/design/button"                 element={<ButtonPage />} />
          <Route path="/design/destructive-button"     element={<DestructiveButtonPage />} />
          <Route path="/design/alert"                  element={<AlertPage />} />
          <Route path="/design/tips"                   element={<TipsPage />} />
          <Route path="/design/avatar"                 element={<AvatarPage />} />
          <Route path="/design/notification"           element={<NotificationPage />} />
          <Route path="/design/tag"                    element={<TagPage />} />
          <Route path="/design/badge"                  element={<BadgePage />} />
          <Route path="/design/input"                  element={<InputPage />} />
          <Route path="/design/checkbox"               element={<CheckboxPage />} />
          <Route path="/design/card"                   element={<CardPage />} />
          <Route path="/design/chip"                   element={<ChipPage />} />
          <Route path="/design/modal"                  element={<ModalPage />} />
          <Route path="/design/text-field"             element={<TextFieldPage />} />
          <Route path="/design/password"               element={<PasswordInputPage />} />
          <Route path="/design/otp"                    element={<OTPInputPage />} />
          <Route path="/design/select"                 element={<SelectPage />} />
          <Route path="/design/numeric"               element={<NumericInputPage />} />
          <Route path="/design/textarea"              element={<TextAreaPage />} />
          <Route path="/design/multiselect"           element={<MultiSelectPage />} />
          <Route path="/design/phone"                element={<PhoneNumberInputPage />} />
          <Route path="/design/credit-card"          element={<CreditCardInputPage />} />
          <Route path="/design/file-upload"          element={<FileUploadPage />} />
          <Route path="/design/list-item"            element={<ListItemPage />} />
          <Route path="/design/notification-item"   element={<NotificationItemPage />} />
          <Route path="/design/banner"              element={<BannerPage />} />
          <Route path="/design/global-alert"        element={<GlobalAlertPage />} />
          <Route path="/design/tooltip"             element={<TooltipPage />} />
          <Route path="/design/popover"             element={<PopoverPage />} />
          <Route path="/design/switch"              element={<SwitchPage />} />
          <Route path="/design/progress-bar"        element={<ProgressBarPage />} />
          <Route path="/design/stepper-horizontal"  element={<HorizontalStepperPage />} />
          <Route path="/design/stepper-vertical"    element={<VerticalStepperPage />} />
          <Route path="/design/stepper-circular"    element={<CircularStepperPage />} />
          <Route path="/design/header-mobile"        element={<HeaderMobilePage />} />
          <Route path="/design/bottom-bar"           element={<BottomBarPage />} />
          <Route path="/design/tab-bar"              element={<TabBarPage />} />
          <Route path="/design/sidebar-nav"          element={<SidebarNavPage />} />
          <Route path="/design/radio-button"         element={<RadioButtonPage />} />
          <Route path="/design/head-icon"            element={<HeadIconPage />} />
          <Route path="/design/navigation-dot"       element={<NavigationDotPage />} />
          <Route path="/design/pagination"           element={<PaginationPage />} />
          <Route path="/design/stat-card"            element={<StatCardPage />} />
          <Route path="/design/radar-chart"          element={<RadarChartPage />} />
          <Route path="/design/line-chart"           element={<LineChartPage />} />
          <Route path="/design/step-chart"           element={<StepChartPage />} />
          <Route path="/design/bar-chart"            element={<BarChartPage />} />
        </Routes>
      </main>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/design" replace />} />
        {/* App prototype screens — local dev only */}
        {import.meta.env.DEV && <Route path="/app"                 element={<ScreenHome />} />}
        {import.meta.env.DEV && <Route path="/app/onboarding"      element={<ScreenOnboarding />} />}
        {import.meta.env.DEV && <Route path="/app/support"         element={<ScreenSupportList />} />}
        {import.meta.env.DEV && <Route path="/app/support/new"     element={<ScreenSupportCreate />} />}
        {import.meta.env.DEV && <Route path="/app/mobile"          element={<ScreenMobileDashboard />} />}
        {import.meta.env.DEV && <Route path="/app/mobile/pot-type" element={<ScreenMobilePotType />} />}
        {import.meta.env.DEV && <Route path="/app/question-form"   element={<ScreenQuestionForm />} />}
        {/* Design system playground */}
        <Route path="/*" element={<DesignLayout />} />
      </Routes>
      {import.meta.env.DEV && <Agentation />}
    </BrowserRouter>
  )
}

export default App
