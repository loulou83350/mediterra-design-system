import { useState } from 'react'
import { ProgressBar } from '../components/ui/ProgressBar'
import type { ProgressBarVariant } from '../components/ui/ProgressBar'
import { ComponentPage, Control, ControlSelect, ControlToggle } from './ComponentLayout'

const inputCls = 'h-8 px-(--padding-M) rounded-(--radius-S) border border-(--border-default) text-sm text-(--fg-primary) bg-(--bg-primary) outline-none focus:border-(--border-brand) w-full'

export function ProgressBarPage() {
  const [value, setValue] = useState(60)
  const [variant, setVariant] = useState<ProgressBarVariant>('default')
  const [showScore, setShowScore] = useState(true)
  const [maxDisplay, setMaxDisplay] = useState(100)

  return (
    <ComponentPage
      title="Progress Bar"
      description="The Progress Bar is a linear visual indicator that shows the current progress of a task or process. It provides immediate feedback to users, indicating how much of the task has been completed and how much remains."
      controls={
        <>
          <Control label="Value">
            <input
              type="range"
              min={0}
              max={100}
              value={value}
              onChange={e => setValue(Number(e.target.value))}
              className="w-full"
            />
            <span className="text-xs text-(--fg-secondary)">{value}%</span>
          </Control>
          <Control label="Variant">
            <ControlSelect
              value={variant}
              options={['default', 'warning']}
              onChange={v => setVariant(v as ProgressBarVariant)}
            />
          </Control>
          <Control label="Show Score">
            <ControlToggle value={showScore} onChange={setShowScore} />
          </Control>
          <Control label="Max Display">
            <input
              type="text"
              value={maxDisplay}
              onChange={e => {
                const parsed = parseInt(e.target.value, 10)
                if (!isNaN(parsed)) setMaxDisplay(parsed)
              }}
              className={inputCls}
            />
          </Control>
        </>
      }
      preview={
        <div className="w-96">
          <ProgressBar
            value={value}
            variant={variant}
            showScore={showScore}
            maxDisplay={maxDisplay}
          />
        </div>
      }
      states={[
        {
          label: '0% / 30% / 60%',
          node: (
            <div className="flex flex-col gap-(--gap-L) w-96">
              <ProgressBar value={0} />
              <ProgressBar value={30} />
              <ProgressBar value={60} />
            </div>
          ),
        },
        {
          label: '100% — Done',
          node: (
            <div className="w-96">
              <ProgressBar value={100} />
            </div>
          ),
        },
        {
          label: 'Warning variant',
          node: (
            <div className="flex flex-col gap-(--gap-L) w-96">
              <ProgressBar value={45} variant="warning" />
              <ProgressBar value={45} variant="warning" showScore={false} />
            </div>
          ),
        },
        {
          label: 'Without score',
          node: (
            <div className="w-96">
              <ProgressBar value={65} showScore={false} />
            </div>
          ),
        },
      ]}
    />
  )
}
