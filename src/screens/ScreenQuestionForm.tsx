import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SidebarNavigation } from '../components/ui/SidebarNavigation'
import { Button } from '../components/ui/Button'
import { HeadIcon } from '../components/ui/HeadIcon'
import { Icon } from '../components/ui/Icon'
import { TextField } from '../components/ui/TextField'
import { TextArea } from '../components/ui/TextArea'
import { ProgressBar } from '../components/ui/ProgressBar'
import { Modal } from '../components/ui/Modal'
import { AvatarLabel } from '../components/ui/Avatar'

// ─── Questions list data ──────────────────────────────────────────────────────

const QUESTIONS = [
  { id: 1, label: 'Introduction',     selected: false },
  { id: 2, label: '5 Second Test',    selected: true  },
  { id: 3, label: 'Can you tell us more about your experience?', selected: false },
]

// ─── Editor list item ─────────────────────────────────────────────────────────

interface EditorRowProps {
  name: string
  role: string
  verified?: boolean
}

function EditorRow({ name, role, verified = false }: EditorRowProps) {
  return (
    <div className="flex items-center gap-(--gap-M) py-(--padding-S)">
      <AvatarLabel
        type="Letter"
        initials={name[0]}
        name={name}
        title={role}
        size="S"
        verified={verified}
      />
      <div className="flex-1" />
      <button
        type="button"
        className="p-(--padding-XS) rounded-(--radius-S) hover:bg-(--bg-secondary) transition-colors cursor-pointer shrink-0"
      >
        <Icon name="IconDotsVertical" size={20} stroke={2} color="var(--fg-tertiary)" />
      </button>
    </div>
  )
}

// ─── Screen ───────────────────────────────────────────────────────────────────

