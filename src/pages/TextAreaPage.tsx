import { useState } from 'react'
import { TextArea } from '../components/ui/TextArea'
import { ComponentPage, Control, ControlToggle } from './ComponentLayout'

export function TextAreaPage() {
  const [showLabel, setShowLabel]   = useState(true)
  const [counter, setCounter]       = useState(true)
  const [error, setError]           = useState(false)
  const [errorMsg, setErrorMsg]     = useState("I'm an error message")
  const [disabled, setDisabled]     = useState(false)
  const [small, setSmall]           = useState(false)
  const [value, setValue]           = useState('')

  const inputCls = 'h-8 px-(--padding-M) rounded-(--radius-S) border border-(--border-default) text-sm text-(--fg-primary) bg-(--bg-primary) outline-none focus:border-(--border-brand) w-full'

  return (
    <ComponentPage
      title="Text Area"
      description="The Text Area is an expanded text input field designed for multi-line text entry, suitable for longer responses or content."
      controls={
        <>
          <Control label="Label">
            <ControlToggle value={showLabel} onChange={setShowLabel} />
          </Control>
          <Control label="Counter">
            <ControlToggle value={counter} onChange={setCounter} />
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
        <div className="w-96">
          <TextArea
            label="Description"
            showLabel={showLabel}
            counter={counter}
            error={error}
            errorMessage={errorMsg}
            disabled={disabled}
            small={small}
            value={value}
            onChange={setValue}
            placeholder="Enter a description…"
          />
        </div>
      }
      states={[
        {
          label: 'Default / Error / Disabled — large',
          node: (
            <div className="grid grid-cols-2 gap-(--gap-L) w-full">
              <TextArea label="Default" placeholder="Enter text…" value="" />
              <TextArea label="With value" value="This is some example content that has been typed into the text area." />
              <TextArea label="Error" error errorMessage="This field is required" value="" />
              <TextArea label="Disabled" disabled value="This text is read only" />
            </div>
          ),
        },
        {
          label: 'Small size',
          node: (
            <div className="grid grid-cols-2 gap-(--gap-L) w-full">
              <TextArea label="Default small" small placeholder="Enter text…" value="" />
              <TextArea label="Error small" small error errorMessage="Required" value="" />
            </div>
          ),
        },
        {
          label: 'Counter states',
          node: (
            <div className="grid grid-cols-2 gap-(--gap-L) w-full">
              <TextArea label="Empty (0/2000)" value="" counter />
              <TextArea label="Partially filled" value="Hello world" counter />
              <TextArea label="Error + counter on same row" error errorMessage="Too long" value={'x'.repeat(200)} counter maxLength={200} />
              <TextArea label="No counter" value="No counter shown" counter={false} />
            </div>
          ),
        },
      ]}
    />
  )
}
