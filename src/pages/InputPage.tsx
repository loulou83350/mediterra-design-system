import { useState } from 'react'
import { Input } from '../components/ui/Input'
import { ComponentPage, Control, ControlSelect, ControlToggle } from './ComponentLayout'

export function InputPage() {
  const [label, setLabel] = useState('Email')
  const [placeholder, setPlaceholder] = useState('hello@example.com')
  const [hint, setHint] = useState('')
  const [error, setError] = useState('')
  const [disabled, setDisabled] = useState(false)
  const [type, setType] = useState('text')

  return (
    <ComponentPage
      title="Input"
      description="Text input field. Supports default, focus, error and disabled states."
      controls={
        <>
          <Control label="Type">
            <ControlSelect value={type} options={['text', 'email', 'password', 'number', 'search']} onChange={setType} />
          </Control>
          <Control label="Label">
            <input
              value={label}
              onChange={e => setLabel(e.target.value)}
              className="h-8 px-(--padding-S) rounded-(--radius-S) border border-(--border-default) text-sm bg-(--bg-primary) outline-none focus:border-(--border-brand) w-full"
            />
          </Control>
          <Control label="Placeholder">
            <input
              value={placeholder}
              onChange={e => setPlaceholder(e.target.value)}
              className="h-8 px-(--padding-S) rounded-(--radius-S) border border-(--border-default) text-sm bg-(--bg-primary) outline-none focus:border-(--border-brand) w-full"
            />
          </Control>
          <Control label="Hint">
            <input
              value={hint}
              onChange={e => setHint(e.target.value)}
              placeholder="(empty)"
              className="h-8 px-(--padding-S) rounded-(--radius-S) border border-(--border-default) text-sm bg-(--bg-primary) outline-none focus:border-(--border-brand) w-full"
            />
          </Control>
          <Control label="Error">
            <input
              value={error}
              onChange={e => setError(e.target.value)}
              placeholder="(empty)"
              className="h-8 px-(--padding-S) rounded-(--radius-S) border border-(--border-default) text-sm bg-(--bg-primary) outline-none focus:border-(--border-brand) w-full"
            />
          </Control>
          <Control label="Disabled">
            <ControlToggle value={disabled} onChange={setDisabled} />
          </Control>
        </>
      }
      preview={
        <div className="w-72">
          <Input
            type={type}
            label={label}
            placeholder={placeholder}
            hint={hint || undefined}
            error={error || undefined}
            disabled={disabled}
          />
        </div>
      }
      states={[
        {
          label: 'States',
          node:
            <div className="grid grid-cols-2 gap-(--gap-L) w-full">
              <Input label="Default" placeholder="Your text" />
              <Input label="With hint" placeholder="Your email" hint="Used on your profile" />
              <Input label="With error" placeholder="Your email" error="Invalid format" />
              <Input label="Disabled" placeholder="Not editable" disabled />
            </div>
        },
        {
          label: 'Types',
          node:
            <div className="grid grid-cols-2 gap-(--gap-L) w-full">
              <Input label="Email" type="email" placeholder="hello@example.com" />
              <Input label="Password" type="password" placeholder="••••••••" />
              <Input label="Search" type="search" placeholder="Search..." />
              <Input label="Number" type="number" placeholder="0" />
            </div>
        },
      ]}
    />
  )
}
