import { useState } from 'react'
import { RadarChartComponent } from '../components/ui/Charts'
import { ComponentPage, Control, ControlSelect, ControlToggle } from './ComponentLayout'

const VARIANTS = ['light', 'solid', 'multi'] as const
type Variant = typeof VARIANTS[number]

const DATA_6 = [
  { label: 'Speed',      a: 90, b: 60, c: 75 },
  { label: 'Accuracy',   a: 75, b: 85, c: 55 },
  { label: 'Endurance',  a: 60, b: 70, c: 90 },
  { label: 'Strength',   a: 80, b: 55, c: 65 },
  { label: 'Agility',    a: 70, b: 90, c: 80 },
  { label: 'Recovery',   a: 55, b: 75, c: 70 },
]

const ALL_SERIES = [
  { key: 'a', name: 'Athlete A' },
  { key: 'b', name: 'Athlete B' },
  { key: 'c', name: 'Athlete C' },
]

export function RadarChartPage() {
  const [variant,   setVariant]   = useState<Variant>('light')
  const [showMulti, setShowMulti] = useState(false)

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
        </>
      }
      preview={
        <div className="w-full max-w-md">
          <RadarChartComponent
            data={DATA_6}
            series={series}
            variant={showMulti ? 'multi' : variant}
          />
        </div>
      }
      states={[
        {
          label: 'Light fill (single series)',
          node: (
            <div className="w-full max-w-md mx-auto">
              <RadarChartComponent data={DATA_6} series={[ALL_SERIES[0]]} variant="light" />
            </div>
          ),
        },
        {
          label: 'Solid fill (single series)',
          node: (
            <div className="w-full max-w-md mx-auto">
              <RadarChartComponent data={DATA_6} series={[ALL_SERIES[0]]} variant="solid" />
            </div>
          ),
        },
        {
          label: 'Multi-series (3 athletes)',
          node: (
            <div className="w-full max-w-md mx-auto">
              <RadarChartComponent data={DATA_6} series={ALL_SERIES} variant="multi" />
            </div>
          ),
        },
      ]}
    />
  )
}
