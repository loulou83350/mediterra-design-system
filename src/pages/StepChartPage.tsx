import { useState } from 'react'
import { StepChartComponent } from '../components/ui/Charts'
import { ComponentPage, Control, ControlToggle } from './ComponentLayout'

const DATA = [
  { label: 'Jan', a: 200, b: 150 },
  { label: 'Feb', a: 200, b: 300 },
  { label: 'Mar', a: 450, b: 300 },
  { label: 'Apr', a: 450, b: 500 },
  { label: 'May', a: 700, b: 500 },
  { label: 'Jun', a: 700, b: 650 },
  { label: 'Jul', a: 900, b: 650 },
]

const SERIES_1 = [{ key: 'a', name: 'Plan A' }]
const SERIES_2 = [
  { key: 'a', name: 'Plan A' },
  { key: 'b', name: 'Plan B' },
]

export function StepChartPage() {
  const [filled,    setFilled]    = useState(false)
  const [multiLine, setMultiLine] = useState(false)

  return (
    <ComponentPage
      title="Step Chart"
      description="The Step Chart is a variant of the line chart that uses right-angle (staircase) transitions instead of diagonal lines between data points. It is ideal for representing data that changes abruptly at discrete intervals — such as pricing tiers, state changes, or threshold-based metrics — rather than continuously over time."
      controls={
        <>
          <Control label="Filled">
            <ControlToggle value={filled} onChange={setFilled} />
          </Control>
          <Control label="Multi-line">
            <ControlToggle value={multiLine} onChange={setMultiLine} />
          </Control>
        </>
      }
      preview={
        <div className="w-full">
          <StepChartComponent
            data={DATA}
            lines={multiLine ? SERIES_2 : SERIES_1}
            filled={filled}
          />
        </div>
      }
      states={[
        {
          label: 'Step — line only',
          node: (
            <div className="w-full">
              <StepChartComponent data={DATA} lines={SERIES_1} />
            </div>
          ),
        },
        {
          label: 'Step — filled area',
          node: (
            <div className="w-full">
              <StepChartComponent data={DATA} lines={SERIES_1} filled />
            </div>
          ),
        },
        {
          label: 'Multi-step (2 series)',
          node: (
            <div className="w-full">
              <StepChartComponent data={DATA} lines={SERIES_2} />
            </div>
          ),
        },
        {
          label: 'Multi-step filled',
          node: (
            <div className="w-full">
              <StepChartComponent data={DATA} lines={SERIES_2} filled />
            </div>
          ),
        },
      ]}
    />
  )
}
