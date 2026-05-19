/**
 * Icon abstraction layer — to swap the icon library, edit ONLY this file.
 *
 * Current library : Tabler Icons (@tabler/icons-react) — stroke style, stroke={2}
 *
 * ─── Switching to filled icons ────────────────────────────────────────────────
 *
 * Option A — Tabler Filled (same library, separate components named *Filled)
 *   Add a `filled` prop and resolve the component name:
 *
 *   export function Icon({ name, size = 24, stroke = 2, filled = false, color, className }: IconProps) {
 *     const resolvedName = filled ? `${name}Filled` : name
 *     const IconComponent = (TablerIcons[resolvedName] ?? TablerIcons[name]) as React.ComponentType<any>
 *     if (!IconComponent) return null
 *     return <IconComponent size={size} stroke={filled ? undefined : stroke} color={color} className={className} />
 *   }
 *
 *   To make all icons filled by default, change `filled = false` → `filled = true`.
 *   Not every icon has a Filled variant — the fallback to the stroke version is automatic.
 *
 * Option B — Phosphor Icons (native fill mode via weight prop)
 *   1. npm uninstall @tabler/icons-react && npm install @phosphor-icons/react
 *   2. Replace this file with:
 *
 *   import { icons } from '@phosphor-icons/react'
 *   export function Icon({ name, size = 24, weight = 'regular', color, className }) {
 *     const PhosphorIcon = icons[name]
 *     if (!PhosphorIcon) return null
 *     return <PhosphorIcon size={size} weight={weight} color={color} className={className} />
 *   }
 *
 *   Pass weight="fill" to get filled icons. Default to "fill" site-wide by changing the default value.
 *
 * Option C — Lucide Icons (stroke only, no fill variant)
 *   1. npm uninstall @tabler/icons-react && npm install lucide-react
 *   2. Replace this file with:
 *
 *   import { icons } from 'lucide-react'
 *   export function Icon({ name, size = 24, color, className }) {
 *     const LucideIcon = icons[name]
 *     if (!LucideIcon) return null
 *     return <LucideIcon size={size} color={color} className={className} />
 *   }
 *
 * ─── Rule ─────────────────────────────────────────────────────────────────────
 * No other file needs to change when swapping libraries. All ~30 components
 * call <Icon /> — this file is the single point of control.
 */

import * as TablerIcons from '@tabler/icons-react'
import React from 'react'

type TablerIconName = keyof typeof TablerIcons

export interface IconProps {
  name: TablerIconName | string
  size?: number
  stroke?: number
  className?: string
  color?: string
}

export function Icon({ name, size = 24, stroke = 1.5, className, color }: IconProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const IconComponent = (TablerIcons as unknown as Record<string, React.ComponentType<any>>)[name]
  if (!IconComponent) {
    console.warn(`Icon "${name}" not found in Tabler Icons`)
    return null
  }
  return <IconComponent size={size} stroke={stroke} className={className} color={color} />
}
