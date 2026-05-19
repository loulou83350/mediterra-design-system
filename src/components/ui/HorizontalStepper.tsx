import React from 'react'
import { Icon } from './Icon'

export type StepState = 'current' | 'next' | 'done' | 'problem'

export interface HorizontalStep {
  label: string
  state: StepState
}

export interface HorizontalStepperProps {
  steps: HorizontalStep[]
}

function StepBadge({ state, index }: { state: StepState; index: number }) {
  const number = index + 1

  if (state === 'done') {
    return (
      <div className="w-7 h-7 rounded-full flex items-center justify-center bg-(--bg-succes_primary)">
        <Icon name="IconCheck" size={16} stroke={2.5} color="white" />
      </div>
    )
  }

  if (state === 'problem') {
    return (
      <div className="w-7 h-7 rounded-full flex items-center justify-center bg-(--bg-error_primary)">
        <Icon name="IconX" size={16} stroke={2.5} color="white" />
      </div>
    )
  }

  if (state === 'current') {
    return (
      <div className="w-7 h-7 rounded-full border-2 flex items-center justify-center" style={{ borderColor: 'var(--fg-brand_primary)' }}>
        <span style={{ fontFamily: 'var(--font-secondary)', fontWeight: 700, fontSize: 14, color: 'var(--text-brand)' }}>
          {number}
        </span>
      </div>
    )
  }

  // next
  return (
    <div className="w-7 h-7 rounded-full border-2 flex items-center justify-center" style={{ borderColor: 'var(--fg-quaterny)' }}>
      <span style={{ fontFamily: 'var(--font-secondary)', fontWeight: 700, fontSize: 14, color: 'var(--text-tertiary)' }}>
        {number}
      </span>
    </div>
  )
}

function StepLabel({ state, label, faded }: { state: StepState; label: string; faded: boolean }) {
  const baseStyle: React.CSSProperties = {
    fontFamily: 'var(--font-secondary)',
    fontSize: 14,
    lineHeight: '20px',
  }

  const stateStyle: React.CSSProperties =
    state === 'current'
      ? { fontWeight: 700, color: 'var(--text-primary)' }
      : state === 'next'
        ? { fontWeight: 400, color: 'var(--text-tertiary)' }
        : state === 'done'
          ? { fontWeight: 400, color: 'var(--text-success)' }
          : { fontWeight: 400, color: 'var(--text-error)' }

  return (
    <span style={{ ...baseStyle, ...stateStyle, opacity: faded ? 0.5 : 1 }}>
      {label}
    </span>
  )
}

function Connector({ state }: { state: StepState }) {
  if (state === 'next') {
    return <div className="flex-1 self-center mx-(--gap-S) border-t-2 border-dashed border-(--border-default)" />
  }

  const color =
    state === 'current'
      ? 'var(--fg-brand_primary)'
      : state === 'done'
        ? 'var(--fg-succes_primary)'
        : 'var(--fg-error_primary)'

  return (
    <div className="flex-1 self-center mx-(--gap-S) h-[2px]" style={{ background: color }} />
  )
}

export function HorizontalStepper({ steps }: HorizontalStepperProps) {
  return (
    <div className="flex items-center w-full">
      {steps.map((step, index) => {
        const isLast = index === steps.length - 1
        const faded = (step.state === 'done' || step.state === 'problem') && !isLast

        return (
          <React.Fragment key={index}>
            <div className="flex items-center gap-(--gap-S) shrink-0">
              <StepBadge state={step.state} index={index} />
              <StepLabel state={step.state} label={step.label} faded={faded} />
            </div>
            {!isLast && <Connector state={step.state} />}
          </React.Fragment>
        )
      })}
    </div>
  )
}
