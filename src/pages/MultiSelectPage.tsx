import { useState } from 'react'
import { MultiSelect } from '../components/ui/MultiSelect'
import type { MultiSelectOption } from '../components/ui/MultiSelect'
import { ComponentPage, Control, ControlToggle, IconPicker } from './ComponentLayout'

const DEFAULT_OPTIONS: MultiSelectOption[] = [
  { value: '1', label: 'Item number 1' },
  { value: '2', label: 'Item number 2' },
  { value: '3', label: 'Item number 3' },
  { value: '4', label: 'Item number 4' },
  { value: '5', label: 'Item number 5' },
]

const TEAM_OPTIONS: MultiSelectOption[] = [
  { value: 'design',     label: 'Design',      icon: 'IconPalette' },
  { value: 'dev',        label: 'Development', icon: 'IconCode' },
  { value: 'marketing',  label: 'Marketing',   icon: 'IconSpeakerphone' },
  { value: 'research',   label: 'Research',    icon: 'IconFlask' },
  { value: 'product',    label: 'Product',     icon: 'IconPackage' },
]

export function MultiSelectPage() {
  const [showLabel, setShowLabel]   = useState(true)
  const [error, setError]           = useState(false)
  const [errorMsg, setErrorMsg]     = useState("I'm an error message")
  const [disabled, setDisabled]     = useState(false)
  const [small, setSmall]           = useState(false)
  const [leadIcon, setLeadIcon]     = useState(false)
  const [iconName, setIconName]     = useState('IconList')
  const [value, setValue]           = useState<string[]>([])

  const inputCls = 'h-8 px-(--padding-M) rounded-(--radius-S) border border-(--border-default) text-sm text-(--fg-primary) bg-(--bg-primary) outline-none focus:border-(--border-brand) w-full'

  return (
    <ComponentPage
      title="Multi Select"
      description="Multi-selection dropdown. Click to open, click items to toggle selection (panel stays open). Selected values appear as chips below the trigger — with an X to remove each. Overflow chips collapse into '+N'."
      controls={
        <>
          <Control label="Label">
            <ControlToggle value={showLabel} onChange={setShowLabel} />
          </Control>
          <Control label="Error">
            <ControlToggle value={error} onChange={setError} />
          </Control>
          {error && (
            <Control label="Error message">
              <input value={errorMsg} onChange={e => setErrorMsg(e.target.value)} className={inputCls} />
            </Control>
          )}
          <Control label="Disabled">
            <ControlToggle value={disabled} onChange={setDisabled} />
          </Control>
          <Control label="Small">
            <ControlToggle value={small} onChange={setSmall} />
          </Control>
          <Control label="Lead Icon">
            <ControlToggle value={leadIcon} onChange={setLeadIcon} />
          </Control>
          {leadIcon && (
            <Control label="Icon">
              <IconPicker value={iconName} onChange={setIconName} />
            </Control>
          )}
        </>
      }
      preview={
        <div className="w-80">
          <MultiSelect
            label="Label"
            showLabel={showLabel}
            options={DEFAULT_OPTIONS}
            value={value}
            onChange={setValue}
            placeholder="Select options"
            error={error}
            errorMessage={errorMsg}
            disabled={disabled}
            small={small}
            leadIcon={leadIcon ? iconName : undefined}
          />
        </div>
      }
      states={[
        {
          label: 'Empty / With selection / Overflow',
          node: (
            <div className="grid grid-cols-2 gap-(--gap-L) w-full">
              <MultiSelect label="Empty" options={DEFAULT_OPTIONS} value={[]} />
              <MultiSelect label="One selected" options={DEFAULT_OPTIONS} value={['1']} />
              <MultiSelect label="Three selected (max visible)" options={DEFAULT_OPTIONS} value={['1', '2', '3']} />
              <MultiSelect label="Overflow (+2)" options={DEFAULT_OPTIONS} value={['1', '2', '3', '4', '5']} maxVisible={3} />
            </div>
          ),
        },
        {
          label: 'Error / Disabled',
          node: (
            <div className="grid grid-cols-2 gap-(--gap-L) w-full">
              <MultiSelect label="Error" options={DEFAULT_OPTIONS} value={[]} error errorMessage="Please select at least one option" />
              <MultiSelect label="Disabled" options={DEFAULT_OPTIONS} value={['1', '2']} disabled />
            </div>
          ),
        },
        {
          label: 'With item icons',
          node: (
            <div className="grid grid-cols-2 gap-(--gap-L) w-full">
              <MultiSelect label="Teams" options={TEAM_OPTIONS} value={[]} leadIcon="IconUsers" placeholder="Select teams" />
              <MultiSelect label="Teams" options={TEAM_OPTIONS} value={['design', 'dev', 'product']} leadIcon="IconUsers" />
            </div>
          ),
        },
        {
          label: 'Small size',
          node: (
            <div className="grid grid-cols-2 gap-(--gap-L) w-full">
              <MultiSelect label="Small empty" options={DEFAULT_OPTIONS} value={[]} small />
              <MultiSelect label="Small with selection" options={DEFAULT_OPTIONS} value={['1', '2']} small />
            </div>
          ),
        },
      ]}
    />
  )
}
