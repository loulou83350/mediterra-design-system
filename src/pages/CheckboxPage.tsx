import { useState } from 'react'
import { Checkbox } from '../components/ui/Checkbox'
import type { CheckboxState } from '../components/ui/Checkbox'
import { ComponentPage, Control, ControlSelect, ControlToggle } from './ComponentLayout'

const STATES: CheckboxState[] = ['off', 'on', 'partial']
const STATE_LABELS: Record<CheckboxState, string> = { off: 'Off', on: 'On', partial: 'Partial' }

export function CheckboxPage() {
  const [state, setState]         = useState<CheckboxState>('off')
  const [showLabel, setShowLabel] = useState(true)
  const [label, setLabel]         = useState('Choice 1')

  const inputCls = 'h-8 px-(--padding-M) rounded-(--radius-S) border border-(--border-default) text-sm text-(--fg-primary) bg-(--bg-primary) outline-none focus:border-(--border-brand) w-full'

  return (
    <ComponentPage
      title="Checkbox"
      description="The Checkbox is a component which can be in an unchecked, checked, or indeterminate state, each visually distinct to convey different user selections. The component lets the user make multiple choices between different answers. It is widely used in forms, settings, lists, and any interface requiring simple on/off or multiple selections."
      controls={
        <>
          <Control label="State">
            <ControlSelect
              value={STATE_LABELS[state]}
              options={['Off', 'On', 'Partial']}
              onChange={v => setState(v.toLowerCase() as CheckboxState)}
            />
          </Control>
          <Control label="Show Label">
            <ControlToggle value={showLabel} onChange={setShowLabel} />
          </Control>
          {showLabel && (
            <Control label="Label">
              <input value={label} onChange={e => setLabel(e.target.value)} className={inputCls} />
            </Control>
          )}
        </>
      }
      preview={
        <Checkbox
          state={state}
          label={label}
          showLabel={showLabel}
          onChange={setState}
        />
      }
      states={[
        {
          label: 'Off / On / Partial',
          node: (
            <>
              <Checkbox state="off"     label="Choice 1"  />
              <Checkbox state="on"      label="Choice 1"  />
              <Checkbox state="partial" label="All choice" />
            </>
          ),
        },
        {
          label: 'Hover states (hover each to see)',
          node: (
            <>
              <Checkbox state="off"     label="Hover off"     />
              <Checkbox state="on"      label="Hover on"      />
              <Checkbox state="partial" label="Hover partial"  />
            </>
          ),
        },
        {
          label: 'Without label',
          node: (
            <>
              <Checkbox state="off"     showLabel={false} />
              <Checkbox state="on"      showLabel={false} />
              <Checkbox state="partial" showLabel={false} />
            </>
          ),
        },
      ]}
    />
  )
}
