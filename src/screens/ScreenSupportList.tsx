import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppLayout } from '../layouts/AppLayout'
import { Card } from '../components/ui/Card'
import { Tag } from '../components/ui/Tag'
import { TabBar } from '../components/ui/TabBar'
import { Button } from '../components/ui/Button'

const FORMS = [
  {
    id: 1,
    title: 'Feedback general',
    tagColor: 'Warning' as const,
    tagLabel: 'Not deployed',
    desc: 'Collect general feedback from your users about their experience with your product.',
  },
  {
    id: 2,
    title: 'NPS Survey',
    tagColor: 'Neutral' as const,
    tagLabel: 'Default',
    desc: 'Measure customer loyalty and satisfaction with a simple Net Promoter Score survey.',
  },
  {
    id: 3,
    title: 'Bug report',
    tagColor: 'Neutral' as const,
    tagLabel: 'Default',
    desc: 'Let users report bugs and issues directly from within your application interface.',
  },
  {
    id: 4,
    title: 'Feature request',
    tagColor: 'Warning' as const,
    tagLabel: 'Not deployed',
    desc: 'Allow customers to submit and upvote feature ideas for your product roadmap.',
  },
]

export function ScreenSupportList() {
  const navigate = useNavigate()
  const [selectedTab, setSelectedTab] = useState(0)

  return (
    <AppLayout activeNav="Support">
      {/* Header */}
      <div
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-(--gap-M)"
        style={{ padding: 'var(--padding-XXXL) var(--padding-XXXL) 0' }}
      >
        <h1 style={{ fontFamily: 'var(--font-primary)', fontWeight: 800, fontSize: 32, lineHeight: '40px', color: 'var(--fg-primary)' }}>
          Support
        </h1>
        <Button
          variant="Primary"
          small
          icon="IconPlus"
          showIcon
          onClick={() => navigate('/app/support/new')}
        >
          Create a form
        </Button>
      </div>

      {/* Tab bar */}
      <div style={{ marginTop: 'var(--gap-L)', padding: '0 var(--padding-XXXL)' }}>
        <TabBar
          tabs={[
            { label: 'Feedback' },
            { label: 'Campaign' },
            { label: 'Messages' },
          ]}
          selectedIndex={selectedTab}
          onTabChange={setSelectedTab}
        />
      </div>

      {/* Cards grid */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-(--gap-L)"
        style={{ padding: 'var(--padding-XXXL)' }}
      >
        {FORMS.map(form => (
          <Card
            key={form.id}
            showIcon={false}
            title={form.title}
            secondaryAction={{ label: 'Edit', onClick: () => {} }}
          >
            <Tag
              color={form.tagColor}
              highContrast={false}
              small
              headIcon={false}
              tailIcon={false}
              label={form.tagLabel}
            />
            <p style={{ fontFamily: 'var(--font-secondary)', fontWeight: 400, fontSize: 14, lineHeight: '20px', color: 'var(--fg-secondary)' }}>
              {form.desc}
            </p>
          </Card>
        ))}
      </div>
    </AppLayout>
  )
}
