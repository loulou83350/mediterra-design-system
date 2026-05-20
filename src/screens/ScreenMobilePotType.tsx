import { useNavigate } from 'react-router-dom'
import { HeaderMobile } from '../components/ui/HeaderMobile'
import { BottomBar } from '../components/ui/BottomBar'
import { HeadIcon } from '../components/ui/HeadIcon'
import { Icon } from '../components/ui/Icon'

// ─── Pot type row ─────────────────────────────────────────────────────────────

interface PotTypeRowProps {
  headColor: 'Brand' | 'Success'
  headIcon: string
  title: string
  subtitle: string
}

function PotTypeRow({ headColor, headIcon, title, subtitle }: PotTypeRowProps) {
  return (
    <div className="flex items-center gap-(--gap-M) p-(--padding-L) cursor-pointer hover:bg-(--bg-secondary) transition-colors">
      <HeadIcon color={headColor} icon={headIcon} small />
      <div className="flex flex-col flex-1 min-w-0">
        <span style={{ fontFamily: 'var(--font-secondary)', fontWeight: 700, fontSize: 16, lineHeight: '24px', color: 'var(--text-primary)' }}>
          {title}
        </span>
        <span style={{ fontFamily: 'var(--font-secondary)', fontWeight: 400, fontSize: 14, lineHeight: '20px', color: 'var(--text-secondary)' }}>
          {subtitle}
        </span>
      </div>
      <Icon name="IconChevronRight" size={20} stroke={2} color="var(--fg-tertiary)" />
    </div>
  )
}

// ─── Screen ───────────────────────────────────────────────────────────────────

export function ScreenMobilePotType() {
  const navigate = useNavigate()

  const bottomItems = [
    { icon: 'IconHome2',          label: 'Home',     selected: true,  onClick: () => navigate('/app/mobile') },
    { icon: 'IconChartBar',       label: 'Trend',    selected: false, onClick: () => {} },
    { icon: 'IconArrowsExchange', label: 'Payments', selected: false, onClick: () => {} },
    { icon: 'IconHelp',           label: 'Help',     selected: false, onClick: () => {} },
  ]

  return (
    <div className="min-h-screen bg-(--bg-page) flex flex-col items-center">
      <div
        className="flex flex-col w-full"
        style={{ maxWidth: 375, minHeight: '100vh', background: 'var(--bg-page)' }}
      >
        {/* HeaderMobile — childpage style */}
        <HeaderMobile
          type="childpage"
          title="Choose the type of Pot you'd like"
          showSubtitle={false}
          showTabs={false}
          onBackClick={() => navigate('/app/mobile')}
        />

        {/* Content */}
        <div className="flex flex-col gap-(--gap-L) p-(--padding-L) flex-1 pb-[80px]">
          {/* Group 1 */}
          <div
            className="rounded-(--radius-M) overflow-hidden divide-y divide-(--border-default)"
            style={{ border: '1px solid var(--border-default)', background: 'var(--bg-primary)' }}
          >
            <PotTypeRow
              headColor="Brand"
              headIcon="IconMoneybag"
              title="Regular"
              subtitle="Separate money for budgeting and bills"
            />
            <PotTypeRow
              headColor="Success"
              headIcon="IconArrowsMaximize"
              title="Savings"
              subtitle="Earn up to 6% interest"
            />
          </div>

          {/* Section label */}
          <span style={{ fontFamily: 'var(--font-secondary)', fontWeight: 400, fontSize: 14, lineHeight: '20px', color: 'var(--text-secondary)' }}>
            Set a specific goals
          </span>

          {/* Group 2 */}
          <div
            className="rounded-(--radius-M) overflow-hidden"
            style={{ border: '1px solid var(--border-default)', background: 'var(--bg-primary)' }}
          >
            <PotTypeRow
              headColor="Brand"
              headIcon="IconBrandNetbeans"
              title="Build a saving safety net"
              subtitle="Save to cover a month's expenses"
            />
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: 375 }}>
          <BottomBar items={bottomItems} />
        </div>
      </div>
    </div>
  )
}
