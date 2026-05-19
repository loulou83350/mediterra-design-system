import { useState } from 'react'
import { Notification } from '../components/ui/Notification'
import type { NotificationProps } from '../components/ui/Notification'
import { ComponentPage, Control, ControlSelect } from './ComponentLayout'

type NotifSize = NonNullable<NotificationProps['size']>

export function NotificationPage() {
  const [size, setSize] = useState<NotifSize>('M')
  const [count, setCount] = useState(3)

  return (
    <ComponentPage
      title="Notification"
      description="The Notification badge is a small, circular indicator typically used to signify unread messages, alerts, or updates. It is often displayed as an overlay on an icon, such as a bell or user avatar, and is designed to draw the user's attention to the presence of new information."
      controls={
        <>
          <Control label="Size">
            <ControlSelect value={size} options={['S', 'M', 'L']} onChange={v => setSize(v as NotifSize)} />
          </Control>
          <Control label="Count">
            <input
              type="number"
              min={0}
              max={999}
              value={count}
              onChange={e => setCount(Number(e.target.value))}
              className="h-8 px-(--padding-S) rounded-(--radius-S) border border-(--border-default) text-sm text-(--fg-primary) bg-(--bg-primary) outline-none focus:border-(--border-brand) w-full"
            />
          </Control>
        </>
      }
      preview={
        <div className="flex items-center justify-center">
          <Notification size={size} count={count} />
        </div>
      }
      states={[
        {
          label: 'Sizes',
          node: (
            <div className="flex items-center gap-(--gap-XL)">
              <div className="flex flex-col items-center gap-(--gap-S)">
                <Notification size="S" />
                <span className="text-xs text-(--fg-tertiary)">S — dot</span>
              </div>
              <div className="flex flex-col items-center gap-(--gap-S)">
                <Notification size="M" count={3} />
                <span className="text-xs text-(--fg-tertiary)">M — 16px</span>
              </div>
              <div className="flex flex-col items-center gap-(--gap-S)">
                <Notification size="L" count={3} />
                <span className="text-xs text-(--fg-tertiary)">L — 24px</span>
              </div>
            </div>
          ),
        },
        {
          label: 'Count values',
          node: (
            <div className="flex items-center gap-(--gap-L)">
              {[1, 9, 12, 99, 100].map(n => (
                <div key={n} className="flex flex-col items-center gap-(--gap-S)">
                  <Notification size="M" count={n} />
                  <span className="text-xs text-(--fg-tertiary)">{n}</span>
                </div>
              ))}
            </div>
          ),
        },
        {
          label: 'Usage in context',
          node: (
            <div className="flex items-center gap-(--gap-XL)">
              <div className="relative inline-flex">
                <div className="w-10 h-10 rounded-(--radius-M) bg-(--bg-secondary) border border-(--border-default) flex items-center justify-center">
                  <span className="text-xs text-(--fg-tertiary)">Icon</span>
                </div>
                <Notification size="S" />
                <div className="absolute -top-1 -right-1">
                  <Notification size="M" count={3} />
                </div>
              </div>
              <div className="relative inline-flex">
                <div className="w-10 h-10 rounded-(--radius-M) bg-(--bg-secondary) border border-(--border-default) flex items-center justify-center">
                  <span className="text-xs text-(--fg-tertiary)">Icon</span>
                </div>
                <div className="absolute -top-1 -right-1">
                  <Notification size="L" count={12} />
                </div>
              </div>
            </div>
          ),
        },
      ]}
    />
  )
}
