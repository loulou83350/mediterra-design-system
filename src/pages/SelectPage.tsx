import { useState } from 'react'
import { Select } from '../components/ui/Select'
import type { SelectOption } from '../components/ui/Select'
import { ComponentPage, Control, ControlToggle, IconPicker } from './ComponentLayout'

const DEFAULT_OPTIONS: SelectOption[] = [
  { value: '1', label: 'Item number 1' },
  { value: '2', label: 'Item number 2' },
  { value: '3', label: 'Item number 3' },
  { value: '4', label: 'Item number 4' },
]

const ICON_OPTIONS: SelectOption[] = [
  { value: 'design',     label: 'Design',      icon: 'IconPalette' },
  { value: 'dev',        label: 'Development', icon: 'IconCode' },
  { value: 'marketing',  label: 'Marketing',   icon: 'IconSpeakerphone' },
  { value: 'research',   label: 'Research',    icon: 'IconFlask' },
]

export function SelectPage() {
  const [showLabel, setShowLabel]   = useState(true)
  const [error, setError]           = useState(false)
  const [errorMsg, setErrorMsg]     = useState("I'm an error message")
  const [disabled, setDisabled]     = useState(false)
  const [small, setSmall]           = useState(false)
  const [leadIcon, setLeadIcon]     = useState(false)
  const [iconName, setIconName]     = useState('IconList')
  const [value, setValue]           = useState('')

  const inputCls = 'h-8 px-(--padding-M) rounded-(--radius-S) border border-(--border-default) text-sm text-(--fg-primary) bg-(--bg-primary) outline-none focus:border-(--border-brand) w-full'

  return (
    <ComponentPage
      title="Select"
      description="The Dropdown component provides a list of options from which the user can select one or more. It's a space-efficient way to present multiple choices."
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
          <Select
            label="Label"
            showLabel={showLabel}
            options={DEFAULT_OPTIONS}
            value={value}
            onChange={setValue}
            placeholder="Select an option"
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
          label: 'Default / Error / Disabled — large (click to open)',
          node: (
            <div className="grid grid-cols-2 gap-(--gap-L) w-full">
              <Select label="Default" options={DEFAULT_OPTIONS} placeholder="Select an option" />
              <Select label="With value" options={DEFAULT_OPTIONS} value="1" />
              <Select label="Error" options={DEFAULT_OPTIONS} error errorMessage="Please select an option" />
              <Select label="Disabled" options={DEFAULT_OPTIONS} disabled placeholder="Not available" />
            </div>
          ),
        },
        {
          label: 'Small size',
          node: (
            <div className="grid grid-cols-2 gap-(--gap-L) w-full">
              <Select label="Default small" options={DEFAULT_OPTIONS} placeholder="Select" small />
              <Select label="With value small" options={DEFAULT_OPTIONS} value="2" small />
              <Select label="Error small" options={DEFAULT_OPTIONS} small error errorMessage="Required" />
              <Select label="Disabled small" options={DEFAULT_OPTIONS} small disabled />
            </div>
          ),
        },
        {
          label: 'With lead icon + item icons',
          node: (
            <div className="grid grid-cols-2 gap-(--gap-L) w-full">
              <Select label="Category" options={ICON_OPTIONS} leadIcon="IconCategory" placeholder="Choose a team" />
              <Select label="Category" options={ICON_OPTIONS} leadIcon="IconCategory" value="design" />
            </div>
          ),
        },
      ]}
    />
  )
}
