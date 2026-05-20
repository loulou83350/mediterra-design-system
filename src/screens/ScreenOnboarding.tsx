import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TextField } from '../components/ui/TextField'
import { Select } from '../components/ui/Select'
import { Button } from '../components/ui/Button'
import { Icon } from '../components/ui/Icon'

const JOB_ROLES = [
  { value: 'designer',   label: 'Designer' },
  { value: 'developer',  label: 'Developer' },
  { value: 'pm',         label: 'Product Manager' },
  { value: 'founder',    label: 'Founder' },
  { value: 'marketing',  label: 'Marketing' },
  { value: 'other',      label: 'Other' },
]

const COMPANY_SIZES = [
  { value: '0-10',     label: '0 – 10' },
  { value: '11-50',    label: '11 – 50' },
  { value: '51-200',   label: '51 – 200' },
  { value: '201-500',  label: '201 – 500' },
  { value: '500+',     label: '500+' },
]

export function ScreenOnboarding() {
  const navigate = useNavigate()
  const [firstName,   setFirstName]   = useState('')
  const [companyName, setCompanyName] = useState('')
  const [jobRole,     setJobRole]     = useState('')
  const [companySize, setCompanySize] = useState('')

  return (
    <div className="min-h-screen bg-(--bg-page) flex items-center justify-center p-(--padding-XL) relative">
      {/* Back to DS */}
      <div style={{ position: 'fixed', top: 16, left: 16, zIndex: 50 }}>
        <button
          type="button"
          onClick={() => navigate('/design')}
          className="flex items-center gap-(--gap-XS) px-(--padding-M) py-(--padding-S) rounded-(--radius-S) bg-(--bg-primary) border border-(--border-default) hover:bg-(--bg-secondary) transition-colors cursor-pointer"
          style={{ fontFamily: 'var(--font-secondary)', fontSize: 13, lineHeight: '20px', color: 'var(--fg-tertiary)' }}
        >
          <Icon name="IconChevronLeft" size={14} stroke={2} color="var(--fg-tertiary)" />
          <span>Design System</span>
        </button>
      </div>
      <div
        className="w-full overflow-hidden flex flex-col md:flex-row"
        style={{
          maxWidth: 900,
          borderRadius: 'var(--radius-L)',
          background: 'var(--bg-primary)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
          border: '1px solid var(--border-default)',
        }}
      >
        {/* ── Left panel ───────────────────────────────────── */}
        <div
          className="flex flex-col gap-(--gap-XL)"
          style={{ width: '100%', maxWidth: 400, flexShrink: 0, padding: 'var(--padding-XXXL)' }}
        >
          {/* Logo */}
          <div className="flex items-center gap-(--gap-M)">
            <div
              className="w-9 h-9 rounded-(--radius-S) flex items-center justify-center"
              style={{ background: 'var(--fg-primary)', color: 'white', fontFamily: 'var(--font-primary)', fontWeight: 800, fontSize: 18 }}
            >
              B
            </div>
            <span style={{ fontFamily: 'var(--font-primary)', fontWeight: 800, fontSize: 16, color: 'var(--fg-primary)' }}>
              Mediterra
            </span>
          </div>

          {/* Tagline */}
          <div>
            <h3 style={{ fontFamily: 'var(--font-primary)', fontWeight: 800, fontSize: 20, lineHeight: '28px', color: 'var(--fg-primary)', marginBottom: 'var(--gap-XS)' }}>
              Don't hesitate to reach out
            </h3>
            <p style={{ fontFamily: 'var(--font-secondary)', fontWeight: 400, fontSize: 16, lineHeight: '24px', color: 'var(--fg-secondary)' }}>
              Tell us a bit about yourself so we can tailor your experience.
            </p>
          </div>

          {/* Form */}
          <div className="flex flex-col gap-(--gap-L)">
            <TextField
              label="First name"
              placeholder="Louis"
              value={firstName}
              onChange={setFirstName}
            />
            <TextField
              label="Company name"
              placeholder="Mediterra"
              value={companyName}
              onChange={setCompanyName}
            />
            <Select
              label="Job role"
              options={JOB_ROLES}
              placeholder="Select a role"
              value={jobRole}
              onChange={setJobRole}
            />
            <Select
              label="Company size"
              options={COMPANY_SIZES}
              placeholder="0 – 10"
              value={companySize}
              onChange={setCompanySize}
            />
          </div>

          {/* CTA */}
          <Button variant="Primary" showIcon={false} className="w-full justify-center">
            Continue
          </Button>
        </div>

        {/* ── Right panel ──────────────────────────────────── */}
        <div
          className="hidden md:flex flex-1 items-center justify-center"
          style={{ background: 'var(--bg-brand_tertiary)', minHeight: 520 }}
        >
          <div className="flex flex-col items-center gap-(--gap-M)">
            <Icon name="IconPhoto" size={48} stroke={1.5} color="var(--fg-brand_primary)" />
            <span style={{ fontFamily: 'var(--font-secondary)', fontSize: 14, color: 'var(--fg-tertiary)' }}>
              Image placeholder
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
