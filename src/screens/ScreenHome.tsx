import { AppLayout } from '../layouts/AppLayout'
import { Card } from '../components/ui/Card'
import { ProgressBar } from '../components/ui/ProgressBar'
import { HeadIcon } from '../components/ui/HeadIcon'
import { ListItem } from '../components/ui/ListItem'
import { Avatar } from '../components/ui/Avatar'
import { Icon } from '../components/ui/Icon'
import { Button } from '../components/ui/Button'
import { LineChartComponent } from '../components/ui/Charts'

// ─── Campaign line chart data ───────────────────────────────────────────────

const CAMPAIGN_DATA = [
  { label: 'Jan',  clicks: 180, mails: 520 },
  { label: 'Feb',  clicks: 240, mails: 630 },
  { label: 'Mar',  clicks: 317, mails: 720 },
  { label: 'Apr',  clicks: 280, mails: 680 },
  { label: 'May',  clicks: 390, mails: 810 },
  { label: 'Jun',  clicks: 450, mails: 950 },
]

const CAMPAIGN_LINES = [
  { key: 'clicks', name: 'Clicks' },
  { key: 'mails',  name: 'Mails sent' },
]

// ─── Schedule campaigns ─────────────────────────────────────────────────────

const SCHEDULE_ITEMS = [
  { title: 'Product feedback',   subtitle: 'Mar 3 – Mar 10 2023',   headColor: 'Success' as const, icon: 'IconMail' },
  { title: 'Welcome series',     subtitle: 'Mar 5 – Mar 15 2023',   headColor: 'Brand'   as const, icon: 'IconFileText' },
  { title: 'Bug alert digest',   subtitle: 'Mar 8 – Mar 12 2023',   headColor: 'Error'   as const, icon: 'IconAlertCircle' },
  { title: 'NPS Q1 campaign',    subtitle: 'Mar 12 – Mar 20 2023',  headColor: 'Success' as const, icon: 'IconMail' },
  { title: 'Feature spotlight',  subtitle: 'Mar 15 – Mar 25 2023',  headColor: 'Brand'   as const, icon: 'IconStars' },
]

// ─── Messages list ───────────────────────────────────────────────────────────

const MESSAGES = [
  { initials: 'DS', name: 'Diana Spencer',  preview: 'Can we reschedule the sync?' },
  { initials: 'RF', name: 'Robert Fischer', preview: 'The report is ready for review.' },
  { initials: 'CF', name: 'Claire Fontaine', preview: 'Just sent you the assets.' },
  { initials: 'JD', name: 'Jeanne Dupont',  preview: 'Looks great! Let\'s ship it.' },
  { initials: 'RD', name: 'Remy Dubois',    preview: 'Any update on the timeline?' },
]

// ─── Chart legend row ────────────────────────────────────────────────────────

interface LegendRowProps {
  color: 'Brand' | 'Success' | 'Warning'
  icon: string
  label: string
  stat1: string
  stat2: string
}

function ChartLegendRow({ color, icon, label, stat1, stat2 }: LegendRowProps) {
  return (
    <div className="flex items-center gap-(--gap-M)">
      <HeadIcon color={color} icon={icon} small />
      <span className="flex-1" style={{ fontFamily: 'var(--font-secondary)', fontSize: 14, lineHeight: '20px', color: 'var(--fg-secondary)' }}>
        {label}
      </span>
      <div className="flex items-center gap-(--gap-S)">
        <Icon name="IconEye"     size={14} stroke={2} color="var(--fg-tertiary)" />
        <span style={{ fontFamily: 'var(--font-secondary)', fontSize: 12, color: 'var(--fg-tertiary)' }}>{stat1}</span>
        <Icon name="IconPointer" size={14} stroke={2} color="var(--fg-tertiary)" />
        <span style={{ fontFamily: 'var(--font-secondary)', fontSize: 12, color: 'var(--fg-tertiary)' }}>{stat2}</span>
      </div>
    </div>
  )
}

// ─── Screen ───────────────────────────────────────────────────────────────────

