import React from 'react'
import type { ReactNode } from 'react'
import { Icon } from './Icon'

export type VerticalStepState = 'current' | 'default' | 'done' | 'wrong'

export interface VerticalStep {
  step: string | number
  title: string
  state: VerticalStepState
  children?: ReactNode
}

export interface VerticalStepperProps {
  steps: VerticalStep[]
}

function VerticalBadge({ state, step }: { state: VerticalStepState; step: string | number }) {
  if (state === 'done') {
    return (
      <div className="w-6 h-6 rounded-full flex items-center justify-center bg-(--bg-succes_primary) shrink-0">
        <Icon name="IconCheck" size={14} stroke={2.5} color="white" />
      </div>
    )
  }

  if (state === 'wrong') {
    return (
      <div className="w-6 h-6 rounded-full flex items-center justify-center bg-(--bg-error_primary) shrink-0">
        <Icon name="IconX" size={14} stroke={2.5} color="white" />
      </div>
    )
  }

  if (state === 'current') {
    return (
      <div className="w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0" style={{ borderColor: 'var(--fg-brand_primary)' }}>
        <span style={{ fontFamily: 'var(--font-secondary)', fontWeight: 700, fontSize: 12, color: 'var(--text-brand)' }}>
          {step}
        </span>
      </div>
    )
  }

  // default
  return (
    <div className="w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0" style={{ borderColor: 'var(--fg-quaterny)' }}>
      <span style={{ fontFamily: 'var(--font-secondary)', fontWeight: 700, fontSize: 12, color: 'var(--text-tertiary)' }}>
        {step}
      </span>
    </div>
  )
}

function VerticalConnector({ state }: { state: VerticalStepState }) {
  if (state === 'default') {
    return <div className="h-6 ml-[12px] border-l-2 border-dashed border-(--border-default)" />
  }

  if (state === 'current') {
    return <div className="w-[2px] h-6 ml-[11px] rounded-full bg-(--fg-brand_primary)" />
  }

  if (state === 'done') {
    return <div className="w-[2px] h-6 ml-[11px] rounded-full" style={{ background: 'var(--fg-succes_primary)' }} />
  }

  // wrong
  return <div className="w-[2px] h-6 ml-[11px] rounded-full" style={{ background: 'var(--fg-error_primary)' }} />
}

function TitleStyle({ state }: { state: VerticalStepState }): React.CSSProperties {
  const base: React.CSSProperties = {
    fontFamily: 'var(--font-secondary)',
    fontSize: 14,
    lineHeight: '20px',
  }
  if (state === 'current') return { ...base, fontWeight: 700, color: 'var(--text-primary)' }
  if (state === 'default') return { ...base, fontWeight: 400, color: 'var(--text-tertiary)' }
  if (state === 'done') return { ...base, fontWeight: 400, color: 'var(--text-success)' }
  return { ...base, fontWeight: 400, color: 'var(--text-error)' }
}

export function VerticalStepper({ steps }: VerticalStepperProps) {
  return (
    <div className="flex flex-col">
      {steps.map((item, index) => {
        const isLast = index === steps.length - 1
        const shouldFade = (item.state === 'done' || item.state === 'wrong') && !isLast

        return (
          <div key={index} className="flex flex-col" style={{ opacity: shouldFade ? 0.5 : 1 }}>
            {/* Header row */}
            <div className="flex items-center gap-(--gap-S)">
              <VerticalBadge state={item.state} step={item.step} />
              <span className="flex-1 text-[14px] leading-[20px]" style={TitleStyle({ state: item.state })}>
                {item.title}
              </span>
            </div>

            {/* Content slot */}
            {item.state === 'current' && item.children && (
              <div style={{ marginLeft: 32 }} className="py-(--padding-S)">
                {item.children}
              </div>
            )}

            {/* Vertical connector */}
            {!isLast && <VerticalConnector state={item.state} />}
          </div>
        )
      })}
    </div>
  )
}
