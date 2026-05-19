import { useState } from 'react'
import { PasswordInput } from '../components/ui/PasswordInput'
import { ComponentPage, Control, ControlToggle } from './ComponentLayout'

export function PasswordInputPage() {
  const [showLabel, setShowLabel]   = useState(true)
  const [showHelper, setShowHelper] = useState(true)
  const [error, setError]           = useState(false)
  const [errorMsg, setErrorMsg]     = useState("I'm an error message")
  const [disabled, setDisabled]     = useState(false)
  const [small, setSmall]           = useState(false)
  const [value, setValue]           = useState('')

  const inputCls = 'h-8 px-(--padding-M) rounded-(--radius-S) border border-(--border-default) text-sm text-(--fg-primary) bg-(--bg-primary) outline-none focus:border-(--border-brand) w-full'

  return (
    <ComponentPage
      title="Password"
      description="The Password Field is a specialized text field designed to securely handle user passwords. The input is obscured to protect sensitive information."
      controls={
        <>
          <Control label="Label">
            <ControlToggle value={showLabel} onChange={setShowLabel} />
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
        </>
      }
      preview={
        <div className="w-80">
          <PasswordInput
            showLabel={showLabel}
            showHelperText={showHelper}
            error={error}
            errorMessage={errorMsg}
            disabled={disabled}
            small={small}
            value={value}
            onChange={setValue}
          />
        </div>
      }
      states={[
        {
          label: 'Default / Error / Disabled — large (interact to see hover, focus & toggle)',
          node: (
            <div className="grid grid-cols-2 gap-(--gap-L) w-full">
              <PasswordInput label="Default" helperText="I'm an information" showHelperText />
              <PasswordInput label="Error" error errorMessage="I'm an error message" showHelperText={false} />
              <PasswordInput label="Disabled" helperText="I'm an information" showHelperText disabled />
            </div>
          ),
        },
        {
          label: 'Small size',
          node: (
            <div className="grid grid-cols-2 gap-(--gap-L) w-full">
              <PasswordInput label="Default small" helperText="I'm an information" showHelperText small />
              <PasswordInput label="Error small" error errorMessage="I'm an error message" showHelperText={false} small />
              <PasswordInput label="Disabled small" helperText="I'm an information" showHelperText disabled small />
            </div>
          ),
        },
      ]}
    />
  )
}
