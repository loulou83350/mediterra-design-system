import { useState } from 'react'
import { PhoneNumberInput } from '../components/ui/PhoneNumberInput'
import { ComponentPage, Control, ControlToggle } from './ComponentLayout'

export function PhoneNumberInputPage() {
  const [showLabel, setShowLabel]   = useState(true)
  const [error, setError]           = useState(false)
  const [errorMsg, setErrorMsg]     = useState("I'm an error message")
  const [disabled, setDisabled]     = useState(false)
  const [small, setSmall]           = useState(false)
  const [dialCode, setDialCode]     = useState('+33')
  const [flagEmoji, setFlagEmoji]   = useState('🇫🇷')
  const [value, setValue]           = useState('')

  const inputCls = 'h-8 px-(--padding-M) rounded-(--radius-S) border border-(--border-default) text-sm text-(--fg-primary) bg-(--bg-primary) outline-none focus:border-(--border-brand) w-full'

  return (
    <ComponentPage
      title="Phone Number"
      description="Phone number input with a country flag emoji and dial code prefix. The flag and dial code are fixed display elements — the user types only the local number."
      controls={
        <>
          <Control label="Label">
            <ControlToggle value={showLabel} onChange={setShowLabel} />
          </Control>
          <Control label="Flag emoji">
            <input value={flagEmoji} onChange={e => setFlagEmoji(e.target.value)} className={inputCls} />
          </Control>
          <Control label="Dial code">
            <input value={dialCode} onChange={e => setDialCode(e.target.value)} className={inputCls} />
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
          <PhoneNumberInput
            label="Phone number"
            showLabel={showLabel}
            flagEmoji={flagEmoji}
            dialCode={dialCode}
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
          label: 'Default / Error / Disabled — large',
          node: (
            <div className="grid grid-cols-2 gap-(--gap-L) w-full">
              <PhoneNumberInput label="Phone number" flagEmoji="🇫🇷" dialCode="+33" />
              <PhoneNumberInput label="With value" flagEmoji="🇫🇷" dialCode="+33" value="06 12 34 56 78" />
              <PhoneNumberInput label="Error" flagEmoji="🇫🇷" dialCode="+33" error errorMessage="Invalid phone number" />
              <PhoneNumberInput label="Disabled" flagEmoji="🇫🇷" dialCode="+33" disabled value="06 12 34 56 78" />
            </div>
          ),
        },
        {
          label: 'Small size',
          node: (
            <div className="grid grid-cols-2 gap-(--gap-L) w-full">
              <PhoneNumberInput label="Default small" small flagEmoji="🇫🇷" dialCode="+33" />
              <PhoneNumberInput label="Error small" small flagEmoji="🇫🇷" dialCode="+33" error errorMessage="Required" />
            </div>
          ),
        },
        {
          label: 'Different country codes',
          node: (
            <div className="grid grid-cols-2 gap-(--gap-L) w-full">
              <PhoneNumberInput label="France" flagEmoji="🇫🇷" dialCode="+33" value="06 12 34 56 78" />
              <PhoneNumberInput label="USA" flagEmoji="🇺🇸" dialCode="+1" value="(555) 123-4567" />
              <PhoneNumberInput label="Brazil" flagEmoji="🇧🇷" dialCode="+55" value="(34) 5492-4545" />
              <PhoneNumberInput label="Germany" flagEmoji="🇩🇪" dialCode="+49" value="030 12345678" />
            </div>
          ),
        },
      ]}
    />
  )
}
