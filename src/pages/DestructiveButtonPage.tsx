import { useState } from 'react'
import { DestructiveButton } from '../components/ui/DestructiveButton'
import type { DestructiveButtonVariant } from '../components/ui/DestructiveButton'
import { ComponentPage, Control, ControlSelect, ControlToggle, IconPicker } from './ComponentLayout'

const VARIANTS: DestructiveButtonVariant[] = ['Primary', 'Secondary', 'Tertiary', 'Quaterny']

export function DestructiveButtonPage() {
  const [variant, setVariant] = useState<DestructiveButtonVariant>('Primary')
  const [small, setSmall] = useState(false)
  const [iconButton, setIconButton] = useState(false)
  const [showIcon, setShowIcon] = useState(false)
  const [iconName, setIconName] = useState('IconTrashX')
  const [disabled, setDisabled] = useState(false)
  const [label, setLabel] = useState('Delete')

  const hasIcon = showIcon || iconButton

  return (
    <ComponentPage
      title="Destructive Button"
      description="The Destructive Button is used for actions that are irreversible or potentially harmful, such as deleting an item, cancelling an account, or resetting data. It signals to the user that the action should be taken with caution."
      controls={
        <>
          <Control label="Type">
            <ControlSelect value={variant} options={VARIANTS} onChange={v => setVariant(v as DestructiveButtonVariant)} />
          </Control>
          <Control label="Small">
            <ControlToggle value={small} onChange={setSmall} />
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
        <DestructiveButton
          variant={variant}
          small={small}
          iconButton={iconButton}
          showIcon={showIcon}
          icon={iconName as any}
          disabled={disabled}
        >
          {label}
        </DestructiveButton>
      }
      states={[
        {
          label: 'Types — Large',
          node: (
            <>
              {VARIANTS.map(v => (
                <DestructiveButton key={v} variant={v} showIcon={false}>{v}</DestructiveButton>
              ))}
            </>
          ),
        },
        {
          label: 'Types — Small',
          node: (
            <>
              {VARIANTS.map(v => (
                <DestructiveButton key={v} variant={v} small showIcon={false}>{v}</DestructiveButton>
              ))}
            </>
          ),
        },
        {
          label: 'With Icon',
          node: (
            <>
              {VARIANTS.map(v => (
                <DestructiveButton key={v} variant={v} showIcon>Delete</DestructiveButton>
              ))}
            </>
          ),
        },
        {
          label: 'Icon Button',
          node: (
            <>
              {VARIANTS.map(v => (
                <DestructiveButton key={v} variant={v} iconButton />
              ))}
              {VARIANTS.map(v => (
                <DestructiveButton key={`${v}-sm`} variant={v} iconButton small />
              ))}
            </>
          ),
        },
        {
          label: 'Disabled',
          node: (
            <>
              {VARIANTS.map(v => (
                <DestructiveButton key={v} variant={v} showIcon={false} disabled>Delete</DestructiveButton>
              ))}
            </>
          ),
        },
      ]}
    />
  )
}
