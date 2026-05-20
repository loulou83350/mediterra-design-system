import { useState } from 'react'
import { LineChartComponent } from '../components/ui/Charts'
import { ComponentPage, Control, ControlToggle } from './ComponentLayout'

const DATA = [
  { label: 'Jan', a: 400,  b: 240, c: 140 },
  { label: 'Feb', a: 300,  b: 139, c: 221 },
  { label: 'Mar', a: 600,  b: 380, c: 290 },
  { label: 'Apr', a: 800,  b: 430, c: 200 },
  { label: 'May', a: 500,  b: 580, c: 360 },
  { label: 'Jun', a: 900,  b: 490, c: 480 },
  { label: 'Jul', a: 750,  b: 600, c: 550 },
]

const SERIES_1 = [{ key: 'a', name: 'Series A' }]
const SERIES_3 = [
  { key: 'a', name: 'Series A' },
  { key: 'b', name: 'Series B' },
  { key: 'c', name: 'Series C' },
]

export function LineChartPage() {
  const [showCursor, setShowCursor] = useState(false)
  const [multiLine,  setMultiLine]  = useState(false)

  return (
    <ComponentPage
      title="Line Chart"
      description="The Line Chart displays continuous data over time or ordered categories, connecting data points with straight lines. It excels at visualizing trends, patterns, and progressions. Supports multiple series for side-by-side comparisons, and an optional cursor indicator that highlights the exact value on hover."
      controls={
        <>
          <Control label="Show Cursor">
            <ControlToggle value={showCursor} onChange={setShowCursor} />
          </Control>
          <Control label="Multi-line">
            <ControlToggle value={multiLine} onChange={setMultiLine} />
          </Control>
        </>
      }
      preview={
        <div className="w-full">
          <LineChartComponent
            data={DATA}
            lines={multiLine ? SERIES_3 : SERIES_1}
            showCursor={showCursor}
          />
        </div>
      }
      states={[
        {
          label: 'Single line',
          node: (
            <div className="w-full">
              <LineChartComponent data={DATA} lines={SERIES_1} />
            </div>
          ),
        },
        {
          label: 'With cursor indicator (hover the chart)',
          node: (
            <div className="w-full">
              <LineChartComponent data={DATA} lines={SERIES_1} showCursor />
            </div>
          ),
        },
        {
          label: 'Multi-line (3 series)',
          node: (
            <div className="w-full">
              <LineChartComponent data={DATA} lines={SERIES_3} />
            </div>
          ),
        },
        {
          label: 'Multi-line with cursor',
          node: (
            <div className="w-full">
              <LineChartComponent data={DATA} lines={SERIES_3} showCursor />
            </div>
          ),
        },
      ]}
    />
  )
}
