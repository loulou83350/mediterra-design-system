import { useState } from 'react'
import { Chip } from '../components/ui/Chip'
import type { ChipColor } from '../components/ui/Chip'
import { ComponentPage, Control, ControlSelect, ControlToggle } from './ComponentLayout'

const COLORS: ChipColor[] = ['Neutral', 'Success', 'Error', 'Warning']

const AVATAR = 'https://i.pravatar.cc/48'

// ─── Interactive demo ─────────────────────────────────────────────────────────

const FILTER_OPTIONS = [
  { id: 'design',     label: 'Design' },
  { id: 'dev',        label: 'Development' },
  { id: 'marketing',  label: 'Marketing' },
  { id: 'research',   label: 'Research' },
  { id: 'strategy',   label: 'Strategy' },
]

function MultiSelectDemo() {
  const [selected, setSelected] = useState<Set<string>>(new Set())

  function toggle(id: string) {
    setSelected(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--gap-M)', width: '100%' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--gap-S)' }}>
        {FILTER_OPTIONS.map(({ id, label }) => (
          <Chip
            key={id}
            color="Neutral"
            label={label}
            active={selected.has(id)}
            onClick={() => toggle(id)}
            onRemove={() => toggle(id)}
          />
        ))}
      </div>
      <p style={{ fontFamily: 'var(--font-secondary)', fontSize: 13, lineHeight: '20px', color: 'var(--text-secondary)', margin: 0 }}>
        {selected.size === 0
          ? 'Click a chip to select it. Click × to deselect.'
          : `Selected: ${FILTER_OPTIONS.filter(o => selected.has(o.id)).map(o => o.label).join(', ')}`
        }
      </p>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export function ChipPage() {
  const [color, setColor]           = useState<ChipColor>('Neutral')
  const [active, setActive]         = useState(false)
  const [disabled, setDisabled]     = useState(false)
  const [tailIcon, setTailIcon]     = useState(true)
  const [showAvatar, setShowAvatar] = useState(false)
  const [label, setLabel]           = useState('Label')

  const inputCls = 'h-8 px-(--padding-M) rounded-(--radius-S) border border-(--border-default) text-sm text-(--fg-primary) bg-(--bg-primary) outline-none focus:border-(--border-brand) w-full'

  return (
    <ComponentPage
      title="Chip"
      description="The Chips component is a compact, visual element used to represent discrete pieces of information, such as tags, categories, or actions. They are often used to display selected items, filters, or provide contextual actions. Chips can contain text, icons, or both, and they can be interactive, allowing users to select, deselect, or remove them. They are a component commonly found in forms, filters, and input fields, where space efficiency and clear visual representation are essential."
      controls={
        <>
          <Control label="Color">
            <ControlSelect value={color} options={COLORS} onChange={v => setColor(v as ChipColor)} />
          </Control>
          <Control label="Active">
            <ControlToggle value={active} onChange={setActive} />
          </Control>
          <Control label="Disabled">
            <ControlToggle value={disabled} onChange={setDisabled} />
          </Control>
          <Control label="Tail Icon">
            <ControlToggle value={tailIcon} onChange={setTailIcon} />
          </Control>
          <Control label="Show Avatar">
            <ControlToggle value={showAvatar} onChange={setShowAvatar} />
          </Control>
          <Control label="Label">
            <input value={label} onChange={e => setLabel(e.target.value)} className={inputCls} />
          </Control>
        </>
      }
      preview={
        <Chip
          color={color}
          active={active}
          disabled={disabled}
          tailIcon={tailIcon}
          avatarSrc={showAvatar ? AVATAR : undefined}
          label={label}
        />
      }
      states={[
        {
          label: 'Multi-select filter — interactive',
          node: <MultiSelectDemo />,
        },
        {
          label: 'Default — all colors',
          node: (
            <>
              {COLORS.map(c => <Chip key={c} color={c} label={c} />)}
            </>
          ),
        },
        {
          label: 'Active — all colors',
          node: (
            <>
              {COLORS.map(c => <Chip key={c} color={c} label={c} active />)}
            </>
          ),
        },
        {
          label: 'With avatar — default and active',
          node: (
            <>
              {COLORS.map(c => <Chip key={`${c}-d`} color={c} label={c} avatarSrc={AVATAR} />)}
              {COLORS.map(c => <Chip key={`${c}-a`} color={c} label={c} active avatarSrc={AVATAR} />)}
            </>
          ),
        },
        {
          label: 'Disabled — all colors',
          node: (
            <>
              {COLORS.map(c => <Chip key={c} color={c} label={c} disabled />)}
            </>
          ),
        },
        {
          label: 'Without tail icon',
          node: (
            <>
              {COLORS.map(c => <Chip key={c} color={c} label={c} tailIcon={false} />)}
            </>
          ),
        },
      ]}
    />
  )
}