export function ScreenQuestionForm() {
  const navigate = useNavigate()
  const [showShareModal, setShowShareModal] = useState(false)
  const [shareEmail, setShareEmail] = useState('')
  const [title, setTitle] = useState('5-Second test – Homepage')
  const [body, setBody] = useState('')

  const navItems = [
    { icon: 'IconHome',     label: 'Home',      selected: false,  onClick: () => navigate('/app') },
    { icon: 'IconChartBar', label: 'Dashboard', selected: true },
    { icon: 'IconTarget',   label: 'Goals',     selected: false, disabled: true },
    { icon: 'IconHelp',     label: 'Support',   selected: false,  onClick: () => navigate('/app/support') },
  ]

  const bottomItems = [
    { icon: 'IconHelpCircle', label: 'Help', disabled: true },
  ]

  // Custom logo slot with Back to DS
  const logoSlot = (
    <div className="flex flex-col gap-(--gap-XS) w-full">
      <button
        type="button"
        onClick={() => navigate('/design')}
        className="flex items-center gap-(--gap-XS) px-(--padding-M) py-(--padding-XS) rounded-(--radius-S) hover:bg-(--bg-secondary) transition-colors cursor-pointer w-full"
        style={{ fontFamily: 'var(--font-secondary)', fontSize: 12, lineHeight: '16px', color: 'var(--fg-tertiary)' }}
      >
        <Icon name="IconChevronLeft" size={14} stroke={2} color="var(--fg-tertiary)" />
        <span>Design System</span>
      </button>
    </div>
  )

  return (
    <div className="flex min-h-screen bg-(--bg-page)">
      {/* Sidebar */}
      <div className="sticky top-0 h-screen flex-shrink-0 hidden lg:block">
        <SidebarNavigation
          expand={true}
          logo={logoSlot}
          navItems={navItems}
          bottomItems={bottomItems}
          notificationCount={3}
          userName="Jeanne Doe"
          userRole="Product Designer"
        />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        {/* Header */}
        <div
          className="flex items-center justify-between shrink-0 flex-wrap gap-(--gap-M)"
          style={{
            padding: 'var(--padding-L) var(--padding-XXXL)',
            borderBottom: '1px solid var(--border-default)',
            background: 'var(--bg-primary)',
          }}
        >
          <h1 style={{ fontFamily: 'var(--font-primary)', fontWeight: 800, fontSize: 32, lineHeight: '40px', color: 'var(--fg-primary)' }}>
            Question form
          </h1>
          <div className="flex items-center gap-(--gap-M)">
            <div className="flex items-center gap-(--gap-S)">
              <Button variant="Secondary" showIcon={false} small disabled>Preview</Button>
              <Button variant="Primary" showIcon={false} small disabled>Start form</Button>
            </div>
            <div className="flex items-center gap-(--gap-S)">
              <button type="button" className="p-(--padding-S) rounded-(--radius-S) hover:bg-(--bg-secondary) transition-colors cursor-pointer">
                <Icon name="IconUserPlus" size={20} stroke={2} color="var(--fg-secondary)" />
              </button>
              <button type="button" className="p-(--padding-S) rounded-(--radius-S) hover:bg-(--bg-secondary) transition-colors cursor-pointer">
                <Icon name="IconSettings" size={20} stroke={2} color="var(--fg-secondary)" />
              </button>
              <Button variant="Secondary" showIcon={false} small onClick={() => setShowShareModal(true)}>Share</Button>
            </div>
          </div>
        </div>

        {/* 3-column body */}
        <div className="flex flex-1 overflow-hidden">
          {/* Col 1 — Question List */}
          <div
            className="flex flex-col shrink-0 overflow-y-auto"
            style={{ width: 280, borderRight: '1px solid var(--border-default)', background: 'var(--bg-primary)' }}
          >
            <div className="flex flex-col flex-1">
              {QUESTIONS.map((q) => (
                <div
                  key={q.id}
                  className={`flex items-center gap-(--gap-M) px-(--padding-L) py-(--padding-M) cursor-pointer transition-colors ${q.selected ? '' : 'hover:bg-(--bg-secondary)'}`}
                  style={q.selected ? {
                    background: 'var(--bg-brand_tertiary)',
                    borderLeft: '2px solid var(--border-action)',
                  } : {}}
                >
                  <span style={{
                    fontFamily: 'var(--font-secondary)',
                    fontWeight: q.selected ? 700 : 400,
                    fontSize: 14,
                    lineHeight: '20px',
                    color: q.selected ? 'var(--text-primary)' : 'var(--text-secondary)',
                    flex: 1,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}>
                    {q.label}
                  </span>
                </div>
              ))}
            </div>
            {/* Add question */}
            <div style={{ padding: 'var(--padding-M)', borderTop: '1px solid var(--border-default)' }}>
              <Button variant="Secondary" showIcon icon="IconPlus" small disabled className="w-full justify-center">
                Add a question
              </Button>
            </div>
            {/* Thank you pinned */}
            <div
              className="flex items-center gap-(--gap-M) px-(--padding-L) py-(--padding-M)"
              style={{ borderTop: '1px solid var(--border-default)' }}
            >
              <span style={{ fontFamily: 'var(--font-secondary)', fontWeight: 400, fontSize: 14, lineHeight: '20px', color: 'var(--text-tertiary)' }}>
                Thank you
              </span>
            </div>
          </div>

          {/* Col 2 — Question Editor */}
          <div
            className="flex flex-col flex-1 overflow-y-auto min-w-0"
            style={{ padding: 'var(--padding-XXXL)', borderRight: '1px solid var(--border-default)' }}
          >
            {/* Editor header */}
            <div className="flex items-center gap-(--gap-M)" style={{ marginBottom: 'var(--gap-L)' }}>
              <HeadIcon color="Success" icon="IconClockPlay" small />
              <h3 className="flex-1" style={{ fontFamily: 'var(--font-primary)', fontWeight: 800, fontSize: 20, lineHeight: '28px', color: 'var(--fg-primary)' }}>
                5-Second test
              </h3>
              <button type="button" className="p-(--padding-XS) rounded-(--radius-S) hover:bg-(--bg-secondary) cursor-pointer">
                <Icon name="IconInfoCircle" size={20} stroke={2} color="var(--fg-tertiary)" />
              </button>
              <button type="button" className="p-(--padding-XS) rounded-(--radius-S) hover:bg-(--bg-secondary) cursor-pointer">
                <Icon name="IconDotsVertical" size={20} stroke={2} color="var(--fg-tertiary)" />
              </button>
            </div>

            {/* Form fields */}
            <div className="flex flex-col gap-(--gap-L)">
              <TextField
                label="Title"
                placeholder="Enter title..."
                value={title}
                onChange={setTitle}
              />
              <TextArea
                label="Body"
                placeholder="Enter description..."
                value={body}
                onChange={setBody}
                rows={8}
              />
            </div>
          </div>

          {/* Col 3 — Phone Preview */}
          <div
            className="flex items-center justify-center shrink-0 overflow-y-auto"
            style={{ width: 400, background: 'var(--bg-page)', padding: 'var(--padding-XXXL)' }}
          >
            <div
              className="flex flex-col rounded-(--radius-M) overflow-hidden"
              style={{
                width: 280,
                background: 'var(--bg-primary)',
                boxShadow: '0 0 40px rgba(11,174,236,0.25)',
                padding: 'var(--padding-L)',
                gap: 'var(--gap-M)',
              }}
            >
              <ProgressBar value={30} showScore={false} />
              <span style={{ fontFamily: 'var(--font-secondary)', fontWeight: 400, fontSize: 12, lineHeight: '16px', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                TASK
              </span>
              {/* Image placeholder */}
              <div
                className="flex items-center justify-center rounded-(--radius-S)"
                style={{ height: 165, background: 'var(--bg-brand_tertiary)' }}
              >
                <Icon name="IconPhoto" size={40} stroke={1.5} color="var(--fg-brand_primary)" />
              </div>
              <h4 style={{ fontFamily: 'var(--font-primary)', fontWeight: 800, fontSize: 18, lineHeight: '24px', color: 'var(--fg-primary)' }}>
                What do you think of this homepage?
              </h4>
              <p style={{ fontFamily: 'var(--font-secondary)', fontWeight: 400, fontSize: 14, lineHeight: '20px', color: 'var(--text-secondary)' }}>
                Take a quick look and share your first impressions.
              </p>
              <Button variant="Primary" showIcon={false} disabled className="w-full justify-center">
                Start
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Share Modal */}
      <Modal
        open={showShareModal}
        onClose={() => setShowShareModal(false)}
        title="Share"
        type="default"
      >
        {/* Invite row */}
        <div className="flex items-end gap-(--gap-M)" style={{ marginBottom: 'var(--gap-L)' }}>
          <div className="flex-1">
            <TextField
              label="Add an editor"
              placeholder="Fill with a mail"
              value={shareEmail}
              onChange={setShareEmail}
            />
          </div>
          <Button variant="Primary" showIcon={false}>Invite</Button>
        </div>

        {/* Editor list */}
        <div className="flex flex-col" style={{ gap: 'var(--gap-XS)' }}>
          <EditorRow name="Jeanne Doe"    role="Product Designer" verified />
          <EditorRow name="Robert Fischer" role="Developer" />
          <EditorRow name="Claire Fontaine" role="Designer" />
        </div>
      </Modal>
    </div>
  )
}
