import { useState } from 'react'
import { StatCard } from '../components/ui/StatCard'
import type { StatCardColor, StatCardSize } from '../components/ui/StatCard'
import { ComponentPage, Control, ControlSelect } from './ComponentLayout'

const inputCls = 'h-8 px-(--padding-M) rounded-(--radius-S) border border-(--border-default) text-sm text-(--fg-primary) bg-(--bg-primary) outline-none focus:border-(--border-brand) w-full'

const COLORS: StatCardColor[] = ['Brand', 'Success', 'Warning', 'Error']
const SIZES:  StatCardSize[]  = ['M', 'S']

export function StatCardPage() {
  const [color, setColor] = useState<StatCardColor>('Brand')
  const [size,  setSize]  = useState<StatCardSize>('M')
  const [label, setLabel] = useState('Label')
  const [value, setValue] = useState('x1.50')

  return (
    <ComponentPage
      title="Stat Card"
      description="The Stat Card is a compact display component used to highlight a key metric or statistic. It combines a semantic label with a prominent value, using color to convey context — brand, success, warning, or error. Available in two sizes for flexible layout integration."
      controls={
        <>
          <Control label="Color">
            <ControlSelect value={color} options={COLORS} onChange={v => setColor(v as StatCardColor)} />
          </Control>
          <Control label="Size">
            <ControlSelect value={size} options={SIZES} onChange={v => setSize(v as StatCardSize)} />
          </Control>
          <Control label="Label">
            <input value={label} onChange={e => setLabel(e.target.value)} className={inputCls} />
          </Control>
          <Control label="Value">
            <input value={value} onChange={e => setValue(e.target.value)} className={inputCls} />
          </Control>
        </>
      }
      preview={
        <StatCard color={color} size={size} label={label} value={value} />
      }
      states={[
        {
          label: '4 colors — Size M',
          node: (
            <div className="flex items-start gap-(--gap-L)">
              {COLORS.map(c => (
                <StatCard key={c} color={c} size="M" label={c} value="x1.50" />
              ))}
            </div>
          ),
        },
        {
          label: '4 colors — Size S',
          node: (
            <div className="flex items-start gap-(--gap-L)">
              {COLORS.map(c => (
                <StatCard key={c} color={c} size="S" label={c} value="x1.50" />
              ))}
            </div>
          ),
        },
        {
          label: 'Real-world examples',
          node: (
            <div className="flex flex-wrap items-start gap-(--gap-L)">
              <StatCard color="Brand"   size="M" label="Conversion rate" value="3.8%" />
              <StatCard color="Success" size="M" label="Revenue"         value="+12k" />
              <StatCard color="Warning" size="M" label="Bounce rate"     value="68%" />
              <StatCard color="Error"   size="M" label="Churn"           value="-4%" />
            </div>
          ),
        },
        {
          label: 'Size comparison',
          node: (
            <div className="flex flex-col gap-(--gap-L)">
              <div className="flex items-start gap-(--gap-L)">
                {COLORS.map(c => <StatCard key={c} color={c} size="M" label="Sessions" value="1 284" />)}
              </div>
              <div className="flex items-start gap-(--gap-L)">
                {COLORS.map(c => <StatCard key={c} color={c} size="S" label="Sessions" value="1 284" />)}
              </div>
            </div>
          ),
        },
      ]}
    />
  )
}
