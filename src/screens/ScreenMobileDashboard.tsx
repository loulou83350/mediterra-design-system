import { useNavigate } from 'react-router-dom'
import { Avatar } from '../components/ui/Avatar'
import { CardCTA } from '../components/ui/Card'
import { BottomBar } from '../components/ui/BottomBar'
import { Icon } from '../components/ui/Icon'

// ─── Activity / Pots data ────────────────────────────────────────────────────

const ACTIVITY_ITEMS = [
  { icon: 'IconBrandWordpress', label: 'Website',  amount: '$6.87'  },
  { icon: 'IconHanger',         label: 'Clothe',   amount: '$18.56' },
  { icon: 'IconToolsKitchen2',  label: 'Food',     amount: '$12.78' },
]

const POTS_ITEMS = [
  { icon: 'IconBrandWordpress', label: 'Website',  amount: '$6.87'  },
  { icon: 'IconHanger',         label: 'Clothe',   amount: '$18.56' },
  { icon: 'IconToolsKitchen2',  label: 'Food',     amount: '$12.78' },
]

// ─── Sub-components ──────────────────────────────────────────────────────────

interface ActivityRowProps {
  icon: string
  label: string
  amount: string
  divider?: boolean
}

function ActivityRow({ icon, label, amount, divider = true }: ActivityRowProps) {
  return (
    <div
      className="flex items-center gap-(--gap-M) px-(--padding-L)"
      style={{
        paddingTop: 'var(--padding-L)',
        paddingBottom: divider ? 'var(--padding-L)' : 'var(--padding-S)',
        borderBottom: divider ? '1px solid var(--border-default)' : 'none',
      }}
    >
      <Icon name={icon as any} size={24} stroke={2} color="var(--fg-secondary)" />
      <span className="flex-1" style={{ fontFamily: 'var(--font-secondary)', fontWeight: 400, fontSize: 16, lineHeight: '24px', color: 'var(--text-primary)' }}>
        {label}
      </span>
      <span style={{ fontFamily: 'var(--font-primary)', fontWeight: 800, fontSize: 24, lineHeight: '32px', color: 'var(--text-primary)' }}>
        {amount}
      </span>
    </div>
  )
}

interface MobileCardProps {
  title: string
  items: { icon: string; label: string; amount: string }[]
  actionLabel?: string
}

function MobileCard({ title, items, actionLabel = 'See all' }: MobileCardProps) {
  return (
    <div
      className="rounded-(--radius-M) overflow-hidden"
      style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-default)' }}
    >
      {/* Card header */}
      <div className="px-(--padding-L) pt-(--padding-L) pb-0">
        <h4 style={{ fontFamily: 'var(--font-primary)', fontWeight: 800, fontSize: 18, lineHeight: '24px', color: 'var(--text-primary)' }}>
          {title}
        </h4>
      </div>
      {/* Rows */}
      {items.map((item, i) => (
        <ActivityRow
          key={i}
          icon={item.icon}
          label={item.label}
          amount={item.amount}
          divider={i < items.length - 1}
        />
      ))}
      {/* Footer action */}
      <div className="flex justify-end px-(--padding-L) pb-(--padding-L)" style={{ marginTop: 'var(--gap-M)' }}>
        <button
          type="button"
          className="cursor-pointer"
          style={{ fontFamily: 'var(--font-primary)', fontWeight: 800, fontSize: 16, lineHeight: '24px', color: 'var(--text-action)' }}
        >
          {actionLabel}
        </button>
      </div>
    </div>
  )
}

// ─── Screen ───────────────────────────────────────────────────────────────────

