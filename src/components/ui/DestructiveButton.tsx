import React from 'react'
import { Icon } from './Icon'
import type { IconProps } from './Icon'

export type DestructiveButtonVariant = 'Primary' | 'Secondary' | 'Tertiary' | 'Quaterny'

export interface DestructiveButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  variant?: DestructiveButtonVariant
  small?: boolean
  iconButton?: boolean
  icon?: IconProps['name']
  showIcon?: boolean
  type?: 'button' | 'submit' | 'reset'
}

const variantClasses: Record<DestructiveButtonVariant, string> = {
  Primary:   'bg-(--bg-error_primary) text-(--text-action_white) hover:bg-(--bg-error_secondary)',
  Secondary: 'border-2 border-(--border-error_primary) text-(--text-error) hover:border-(--border-error_primary) hover:text-(--text-error) hover:bg-(--bg-error_tertiary)',
  Tertiary:  'text-(--text-error) hover:bg-(--bg-error_tertiary)',
  Quaterny:  'text-(--text-tertiary) hover:bg-(--bg-secondary)',
}

export function DestructiveButton({
  variant = 'Primary',
  small = false,
  iconButton = false,
  icon = 'IconTrashX',
  showIcon = true,
  type = 'button',
  children,
  className = '',
  ...props
}: DestructiveButtonProps) {
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
        variantClasses[variant],
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
