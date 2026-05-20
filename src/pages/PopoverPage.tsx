import { useState } from 'react'
import { ComponentPage, Control, ControlSelect, ControlToggle } from './ComponentLayout'
import { Popover } from '../components/ui/Popover'
import { Icon } from '../components/ui/Icon'
import type { PopoverSide } from '../components/ui/Popover'

const labelStyle = {
  fontFamily: 'var(--font-secondary)',
  fontWeight: 400,
  fontSize: 14,
  lineHeight: '20px',
  color: 'var(--text-secondary)',
}

// ─── Trigger button ───────────────────────────────────────────────────────────

function TriggerBtn({ label, icon }: { label: string; icon?: string }) {
  return (
    <button
      type="button"
      style={{
        display:      'inline-flex',
        alignItems:   'center',
        gap:          6,
        fontFamily:   'var(--font-secondary)',
        fontWeight:   500,
        fontSize:     14,
        lineHeight:   '20px',
        color:        'var(--text-primary)',
        background:   'var(--bg-primary)',
        border:       '1px solid var(--border-default)',
        borderRadius: 'var(--radius-S)',
        padding:      '6px 14px',
        cursor:       'pointer',
        whiteSpace:   'nowrap',
      }}
    >
      {icon && <Icon name={icon} size={16} stroke={2} color="var(--fg-secondary)" />}
      {label}
    </button>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export function PopoverPage() {
  const [side,        setSide]        = useState<PopoverSide>('Center')
  const [top,         setTop]         = useState(false)
  const [title,       setTitle]       = useState('More information')
  const [showAction,  setShowAction]  = useState(true)
  const [actionLabel, setActionLabel] = useState('Got it')

  return (
    <ComponentPage
      title="Popover"
      description="A more robust and interactive version of a tooltip. Triggered by a click, it can contain rich content — text, actions, or custom UI — and stays open until explicitly dismissed."

      controls={<>
        <Control label="Side">
          <ControlSelect
            value={side}
            options={['Center', 'Left', 'Right']}
            onChange={v => setSide(v as PopoverSide)}
          />
        </Control>

        <Control label="Position above trigger">
          <ControlToggle value={top} onChange={setTop} />
        </Control>

        <Control label="Title">
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="h-8 px-(--padding-S) rounded-(--radius-S) border border-(--border-default) text-sm text-(--fg-primary) bg-(--bg-primary) w-full outline-none focus:border-(--border-action)"
          />
        </Control>

        <Control label="Show action">
          <ControlToggle value={showAction} onChange={setShowAction} />
        </Control>

        {showAction && (
          <Control label="Action label">
            <input
              value={actionLabel}
              onChange={e => setActionLabel(e.target.value)}
              className="h-8 px-(--padding-S) rounded-(--radius-S) border border-(--border-default) text-sm text-(--fg-primary) bg-(--bg-primary) w-full outline-none focus:border-(--border-action)"
            />
          </Control>
        )}
      </>}

      preview={
        <div className="flex flex-col items-center gap-(--gap-L)">
          <p style={{ ...labelStyle, color: 'var(--text-tertiary)', fontSize: 12 }}>
            Click the button to open the popover
          </p>
          <Popover
            side={side}
            top={top}
            title={title}
            showAction={showAction}
            actionLabel={actionLabel}
            trigger={<TriggerBtn label="Open popover" icon="IconInfoCircle" />}
          >
            <p style={labelStyle}>
              This popover can contain any content — text, lists, forms, or custom UI elements.
            </p>
          </Popover>
        </div>
      }

      states={[
        {
          label: 'Sides — Center · Left · Right',
          node: (
            <div className="flex flex-wrap gap-(--gap-XL)">
              {(['Center', 'Left', 'Right'] as PopoverSide[]).map(s => (
                <div key={s} className="flex flex-col items-center gap-(--gap-S)">
                  <Popover
                    side={s}
                    top={false}
                    title={`Side: ${s}`}
                    actionLabel="OK"
                    trigger={<TriggerBtn label={s} />}
                  >
                    <p style={labelStyle}>Triangle aligns to trigger center.</p>
                  </Popover>
                  <span style={{ ...labelStyle, fontSize: 12, color: 'var(--text-tertiary)' }}>{s}</span>
                </div>
              ))}
            </div>
          ),
        },
        {
          label: 'Position — Above trigger · Below trigger',
          node: (
            <div className="flex flex-wrap gap-(--gap-XL)">
              <div className="flex flex-col items-center gap-(--gap-S)">
                <Popover
                  side="Center"
                  top={true}
                  title="Above trigger"
                  actionLabel="Close"
                  trigger={<TriggerBtn label="Opens above" />}
                >
                  <p style={labelStyle}>Panel is positioned above the trigger element.</p>
                </Popover>
                <span style={{ ...labelStyle, fontSize: 12, color: 'var(--text-tertiary)' }}>top=true</span>
              </div>
              <div className="flex flex-col items-center gap-(--gap-S)">
                <Popover
                  side="Center"
                  top={false}
                  title="Below trigger"
                  actionLabel="Close"
                  trigger={<TriggerBtn label="Opens below" />}
                >
                  <p style={labelStyle}>Panel is positioned below the trigger element.</p>
                </Popover>
                <span style={{ ...labelStyle, fontSize: 12, color: 'var(--text-tertiary)' }}>top=false</span>
              </div>
            </div>
          ),
        },
        {
          label: 'Without action button',
          node: (
            <Popover
              side="Center"
              top={false}
              title="Read-only info"
              showAction={false}
              trigger={<TriggerBtn label="No action" />}
            >
              <p style={labelStyle}>
                This popover is purely informational — no action button, just content.
              </p>
            </Popover>
          ),
        },
        {
          label: 'Usage example — filter panel & settings menu',
          node: (
            <div
              className="flex flex-wrap items-start gap-(--gap-XXXL) rounded-(--radius-L) p-(--padding-XL)"
              style={{ background: 'var(--bg-page)', width: '100%' }}
            >

              {/* Filter popover */}
              <div className="flex flex-col gap-(--gap-S)">
                <span style={{ ...labelStyle, fontSize: 12, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Filter
                </span>
                <Popover
                  side="Left"
                  top={false}
                  title="Add a filter"
                  showAction={true}
                  actionLabel="Apply"
                  trigger={<TriggerBtn label="+ Add filter" icon="IconFilter" />}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    {['Status', 'Priority', 'Assignee', 'Due date'].map(f => (
                      <div
                        key={f}
                        style={{
                          padding:      '6px 8px',
                          borderRadius: 'var(--radius-S)',
                          cursor:       'pointer',
                          fontFamily:   'var(--font-secondary)',
                          fontWeight:   400,
                          fontSize:     14,
                          lineHeight:   '20px',
                          color:        'var(--text-primary)',
                        }}
                        onMouseEnter={e => (e.currentTarget.style.background = 'var(--bg-brand_tertiary)')}
                        onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                      >
                        {f}
                      </div>
                    ))}
                  </div>
                </Popover>
              </div>

              {/* Settings popover */}
              <div className="flex flex-col gap-(--gap-S)">
                <span style={{ ...labelStyle, fontSize: 12, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Settings
                </span>
                <Popover
                  side="Right"
                  top={false}
                  title="Column visibility"
                  showAction={true}
                  actionLabel="Save"
                  trigger={
                    <button
                      type="button"
                      style={{
                        display:      'flex',
                        alignItems:   'center',
                        justifyContent: 'center',
                        width:        36,
                        height:       36,
                        background:   'var(--bg-primary)',
                        border:       '1px solid var(--border-default)',
                        borderRadius: 'var(--radius-S)',
                        cursor:       'pointer',
                      }}
                    >
                      <Icon name="IconSettings" size={18} stroke={2} color="var(--fg-secondary)" />
                    </button>
                  }
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {['Name', 'Status', 'Assignee', 'Due date'].map(col => (
                      <label
                        key={col}
                        style={{
                          display:    'flex',
                          alignItems: 'center',
                          gap:        8,
                          cursor:     'pointer',
                          fontFamily: 'var(--font-secondary)',
                          fontWeight: 400,
                          fontSize:   14,
                          lineHeight: '20px',
                          color:      'var(--text-primary)',
                        }}
                      >
                        <input type="checkbox" defaultChecked style={{ cursor: 'pointer', accentColor: 'var(--bg-action)' }} />
                        {col}
                      </label>
                    ))}
                  </div>
                </Popover>
              </div>

              {/* Viewport-edge demo */}
              <div className="flex flex-col gap-(--gap-S)">
                <span style={{ ...labelStyle, fontSize: 12, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Auto-flip demo
                </span>
                <Popover
                  side="Right"
                  top={true}
                  title="Auto-flip in action"
                  showAction={false}
                  trigger={<TriggerBtn label="Near an edge?" icon="IconArrowsMaximize" />}
                >
                  <p style={labelStyle}>
                    If this panel would go off-screen, it automatically flips to stay visible. Try resizing the window!
                  </p>
                </Popover>
              </div>

            </div>
          ),
        },
      ]}
    />
  )
}
