import { useState } from 'react'
import { RadarChartComponent } from '../components/ui/Charts'
import { ComponentPage, Control, ControlSelect, ControlToggle } from './ComponentLayout'

const inputCls = 'h-8 px-(--padding-M) rounded-(--radius-S) border border-(--border-default) text-sm text-(--fg-primary) bg-(--bg-primary) outline-none focus:border-(--border-brand) w-full'

const VARIANTS = ['light', 'solid', 'multi'] as const
type Variant = typeof VARIANTS[number]

// Pool of axis labels — slice to get count axes
const AXIS_LABELS = [
  'Speed', 'Accuracy', 'Endurance', 'Strength', 'Agility', 'Recovery', 'Focus', 'Technique',
]

// Deterministic random-ish values so each label always has the same value
const BASE_VALUES: Record<string, { a: number; b: number; c: number }> = {
  Speed:     { a: 90, b: 60, c: 75 },
  Accuracy:  { a: 75, b: 85, c: 55 },
  Endurance: { a: 60, b: 70, c: 90 },
  Strength:  { a: 80, b: 55, c: 65 },
  Agility:   { a: 70, b: 90, c: 80 },
  Recovery:  { a: 55, b: 75, c: 70 },
  Focus:     { a: 85, b: 65, c: 60 },
  Technique: { a: 65, b: 80, c: 85 },
}

function buildData(count: number) {
  return AXIS_LABELS.slice(0, count).map(label => ({ label, ...BASE_VALUES[label] }))
}

const ALL_SERIES = [
  { key: 'a', name: 'Athlete A' },
  { key: 'b', name: 'Athlete B' },
  { key: 'c', name: 'Athlete C' },
]

export function RadarChartPage() {
  const [variant,   setVariant]   = useState<Variant>('light')
  const [showMulti, setShowMulti] = useState(false)
  const [axisCount, setAxisCount] = useState(6)

  const data   = buildData(axisCount)
  const series = showMulti ? ALL_SERIES : [ALL_SERIES[0]]

  return (
    <ComponentPage
      title="Radar Chart"
      description="The Radar Chart (also called Spider Chart) displays multivariate data across several quantitative axes radiating from a common center. It is particularly useful for comparing multiple entities across several performance dimensions simultaneously, making it ideal for profiles, benchmarks, and scorecards."
      controls={
        <>
          <Control label="Variant">
            <ControlSelect value={variant} options={[...VARIANTS]} onChange={v => setVariant(v as Variant)} />
          </Control>
          <Control label="Multi-series">
            <ControlToggle value={showMulti} onChange={setShowMulti} />
          </Control>
          <Control label="Axes (branches)">
            <input
              type="number"
              min={3} max={8}
              value={axisCount}
              onChange={e => {
                const v = parseInt(e.target.value)
                if (!isNaN(v) && v >= 3 && v <= 8) setAxisCount(v)
              }}
              className={inputCls}
            />
          </Control>
        </>
      }
      preview={
        <div className="w-full max-w-md">
          <RadarChartComponent
            data={data}
            series={series}
            variant={showMulti ? 'multi' : variant}
          />
        </div>
      }
      states={[
        {
          label: '3 axes — triangle',
          node: (
            <div className="w-full max-w-md mx-auto">
              <RadarChartComponent data={buildData(3)} series={[ALL_SERIES[0]]} variant="light" />
            </div>
          ),
        },
        {
          label: '6 axes — light fill',
          node: (
            <div className="w-full max-w-md mx-auto">
              <RadarChartComponent data={buildData(6)} series={[ALL_SERIES[0]]} variant="light" />
            </div>
          ),
        },
        {
          label: '6 axes — solid fill',
          node: (
            <div className="w-full max-w-md mx-auto">
              <RadarChartComponent data={buildData(6)} series={[ALL_SERIES[0]]} variant="solid" />
            </div>
          ),
        },
        {
          label: '6 axes — multi-series (3 athletes)',
          node: (
            <div className="w-full max-w-md mx-auto">
              <RadarChartComponent data={buildData(6)} series={ALL_SERIES} variant="multi" />
            </div>
          ),
        },
        {
          label: '8 axes — maximum',
          node: (
            <div className="w-full max-w-md mx-auto">
              <RadarChartComponent data={buildData(8)} series={[ALL_SERIES[0]]} variant="light" />
            </div>
          ),
        },
      ]}
    />
  )
}
