import { useState } from 'react'
import { Button } from '../components/ui/Button'
import type { ButtonVariant } from '../components/ui/Button'
import { ComponentPage, Control, ControlSelect, ControlToggle, IconPicker } from './ComponentLayout'

export function ButtonPage() {
  const [variant, setVariant]       = useState<ButtonVariant>('Primary')
  const [small, setSmall]           = useState(false)
  const [invert, setInvert]         = useState(false)
  const [iconButton, setIconButton] = useState(false)
  const [showIcon, setShowIcon]     = useState(true)
  const [iconName, setIconName]     = useState('IconPlus')
  const [disabled, setDisabled]     = useState(false)
  const [label, setLabel]           = useState('Get started')

  const hasIcon = showIcon || iconButton

  return (
    <ComponentPage
      title="Button"
      description="The Action Button is a primary interactive component used to trigger positive or neutral actions, such as submitting a form, saving changes, or navigating to another page. It is typically styled to stand out and attract user attention."
      controls={
        <>
          <Control label="Type">
            <ControlSelect
              value={variant}
              options={['Primary', 'Secondary', 'Tertiary', 'Quaterny']}
              onChange={v => setVariant(v as ButtonVariant)}
            />
          </Control>
          <Control label="Small">
            <ControlToggle value={small} onChange={setSmall} />
          </Control>
          <Control label="Invert">
            <ControlToggle value={invert} onChange={setInvert} />
          </Control>
          <Control label="Icon Button">
            <ControlToggle value={iconButton} onChange={setIconButton} />
          </Control>
          <Control label="Show Icon">
            <ControlToggle value={showIcon} onChange={setShowIcon} />
          </Control>
          {hasIcon && (
            <Control label="Icon">
              <IconPicker value={iconName} onChange={setIconName} />
            </Control>
          )}
          <Control label="Disabled">
            <ControlToggle value={disabled} onChange={setDisabled} />
          </Control>
          {!iconButton && (
            <Control label="Label">
              <input
                value={label}
                onChange={e => setLabel(e.target.value)}
                className="h-8 px-(--padding-M) rounded-(--radius-S) border border-(--border-default) text-sm text-(--fg-primary) bg-(--bg-primary) outline-none focus:border-(--border-brand) w-full"
              />
            </Control>
          )}
        </>
      }
      preview={
        <div className={invert ? 'bg-(--bg-neutral_primary) p-(--padding-XXL) rounded-(--radius-M)' : ''}>
          <Button
            variant={variant}
            small={small}
            invert={invert}
            iconButton={iconButton}
            icon={iconName as any}
            showIcon={showIcon}
            disabled={disabled}
          >
            {label}
          </Button>
        </div>
      }
      states={[
        {
          label: 'Types — Large',
          node: (
            <>
              <Button variant="Primary"   showIcon={false}>Primary</Button>
              <Button variant="Secondary" showIcon={false}>Secondary</Button>
              <Button variant="Tertiary"  showIcon={false}>Tertiary</Button>
              <Button variant="Quaterny"  showIcon={false}>Quaterny</Button>
            </>
          ),
        },
        {
          label: 'Types — Small',
          node: (
            <>
              <Button variant="Primary"   small showIcon={false}>Primary</Button>
              <Button variant="Secondary" small showIcon={false}>Secondary</Button>
              <Button variant="Tertiary"  small showIcon={false}>Tertiary</Button>
              <Button variant="Quaterny"  small showIcon={false}>Quaterny</Button>
            </>
          ),
        },
        {
          label: 'With Icon',
          node: (
            <>
              <Button variant="Primary">Get started</Button>
              <Button variant="Secondary">Get started</Button>
              <Button variant="Tertiary">Get started</Button>
              <Button variant="Quaterny">Get started</Button>
            </>
          ),
        },
        {
          label: 'Icon Button',
          node: (
            <>
              <Button variant="Primary"   iconButton />
              <Button variant="Secondary" iconButton />
              <Button variant="Tertiary"  iconButton />
              <Button variant="Quaterny"  iconButton />
              <Button variant="Primary"   iconButton small />
              <Button variant="Secondary" iconButton small />
              <Button variant="Tertiary"  iconButton small />
            </>
          ),
        },
        {
          label: 'Invert',
          node: (
            <div className="bg-(--bg-neutral_primary) p-(--padding-L) rounded-(--radius-M) flex flex-wrap gap-(--gap-M)">
              <Button variant="Primary"   invert>Get started</Button>
              <Button variant="Secondary" invert>Get started</Button>
              <Button variant="Tertiary"  invert>Get started</Button>
              <Button variant="Quaterny"  invert>Get started</Button>
              <Button variant="Primary"   invert iconButton />
              <Button variant="Secondary" invert iconButton />
            </div>
          ),
        },
        {
          label: 'Disabled',
          node: (
            <>
              <Button variant="Primary"   disabled>Primary</Button>
              <Button variant="Secondary" disabled>Secondary</Button>
              <Button variant="Tertiary"  disabled>Tertiary</Button>
              <Button variant="Quaterny"  disabled>Quaterny</Button>
            </>
          ),
        },
      ]}
    />
  )
}
