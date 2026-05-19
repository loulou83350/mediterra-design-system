import { useState } from 'react'
import { CreditCardInput } from '../components/ui/CreditCardInput'
import { ComponentPage, Control, ControlToggle } from './ComponentLayout'

export function CreditCardInputPage() {
  const [showLabel, setShowLabel]       = useState(true)
  const [showHelper, setShowHelper]     = useState(true)
  const [error, setError]               = useState(false)
  const [errorMsg, setErrorMsg]         = useState("I'm an error message")
  const [disabled, setDisabled]         = useState(false)
  const [small, setSmall]               = useState(false)
  const [cardNumber, setCardNumber]     = useState('')
  const [expiry, setExpiry]             = useState('')
  const [ccv, setCcv]                   = useState('')

  const inputCls = 'h-8 px-(--padding-M) rounded-(--radius-S) border border-(--border-default) text-sm text-(--fg-primary) bg-(--bg-primary) outline-none focus:border-(--border-brand) w-full'

  return (
    <ComponentPage
      title="Credit Card"
      description="The Credit Card Input is a specialized input component designed for entering credit or debit card information securely."
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
        <div className="w-96">
          <CreditCardInput
            showLabel={showLabel}
            showHelperText={showHelper}
            error={error}
            errorMessage={errorMsg}
            disabled={disabled}
            small={small}
            cardNumber={cardNumber}
            onCardNumberChange={setCardNumber}
            expiry={expiry}
            onExpiryChange={setExpiry}
            ccv={ccv}
            onCcvChange={setCcv}
          />
        </div>
      }
      states={[
        {
          label: 'Default / Error / Disabled — large',
          node: (
            <div className="grid grid-cols-2 gap-(--gap-L) w-full">
              <CreditCardInput label="Default" />
              <CreditCardInput label="With value" cardNumber="3682 9394 2374 8664" expiry="05/24" ccv="123" />
              <CreditCardInput label="Error" error errorMessage="Invalid card details" />
              <CreditCardInput label="Disabled" disabled cardNumber="3682 9394 2374 8664" expiry="05/24" ccv="123" />
            </div>
          ),
        },
        {
          label: 'Small size',
          node: (
            <div className="grid grid-cols-2 gap-(--gap-L) w-full">
              <CreditCardInput label="Default small" small />
              <CreditCardInput label="Error small" small error errorMessage="Required" />
            </div>
          ),
        },
      ]}
    />
  )
}
