import {
  RadarChart as RechartsRadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  LineChart as RechartsLineChart,
  Line,
  AreaChart as RechartsAreaChart,
  Area,
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts'

// ─── Shared palette ───────────────────────────────────────────────────────────

export const CHART_COLORS = [
  'var(--fg-brand_primary)',
  'var(--fg-succes_primary)',
  'var(--fg-warning_primary)',
  'var(--fg-error_primary)',
  'var(--fg-neutral_primary)',
]

const AXIS_COLOR   = 'var(--fg-tertiary)'
const GRID_COLOR   = 'var(--fg-quaterny)'
const TOOLTIP_STYLE: React.CSSProperties = {
  background:   'var(--bg-tooltips)',
  border:       '1px solid var(--border-default)',
  borderRadius: 'var(--radius-S)',
  color:        'var(--text-action_white)',
  fontSize:     12,
  fontFamily:   'var(--font-secondary)',
}

// ─── RadarChart ───────────────────────────────────────────────────────────────

export interface RadarChartDataPoint {
  label: string
  [key: string]: number | string
}

export interface RadarSeries {
  key:    string
  name:   string
  color?: string
}

export interface RadarChartProps {
  data:     RadarChartDataPoint[]
  series:   RadarSeries[]
  variant?: 'solid' | 'light' | 'multi'
  size?:    number
}

export function RadarChartComponent({
  data,
  series,
  variant = 'light',
  size    = 400,
}: RadarChartProps) {
  const fillOpacity = variant === 'solid' ? 0.9 : 0.15

  return (
    <ResponsiveContainer width="100%" height={size}>
      <RechartsRadarChart data={data}>
        <PolarGrid stroke={GRID_COLOR} />
        <PolarAngleAxis
          dataKey="label"
          tick={{ fill: AXIS_COLOR, fontSize: 12, fontFamily: 'var(--font-secondary)' }}
        />
        <PolarRadiusAxis
          tick={{ fill: AXIS_COLOR, fontSize: 10 }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip contentStyle={TOOLTIP_STYLE} />
        {(variant === 'multi' ? series : [series[0]]).map((s, i) => (
          <Radar
            key={s.key}
            name={s.name}
            dataKey={s.key}
            stroke={s.color ?? CHART_COLORS[i % CHART_COLORS.length]}
            fill={s.color ?? CHART_COLORS[i % CHART_COLORS.length]}
            fillOpacity={fillOpacity}
            strokeWidth={2}
          />
        ))}
        {variant === 'multi' && <Legend wrapperStyle={{ fontFamily: 'var(--font-secondary)', fontSize: 12, color: AXIS_COLOR }} />}
      </RechartsRadarChart>
    </ResponsiveContainer>
  )
}

// ─── LineChart ────────────────────────────────────────────────────────────────

export interface ChartDataPoint {
  label: string
  [key: string]: number | string
}

export interface ChartSeries {
  key:    string
  name:   string
  color?: string
}

export interface LineChartProps {
  data:        ChartDataPoint[]
  lines:       ChartSeries[]
  showCursor?: boolean
  height?:     number
}

export function LineChartComponent({
  data,
  lines,
  showCursor = false,
  height     = 300,
}: LineChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsLineChart data={data} margin={{ top: 8, right: 16, bottom: 8, left: 0 }}>
        <CartesianGrid stroke={GRID_COLOR} strokeDasharray="4 4" vertical={false} />
        <XAxis
          dataKey="label"
          tick={{ fill: AXIS_COLOR, fontSize: 12, fontFamily: 'var(--font-secondary)' }}
          axisLine={{ stroke: GRID_COLOR }}
          tickLine={false}
        />
        <YAxis
          tick={{ fill: AXIS_COLOR, fontSize: 12, fontFamily: 'var(--font-secondary)' }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip
          contentStyle={TOOLTIP_STYLE}
          cursor={showCursor ? <ReferenceLine stroke={GRID_COLOR} strokeDasharray="4 4" /> : false}
        />
        {lines.length > 1 && (
          <Legend wrapperStyle={{ fontFamily: 'var(--font-secondary)', fontSize: 12, color: AXIS_COLOR }} />
        )}
        {lines.map((l, i) => (
          <Line
            key={l.key}
            type="monotone"
            dataKey={l.key}
            name={l.name}
            stroke={l.color ?? CHART_COLORS[i % CHART_COLORS.length]}
            strokeWidth={2}
            dot={{ r: 4, fill: l.color ?? CHART_COLORS[i % CHART_COLORS.length], strokeWidth: 0 }}
            activeDot={{ r: 6 }}
          />
        ))}
      </RechartsLineChart>
    </ResponsiveContainer>
  )
}

// ─── StepChart ────────────────────────────────────────────────────────────────

export interface StepChartProps {
  data:    ChartDataPoint[]
  lines:   ChartSeries[]
  filled?: boolean
  height?: number
}

export function StepChartComponent({
  data,
  lines,
  filled = false,
  height = 300,
}: StepChartProps) {
  if (filled) {
    return (
      <ResponsiveContainer width="100%" height={height}>
        <RechartsAreaChart data={data} margin={{ top: 8, right: 16, bottom: 8, left: 0 }}>
          <CartesianGrid stroke={GRID_COLOR} strokeDasharray="4 4" vertical={false} />
          <XAxis
            dataKey="label"
            tick={{ fill: AXIS_COLOR, fontSize: 12, fontFamily: 'var(--font-secondary)' }}
            axisLine={{ stroke: GRID_COLOR }}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: AXIS_COLOR, fontSize: 12, fontFamily: 'var(--font-secondary)' }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip contentStyle={TOOLTIP_STYLE} />
          {lines.length > 1 && (
            <Legend wrapperStyle={{ fontFamily: 'var(--font-secondary)', fontSize: 12, color: AXIS_COLOR }} />
          )}
          {lines.map((l, i) => {
            const color = l.color ?? CHART_COLORS[i % CHART_COLORS.length]
            return (
              <Area
                key={l.key}
                type="stepAfter"
                dataKey={l.key}
                name={l.name}
                stroke={color}
                fill={color}
                fillOpacity={0.15}
                strokeWidth={2}
              />
            )
          })}
        </RechartsAreaChart>
      </ResponsiveContainer>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsLineChart data={data} margin={{ top: 8, right: 16, bottom: 8, left: 0 }}>
        <CartesianGrid stroke={GRID_COLOR} strokeDasharray="4 4" vertical={false} />
        <XAxis
          dataKey="label"
          tick={{ fill: AXIS_COLOR, fontSize: 12, fontFamily: 'var(--font-secondary)' }}
          axisLine={{ stroke: GRID_COLOR }}
          tickLine={false}
        />
        <YAxis
          tick={{ fill: AXIS_COLOR, fontSize: 12, fontFamily: 'var(--font-secondary)' }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip contentStyle={TOOLTIP_STYLE} />
        {lines.length > 1 && (
          <Legend wrapperStyle={{ fontFamily: 'var(--font-secondary)', fontSize: 12, color: AXIS_COLOR }} />
        )}
        {lines.map((l, i) => (
          <Line
            key={l.key}
            type="stepAfter"
            dataKey={l.key}
            name={l.name}
            stroke={l.color ?? CHART_COLORS[i % CHART_COLORS.length]}
            strokeWidth={2}
            dot={false}
          />
        ))}
      </RechartsLineChart>
    </ResponsiveContainer>
  )
}

// ─── BarChart ─────────────────────────────────────────────────────────────────

export interface BarChartProps {
  data:    ChartDataPoint[]
  bars:    ChartSeries[]
  height?: number
  radius?: number
}

export function BarChartComponent({
  data,
  bars,
  height = 300,
  radius = 4,
}: BarChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsBarChart data={data} margin={{ top: 8, right: 16, bottom: 8, left: 0 }} barGap={4} barCategoryGap="30%">
        <CartesianGrid stroke={GRID_COLOR} strokeDasharray="4 4" vertical={false} />
        <XAxis
          dataKey="label"
          tick={{ fill: AXIS_COLOR, fontSize: 12, fontFamily: 'var(--font-secondary)' }}
          axisLine={{ stroke: GRID_COLOR }}
          tickLine={false}
        />
        <YAxis
          tick={{ fill: AXIS_COLOR, fontSize: 12, fontFamily: 'var(--font-secondary)' }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip contentStyle={TOOLTIP_STYLE} cursor={{ fill: 'var(--bg-secondary)' }} />
        {bars.length > 1 && (
          <Legend wrapperStyle={{ fontFamily: 'var(--font-secondary)', fontSize: 12, color: AXIS_COLOR }} />
        )}
        {bars.map((b, i) => (
          <Bar
            key={b.key}
            dataKey={b.key}
            name={b.name}
            fill={b.color ?? CHART_COLORS[i % CHART_COLORS.length]}
            radius={[radius, radius, 0, 0]}
          />
        ))}
      </RechartsBarChart>
    </ResponsiveContainer>
  )
}
