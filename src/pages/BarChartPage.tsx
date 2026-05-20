import { useState } from 'react'
import { BarChartComponent } from '../components/ui/Charts'
import { ComponentPage, Control, ControlToggle } from './ComponentLayout'

const inputCls = 'h-8 px-(--padding-M) rounded-(--radius-S) border border-(--border-default) text-sm text-(--fg-primary) bg-(--bg-primary) outline-none focus:border-(--border-brand) w-full'

const DATA = [
  { label: 'Q1', a: 420, b: 240, c: 160, d: 80 },
  { label: 'Q2', a: 380, b: 310, c: 220, d: 140 },
  { label: 'Q3', a: 620, b: 480, c: 300, d: 200 },
  { label: 'Q4', a: 780, b: 550, c: 410, d: 270 },
]

const SERIES_ALL = [
  { key: 'a', name: 'Product A' },
  { key: 'b', name: 'Product B' },
  { key: 'c', name: 'Product C' },
  { key: 'd', name: 'Product D' },
]

export function BarChartPage() {
  const [multiBar, setMultiBar] = useState(false)
  const [radius,   setRadius]   = useState(4)

  const bars = multiBar ? SERIES_ALL : [SERIES_ALL[0]]

  return (
    <ComponentPage
      title="Bar Chart"
      description="The Bar Chart uses rectangular bars to represent values for different categories or groups. Grouped bars allow direct comparison between multiple data series side by side. It is one of the most effective chart types for comparing magnitudes across discrete categories — products, time periods, regions, or segments."
      controls={
        <>
          <Control label="Grouped bars">
            <ControlToggle value={multiBar} onChange={setMultiBar} />
          </Control>
          <Control label="Bar radius">
            <input
              type="number"
              min={0} max={16}
              value={radius}
              onChange={e => setRadius(Number(e.target.value))}
              className={inputCls}
            />
          </Control>
        </>
      }
      preview={
        <div className="w-full">
          <BarChartComponent data={DATA} bars={bars} radius={radius} />
        </div>
      }
      states={[
        {
          label: 'Single series',
          node: (
            <div className="w-full">
              <BarChartComponent data={DATA} bars={[SERIES_ALL[0]]} />
            </div>
          ),
        },
        {
          label: '2 series grouped',
          node: (
            <div className="w-full">
              <BarChartComponent data={DATA} bars={SERIES_ALL.slice(0, 2)} />
            </div>
          ),
        },
        {
          label: '4 series grouped',
          node: (
            <div className="w-full">
              <BarChartComponent data={DATA} bars={SERIES_ALL} />
            </div>
          ),
        },
        {
          label: 'No border radius',
          node: (
            <div className="w-full">
              <BarChartComponent data={DATA} bars={SERIES_ALL.slice(0, 2)} radius={0} />
            </div>
          ),
        },
      ]}
    />
  )
}
