import { useState } from 'react'
import { Tips } from '../components/ui/Tips'
import type { TipsState } from '../components/ui/Tips'
import { ComponentPage, Control, ControlSelect, ControlToggle } from './ComponentLayout'

const STATES: TipsState[] = ['Default', 'Success', 'Warning', 'Error']

export function TipsPage() {
  const [state, setState] = useState<TipsState>('Default')
  const [vertical, setVertical] = useState(false)
  const [showIcon, setShowIcon] = useState(true)
  const [showAction, setShowAction] = useState(false)

  return (
    <ComponentPage
      title="Tips"
      description="The Tips component provides users with passive, contextual information that helps guide their actions or enhances their understanding of the interface. Unlike the Toaster, Tips are persistent on the screen and do not require immediate user action. They are often used to offer advice, reminders, or additional information that may help users complete tasks more efficiently."
      controls={
        <>
          <Control label="State">
            <ControlSelect value={state} options={STATES} onChange={v => setState(v as TipsState)} />
          </Control>
          <Control label="Vertical">
            <ControlToggle value={vertical} onChange={setVertical} />
          </Control>
          <Control label="Show Icon">
            <ControlToggle value={showIcon} onChange={setShowIcon} />
          </Control>
          <Control label="Action">
            <ControlToggle value={showAction} onChange={setShowAction} />
          </Control>
        </>
      }
      preview={
        <div className="w-full max-w-xl">
          <Tips
            state={state}
            vertical={vertical}
            showIcon={showIcon}
            action={showAction ? { label: 'Get started', onClick: () => {} } : undefined}
          >
            I'm an informative message to help you understand the context.
          </Tips>
        </div>
      }
      states={[
        {
          label: 'All states — horizontal',
          node: (
            <div className="w-full flex flex-col gap-(--gap-M)">
              {STATES.map(s => (
                <Tips key={s} state={s} action={{ label: 'Get started', onClick: () => {} }}>
                  {s} — I'm an informative message to help you understand the context.
                </Tips>
              ))}
            </div>
          ),
        },
        {
          label: 'All states — vertical',
          node: (
            <div className="w-full flex flex-col gap-(--gap-M)">
              {STATES.map(s => (
                <Tips key={s} state={s} vertical action={{ label: 'Get started', onClick: () => {} }}>
                  {s} — I'm an informative message to help you understand the context.
                </Tips>
              ))}
            </div>
          ),
        },
        {
          label: 'Without icon',
          node: (
            <div className="w-full flex flex-col gap-(--gap-M)">
              {STATES.map(s => (
                <Tips key={s} state={s} showIcon={false}>
                  {s} — Message without icon.
                </Tips>
              ))}
            </div>
          ),
        },
        {
          label: 'Without action',
          node: (
            <div className="w-full flex flex-col gap-(--gap-M)">
              {STATES.map(s => (
                <Tips key={s} state={s}>
                  {s} — Message without action button.
                </Tips>
              ))}
            </div>
          ),
        },
      ]}
    />
  )
}
