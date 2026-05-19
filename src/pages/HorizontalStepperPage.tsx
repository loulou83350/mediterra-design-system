import { useState } from 'react'
import { HorizontalStepper } from '../components/ui/HorizontalStepper'
import type { HorizontalStep, StepState } from '../components/ui/HorizontalStepper'
import { ComponentPage, Control, ControlSelect, ControlToggle } from './ComponentLayout'

function buildSteps(count: number, currentIndex: number, problem: boolean): HorizontalStep[] {
  const labels = ['Account', 'Details', 'Payment', 'Review']
  return Array.from({ length: count }, (_, i) => {
    let state: StepState
    if (i < currentIndex) {
      state = 'done'
    } else if (i === currentIndex) {
      state = problem ? 'problem' : 'current'
    } else {
      state = 'next'
    }
    return { label: labels[i], state }
  })
}

export function HorizontalStepperPage() {
  const [stepCount, setStepCount] = useState(3)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [problem, setProblem] = useState(false)

  const steps = buildSteps(stepCount, currentIndex, problem)

  const stepOptions = Array.from({ length: stepCount }, (_, i) => String(i + 1))

  return (
    <ComponentPage
      title="Horizontal Stepper"
      description="The Horizontal Stepper is a component used to guide users through a process with multiple sequential steps. Each step is represented horizontally, and users can see both the current step and upcoming steps in the process."
      controls={
        <>
          <Control label="Step Count">
            <ControlSelect
              value={String(stepCount)}
              options={['3', '4']}
              onChange={v => {
                const n = Number(v)
                setStepCount(n)
                if (currentIndex >= n) setCurrentIndex(n - 1)
              }}
            />
          </Control>
          <Control label="Current Step">
            <ControlSelect
              value={String(currentIndex + 1)}
              options={stepOptions}
              onChange={v => setCurrentIndex(Number(v) - 1)}
            />
          </Control>
          <Control label="Problem State">
            <ControlToggle value={problem} onChange={setProblem} />
          </Control>
        </>
      }
      preview={
        <div className="w-full max-w-lg">
          <HorizontalStepper steps={steps} />
        </div>
      }
      states={[
        {
          label: 'Step 1 — current',
          node: (
            <HorizontalStepper steps={[
              { label: 'Account', state: 'current' },
              { label: 'Details', state: 'next' },
              { label: 'Payment', state: 'next' },
            ]} />
          ),
        },
        {
          label: 'Step 2 — current',
          node: (
            <HorizontalStepper steps={[
              { label: 'Account', state: 'done' },
              { label: 'Details', state: 'current' },
              { label: 'Payment', state: 'next' },
            ]} />
          ),
        },
        {
          label: 'All done',
          node: (
            <HorizontalStepper steps={[
              { label: 'Account', state: 'done' },
              { label: 'Details', state: 'done' },
              { label: 'Payment', state: 'done' },
            ]} />
          ),
        },
        {
          label: 'Problem state',
          node: (
            <HorizontalStepper steps={[
              { label: 'Account', state: 'done' },
              { label: 'Details', state: 'problem' },
              { label: 'Payment', state: 'next' },
            ]} />
          ),
        },
      ]}
    />
  )
}
