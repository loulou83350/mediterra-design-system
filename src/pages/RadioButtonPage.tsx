import { useState } from 'react'
import { RadioButton } from '../components/ui/RadioButton'
import { ComponentPage, Control, ControlToggle } from './ComponentLayout'

const inputCls = 'h-8 px-(--padding-M) rounded-(--radius-S) border border-(--border-default) text-sm text-(--fg-primary) bg-(--bg-primary) outline-none focus:border-(--border-brand) w-full'

export function RadioButtonPage() {
  const [checked, setChecked]     = useState(false)
  const [showLabel, setShowLabel] = useState(true)
  const [label, setLabel]         = useState('Choice')
  const [disabled, setDisabled]   = useState(false)

  // Radio group simulation
  const [groupValue, setGroupValue] = useState<string>('a')

  return (
    <ComponentPage
      title="Radio Button"
      description="The Radio Button lets users select a single option from a set. Use it when choices are mutually exclusive. Hover turns the ring blue; selecting turns it green; hover over a selected state turns it blue."
      controls={
        <>
          <Control label="Checked">
            <ControlToggle value={checked} onChange={setChecked} />
          </Control>
          <Control label="Show Label">
            <ControlToggle value={showLabel} onChange={setShowLabel} />
          </Control>
          {showLabel && (
            <Control label="Label">
              <input value={label} onChange={e => setLabel(e.target.value)} className={inputCls} />
            </Control>
          )}
          <Control label="Disabled">
            <ControlToggle value={disabled} onChange={setDisabled} />
          </Control>
        </>
      }
      preview={
        <RadioButton
          checked={checked}
          onChange={() => setChecked(v => !v)}
          label={label}
          showLabel={showLabel}
          disabled={disabled}
        />
      }
      states={[
        {
          label: 'All states',
          node: (
            <div className="flex items-center gap-(--gap-XL)">
              <RadioButton checked={false} label="Off" />
              <RadioButton checked={true}  label="Selected (green)" />
              <RadioButton checked={false} label="Hover (hover me)" />
              <RadioButton checked={true}  label="Selected + Hover" />
            </div>
          ),
        },
        {
          label: 'Radio group (single selection)',
          node: (
            <div className="flex flex-col gap-(--gap-M)">
              {[
                { value: 'a', label: 'Option A' },
                { value: 'b', label: 'Option B' },
                { value: 'c', label: 'Option C' },
              ].map(opt => (
                <RadioButton
                  key={opt.value}
                  name="example-group"
                  value={opt.value}
                  checked={groupValue === opt.value}
                  onChange={() => setGroupValue(opt.value)}
                  label={opt.label}
                />
              ))}
            </div>
          ),
        },
        {
          label: 'Without label',
          node: (
            <div className="flex items-center gap-(--gap-XL)">
              <RadioButton checked={false} showLabel={false} />
              <RadioButton checked={true}  showLabel={false} />
            </div>
          ),
        },
        {
          label: 'Disabled',
          node: (
            <div className="flex items-center gap-(--gap-XL)">
              <RadioButton checked={false} label="Off disabled"      disabled />
              <RadioButton checked={true}  label="Selected disabled" disabled />
            </div>
          ),
        },
      ]}
    />
  )
}
