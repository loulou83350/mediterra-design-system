import React from 'react'

type BadgeVariant = 'brand' | 'success' | 'warning' | 'error' | 'neutral'

interface BadgeProps {
  variant?: BadgeVariant
  children: React.ReactNode
}

const variants: Record<BadgeVariant, string> = {
  brand:   'bg-(--bg-brand_tertiary) text-(--fg-brand_primary)',
  success: 'bg-(--bg-succes_tertiary) text-(--fg-succes_primary)',
  warning: 'bg-(--bg-warning_tertiary) text-(--fg-warning_primary)',
  error:   'bg-(--bg-error_tertiary) text-(--fg-error_primary)',
  neutral: 'bg-(--bg-quaterny) text-(--fg-secondary)',
}

export function Badge({ variant = 'neutral', children }: BadgeProps) {
  return (
    <span className={`inline-flex items-center px-(--padding-S) h-6 text-xs font-semibold rounded-(--radius-XS) ${variants[variant]}`}>
      {children}
    </span>
  )
}
