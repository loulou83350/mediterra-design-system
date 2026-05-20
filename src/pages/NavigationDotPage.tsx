import { useState } from 'react'
import { NavigationDot } from '../components/ui/NavigationDot'
import { ComponentPage, Control, ControlToggle } from './ComponentLayout'

const inputCls = 'h-8 px-(--padding-M) rounded-(--radius-S) border border-(--border-default) text-sm text-(--fg-primary) bg-(--bg-primary) outline-none focus:border-(--border-brand) w-full'

export function NavigationDotPage() {
  const [count, setCount]           = useState(5)
  const [selectedIndex, setIdx]     = useState(0)
  const [showNavigation, setShowNav] = useState(true)

  // Interactive demo state
  const [demoIdx, setDemoIdx] = useState(0)

  return (
    <ComponentPage
      title="Navigation Dot"
      description="Dot-based carousel or slide indicator. The selected dot becomes a pill shape; unselected dots are circles. Optional prev/next chevrons disable automatically at the boundaries."
      controls={
        <>
          <Control label="Count">
            <input
              type="number"
              min={2} max={10}
              value={count}
              onChange={e => {
                const v = parseInt(e.target.value)
                if (!isNaN(v) && v >= 2 && v <= 10) {
                  setCount(v)
                  setIdx(Math.min(selectedIndex, v - 1))
                }
              }}
              className={inputCls}
            />
          </Control>
          <Control label="Selected Index">
            <input
              type="number"
              min={0} max={count - 1}
              value={selectedIndex}
              onChange={e => {
                const v = parseInt(e.target.value)
                if (!isNaN(v) && v >= 0 && v < count) setIdx(v)
              }}
              className={inputCls}
            />
          </Control>
          <Control label="Show Navigation">
            <ControlToggle value={showNavigation} onChange={setShowNav} />
          </Control>
        </>
      }
      preview={
        <NavigationDot
          count={count}
          selectedIndex={selectedIndex}
          showNavigation={showNavigation}
          onChange={setIdx}
        />
      }
      states={[
        {
          label: 'Interactive (click the arrows)',
          node: (
            <NavigationDot
              count={5}
              selectedIndex={demoIdx}
              showNavigation={true}
              onChange={setDemoIdx}
            />
          ),
        },
        {
          label: 'Index 0 — prev disabled',
          node: <NavigationDot count={5} selectedIndex={0} showNavigation={true} />,
        },
        {
          label: 'Index 2 — both active',
          node: <NavigationDot count={5} selectedIndex={2} showNavigation={true} />,
        },
        {
          label: 'Index 4 — next disabled',
          node: <NavigationDot count={5} selectedIndex={4} showNavigation={true} />,
        },
        {
          label: 'Without navigation arrows',
          node: <NavigationDot count={5} selectedIndex={2} showNavigation={false} />,
        },
        {
          label: 'Different counts',
          node: (
            <div className="flex flex-col gap-(--gap-L)">
              <NavigationDot count={3}  selectedIndex={1} showNavigation={false} />
              <NavigationDot count={5}  selectedIndex={2} showNavigation={false} />
              <NavigationDot count={7}  selectedIndex={3} showNavigation={false} />
            </div>
          ),
        },
      ]}
    />
  )
}
