import { Icon } from '../../components/ui/Icon'

const previewIcons = [
  'IconHome', 'IconUser', 'IconSettings', 'IconSearch',
  'IconBell', 'IconMail', 'IconPhone', 'IconCamera',
  'IconHeart', 'IconStar', 'IconBookmark', 'IconShare',
  'IconEdit', 'IconTrash', 'IconPlus', 'IconX',
  'IconCheck', 'IconChevronDown', 'IconArrowRight', 'IconDownload',
  'IconUpload', 'IconLock', 'IconEye', 'IconRefresh',
] as const

const swapGuide = [
  {
    name: 'Tabler Icons',
    package: '@tabler/icons-react',
    current: true,
    import: "import * as TablerIcons from '@tabler/icons-react'",
    usage: '<Icon name="IconHome" />',
    site: 'https://tabler.io/icons',
  },
  {
    name: 'Lucide',
    package: 'lucide-react',
    current: false,
    import: "import * as LucideIcons from 'lucide-react'",
    usage: '<Icon name="Home" />',
    site: 'https://lucide.dev',
  },
  {
    name: 'Heroicons',
    package: '@heroicons/react',
    current: false,
    import: "import * as HeroIcons from '@heroicons/react/24/outline'",
    usage: '<Icon name="HomeIcon" />',
    site: 'https://heroicons.com',
  },
  {
    name: 'Phosphor',
    package: '@phosphor-icons/react',
    current: false,
    import: "import * as PhosphorIcons from '@phosphor-icons/react'",
    usage: '<Icon name="House" />',
    site: 'https://phosphoricons.com',
  },
]

export function IconsPage() {
  return (
    <div className="p-(--padding-XXXL) flex flex-col gap-(--gap-XXXL)">
      <div>
        <h1 style={{ fontFamily: 'var(--font-primary)', fontWeight: 800 }}>Icons</h1>
        <p className="mt-(--gap-S) text-sm text-(--fg-secondary)">
          836 Tabler icons in the Figma file. The <code className="px-(--padding-XS) py-0.5 rounded-(--radius-XS) bg-(--bg-quaterny) text-xs font-mono">Icon</code> component abstracts the library — swapping libs = editing one file.
        </p>
      </div>

      {/* Composant Icon */}
      <section className="flex flex-col gap-(--gap-M)">
        <h2 className="text-sm font-semibold text-(--fg-tertiary) uppercase tracking-wider border-b border-(--border-default) pb-(--padding-S)">
          Icon Component
        </h2>
        <div className="bg-(--bg-primary) border border-(--border-default) rounded-(--radius-L) p-(--padding-XXL)">
          <p className="text-sm font-semibold text-(--fg-primary) mb-(--gap-M)">
            <code className="px-(--padding-XS) py-0.5 rounded-(--radius-XS) bg-(--bg-quaterny) text-xs font-mono">src/components/ui/Icon.tsx</code>
          </p>
          <pre className="bg-(--bg-secondary) rounded-(--radius-M) p-(--padding-L) text-xs text-(--fg-secondary) overflow-auto leading-relaxed">
{`import * as TablerIcons from '@tabler/icons-react'

export function Icon({ name, size = 24, stroke = 1.5, className }) {
  const IconComponent = TablerIcons[name]
  return <IconComponent size={size} stroke={stroke} className={className} />
}`}
          </pre>
          <p className="mt-(--gap-M) text-sm text-(--fg-secondary)">
            Usage in a component:
          </p>
          <pre className="bg-(--bg-secondary) rounded-(--radius-M) p-(--padding-L) text-xs text-(--fg-secondary) mt-(--gap-S) overflow-auto">
{`import { Icon } from '@/components/ui/Icon'

<Icon name="IconHome" size={20} />
<Icon name="IconSearch" size={16} stroke={2} />
<Icon name="IconCheck" className="text-(--fg-succes_primary)" />`}
          </pre>
        </div>
      </section>

      {/* Aperçu icônes */}
      <section className="flex flex-col gap-(--gap-M)">
        <h2 className="text-sm font-semibold text-(--fg-tertiary) uppercase tracking-wider border-b border-(--border-default) pb-(--padding-S)">
          Preview — 24 icons
        </h2>
        <div className="grid grid-cols-6 gap-(--gap-M) sm:grid-cols-8 lg:grid-cols-12">
          {previewIcons.map(name => (
            <div
              key={name}
              className="flex flex-col items-center gap-(--gap-XS) p-(--padding-M) bg-(--bg-primary) border border-(--border-default) rounded-(--radius-M) hover:border-(--border-brand) transition-colors"
              title={name}
            >
              <Icon name={name} size={24} />
              <p className="text-xs text-(--fg-tertiary) text-center truncate w-full" style={{ fontSize: 9 }}>
                {name.replace('Icon', '')}
              </p>
            </div>
          ))}
        </div>
        <a
          href="https://tabler.io/icons"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-(--gap-S) text-sm text-(--text-link) hover:underline"
        >
          <Icon name="IconExternalLink" size={16} />
          Browse 836 icons on tabler.io
        </a>
      </section>

      {/* Guide de swap */}
      <section className="flex flex-col gap-(--gap-M)">
        <h2 className="text-sm font-semibold text-(--fg-tertiary) uppercase tracking-wider border-b border-(--border-default) pb-(--padding-S)">
          Switch icon library
        </h2>
        <div className="bg-(--bg-succes_tertiary) border border-(--bg-succes_secondary) rounded-(--radius-M) p-(--padding-L)">
          <p className="text-sm font-semibold text-(--fg-succes_primary) mb-(--gap-XS)">Swap in 3 steps</p>
          <ol className="text-sm text-(--fg-primary) flex flex-col gap-(--gap-XS) list-decimal list-inside">
            <li>Uninstall the old lib, install the new one</li>
            <li>Open <code className="px-(--padding-XS) py-0.5 rounded-(--radius-XS) bg-(--bg-quaterny) text-xs font-mono">src/components/ui/Icon.tsx</code></li>
            <li>Replace the import and icon names — all components update automatically</li>
          </ol>
        </div>
        <div className="flex flex-col gap-(--gap-M)">
          {swapGuide.map(({ name, package: pkg, current, import: imp, usage, site }) => (
            <div
              key={name}
              className={`bg-(--bg-primary) border rounded-(--radius-L) p-(--padding-XXL) ${current ? 'border-(--border-brand)' : 'border-(--border-default)'}`}
            >
              <div className="flex items-center justify-between mb-(--gap-M)">
                <div className="flex items-center gap-(--gap-S)">
                  <p className="text-sm font-semibold text-(--fg-primary)">{name}</p>
                  {current && (
                    <span className="inline-flex items-center px-(--padding-XS) h-5 text-xs font-semibold rounded-(--radius-XS) bg-(--bg-brand_tertiary) text-(--fg-brand_primary)">
                      Current
                    </span>
                  )}
                </div>
                <a href={site} target="_blank" rel="noopener noreferrer" className="flex items-center gap-(--gap-XS) text-xs text-(--text-link) hover:underline">
                  <Icon name="IconExternalLink" size={12} />
                  {site.replace('https://', '')}
                </a>
              </div>
              <pre className="bg-(--bg-secondary) rounded-(--radius-S) p-(--padding-M) text-xs text-(--fg-secondary) overflow-auto">
                <span className="text-(--fg-tertiary)">$ </span>npm install {pkg}{'\n'}
                {imp}
              </pre>
              <p className="mt-(--gap-S) text-xs text-(--fg-tertiary)">Usage : <code className="font-mono">{usage}</code></p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