export function ScreenHome() {
  return (
    <AppLayout activeNav="Home">
      {/* Header */}
      <div
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-(--gap-M)"
        style={{ padding: 'var(--padding-XXXL) var(--padding-XXXL) 0' }}
      >
        <h1 style={{ fontFamily: 'var(--font-primary)', fontWeight: 800, fontSize: 32, lineHeight: '40px', color: 'var(--fg-primary)' }}>
          Welcome back, Jeanne
        </h1>
        <span style={{ fontFamily: 'var(--font-secondary)', fontWeight: 400, fontSize: 14, lineHeight: '20px', color: 'var(--fg-tertiary)' }}>
          Last update: Mar 3 2023
        </span>
      </div>

      {/* Action card */}
      <div style={{ margin: 'var(--gap-XL) var(--padding-XXXL) 0' }}>
        <Card showIcon={false} showTitle={false}>
          <div className="flex flex-col gap-(--gap-M)">
            <ProgressBar value={70} currentDisplay={7} maxDisplay={10} showScore />
            <div>
              <h4 style={{ fontFamily: 'var(--font-primary)', fontWeight: 800, fontSize: 18, lineHeight: '24px', color: 'var(--fg-primary)' }}>
                Build your organization
              </h4>
              <p style={{ fontFamily: 'var(--font-secondary)', fontWeight: 400, fontSize: 14, lineHeight: '20px', color: 'var(--fg-tertiary)', marginTop: 2 }}>
                3 steps to complete
              </p>
            </div>
            <div
              className="rounded-(--radius-S) flex items-center gap-(--gap-M)"
              style={{ background: 'var(--bg-brand_tertiary)', padding: 'var(--padding-L)' }}
            >
              <Icon name="IconInfoCircle" size={20} stroke={2} color="var(--fg-brand_primary)" />
              <p style={{ fontFamily: 'var(--font-secondary)', fontSize: 14, lineHeight: '20px', color: 'var(--fg-brand_primary)', flex: 1 }}>
                Invite your team members and set up your first campaign to unlock all features.
              </p>
            </div>
            <div>
              <Button variant="Primary" small icon="IconPlus" showIcon disabled>
                New campaign
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {/* 3-col data grid */}
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-(--gap-L)"
        style={{ padding: 'var(--padding-XXXL)' }}
      >
        {/* Col 1 — Schedule Campaigns */}
        <Card icon="IconCalendar" title="Schedule Campaigns">
          <div className="flex flex-col">
            {SCHEDULE_ITEMS.map((item, i) => (
              <div key={i} className="flex items-center gap-(--gap-M)" style={{ padding: 'var(--padding-M) 0' }}>
                <HeadIcon color={item.headColor} icon={item.icon} small />
                <div className="flex flex-col flex-1 min-w-0">
                  <span style={{ fontFamily: 'var(--font-secondary)', fontWeight: 700, fontSize: 14, lineHeight: '20px', color: 'var(--fg-primary)' }}>
                    {item.title}
                  </span>
                  <span style={{ fontFamily: 'var(--font-secondary)', fontWeight: 400, fontSize: 12, lineHeight: '16px', color: 'var(--fg-tertiary)' }}>
                    {item.subtitle}
                  </span>
                </div>
                <button
                  type="button"
                  className="p-(--padding-XS) rounded-(--radius-S) hover:bg-(--bg-secondary) cursor-pointer shrink-0 transition-colors"
                >
                  <Icon name="IconDotsVertical" size={16} stroke={2} color="var(--fg-tertiary)" />
                </button>
              </div>
            ))}
          </div>
        </Card>

        {/* Col 2 — Recent Campaigns */}
        <Card icon="IconChartLine" title="Recent Campaigns">
          <LineChartComponent
            data={CAMPAIGN_DATA}
            lines={CAMPAIGN_LINES}
            showCursor
            height={180}
          />
          <div className="flex flex-col gap-(--gap-S)" style={{ marginTop: 'var(--gap-M)' }}>
            <ChartLegendRow
              color="Brand"
              icon="IconMail"
              label="Product feedback"
              stat1="1.2k"
              stat2="317"
            />
            <ChartLegendRow
              color="Success"
              icon="IconSend"
              label="Welcome series"
              stat1="980"
              stat2="240"
            />
            <ChartLegendRow
              color="Warning"
              icon="IconBell"
              label="NPS Q1"
              stat1="720"
              stat2="189"
            />
          </div>
        </Card>

        {/* Col 3 — Messages */}
        <Card icon="IconMessage" title="Messages">
          <div className="flex flex-col">
            {MESSAGES.map((msg, i) => (
              <ListItem
                key={i}
                variant="placeholder"
                title={msg.name}
                subtitle={msg.preview}
                showHeadIcon={false}
                tailContent={
                  <Avatar
                    type="Letter"
                    size="M"
                    initials={msg.initials}
                    color="brand"
                  />
                }
              />
            ))}
          </div>
        </Card>
      </div>
    </AppLayout>
  )
}