export function ScreenMobileDashboard() {
  const navigate = useNavigate()

  const bottomItems = [
    { icon: 'IconHome2',          label: 'Home',     selected: true,  onClick: () => {} },
    { icon: 'IconChartBar',       label: 'Trend',    selected: false, onClick: () => {} },
    { icon: 'IconArrowsExchange', label: 'Payments', selected: false, onClick: () => {} },
    { icon: 'IconHelp',           label: 'Help',     selected: false, onClick: () => {} },
  ]

  return (
    <div className="min-h-screen bg-(--bg-page) flex flex-col items-center">
      {/* Mobile frame centered on desktop */}
      <div
        className="flex flex-col w-full"
        style={{ maxWidth: 375, minHeight: '100vh', position: 'relative', background: 'var(--bg-page)' }}
      >
        {/* App Header */}
        <div style={{ background: 'var(--bg-primary)', borderBottom: '1px solid var(--border-default)' }}>
          {/* iOS Status bar */}
          <div
            className="flex items-center justify-between px-(--padding-L)"
            style={{ height: 47 }}
          >
            <span style={{ fontFamily: 'var(--font-secondary)', fontWeight: 600, fontSize: 17, color: 'var(--text-primary)' }}>
              9:41
            </span>
            <div className="flex items-center gap-[6px]">
              <Icon name="IconSignal"  size={16} stroke={2} color="var(--fg-primary)" />
              <Icon name="IconWifi"    size={16} stroke={2} color="var(--fg-primary)" />
              <Icon name="IconBattery1" size={20} stroke={2} color="var(--fg-primary)" />
            </div>
          </div>
          {/* App top bar */}
          <div className="flex items-center justify-between px-(--padding-L) py-(--padding-M)">
            {/* Left: avatar + upgrade */}
            <div className="flex items-center gap-(--gap-S)">
              <Avatar type="Empty" size="M" color="brand" />
              <button
                type="button"
                className="cursor-pointer"
                style={{ fontFamily: 'var(--font-primary)', fontWeight: 800, fontSize: 16, lineHeight: '24px', color: 'var(--text-action)' }}
              >
                Upgrade
              </button>
            </div>
            {/* Right: icon buttons */}
            <div className="flex items-center gap-(--gap-S)">
              <button type="button" className="p-(--padding-S) rounded-(--radius-S) hover:bg-(--bg-secondary) cursor-pointer transition-colors">
                <Icon name="IconGift"   size={24} stroke={2} color="var(--fg-secondary)" />
              </button>
              <button type="button" className="p-(--padding-S) rounded-(--radius-S) hover:bg-(--bg-secondary) cursor-pointer transition-colors">
                <Icon name="IconSearch" size={24} stroke={2} color="var(--fg-secondary)" />
              </button>
              <button
                type="button"
                className="p-(--padding-S) rounded-(--radius-S) cursor-pointer transition-colors"
                style={{ background: 'var(--bg-action)' }}
              >
                <Icon name="IconPlus" size={24} stroke={2} color="white" />
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-(--gap-L) p-(--padding-L) flex-1 pb-[80px]">
          {/* Gradient CTA card */}
          <CardCTA
            primaryAction={{ label: 'Deposit', onClick: () => {} }}
          >
            <div className="flex items-start justify-between">
              <h3 style={{ fontFamily: 'var(--font-primary)', fontWeight: 800, fontSize: 20, lineHeight: '28px', color: 'white' }}>
                My brand
              </h3>
              <div className="flex flex-col items-end gap-(--gap-XXS)">
                <span style={{ fontFamily: 'var(--font-primary)', fontWeight: 800, fontSize: 32, lineHeight: '40px', color: 'white' }}>
                  $18.56
                </span>
                <span style={{ fontFamily: 'var(--font-secondary)', fontWeight: 400, fontSize: 14, lineHeight: '20px', color: 'white', opacity: 0.8 }}>
                  Balance
                </span>
              </div>
            </div>
          </CardCTA>

          {/* Activity card */}
          <MobileCard title="Activity" items={ACTIVITY_ITEMS} />

          {/* Pots card */}
          <MobileCard title="Pots" items={POTS_ITEMS} />
        </div>

        {/* Bottom bar */}
        <div style={{ position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: 375 }}>
          <BottomBar items={bottomItems} />
        </div>

        {/* Back to DS link */}
        <div style={{ position: 'fixed', top: 8, right: 8, zIndex: 50 }}>
          <button
            type="button"
            onClick={() => navigate('/design')}
            className="flex items-center gap-(--gap-XS) px-(--padding-S) py-(--padding-XS) rounded-(--radius-S) hover:bg-(--bg-secondary) transition-colors cursor-pointer"
            style={{ fontFamily: 'var(--font-secondary)', fontSize: 11, color: 'var(--fg-tertiary)', background: 'var(--bg-primary)', border: '1px solid var(--border-default)' }}
          >
            <Icon name="IconChevronLeft" size={12} stroke={2} color="var(--fg-tertiary)" />
            <span>DS</span>
          </button>
        </div>
      </div>
    </div>
  )
}
