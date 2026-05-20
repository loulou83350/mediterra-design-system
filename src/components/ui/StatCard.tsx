export type StatCardColor = 'Brand' | 'Success' | 'Warning' | 'Error'
export type StatCardSize  = 'S' | 'M'

export interface StatCardProps {
  color?:  StatCardColor
  size?:   StatCardSize
  label?:  string
  value?:  string | number
}

const colorMap: Record<StatCardColor, { bg: string; fg: string }> = {
  Brand:   { bg: 'bg-(--bg-brand_tertiary)',   fg: 'var(--fg-brand_primary)' },
  Success: { bg: 'bg-(--bg-succes_tertiary)',   fg: 'var(--fg-succes_primary)' },
  Warning: { bg: 'bg-(--bg-warning_tertiary)',  fg: 'var(--fg-warning_primary)' },
  Error:   { bg: 'bg-(--bg-error_tertiary)',    fg: 'var(--fg-error_primary)' },
}

export function StatCard({
  color  = 'Brand',
  size   = 'M',
  label  = 'Label',
  value  = 'x1.50',
}: StatCardProps) {
  const { bg, fg } = colorMap[color]

  const isM = size === 'M'

  const containerCls = isM
    ? `${bg} rounded-(--radius-M) px-(--padding-XL) py-(--padding-L) flex flex-col gap-(--gap-XS)`
    : `${bg} rounded-(--radius-S) px-(--padding-L) py-(--padding-M) flex flex-col gap-(--gap-XS)`

  const labelStyle: React.CSSProperties = isM
    ? { fontFamily: 'var(--font-secondary)', fontWeight: 400, fontSize: 12, lineHeight: '16px', color: fg }
    : { fontFamily: 'var(--font-secondary)', fontWeight: 400, fontSize: 10, lineHeight: '12px', color: fg }

  const valueStyle: React.CSSProperties = isM
    ? { fontFamily: 'var(--font-primary)', fontWeight: 800, fontSize: 32, lineHeight: '40px', color: fg }
    : { fontFamily: 'var(--font-primary)', fontWeight: 800, fontSize: 18, lineHeight: '24px', color: fg }

  return (
    <div className={containerCls}>
      <span style={labelStyle}>{label}</span>
      <span style={valueStyle}>{value}</span>
    </div>
  )
}
