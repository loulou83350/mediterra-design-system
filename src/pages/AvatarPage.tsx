import { useState } from 'react'
import { Avatar, AvatarLabel, AvatarGroup } from '../components/ui/Avatar'
import type { AvatarSize, AvatarType, AvatarColor } from '../components/ui/Avatar'
import { ComponentPage, Control, ControlSelect, ControlToggle } from './ComponentLayout'

const SIZES: AvatarSize[] = ['S', 'M', 'L', 'XL']
const TYPES: AvatarType[] = ['Image', 'Letter', 'Empty']
const COLORS: AvatarColor[] = ['brand', 'success', 'warning', 'error', 'neutral']

const DEMO_AVATARS = [
  { src: 'https://i.pravatar.cc/150?img=1', alt: 'User 1' },
  { src: 'https://i.pravatar.cc/150?img=2', alt: 'User 2' },
  { src: 'https://i.pravatar.cc/150?img=3', alt: 'User 3' },
  { src: 'https://i.pravatar.cc/150?img=4', alt: 'User 4' },
  { src: 'https://i.pravatar.cc/150?img=5', alt: 'User 5' },
  { src: 'https://i.pravatar.cc/150?img=6', alt: 'User 6' },
]

export function AvatarPage() {
  const [size, setSize] = useState<AvatarSize>('M')
  const [type, setType] = useState<AvatarType>('Image')
  const [color, setColor] = useState<AvatarColor>('brand')
  const [initials, setInitials] = useState('JD')
  const [verified, setVerified] = useState(true)
  const [showTitle, setShowTitle] = useState(true)
  const [showCounter, setShowCounter] = useState(true)

  return (
    <ComponentPage
      title="Avatar"
      description="Three avatar components in one page. Avatar Icon: the most basic form — displays a profile picture, initials, or a placeholder icon; used in user lists, headers, and navigation bars. Avatar + Label: combines the avatar with a name and role; useful where both visual identification and name recognition matter. Avatar Group: displays multiple avatars in a stacked arrangement, ideal for representing teams, conversation participants, or event attendees."
      controls={
        <>
          <Control label="Size">
            <ControlSelect value={size} options={SIZES} onChange={v => setSize(v as AvatarSize)} />
          </Control>
          <Control label="Type">
            <ControlSelect value={type} options={TYPES} onChange={v => setType(v as AvatarType)} />
          </Control>
          <Control label="Color">
            <ControlSelect value={color} options={COLORS} onChange={v => setColor(v as AvatarColor)} />
          </Control>
          <Control label="Initials">
            <input
              value={initials}
              maxLength={2}
              onChange={e => setInitials(e.target.value)}
              className="h-8 px-(--padding-M) rounded-(--radius-S) border border-(--border-default) text-sm text-(--fg-primary) bg-(--bg-primary) outline-none focus:border-(--border-brand) w-full"
            />
          </Control>
          <Control label="Verified">
            <ControlToggle value={verified} onChange={setVerified} />
          </Control>
          <Control label="Show Title">
            <ControlToggle value={showTitle} onChange={setShowTitle} />
          </Control>
          <Control label="Counter">
            <ControlToggle value={showCounter} onChange={setShowCounter} />
          </Control>
        </>
      }
      preview={
        <div className="flex flex-col gap-(--gap-XL) items-start">
          <Avatar size={size} type={type} color={color} src={DEMO_AVATARS[0].src} initials={initials} />
          <AvatarLabel
            size={size}
            type={type}
            color={color}
            src={DEMO_AVATARS[0].src}
            initials={initials}
            name="Jeanne Doe"
            title={showTitle ? 'Product Designer' : undefined}
            verified={verified}
          />
          <AvatarGroup
            size={size}
            avatars={DEMO_AVATARS}
            max={4}
            extra={showCounter ? 2 : 0}
          />
        </div>
      }
      states={[
        {
          label: 'Avatar — all types × all sizes',
          node: (
            <div className="flex flex-col gap-(--gap-L) w-full">
              {TYPES.map(t => (
                <div key={t} className="flex items-center gap-(--gap-XL)">
                  <span className="text-xs text-(--fg-tertiary) w-14 shrink-0">{t}</span>
                  {SIZES.map(s => (
                    <Avatar
                      key={s}
                      size={s}
                      type={t}
                      src={DEMO_AVATARS[0].src}
                      initials="JD"
                    />
                  ))}
                </div>
              ))}
            </div>
          ),
        },
        {
          label: 'Avatar — colors (Letter & Empty)',
          node: (
            <div className="flex flex-col gap-(--gap-L) w-full">
              {COLORS.map(c => (
                <div key={c} className="flex items-center gap-(--gap-XL)">
                  <span className="text-xs text-(--fg-tertiary) w-16 shrink-0">{c}</span>
                  <Avatar size="M" type="Letter" color={c} initials="JD" />
                  <Avatar size="M" type="Empty" color={c} />
                </div>
              ))}
            </div>
          ),
        },
        {
          label: 'AvatarLabel — all sizes',
          node: (
            <div className="flex flex-col gap-(--gap-L)">
              {SIZES.map(s => (
                <AvatarLabel
                  key={s}
                  size={s}
                  src={DEMO_AVATARS[0].src}
                  name="Jeanne Doe"
                  title="Product Designer"
                  verified
                />
              ))}
            </div>
          ),
        },
        {
          label: 'AvatarLabel — variants',
          node: (
            <div className="flex flex-wrap gap-(--gap-XL)">
              <AvatarLabel src={DEMO_AVATARS[0].src} name="With title & badge" title="Product Designer" verified />
              <AvatarLabel src={DEMO_AVATARS[1].src} name="No badge" title="Engineer" verified={false} />
              <AvatarLabel src={DEMO_AVATARS[2].src} name="Name only" verified={false} />
              <AvatarLabel initials="AB" type="Letter" color="success" name="Letter — success" title="Designer" verified />
              <AvatarLabel initials="MK" type="Letter" color="error" name="Letter — error" title="Admin" />
              <AvatarLabel type="Empty" color="warning" name="Empty — warning" title="Guest" />
              <AvatarLabel type="Empty" color="neutral" name="Empty — neutral" />
            </div>
          ),
        },
        {
          label: 'AvatarGroup — all sizes',
          node: (
            <div className="flex flex-col gap-(--gap-XL)">
              {SIZES.map(s => (
                <div key={s} className="flex items-center gap-(--gap-XXL)">
                  <span className="text-xs text-(--fg-tertiary) w-6 shrink-0">{s}</span>
                  <AvatarGroup size={s} avatars={DEMO_AVATARS} max={4} />
                  <AvatarGroup size={s} avatars={DEMO_AVATARS} max={4} extra={2} />
                </div>
              ))}
            </div>
          ),
        },
      ]}
    />
  )
}
