export interface NotificationProps {
  size?: 'S' | 'M' | 'L'
  count?: number
}

export function Notification({ size = 'S', count = 0 }: NotificationProps) {
  if (size === 'S') {
    return (
      <span
        className="inline-block rounded-(--radius-max) shrink-0"
        style={{ width: 8, height: 8, backgroundColor: 'var(--fg-error_primary)' }}
      />
    )
  }

  const dim = size === 'L' ? 24 : 16
  const fontSize = size === 'L' ? 12 : 10
  const lineHeight = size === 'L' ? '16px' : '12px'
  const label = count > 99 ? '99+' : String(count)

  return (
    <span
      className="inline-flex items-center justify-center rounded-(--radius-max) shrink-0"
      style={{
        width: dim,
        height: dim,
        backgroundColor: 'var(--fg-error_primary)',
        fontFamily: 'var(--font-secondary)',
        fontWeight: 400,
        fontSize,
        lineHeight,
        color: 'var(--text-invert)',
      }}
    >
      {label}
    </span>
  )
}
