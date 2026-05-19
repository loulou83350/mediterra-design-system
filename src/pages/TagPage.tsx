import { useState } from 'react'
import { Tag } from '../components/ui/Tag'
import type { TagColor } from '../components/ui/Tag'
import { ComponentPage, Control, ControlSelect, ControlToggle, IconPicker } from './ComponentLayout'

const COLORS: TagColor[] = ['Neutral', 'Success', 'Error', 'Warning']

export function TagPage() {
  const [color, setColor] = useState<TagColor>('Neutral')
  const [highContrast, setHighContrast] = useState(true)
  const [small, setSmall] = useState(false)
  const [headIcon, setHeadIcon] = useState(true)
  const [headIconName, setHeadIconName] = useState('IconCircle')
  const [tailIcon, setTailIcon] = useState(true)
  const [tailIconName, setTailIconName] = useState('IconInfoCircle')
  const [label, setLabel] = useState('Label')

  return (
    <ComponentPage
      title="Tag"
      description="Tags are small, pill-shaped labels used to categorize or label items, such as articles, files, or user interests. They help users quickly identify and sort content based on relevant keywords or categories. Tags are versatile and can be used in a variety of contexts, such as search filters, content labels, or in forms."
      controls={
        <>
          <Control label="Color">
            <ControlSelect value={color} options={COLORS} onChange={v => setColor(v as TagColor)} />
          </Control>
          <Control label="High Contrast">
            <ControlToggle value={highContrast} onChange={setHighContrast} />
          </Control>
          <Control label="Small">
            <ControlToggle value={small} onChange={setSmall} />
          </Control>
          <Control label="Head Icon">
            <ControlToggle value={headIcon} onChange={setHeadIcon} />
          </Control>
          {headIcon && (
            <Control label="Head Icon">
              <IconPicker value={headIconName} onChange={setHeadIconName} />
            </Control>
          )}
          <Control label="Tail Icon">
            <ControlToggle value={tailIcon} onChange={setTailIcon} />
          </Control>
          {tailIcon && (
            <Control label="Tail Icon">
              <IconPicker value={tailIconName} onChange={setTailIconName} />
            </Control>
          )}
          <Control label="Label">
            <input
              value={label}
              onChange={e => setLabel(e.target.value)}
              className="h-8 px-(--padding-S) rounded-(--radius-S) border border-(--border-default) text-sm text-(--fg-primary) bg-(--bg-primary) outline-none focus:border-(--border-brand) w-full"
            />
          </Control>
        </>
      }
      preview={
        <Tag
          color={color}
          highContrast={highContrast}
          small={small}
          headIcon={headIcon}
          headIconName={headIconName}
          tailIcon={tailIcon}
          tailIconName={tailIconName}
          label={label}
        />
      }
      states={[
        {
          label: 'All colors — High contrast',
          node: (
            <div className="flex flex-wrap gap-(--gap-M)">
              {COLORS.map(c => (
                <Tag key={c} color={c} highContrast label={c} />
              ))}
            </div>
          ),
        },
        {
          label: 'All colors — Low contrast',
          node: (
            <div className="flex flex-wrap gap-(--gap-M)">
              {COLORS.map(c => (
                <Tag key={c} color={c} highContrast={false} label={c} />
              ))}
            </div>
          ),
        },
        {
          label: 'Small — High contrast',
          node: (
            <div className="flex flex-wrap gap-(--gap-M)">
              {COLORS.map(c => (
                <Tag key={c} color={c} highContrast small label={c} />
              ))}
            </div>
          ),
        },
        {
          label: 'Small — Low contrast',
          node: (
            <div className="flex flex-wrap gap-(--gap-M)">
              {COLORS.map(c => (
                <Tag key={c} color={c} highContrast={false} small label={c} />
              ))}
            </div>
          ),
        },
        {
          label: 'Icon variants',
          node: (
            <div className="flex flex-wrap gap-(--gap-M)">
              <Tag color="Neutral" label="Both icons" headIcon tailIcon />
              <Tag color="Neutral" label="Head only" headIcon tailIcon={false} />
              <Tag color="Neutral" label="Tail only" headIcon={false} tailIcon />
              <Tag color="Neutral" label="No icons" headIcon={false} tailIcon={false} />
            </div>
          ),
        },
      ]}
    />
  )
}
