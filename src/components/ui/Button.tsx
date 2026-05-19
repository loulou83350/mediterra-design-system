import React from 'react'
import { Icon } from './Icon'
import type { IconProps } from './Icon'

export type ButtonVariant = 'Primary' | 'Secondary' | 'Tertiary' | 'Quaterny'

export interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  variant?: ButtonVariant
  small?: boolean
  invert?: boolean
  iconButton?: boolean
  icon?: IconProps['name']
  showIcon?: boolean
  type?: 'button' | 'submit' | 'reset'
}

const variantClasses: Record<ButtonVariant, { base: string; inverted: string }> = {
  Primary: {
    base:     'bg-(--bg-action) text-(--text-action_white) hover:bg-(--bg-action_hover)',
    inverted: 'bg-(--bg-action_white) text-(--text-action) hover:bg-(--bg-action_white_hover)',
  },
  Secondary: {
    base:     'border-2 border-(--border-action) text-(--text-action) hover:border-(--border-action_hover) hover:text-(--text-action_hover)',
    inverted: 'border-2 border-(--fg-white) text-(--fg-white) hover:bg-white/10',
  },
  Tertiary: {
    base:     'text-(--text-action) hover:bg-(--bg-brand_tertiary)',
    inverted: 'text-(--fg-white) hover:bg-white/10',
  },
  Quaterny: {
    base:     'text-(--text-tertiary) hover:bg-(--bg-secondary)',
    inverted: 'text-white/60 hover:bg-white/10',
  },
}

export function Button({
  variant = 'Primary',
  small = false,
  invert = false,
  iconButton = false,
  icon = 'IconPlus',
  showIcon = true,
  type = 'button',
  children,
  className = '',
  ...props
}: ButtonProps) {
  const vClass = variantClasses[variant][invert ? 'inverted' : 'base']

  const sizeClass = iconButton
    ? small ? 'w-10 h-10' : 'w-14 h-14'
    : small
      ? 'py-(--padding-S) pl-(--padding-M) pr-(--padding-L) text-[16px] leading-6'
      : 'py-(--padding-L) pl-(--padding-XL) pr-(--padding-XXL) text-[18px] leading-6'

  return (
    <button
      type={type}
      style={{ fontFamily: 'var(--font-primary)', fontWeight: 800 }}
      className={[
        'inline-flex items-center justify-center gap-(--gap-XS)',
        'rounded-(--radius-S) transition-colors cursor-pointer',
        'disabled:opacity-40 disabled:cursor-not-allowed',
        vClass,
        sizeClass,
        className,
      ].join(' ')}
      {...props}
    >
      {iconButton ? (
        <Icon name={icon} size={24} stroke={2} />
      ) : (
        <>
          {showIcon && <Icon name={icon} size={24} stroke={2} />}
          <span className="pl-(--padding-XS)">{children}</span>
        </>
      )}
    </button>
  )
}
