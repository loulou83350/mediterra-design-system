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
import { ColorsPage } from './pages/foundations/ColorsPage'
import { TypographyPage } from './pages/foundations/TypographyPage'
import { IconsPage } from './pages/foundations/IconsPage'

type SidebarItem  = { to: string; label: string; end?: boolean }
type SidebarGroup = { label: string; items: SidebarItem[] }
type SidebarSection = {
  label: string | null
  items?: SidebarItem[]
  groups?: SidebarGroup[]
}

const sidebarSections: SidebarSection[] = [
  {
    label: null,
    items: [{ to: '/design', label: 'Overview', end: true }],
  },
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
        label: 'Inputs',
        items: [
          { to: '/design/text-field', label: 'Text Field' },
          { to: '/design/password',   label: 'Password' },
          { to: '/design/otp',        label: 'OTP Code' },
          { to: '/design/select',      label: 'Select' },
          { to: '/design/numeric',     label: 'Numeric Input' },
          { to: '/design/textarea',    label: 'Text Area' },
          { to: '/design/multiselect',  label: 'Multi Select' },
          { to: '/design/phone',        label: 'Phone Number' },
          { to: '/design/credit-card',  label: 'Credit Card' },
          { to: '/design/file-upload',  label: 'File Upload' },
        ],
      },
      {
        label: 'Controls',
        items: [
          { to: '/design/checkbox', label: 'Checkbox' },
          { to: '/design/switch',   label: 'Switch' },
        ],
      },
      {
        label: 'Display',
        items: [
          { to: '/design/avatar', label: 'Avatar' },
          { to: '/design/badge',  label: 'Badge' },
          { to: '/design/card',   label: 'Card' },
          { to: '/design/tag',    label: 'Tag' },
          { to: '/design/chip',         label: 'Chip' },
          { to: '/design/progress-bar', label: 'Progress Bar' },
          { to: '/design/list-item',    label: 'List Item' },
        ],
      },
      {
        label: 'Feedback',
        items: [
          { to: '/design/alert',        label: 'Alert' },
          { to: '/design/notification', label: 'Notification' },
          { to: '/design/tips',         label: 'Tips' },
          { to: '/design/modal',             label: 'Modal & Drawer' },
          { to: '/design/notification-item', label: 'Notification Item' },
          { to: '/design/global-alert',      label: 'Global Alert' },
          { to: '/design/tooltip',           label: 'Tooltip' },
          { to: '/design/popover',           label: 'Popover' },
        ],
      },
      {
        label: 'Navigation',
        items: [
          { to: '/design/stepper-horizontal', label: 'Horizontal Stepper' },
          { to: '/design/stepper-vertical',   label: 'Vertical Stepper' },
          { to: '/design/stepper-circular',   label: 'Circular Stepper' },
        ],
      },
      {
        label: 'Layout',
        items: [
          { to: '/design/header-mobile', label: 'Header Mobile' },
          { to: '/design/banner',        label: 'Banner' },
          { to: '/design/bottom-bar',    label: 'Bottom Bar' },
          { to: '/design/tab-bar',       label: 'Tab Bar' },
          { to: '/design/sidebar-nav',   label: 'Sidebar Navigation' },
        ],
      },
    ],
  },
]

const ChevronDown = TablerIcons['IconChevronDown'] as React.ComponentType<any>

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `flex items-center px-(--padding-M) py-(--padding-S) rounded-(--radius-S) text-sm font-medium transition-colors ${
    isActive
      ? 'bg-(--bg-brand_tertiary) text-(--fg-brand_primary)'
      : 'text-(--fg-secondary) hover:bg-(--bg-secondary) hover:text-(--fg-primary)'
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
      <div className="px-(--padding-L) py-(--padding-L) border-b border-(--border-default)">
        <p className="text-xs font-semibold text-(--fg-tertiary) uppercase tracking-wider">Design system</p>
        <p className="text-sm font-semibold text-(--fg-primary) mt-(--gap-XXS)">Mediterra</p>
      </div>

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
                    className="flex items-center justify-between px-(--padding-M) py-(--padding-S) rounded-(--radius-S) text-xs font-semibold text-(--fg-quaterny) uppercase tracking-widest hover:bg-(--bg-secondary) transition-colors cursor-pointer"
                  >
                    <span>{group.label}</span>
                    <ChevronDown
                      size={12}
                      stroke={2}
                      color="var(--fg-quaterny)"
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
        <Route path="/*" element={<DesignLayout />} />
      </Routes>
      <Agentation />
    </BrowserRouter>
  )
}

export default App
