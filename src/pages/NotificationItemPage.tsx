import { useState } from 'react'
import { NotificationItem } from '../components/ui/NotificationItem'
import type { NotificationItemType } from '../components/ui/NotificationItem'
import { ComponentPage, Control, ControlSelect, ControlToggle } from './ComponentLayout'

const TYPES: NotificationItemType[] = ['Neutral', 'Error', 'Success', 'Warning']

export function NotificationItemPage() {
  const [type, setType]                   = useState<NotificationItemType>('Neutral')
  const [recent, setRecent]               = useState(false)
  const [description, setDescription]     = useState('You got a new notification, let see what\'s behind')
  const [date, setDate]                   = useState('2h ago')
  const [topSpacing, setTopSpacing]       = useState(false)
  const [botSpacing, setBotSpacing]       = useState(false)
  const [showActionGroup, setShowActionGroup] = useState(true)
  const [actionLabel, setActionLabel]     = useState('Claim')

  const inputCls = 'h-8 px-(--padding-M) rounded-(--radius-S) border border-(--border-default) text-sm text-(--fg-primary) bg-(--bg-primary) outline-none focus:border-(--border-brand) w-full'

  return (
    <ComponentPage
      title="Notification Item"
      description="A Persistent Notification is a non-intrusive message that stays visible in a designated area of the interface without obstructing the user's experience. Unlike Toasters, this notification stays until the user interacts with it, making it ideal for updates that the user may need to revisit later. It is often used to notify users of new messages, updates, or interactions."
      controls={
        <>
          <Control label="Type">
            <ControlSelect value={type} options={TYPES} onChange={v => setType(v as NotificationItemType)} />
          </Control>
          <Control label="Recent">
            <ControlToggle value={recent} onChange={setRecent} />
          </Control>
          {recent && (
            <>
              <Control label="Show action">
                <ControlToggle value={showActionGroup} onChange={setShowActionGroup} />
              </Control>
              <Control label="Action label">
                <input value={actionLabel} onChange={e => setActionLabel(e.target.value)} className={inputCls} />
              </Control>
            </>
          )}
          <Control label="Description">
            <input value={description} onChange={e => setDescription(e.target.value)} className={inputCls} />
          </Control>
          <Control label="Date">
            <input value={date} onChange={e => setDate(e.target.value)} className={inputCls} />
          </Control>
          <Control label="Top spacing">
            <ControlToggle value={topSpacing} onChange={setTopSpacing} />
          </Control>
          <Control label="Bot spacing">
            <ControlToggle value={botSpacing} onChange={setBotSpacing} />
          </Control>
        </>
      }
      preview={
        <div className="w-96 border border-(--border-default) rounded-(--radius-M) overflow-hidden">
          <NotificationItem
            type={type}
            recent={recent}
            description={description}
            notificationDate={date}
            topSpacing={topSpacing}
            botSpacing={botSpacing}
            showActionGroup={showActionGroup}
            actionLabel={actionLabel}
          />
        </div>
      }
      states={[
        {
          label: 'All types — not recent',
          node: (
            <div className="flex flex-col border border-(--border-default) rounded-(--radius-M) overflow-hidden divide-y divide-(--border-default) w-full max-w-md">
              {TYPES.map(t => (
                <NotificationItem
                  key={t}
                  type={t}
                  description={`${t} — You got a new notification`}
                  notificationDate="2h ago"
                />
              ))}
            </div>
          ),
        },
        {
          label: 'All types — recent (with action)',
          node: (
            <div className="flex flex-col border border-(--border-default) rounded-(--radius-M) overflow-hidden divide-y divide-(--border-default) w-full max-w-md">
              {TYPES.map(t => (
                <NotificationItem
                  key={t}
                  type={t}
                  recent
                  description={`${t} — Action required on your account`}
                  notificationDate="Just now"
                  actionLabel="Claim"
                />
              ))}
            </div>
          ),
        },
        {
          label: 'Recent — without action button',
          node: (
            <div className="flex flex-col border border-(--border-default) rounded-(--radius-M) overflow-hidden divide-y divide-(--border-default) w-full max-w-md">
              {TYPES.map(t => (
                <NotificationItem
                  key={t}
                  type={t}
                  recent
                  showActionGroup={false}
                  description={`${t} — Read-only recent notification`}
                  notificationDate="5 min ago"
                />
              ))}
            </div>
          ),
        },
        {
          label: 'With top + bottom spacing',
          node: (
            <div className="flex flex-col border border-(--border-default) rounded-(--radius-M) overflow-hidden divide-y divide-(--border-default) w-full max-w-md">
              <NotificationItem type="Neutral" topSpacing botSpacing description="With spacing above and below" notificationDate="1h ago" />
              <NotificationItem type="Success" recent topSpacing botSpacing description="Recent with spacing" notificationDate="Just now" />
            </div>
          ),
        },
      ]}
    />
  )
}
