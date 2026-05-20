import { useState } from 'react'
import { ComponentPage, Control, ControlSelect, ControlToggle } from './ComponentLayout'
import { Tooltip } from '../components/ui/Tooltip'
import { Icon } from '../components/ui/Icon'
import type { TooltipColor, TooltipType, TooltipSide } from '../components/ui/Tooltip'

const labelStyle = {
  fontFamily: 'var(--font-secondary)',
  fontWeight: 400,
  fontSize: 14,
  lineHeight: '20px',
  color: 'var(--text-secondary)',
}

// ─── Small helper: a demo trigger button ──────────────────────────────────────

function TriggerBtn({ label }: { label: string }) {
  return (
    <button
      type="button"
      style={{
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
      {label}
    </button>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export function TooltipPage() {
  const [color,     setColor]     = useState<TooltipColor>('Contrast')
  const [type,      setType]      = useState<TooltipType>('default')
  const [side,      setSide]      = useState<TooltipSide>('top')
  const [label,     setLabel]     = useState('Tooltip text')
  const [linkLabel, setLinkLabel] = useState('Learn more')
  const [showLink,  setShowLink]  = useState(false)

  return (
    <ComponentPage
      title="Tooltip"
      description="Small, lightweight popup that appears on hover. Used to provide short, contextual information about a UI element without cluttering the interface."

      controls={<>
        <Control label="Color">
          <ControlSelect
            value={color}
            options={['Contrast', 'Subtle', 'Accent']}
            onChange={v => setColor(v as TooltipColor)}
          />
        </Control>

        <Control label="Type">
          <ControlSelect
            value={type}
            options={['default', 'icon', 'link']}
            onChange={v => setType(v as TooltipType)}
          />
        </Control>

        <Control label="Side">
          <ControlSelect
            value={side}
            options={['top', 'bottom', 'left', 'right']}
            onChange={v => setSide(v as TooltipSide)}
          />
        </Control>

        <Control label="Label">
          <input
            value={label}
            onChange={e => setLabel(e.target.value)}
            className="h-8 px-(--padding-S) rounded-(--radius-S) border border-(--border-default) text-sm text-(--fg-primary) bg-(--bg-primary) w-full outline-none focus:border-(--border-action)"
          />
        </Control>

        {type === 'link' && (
          <Control label="Link label">
            <input
              value={linkLabel}
              onChange={e => setLinkLabel(e.target.value)}
              className="h-8 px-(--padding-S) rounded-(--radius-S) border border-(--border-default) text-sm text-(--fg-primary) bg-(--bg-primary) w-full outline-none focus:border-(--border-action)"
            />
          </Control>
        )}

        <Control label="Show link label">
          <ControlToggle value={showLink} onChange={setShowLink} />
        </Control>
      </>}

      preview={
        <div className="flex flex-col items-center gap-(--gap-L)">
          <p style={{ ...labelStyle, color: 'var(--text-tertiary)', fontSize: 12 }}>
            Hover the element below
          </p>
          <Tooltip
            color={color}
            type={type}
            side={side}
            label={label}
            linkLabel={showLink ? linkLabel : undefined}
          >
            <TriggerBtn label="Hover me" />
          </Tooltip>
        </div>
      }

      states={[
        {
          label: 'Colors — Contrast · Subtle · Accent',
          node: (
            <div className="flex flex-wrap gap-(--gap-XL)">
              {(['Contrast', 'Subtle', 'Accent'] as TooltipColor[]).map(c => (
                <div key={c} className="flex flex-col items-center gap-(--gap-S)">
                  <Tooltip color={c} label="Tooltip text" side="bottom">
                    <TriggerBtn label={c} />
                  </Tooltip>
                  <span style={{ ...labelStyle, fontSize: 12, color: 'var(--text-tertiary)' }}>{c}</span>
                </div>
              ))}
            </div>
          ),
        },
        {
          label: 'Types — Default · With close icon · With link',
          node: (
            <div className="flex flex-wrap gap-(--gap-XL)">
              <div className="flex flex-col items-center gap-(--gap-S)">
                <Tooltip color="Contrast" type="default" label="Short info text" side="bottom">
                  <TriggerBtn label="Default" />
                </Tooltip>
                <span style={{ ...labelStyle, fontSize: 12, color: 'var(--text-tertiary)' }}>Default</span>
              </div>
              <div className="flex flex-col items-center gap-(--gap-S)">
                <Tooltip color="Contrast" type="icon" label="This action cannot be undone" side="bottom">
                  <TriggerBtn label="With icon" />
                </Tooltip>
                <span style={{ ...labelStyle, fontSize: 12, color: 'var(--text-tertiary)' }}>With close</span>
              </div>
              <div className="flex flex-col items-center gap-(--gap-S)">
                <Tooltip color="Accent" type="link" label="Need help with pricing?" linkLabel="See plans" side="bottom">
                  <TriggerBtn label="With link" />
                </Tooltip>
                <span style={{ ...labelStyle, fontSize: 12, color: 'var(--text-tertiary)' }}>With link</span>
              </div>
            </div>
          ),
        },
        {
          label: 'Sides — Top · Bottom · Left · Right',
          node: (
            <div className="flex flex-wrap gap-(--gap-XL)">
              {(['top', 'bottom', 'left', 'right'] as TooltipSide[]).map(s => (
                <div key={s} className="flex flex-col items-center gap-(--gap-S)">
                  <Tooltip color="Contrast" label="Tooltip text" side={s}>
                    <TriggerBtn label={s} />
                  </Tooltip>
                  <span style={{ ...labelStyle, fontSize: 12, color: 'var(--text-tertiary)' }}>{s}</span>
                </div>
              ))}
            </div>
          ),
        },
        {
          label: 'Usage example — contextual hints in a real UI',
          node: (
            <div
              className="flex flex-wrap items-center gap-(--gap-XL) rounded-(--radius-L) p-(--padding-XL)"
              style={{ background: 'var(--bg-page)', width: '100%' }}
            >
              {/* Save button */}
              <Tooltip color="Contrast" label="Save all changes" side="top">
                <button
                  type="button"
                  style={{
                    fontFamily:   'var(--font-primary)',
                    fontWeight:   800,
                    fontSize:     16,
                    color:        'var(--text-action_white)',
                    background:   'var(--bg-action)',
                    border:       'none',
                    borderRadius: 'var(--radius-S)',
                    padding:      '8px 20px',
                    cursor:       'pointer',
                  }}
                >
                  Save
                </button>
              </Tooltip>

              {/* Info icon — field hint */}
              <Tooltip color="Subtle" label="This field is required to proceed" side="top">
                <div
                  style={{
                    display:        'flex',
                    alignItems:     'center',
                    gap:            6,
                    padding:        '6px 12px',
                    background:     'var(--bg-primary)',
                    border:         '1px solid var(--border-default)',
                    borderRadius:   'var(--radius-S)',
                    cursor:         'default',
                  }}
                >
                  <span style={{ ...labelStyle, color: 'var(--text-placeholder)' }}>Email address</span>
                  <Icon name="IconInfoCircle" size={16} stroke={2} color="var(--fg-tertiary)" />
                </div>
              </Tooltip>

              {/* Pricing help — accent + link */}
              <Tooltip
                color="Accent"
                type="link"
                label="Upgrade to unlock this feature"
                linkLabel="See plans →"
                side="right"
              >
                <div
                  style={{
                    display:      'flex',
                    alignItems:   'center',
                    justifyContent: 'center',
                    width:        24,
                    height:       24,
                    borderRadius: '50%',
                    background:   'var(--bg-brand_tertiary)',
                    border:       '1px solid var(--border-brand)',
                    cursor:       'default',
                    fontFamily:   'var(--font-secondary)',
                    fontWeight:   700,
                    fontSize:     12,
                    color:        'var(--fg-brand_primary)',
                  }}
                >
                  ?
                </div>
              </Tooltip>

              {/* Delete icon — danger hint with close */}
              <Tooltip color="Contrast" type="icon" label="Permanently delete this record" side="top">
                <button
                  type="button"
                  style={{
                    display:      'flex',
                    alignItems:   'center',
                    justifyContent: 'center',
                    width:        36,
                    height:       36,
                    background:   'var(--bg-error_tertiary)',
                    border:       '1px solid var(--border-error_primary)',
                    borderRadius: 'var(--radius-S)',
                    cursor:       'pointer',
                  }}
                >
                  <Icon name="IconTrash" size={16} stroke={2} color="var(--fg-error_primary)" />
                </button>
              </Tooltip>
            </div>
          ),
        },
      ]}
    />
  )
}
