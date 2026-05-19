import { useState } from 'react'
import { OTPInput } from '../components/ui/OTPInput'
import { ComponentPage, Control, ControlSelect, ControlToggle } from './ComponentLayout'

export function OTPInputPage() {
  const [showLabel, setShowLabel] = useState(true)
  const [error, setError]         = useState(false)
  const [errorMsg, setErrorMsg]   = useState("I'm an error message")
  const [length, setLength]       = useState(6)
  const [value, setValue]         = useState('')

  const inputCls = 'h-8 px-(--padding-M) rounded-(--radius-S) border border-(--border-default) text-sm text-(--fg-primary) bg-(--bg-primary) outline-none focus:border-(--border-brand) w-full'

  return (
    <ComponentPage
      title="OTP Code"
      description="The Pin Code input is designed for entering a fixed-length numeric code, typically used for authentication or verification processes."
      controls={
        <>
          <Control label="Label">
            <ControlToggle value={showLabel} onChange={setShowLabel} />
          </Control>
          <Control label="Length">
            <ControlSelect
              value={String(length)}
              options={['4', '5', '6']}
              onChange={v => { setLength(Number(v)); setValue('') }}
            />
          </Control>
          <Control label="Error">
            <ControlToggle value={error} onChange={setError} />
          </Control>
          {error && (
            <Control label="Error message">
              <input value={errorMsg} onChange={e => setErrorMsg(e.target.value)} className={inputCls} />
            </Control>
          )}
        </>
      }
      preview={
        <div className="w-80">
          <OTPInput
            label="Verification code"
            showLabel={showLabel}
            length={length}
            error={error}
            errorMessage={errorMsg}
            value={value}
            onChange={setValue}
          />
        </div>
      }
      states={[
        {
          label: 'Empty (interact to fill)',
          node: (
            <div className="w-80">
              <OTPInput label="Code" value="" />
            </div>
          ),
        },
        {
          label: 'Partially filled',
          node: (
            <div className="w-80">
              <OTPInput label="Code" value="123" />
            </div>
          ),
        },
        {
          label: 'Fully filled',
          node: (
            <div className="w-80">
              <OTPInput label="Code" value="123456" />
            </div>
          ),
        },
        {
          label: 'Error state',
          node: (
            <div className="w-80">
              <OTPInput label="Code" value="123456" error errorMessage="Invalid code. Please try again." />
            </div>
          ),
        },
        {
          label: '4-digit code',
          node: (
            <div className="w-64">
              <OTPInput label="PIN" length={4} value="1234" />
            </div>
          ),
        },
      ]}
    />
  )
}
