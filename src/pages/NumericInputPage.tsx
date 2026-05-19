import { useState } from 'react'
import { NumericInput } from '../components/ui/NumericInput'
import { ComponentPage, Control, ControlToggle } from './ComponentLayout'

export function NumericInputPage() {
  const [showLabel, setShowLabel]       = useState(true)
  const [showHelper, setShowHelper]     = useState(true)
  const [error, setError]               = useState(false)
  const [errorMsg, setErrorMsg]         = useState("I'm an error message")
  const [disabled, setDisabled]         = useState(false)
  const [small, setSmall]               = useState(false)
  const [value, setValue]               = useState<number>(0)

  const inputCls = 'h-8 px-(--padding-M) rounded-(--radius-S) border border-(--border-default) text-sm text-(--fg-primary) bg-(--bg-primary) outline-none focus:border-(--border-brand) w-full'

  return (
    <ComponentPage
      title="Numeric Input"
      description="The Numeric Input component allows users to enter only numeric values, often used in forms where only numbers are required."
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
        <div className="w-72">
          <NumericInput
            label="Quantity"
            showLabel={showLabel}
            showHelperText={showHelper}
            helperText="Enter a number between 0 and 100"
            error={error}
            errorMessage={errorMsg}
            disabled={disabled}
            small={small}
            value={value}
            onChange={setValue}
            min={0}
            max={100}
          />
        </div>
      }
      states={[
        {
          label: 'Default / Error / Disabled — large',
          node: (
            <div className="grid grid-cols-2 gap-(--gap-L) w-full">
              <NumericInput label="Default" value={0} />
              <NumericInput label="With value" value={42} />
              <NumericInput label="Error" error errorMessage="Value out of range" value={0} />
              <NumericInput label="Disabled" disabled value={5} />
            </div>
          ),
        },
        {
          label: 'Small size',
          node: (
            <div className="grid grid-cols-2 gap-(--gap-L) w-full">
              <NumericInput label="Default small" small value={0} />
              <NumericInput label="With value small" small value={7} />
              <NumericInput label="Error small" small error errorMessage="Required" value={0} />
              <NumericInput label="Disabled small" small disabled value={3} />
            </div>
          ),
        },
        {
          label: 'With min / max bounds',
          node: (
            <div className="grid grid-cols-2 gap-(--gap-L) w-full">
              <NumericInput label="Min 0, Max 10" value={5} min={0} max={10} showHelperText helperText="0 – 10" />
              <NumericInput label="Step 5" value={20} step={5} showHelperText helperText="Step of 5" />
            </div>
          ),
        },
      ]}
    />
  )
}
