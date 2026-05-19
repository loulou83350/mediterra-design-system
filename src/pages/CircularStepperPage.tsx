import { useState } from 'react'
import { CircularStepper } from '../components/ui/CircularStepper'
import type { CircularStepperState } from '../components/ui/CircularStepper'
import { ComponentPage, Control, ControlSelect, ControlToggle } from './ComponentLayout'

const inputCls = 'h-8 px-(--padding-M) rounded-(--radius-S) border border-(--border-default) text-sm text-(--fg-primary) bg-(--bg-primary) outline-none focus:border-(--border-brand) w-full'

export function CircularStepperPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [totalSteps, setTotalSteps] = useState(3)
  const [state, setState] = useState<CircularStepperState>('progress')
  const [stepName, setStepName] = useState('Account setup')
  const [showDetails, setShowDetails] = useState(true)

  return (
    <ComponentPage
      title="Circular Stepper"
      description="The Circular Stepper is a progression component used to represent multi-step processes in a circular format. Each step is represented by a circle, which is filled or highlighted to indicate the current step and the user's progress. It's an intuitive way to guide users through a linear process while visually emphasizing their current position and overall progress."
      controls={
        <>
          <Control label="Current Step">
            <input
              type="text"
              value={currentStep}
              onChange={e => {
                const n = parseInt(e.target.value, 10)
                if (!isNaN(n)) setCurrentStep(n)
              }}
              className={inputCls}
            />
          </Control>
          <Control label="Total Steps">
            <input
              type="text"
              value={totalSteps}
              onChange={e => {
                const n = parseInt(e.target.value, 10)
                if (!isNaN(n) && n > 0) setTotalSteps(n)
              }}
              className={inputCls}
            />
          </Control>
          <Control label="State">
            <ControlSelect
              value={state}
              options={['progress', 'success', 'error']}
              onChange={v => setState(v as CircularStepperState)}
            />
          </Control>
          <Control label="Step Name">
            <input
              type="text"
              value={stepName}
              onChange={e => setStepName(e.target.value)}
              className={inputCls}
            />
          </Control>
          <Control label="Show Details Button">
            <ControlToggle value={showDetails} onChange={setShowDetails} />
          </Control>
        </>
      }
      preview={
        <CircularStepper
          currentStep={currentStep}
          totalSteps={totalSteps}
          stepName={stepName || undefined}
          state={state}
          onDetailsClick={showDetails ? () => {} : undefined}
        />
      }
      states={[
        {
          label: 'Progress states',
          node: (
            <div className="flex flex-col gap-(--gap-L)">
              <CircularStepper currentStep={1} totalSteps={3} stepName="Account setup" state="progress" onDetailsClick={() => {}} />
              <CircularStepper currentStep={2} totalSteps={3} stepName="Identity check" state="progress" onDetailsClick={() => {}} />
              <CircularStepper currentStep={3} totalSteps={3} stepName="All done" state="success" onDetailsClick={() => {}} />
              <CircularStepper currentStep={1} totalSteps={3} stepName="Verification failed" state="error" onDetailsClick={() => {}} />
            </div>
          ),
        },
      ]}
    />
  )
}
