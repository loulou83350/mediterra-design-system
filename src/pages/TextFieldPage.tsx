import { useState } from 'react'
import { TextField } from '../components/ui/TextField'
import { ComponentPage, Control, ControlToggle, IconPicker } from './ComponentLayout'

export function TextFieldPage() {
  const [label, setLabel]               = useState('Label')
  const [showLabel, setShowLabel]       = useState(true)
  const [placeholder, setPlaceholder]   = useState("I'm a placeholder")
  const [helperText, _setHelperText]    = useState("I'm an information")
  const [showHelper, setShowHelper]     = useState(true)
  const [errorMsg, setErrorMsg]         = useState("I'm an error message")
  const [error, setError]               = useState(false)
  const [disabled, setDisabled]         = useState(false)
  const [small, setSmall]               = useState(false)
  const [leadIcon, setLeadIcon]         = useState(false)
  const [iconName, setIconName]         = useState('IconMail')
  const [value, setValue]               = useState('')

  const inputCls = 'h-8 px-(--padding-M) rounded-(--radius-S) border border-(--border-default) text-sm text-(--fg-primary) bg-(--bg-primary) outline-none focus:border-(--border-brand) w-full'

  return (
    <ComponentPage
      title="Text Field"
      description="The Text Field is the most basic input component, allowing users to enter, edit, and submit text. It can be used for single-line text input, such as names, email addresses, or short responses."
      controls={
        <>
          <Control label="Label">
            <ControlToggle value={showLabel} onChange={setShowLabel} />
          </Control>
          {showLabel && (
            <Control label="Label text">
              <input value={label} onChange={e => setLabel(e.target.value)} className={inputCls} />
            </Control>
          )}
          <Control label="Placeholder">
            <input value={placeholder} onChange={e => setPlaceholder(e.target.value)} className={inputCls} />
          </Control>
          <Control label="Helper Text">
            <ControlToggle value={showHelper} onChange={setShowHelper} />
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
          <TextField
            label={label}
            showLabel={showLabel}
            placeholder={placeholder}
            helperText={helperText}
            showHelperText={showHelper}
            errorMessage={errorMsg}
            error={error}
            disabled={disabled}
            small={small}
            leadIcon={leadIcon ? iconName : undefined}
            value={value}
            onChange={setValue}
          />
        </div>
      }
      states={[
        {
          label: 'Default / Error / Disabled — large (interact to see hover & focus)',
          node: (
            <div className="grid grid-cols-2 gap-(--gap-L) w-full">
              <TextField label="Default" placeholder="I'm a placeholder" helperText="I'm an information" showHelperText />
              <TextField label="Error" placeholder="I'm a placeholder" error errorMessage="I'm an error message" />
              <TextField label="Disabled" placeholder="I'm a placeholder" helperText="I'm an information" showHelperText disabled />
              <TextField label="With icon" placeholder="hello@example.com" leadIcon="IconMail" helperText="I'm an information" showHelperText />
            </div>
          ),
        },
        {
          label: 'Small size',
          node: (
            <div className="grid grid-cols-2 gap-(--gap-L) w-full">
              <TextField label="Default" placeholder="I'm a placeholder" small helperText="I'm an information" showHelperText />
              <TextField label="Error" placeholder="I'm a placeholder" small error errorMessage="I'm an error message" />
              <TextField label="Disabled" placeholder="I'm a placeholder" small helperText="I'm an information" showHelperText disabled />
              <TextField label="With icon" placeholder="Search…" small leadIcon="IconSearch" />
            </div>
          ),
        },
        {
          label: 'Without label / Without helper',
          node: (
            <div className="grid grid-cols-2 gap-(--gap-L) w-full">
              <TextField showLabel={false} placeholder="No label" helperText="I'm an information" showHelperText />
              <TextField label="Label" placeholder="No helper" showHelperText={false} />
            </div>
          ),
        },
      ]}
    />
  )
}
