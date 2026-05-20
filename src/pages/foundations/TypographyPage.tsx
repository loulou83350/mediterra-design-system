// Nomenclature exacte Figma — aucune liberté sur les noms

type TextStyle = {
  token: string
  family: string
  size: number
  lineHeight: number
  weight: number
  sample: string
}

const fonts = [
  { token: 'Font/font-primary', value: 'Wanted Sans', role: 'Display / Headings' },
  { token: 'Font/font-secondary', value: 'Open Sans', role: 'Body text' },
]

const headers: TextStyle[] = [
  { token: 'Header/H1 - Desktop', family: 'font-primary', size: 32, lineHeight: 40, weight: 800, sample: 'The design system starts here' },
  { token: 'Header/H2',           family: 'font-primary', size: 24, lineHeight: 32, weight: 800, sample: 'Consistent typography' },
  { token: 'Header/H3',           family: 'font-primary', size: 20, lineHeight: 28, weight: 800, sample: 'Clear hierarchy' },
  { token: 'Header/H4',           family: 'font-primary', size: 18, lineHeight: 24, weight: 800, sample: 'Section subtitle' },
]

const bodyStyles: { group: string; styles: TextStyle[] }[] = [
  {
    group: 'Primary text',
    styles: [
      { token: 'Primary text/Default', family: 'font-secondary', size: 16, lineHeight: 24, weight: 400, sample: 'The primary body text is readable and comfortable for long-form reading.' },
      { token: 'Primary text/Strong',  family: 'font-secondary', size: 16, lineHeight: 24, weight: 700, sample: 'Bold text to emphasise an important piece of information.' },
      { token: 'Primary text/Link',    family: 'font-secondary', size: 16, lineHeight: 24, weight: 600, sample: 'Clickable link to a resource' },
    ],
  },
  {
    group: 'Secondary text',
    styles: [
      { token: 'Secondary text/Default', family: 'font-secondary', size: 14, lineHeight: 20, weight: 400, sample: 'Secondary text for descriptions and metadata.' },
      { token: 'Secondary text/Strong',  family: 'font-secondary', size: 14, lineHeight: 20, weight: 700, sample: 'Emphasis in secondary text.' },
      { token: 'Secondary text/Link',    family: 'font-secondary', size: 14, lineHeight: 20, weight: 600, sample: 'Secondary link' },
    ],
  },
  {
    group: 'Tertiary text',
    styles: [
      { token: 'Tertiary text/Default', family: 'font-secondary', size: 12, lineHeight: 16, weight: 400, sample: 'Tertiary text for labels, hints and supporting information.' },
      { token: 'Tertiary text/Strong',  family: 'font-secondary', size: 12, lineHeight: 20, weight: 700, sample: 'Tertiary emphasis.' },
      { token: 'Tertiary text/Link',    family: 'font-secondary', size: 12, lineHeight: 16, weight: 600, sample: 'Tertiary link' },
    ],
  },
  {
    group: 'Quaterny text',
    styles: [
      { token: 'Quaterny text/Default', family: 'font-secondary', size: 10, lineHeight: 12, weight: 400, sample: 'Micro-text for badges, timestamps and annotations.' },
      { token: 'Quaterny text/Strong',  family: 'font-secondary', size: 10, lineHeight: 12, weight: 700, sample: 'Bold micro-text.' },
      { token: 'Quaterny text/Link',    family: 'font-secondary', size: 10, lineHeight: 12, weight: 600, sample: 'Micro-link' },
    ],
  },
]

function TokenPill({ label }: { label: string }) {
  return (
    <code className="inline-flex items-center px-(--padding-XS) py-0.5 rounded-(--radius-XS) bg-(--bg-quaterny) text-xs text-(--fg-secondary) font-mono">
      {label}
    </code>
  )
}

function StyleRow({ style }: { style: TextStyle }) {
  const isLink = style.token.includes('/Link')
  return (
    <div className="flex items-baseline gap-(--gap-XXL) py-(--padding-M) border-b border-(--border-grey) last:border-0">
      <div className="w-56 shrink-0">
        <TokenPill label={style.token} />
        <p className="text-xs text-(--fg-tertiary) mt-(--gap-XS)">
          {style.size}/{style.lineHeight}px · {style.weight}
        </p>
      </div>
      <p
        style={{
          fontFamily: `var(--${style.family})`,
          fontSize: style.size,
          lineHeight: `${style.lineHeight}px`,
          fontWeight: style.weight,
          color: isLink ? 'var(--text-link)' : 'var(--fg-primary)',
          textDecoration: isLink ? 'underline' : 'none',
        }}
      >
        {style.sample}
      </p>
    </div>
  )
}

export function TypographyPage() {
  return (
    <div className="p-(--padding-XXXL) flex flex-col gap-(--gap-XXXL)">
      <div>
        <h1 style={{ fontFamily: 'var(--font-primary)', fontWeight: 800 }}>Typography</h1>
        <p className="mt-(--gap-S) text-sm text-(--fg-secondary)">
          Exact Figma text style naming. Two typefaces, eight levels.
        </p>
      </div>

      {/* Fonts */}
      <section className="flex flex-col gap-(--gap-M)">
        <h2 className="text-sm font-semibold text-(--fg-tertiary) uppercase tracking-wider border-b border-(--border-default) pb-(--padding-S)">Font</h2>
        <div className="grid grid-cols-2 gap-(--gap-L)">
          {fonts.map(({ token, value, role }) => (
            <div key={token} className="bg-(--bg-primary) border border-(--border-default) rounded-(--radius-L) p-(--padding-XXL)">
              <TokenPill label={token} />
              <p
                className="mt-(--gap-M) mb-(--gap-XS)"
                style={{ fontFamily: value, fontSize: 32, fontWeight: 700, lineHeight: '40px' }}
              >
                Aa Bb Cc
              </p>
              <p className="text-xs text-(--fg-tertiary)">{value} · {role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Headers */}
      <section className="flex flex-col gap-(--gap-M)">
        <h2 className="text-sm font-semibold text-(--fg-tertiary) uppercase tracking-wider border-b border-(--border-default) pb-(--padding-S)">Header</h2>
        <div className="bg-(--bg-primary) border border-(--border-default) rounded-(--radius-L) px-(--padding-XXL) divide-y divide-(--border-default)">
          {headers.map(s => <StyleRow key={s.token} style={s} />)}
        </div>
      </section>

      {/* Body styles */}
      {bodyStyles.map(({ group, styles }) => (
        <section key={group} className="flex flex-col gap-(--gap-M)">
          <h2 className="text-sm font-semibold text-(--fg-tertiary) uppercase tracking-wider border-b border-(--border-default) pb-(--padding-S)">{group}</h2>
          <div className="bg-(--bg-primary) border border-(--border-default) rounded-(--radius-L) px-(--padding-XXL) divide-y divide-(--border-default)">
            {styles.map(s => <StyleRow key={s.token} style={s} />)}
          </div>
        </section>
      ))}
    </div>
  )
}
