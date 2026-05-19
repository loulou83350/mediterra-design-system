import { useState } from 'react'
import { Switch } from '../components/ui/Switch'
import { ComponentPage, Control, ControlToggle } from './ComponentLayout'

export function SwitchPage() {
  const [checked, setChecked]         = useState(false)
  const [twoChoice, setTwoChoice]     = useState(false)
  const [showInfoIcon, setShowInfoIcon] = useState(false)
  const [disabled, setDisabled]       = useState(false)
  const [label, setLabel]             = useState('Choice 1')
  const [choice1, setChoice1]         = useState('Choice 1')
  const [choice2, setChoice2]         = useState('Choice 2')

  const inputCls = 'h-8 px-(--padding-M) rounded-(--radius-S) border border-(--border-default) text-sm text-(--fg-primary) bg-(--bg-primary) outline-none focus:border-(--border-brand) w-full'

  return (
    <ComponentPage
      title="Switch"
      description="A Switch is a user interface component that allows users to toggle between two states, typically on or off. It is commonly used for enabling or disabling a specific feature or setting. The switch visually resembles a physical switch that users can slide to change the state, providing immediate visual feedback based on its position."
      controls={
        <>
          <Control label="Two choice">
            <ControlToggle value={twoChoice} onChange={setTwoChoice} />
          </Control>
          <Control label="Checked">
            <ControlToggle value={checked} onChange={setChecked} />
          </Control>
          <Control label="Info icon">
            <ControlToggle value={showInfoIcon} onChange={setShowInfoIcon} />
          </Control>
          <Control label="Disabled">
            <ControlToggle value={disabled} onChange={setDisabled} />
          </Control>
          {!twoChoice && (
            <Control label="Label">
              <input value={label} onChange={e => setLabel(e.target.value)} className={inputCls} />
            </Control>
          )}
          {twoChoice && (
            <>
              <Control label="Choice 1">
                <input value={choice1} onChange={e => setChoice1(e.target.value)} className={inputCls} />
              </Control>
              <Control label="Choice 2">
                <input value={choice2} onChange={e => setChoice2(e.target.value)} className={inputCls} />
              </Control>
            </>
          )}
        </>
      }
      preview={
        <Switch
          checked={checked}
          onChange={setChecked}
          label={!twoChoice ? label : undefined}
          showInfoIcon={showInfoIcon}
          twoChoice={twoChoice}
          choice1={choice1}
          choice2={choice2}
          disabled={disabled}
        />
      }
      states={[
        {
          label: '1-choice — off / on / disabled',
          node: (
            <div className="flex items-center gap-(--gap-XXL)">
              <Switch label="Choice 1" checked={false} />
              <Switch label="Choice 1" checked />
              <Switch label="Choice 1" checked={false} disabled />
              <Switch label="Choice 1" checked disabled />
            </div>
          ),
        },
        {
          label: '1-choice — with info icon',
          node: (
            <div className="flex items-center gap-(--gap-XXL)">
              <Switch label="Choice 1" checked={false} showInfoIcon />
              <Switch label="Choice 1" checked showInfoIcon />
            </div>
          ),
        },
        {
          label: '2-choice — off / on',
          node: (
            <div className="flex items-center gap-(--gap-XXL)">
              <Switch twoChoice choice1="Choice 1" choice2="Choice 2" checked={false} />
              <Switch twoChoice choice1="Choice 1" choice2="Choice 2" checked />
            </div>
          ),
        },
        {
          label: '2-choice — with info icons',
          node: (
            <div className="flex items-center gap-(--gap-XXL)">
              <Switch twoChoice choice1="Monthly" choice2="Yearly" checked={false} showInfoIcon />
              <Switch twoChoice choice1="Monthly" choice2="Yearly" checked showInfoIcon />
            </div>
          ),
        },
        {
          label: 'Without label (pill only)',
          node: (
            <div className="flex items-center gap-(--gap-XXL)">
              <Switch checked={false} />
              <Switch checked />
            </div>
          ),
        },
      ]}
    />
  )
}
