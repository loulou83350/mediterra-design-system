import React from 'react'
import { Link } from 'react-router-dom'
import { Badge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'
import { Icon } from '../components/ui/Icon'

const foundations = [
  { to: '/design/foundations/colors',     label: 'Colors',      desc: '77 semantic tokens · primitives → semantic', icon: 'IconPalette' as const },
  { to: '/design/foundations/typography', label: 'Typography',  desc: 'Wanted Sans · Open Sans · 4 levels',         icon: 'IconLetterCase' as const },
  { to: '/design/foundations/icons',      label: 'Icons',       desc: 'Tabler Icons · single-file abstraction',     icon: 'IconSticker' as const },
]

const components = [
  { to: '/design/button', label: 'Button', desc: '4 types · 2 sizes · Invert · Icon Button', badge: 'brand' as const },
  { to: '/design/badge',  label: 'Badge',  desc: '5 variants · brand · success · warning · error', badge: 'brand' as const },
  { to: '/design/input',  label: 'Input',  desc: 'Label · hint · error · password · search states', badge: 'brand' as const },
  { to: '/design/card',   label: 'Card',   desc: 'Surface container', badge: 'brand' as const },
]

const keyTokens = [
  { name: '--primary',        value: '#0baeec', label: 'Brand' },
  { name: '--bg-page',        value: '#f7f9fc', label: 'Page' },
  { name: '--bg-primary',     value: '#ffffff', label: 'Surface' },
  { name: '--fg-primary',     value: '#1a202c', label: 'Text' },
  { name: '--border-default', value: '#e2e7f0', label: 'Border' },
  { name: '--bg-action',      value: '#0baeec', label: 'Action' },
]

function SectionHeader({ label, children }: { label: string; children?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between mb-(--gap-L)">
      <h2 style={{ fontFamily: 'var(--font-primary)', fontSize: 20, lineHeight: '28px', fontWeight: 800 }}>
        {label}
      </h2>
      {children}
    </div>
  )
}

export function DesignOverview() {
  return (
    <div className="p-(--padding-XXXL) flex flex-col gap-(--gap-XXXL) max-w-4xl">

      {/* Hero */}
      <div className="flex flex-col gap-(--gap-M)">
        <div>
          <h1 style={{ fontFamily: 'var(--font-primary)', fontSize: 40, lineHeight: '48px', fontWeight: 800 }}>
            Design System
          </h1>
          <p className="mt-(--gap-S) text-base text-(--fg-secondary) max-w-lg leading-relaxed">
            Based on the UXProbe Figma file. Tokens → Tailwind CSS v4. Change the visual identity by editing a single file.
          </p>
        </div>
        <div className="flex items-center gap-(--gap-M) mt-(--gap-XS)">
          <span className="inline-flex items-center gap-(--gap-XS) text-xs text-(--fg-tertiary)">
            <span className="w-2 h-2 rounded-full bg-(--bg-action) inline-block" />
            Vite + React + TypeScript
          </span>
          <span className="inline-flex items-center gap-(--gap-XS) text-xs text-(--fg-tertiary)">
            <span className="w-2 h-2 rounded-full bg-(--bg-succes_primary) inline-block" />
            Tailwind CSS v4
          </span>
          <span className="inline-flex items-center gap-(--gap-XS) text-xs text-(--fg-tertiary)">
            <span className="w-2 h-2 rounded-full bg-(--bg-warning_primary) inline-block" />
            Tabler Icons
          </span>
        </div>
      </div>

      {/* Key tokens */}
      <section>
        <SectionHeader label="Key Tokens" />
        <div className="grid grid-cols-6 gap-(--gap-S)">
          {keyTokens.map(({ name, value, label }) => (
            <div key={name} className="bg-(--bg-primary) border border-(--border-default) rounded-(--radius-M) overflow-hidden">
              <div className="h-10" style={{ backgroundColor: value }} />
              <div className="p-(--padding-S)">
                <p className="text-xs font-semibold text-(--fg-primary) truncate">{label}</p>
                <p className="text-xs text-(--fg-tertiary) font-mono mt-0.5 truncate">{name}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Foundations */}
      <section>
        <SectionHeader label="Foundations" />
        <div className="grid grid-cols-3 gap-(--gap-M)">
          {foundations.map(({ to, label, desc, icon }) => (
            <Link key={to} to={to} className="no-underline group">
              <div className="bg-(--bg-primary) border border-(--border-default) rounded-(--radius-L) p-(--padding-XXL) flex flex-col gap-(--gap-M) hover:border-(--border-action) transition-colors h-full">
                <div className="w-10 h-10 rounded-(--radius-M) bg-(--bg-brand_tertiary) flex items-center justify-center text-(--fg-brand_primary)">
                  <Icon name={icon} size={20} stroke={2} />
                </div>
                <div>
                  <p className="font-semibold text-(--fg-primary) text-sm">{label}</p>
                  <p className="text-xs text-(--fg-tertiary) mt-(--gap-XS) leading-relaxed">{desc}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Components */}
      <section>
        <SectionHeader label="Components" />
        <div className="grid grid-cols-2 gap-(--gap-M)">
          {components.map(({ to, label, desc, badge }) => (
            <Link key={to} to={to} className="no-underline group">
              <div className="bg-(--bg-primary) border border-(--border-default) rounded-(--radius-L) p-(--padding-XXL) flex flex-col gap-(--gap-S) hover:border-(--border-action) transition-colors h-full">
                <div className="flex items-center justify-between">
                  <p style={{ fontFamily: 'var(--font-primary)', fontWeight: 800, fontSize: 18 }} className="text-(--fg-primary)">
                    {label}
                  </p>
                  <Badge variant={badge}>Stable</Badge>
                </div>
                <p className="text-xs text-(--fg-tertiary) leading-relaxed">{desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Change visual identity */}
      <section>
        <div className="bg-(--bg-primary) border border-(--border-default) rounded-(--radius-L) p-(--padding-XXL) flex items-start gap-(--gap-XL)">
          <div className="w-10 h-10 rounded-(--radius-M) bg-(--bg-brand_tertiary) flex items-center justify-center text-(--fg-brand_primary) shrink-0">
            <Icon name="IconRefresh" size={20} stroke={2} />
          </div>
          <div className="flex-1">
            <p style={{ fontFamily: 'var(--font-primary)', fontWeight: 800, fontSize: 16 }} className="text-(--fg-primary) mb-(--gap-XS)">
              Change visual identity
            </p>
            <p className="text-sm text-(--fg-secondary) leading-relaxed mb-(--gap-L)">
              To retheme the entire system, edit only{' '}
              <code className="px-(--padding-XS) py-0.5 rounded-(--radius-XS) bg-(--bg-quaterny) text-xs font-mono">src/index.css</code>{' '}
              → the{' '}
              <code className="px-(--padding-XS) py-0.5 rounded-(--radius-XS) bg-(--bg-quaterny) text-xs font-mono">@theme</code>{' '}
              block. Changing{' '}
              <code className="px-(--padding-XS) py-0.5 rounded-(--radius-XS) bg-(--bg-quaterny) text-xs font-mono">--primary</code>{' '}
              cascades across all components.
            </p>
            <Button variant="Secondary" small showIcon={false}>View DESIGN-SYSTEM.md</Button>
          </div>
        </div>
      </section>

    </div>
  )
}
