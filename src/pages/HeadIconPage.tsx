import { useState } from 'react'
import { HeadIcon } from '../components/ui/HeadIcon'
import type { HeadIconColor } from '../components/ui/HeadIcon'
import { ComponentPage, Control, ControlSelect, ControlToggle, IconPicker } from './ComponentLayout'

const COLORS: HeadIconColor[] = ['Brand', 'Error', 'Warning', 'Success', 'Neutral']

export function HeadIconPage() {
  const [color, setColor]   = useState<HeadIconColor>('Brand')
  const [small, setSmall]   = useState(false)
  const [icon, setIcon]     = useState('IconAlertCircle')

  return (
    <ComponentPage
      title="Head Icon"
      description="A small icon badge used as a status or category indicator. Pairs a semantic color with a contextual icon. Used in notification items, alert headers, and card icons."
      controls={
        <>
          <Control label="Color">
            <ControlSelect
              value={color}
              options={COLORS}
              onChange={v => setColor(v as HeadIconColor)}
            />
          </Control>
          <Control label="Small">
            <ControlToggle value={small} onChange={setSmall} />
          </Control>
          <Control label="Icon">
            <IconPicker value={icon} onChange={setIcon} />
          </Control>
        </>
      }
      preview={
        <HeadIcon color={color} small={small} icon={icon} />
      }
      states={[
        {
          label: '5 colors — Regular',
          node: (
            <div className="flex items-center gap-(--gap-L)">
              {COLORS.map(c => (
                <HeadIcon key={c} color={c} small={false} />
              ))}
            </div>
          ),
        },
        {
          label: '5 colors — Small',
          node: (
            <div className="flex items-center gap-(--gap-L)">
              {COLORS.map(c => (
                <HeadIcon key={c} color={c} small={true} />
              ))}
            </div>
          ),
        },
        {
          label: 'Custom icons',
          node: (
            <div className="flex items-center gap-(--gap-L)">
              <HeadIcon color="Brand"   icon="IconBell" />
              <HeadIcon color="Success" icon="IconCircleCheck" />
              <HeadIcon color="Error"   icon="IconAlertTriangle" />
              <HeadIcon color="Warning" icon="IconClock" />
              <HeadIcon color="Neutral" icon="IconInfoCircle" />
            </div>
          ),
        },
        {
          label: 'Regular vs Small side-by-side',
          node: (
            <div className="flex items-center gap-(--gap-XL)">
              {COLORS.map(c => (
                <div key={c} className="flex flex-col items-center gap-(--gap-S)">
                  <HeadIcon color={c} small={false} />
                  <HeadIcon color={c} small={true} />
                  <span style={{ fontFamily: 'var(--font-secondary)', fontSize: 12, color: 'var(--text-tertiary)' }}>{c}</span>
                </div>
              ))}
            </div>
          ),
        },
      ]}
    />
  )
}
