import { useState } from 'react'
import { GlobalAlert } from '../components/ui/GlobalAlert'
import { ComponentPage, Control, ControlToggle } from './ComponentLayout'

export function GlobalAlertPage() {
  const [mobile, setMobile]             = useState(false)
  const [showAction, setShowAction]     = useState(true)
  const [actionLabel, setActionLabel]   = useState('Action 1')
  const [title, setTitle]               = useState('Message Title')
  const [description, setDescription]   = useState('Message description')

  const inputCls = 'h-8 px-(--padding-M) rounded-(--radius-S) border border-(--border-default) text-sm text-(--fg-primary) bg-(--bg-primary) outline-none focus:border-(--border-brand) w-full'

  return (
    <ComponentPage
      title="Global Alert"
      description="A Global Alert Message is a highly prominent and persistent notification that communicates critical information to users. It is typically used for urgent or system-wide announcements, such as security warnings, major outages, or critical updates. Global Alerts often remain on the screen until manually dismissed, ensuring the user acknowledges the message before proceeding."
      controls={
        <>
          <Control label="Mobile">
            <ControlToggle value={mobile} onChange={setMobile} />
          </Control>
          <Control label="Show action">
            <ControlToggle value={showAction} onChange={setShowAction} />
          </Control>
          {showAction && (
            <Control label="Action label">
              <input value={actionLabel} onChange={e => setActionLabel(e.target.value)} className={inputCls} />
            </Control>
          )}
          <Control label="Title">
            <input value={title} onChange={e => setTitle(e.target.value)} className={inputCls} />
          </Control>
          <Control label="Description">
            <input value={description} onChange={e => setDescription(e.target.value)} className={inputCls} />
          </Control>
        </>
      }
      preview={
        <div className="w-full">
          <GlobalAlert
            title={title}
            description={description}
            mobile={mobile}
            showAction={showAction}
            actionLabel={actionLabel}
          />
        </div>
      }
      states={[
        {
          label: 'Desktop — with action',
          node: (
            <div className="w-full">
              <GlobalAlert
                title="New features are available"
                description="We've released an update with improved performance and new components."
                showAction
                actionLabel="Learn more"
              />
            </div>
          ),
        },
        {
          label: 'Desktop — without action',
          node: (
            <div className="w-full">
              <GlobalAlert
                title="Scheduled maintenance"
                description="The platform will be unavailable on Saturday from 2am to 4am CET."
                showAction={false}
              />
            </div>
          ),
        },
        {
          label: 'Mobile — with action',
          node: (
            <div className="w-96">
              <GlobalAlert
                title="New features available"
                description="We've released an update with improved performance and new components."
                mobile
                showAction
                actionLabel="Learn more"
              />
            </div>
          ),
        },
        {
          label: 'Mobile — without action',
          node: (
            <div className="w-96">
              <GlobalAlert
                title="Scheduled maintenance"
                description="The platform will be unavailable on Saturday from 2am to 4am CET."
                mobile
                showAction={false}
              />
            </div>
          ),
        },
      ]}
    />
  )
}
