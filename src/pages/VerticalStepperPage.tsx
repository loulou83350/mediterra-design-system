import { useState } from 'react'
import { VerticalStepper } from '../components/ui/VerticalStepper'
import type { VerticalStep, VerticalStepState } from '../components/ui/VerticalStepper'
import { ComponentPage, Control, ControlSelect, ControlToggle } from './ComponentLayout'

function buildSteps(currentIndex: number, showContent: boolean): VerticalStep[] {
  const items: { title: string; content: string }[] = [
    { title: 'Account created', content: 'Your account has been successfully set up.' },
    { title: 'Identity verified', content: 'Fill in your personal details to verify your identity.' },
    { title: 'Add payment method', content: 'Add a credit card or bank account to continue.' },
    { title: 'Confirm & submit', content: 'Review your information and submit your application.' },
  ]

  return items.map((item, i) => {
    let state: VerticalStepState
    if (i < currentIndex) {
      state = 'done'
    } else if (i === currentIndex) {
      state = 'current'
    } else {
      state = 'default'
    }

    const children =
      showContent && state === 'current' ? (
        <p style={{ fontFamily: 'var(--font-secondary)', fontSize: 14, color: 'var(--text-secondary)' }}>
          {item.content}
        </p>
      ) : undefined

    return { step: i + 1, title: item.title, state, children }
  })
}

export function VerticalStepperPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [showContent, setShowContent] = useState(true)

  const steps = buildSteps(currentStep, showContent)

  return (
    <ComponentPage
      title="Vertical Stepper"
      description="The Vertical Stepper is similar to the horizontal stepper but is arranged vertically, making it particularly useful for processes where more detailed or contextual content is displayed alongside each step. This layout is often preferred when space is constrained or when more descriptive information is required for each step."
      controls={
        <>
          <Control label="Current Step">
            <ControlSelect
              value={String(currentStep + 1)}
              options={['1', '2', '3', '4']}
              onChange={v => setCurrentStep(Number(v) - 1)}
            />
          </Control>
          <Control label="Show Content">
            <ControlToggle value={showContent} onChange={setShowContent} />
          </Control>
        </>
      }
      preview={
        <div className="w-72">
          <VerticalStepper steps={steps} />
        </div>
      }
      states={[
        {
          label: '4 steps — step 2 current',
          node: (
            <div className="w-72">
              <VerticalStepper steps={[
                { step: 1, title: 'Account created', state: 'done' },
                {
                  step: 2,
                  title: 'Identity verified',
                  state: 'current',
                  children: (
                    <p style={{ fontFamily: 'var(--font-secondary)', fontSize: 14, color: 'var(--text-secondary)' }}>
                      Fill in your personal details to verify your identity.
                    </p>
                  ),
                },
                { step: 3, title: 'Add payment method', state: 'default' },
                { step: 4, title: 'Confirm & submit', state: 'default' },
              ]} />
            </div>
          ),
        },
        {
          label: 'Problem state',
          node: (
            <div className="w-72">
              <VerticalStepper steps={[
                { step: 1, title: 'Account created', state: 'done' },
                { step: 2, title: 'Identity rejected', state: 'wrong' },
                { step: 3, title: 'Add payment method', state: 'default' },
              ]} />
            </div>
          ),
        },
      ]}
    />
  )
}
