import { useState, useCallback } from 'react'
import { Alert } from '../components/ui/Alert'
import type { AlertVariant } from '../components/ui/Alert'
import { ComponentPage, Control, ControlSelect, ControlToggle } from './ComponentLayout'

const VARIANTS: AlertVariant[] = ['Error', 'Success', 'Warning', 'Neutral']
const DURATIONS = ['None', '3000', '5000', '8000']

export function AlertPage() {
  const [variant, setVariant] = useState<AlertVariant>('Neutral')
  const [showDescription, setShowDescription] = useState(true)
  const [showActions, setShowActions] = useState(false)
  const [durationStr, setDurationStr] = useState('None')
  const [previewKey, setPreviewKey] = useState(0)

  const duration = durationStr === 'None' ? undefined : Number(durationStr)

  const resetPreview = useCallback(() => setPreviewKey(k => k + 1), [])

  return (
    <ComponentPage
      title="Alert"
      description="The Toaster is a temporary, dismissible alert that appears in response to a user action. It provides immediate feedback, such as confirmation of success or notification of an error, without interrupting the user's workflow. The Toaster usually fades away after a short period or can be dismissed manually by the user."
      controls={
        <>
          <Control label="Variant">
            <ControlSelect value={variant} options={VARIANTS} onChange={v => { setVariant(v as AlertVariant); resetPreview() }} />
          </Control>
          <Control label="Description">
            <ControlToggle value={showDescription} onChange={setShowDescription} />
          </Control>
          <Control label="Actions">
            <ControlToggle value={showActions} onChange={setShowActions} />
          </Control>
          <Control label="Duration (ms)">
            <ControlSelect value={durationStr} options={DURATIONS} onChange={v => { setDurationStr(v); resetPreview() }} />
          </Control>
          {durationStr !== 'None' && (
            <button
              type="button"
              onClick={resetPreview}
              className="text-xs text-(--text-action) hover:underline cursor-pointer"
            >
              Replay animation
            </button>
          )}
        </>
      }
      preview={
        <div className="w-full max-w-xl">
          <Alert
            key={previewKey}
            variant={variant}
            title="Something happened on your account"
            description={showDescription ? 'This action could not be completed. Please check your settings or contact support if the issue persists.' : undefined}
            primaryAction={showActions ? { label: 'Take action', onClick: () => {} } : undefined}
            secondaryAction={showActions ? { label: 'Dismiss', onClick: () => {} } : undefined}
            duration={duration}
          />
        </div>
      }
      states={[
        {
          label: 'All variants — with description',
          node: (
            <div className="w-full flex flex-col gap-(--gap-M)">
              {VARIANTS.map(v => (
                <Alert
                  key={v}
                  variant={v}
                  title={`${v} — Something happened on your account`}
                  description="This action could not be completed. Please check your settings or contact support."
                />
              ))}
            </div>
          ),
        },
        {
          label: 'Title only',
          node: (
            <div className="w-full flex flex-col gap-(--gap-M)">
              {VARIANTS.map(v => (
                <Alert key={v} variant={v} title={`${v} — Something happened on your account`} />
              ))}
            </div>
          ),
        },
        {
          label: 'With actions',
          node: (
            <div className="w-full flex flex-col gap-(--gap-M)">
              {VARIANTS.map(v => (
                <Alert
                  key={v}
                  variant={v}
                  title={`${v} — Action required`}
                  description="Please review the issue below and choose how to proceed."
                  primaryAction={{ label: 'Take action', onClick: () => {} }}
                  secondaryAction={{ label: 'Dismiss', onClick: () => {} }}
                />
              ))}
            </div>
          ),
        },
        {
          label: 'Auto-dismiss — 5 seconds (click Replay)',
          node: (
            <div className="w-full flex flex-col gap-(--gap-M)">
              {VARIANTS.map((v, i) => (
                <Alert
                  key={`${v}-${previewKey}`}
                  variant={v}
                  title={`${v} — This will dismiss in ${5 - i} seconds`}
                  duration={(5 - i) * 1000}
                />
              ))}
            </div>
          ),
        },
      ]}
    />
  )
}
