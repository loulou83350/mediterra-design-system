import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'
import { Input } from '../components/ui/Input'
import { Card } from '../components/ui/Card'

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-(--spacing-l)">
      <h2 className="pb-(--spacing-s) border-b border-(--border-default)">{title}</h2>
      {children}
    </section>
  )
}

function Row({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-wrap items-center gap-(--spacing-m)">{children}</div>
}

export function Design() {
  return (
    <div className="min-h-screen bg-(--bg-page)">
      {/* Header */}
      <header className="bg-(--bg-primary) border-b border-(--border-default) px-(--spacing-xxxl) py-(--spacing-l) sticky top-0 z-10">
        <h1 className="text-(--text-h3) font-display">Design System — UXProbe</h1>
      </header>

      <main className="max-w-4xl mx-auto px-(--spacing-xxxl) py-(--spacing-xxxl) flex flex-col gap-(--spacing-xxxl)">

        {/* Couleurs */}
        <Section title="Couleurs — Tokens sémantiques">
          <div className="grid grid-cols-2 gap-(--spacing-m) md:grid-cols-4">
            {[
              { label: 'bg-action', bg: 'var(--bg-action)', text: '#fff' },
              { label: 'bg-page', bg: 'var(--bg-page)', text: 'var(--fg-primary)' },
              { label: 'bg-primary', bg: 'var(--bg-primary)', text: 'var(--fg-primary)', border: true },
              { label: 'bg-secondary', bg: 'var(--bg-secondary)', text: 'var(--fg-primary)' },
              { label: 'bg-success-primary', bg: 'var(--bg-success-primary)', text: '#fff' },
              { label: 'bg-warning-primary', bg: 'var(--bg-warning-primary)', text: '#fff' },
              { label: 'bg-error-primary', bg: 'var(--bg-error-primary)', text: '#fff' },
              { label: 'bg-tooltips', bg: 'var(--bg-tooltips)', text: '#fff' },
            ].map(({ label, bg, text, border }) => (
              <div
                key={label}
                className={`rounded-(--radius-m) p-(--spacing-m) ${border ? 'border border-(--border-default)' : ''}`}
                style={{ backgroundColor: bg, color: text }}
              >
                <p className="text-(--text-body-sm) font-semibold">{label}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* Typographie */}
        <Section title="Typographie">
          <h1>H1 — Wanted Sans 32px</h1>
          <h2>H2 — Wanted Sans 24px</h2>
          <h3>H3 — Wanted Sans 20px</h3>
          <h4>H4 — Wanted Sans 18px</h4>
          <p style={{ fontSize: 'var(--text-body-lg)' }}>Body large — Open Sans 16px — Lorem ipsum dolor sit amet</p>
          <p style={{ fontSize: 'var(--text-body-md)', color: 'var(--fg-secondary)' }}>Body medium — Open Sans 14px — Lorem ipsum dolor sit amet</p>
          <p style={{ fontSize: 'var(--text-body-sm)', color: 'var(--fg-tertiary)' }}>Body small — Open Sans 12px — Lorem ipsum dolor sit amet</p>
          <a href="#">Lien — text-link</a>
        </Section>

        {/* Buttons */}
        <Section title="Button">
          <div className="flex flex-col gap-(--spacing-m)">
            <Row>
              <Button variant="Primary">Primary</Button>
              <Button variant="Secondary">Secondary</Button>
              <Button variant="Tertiary">Tertiary</Button>
              <Button variant="Quaterny">Quaterny</Button>
            </Row>
            <Row>
              <Button variant="Primary" small>Small</Button>
              <Button variant="Primary">Large</Button>
            </Row>
            <Row>
              <Button variant="Primary" disabled>Disabled</Button>
              <Button variant="Secondary" disabled>Disabled</Button>
            </Row>
          </div>
        </Section>

        {/* Badges */}
        <Section title="Badge">
          <Row>
            <Badge variant="brand">Brand</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="error">Error</Badge>
            <Badge variant="neutral">Neutral</Badge>
          </Row>
        </Section>

        {/* Inputs */}
        <Section title="Input">
          <div className="grid grid-cols-1 gap-(--spacing-l) md:grid-cols-2">
            <Input label="Email" type="email" placeholder="hello@exemple.com" />
            <Input label="Mot de passe" type="password" placeholder="••••••••" />
            <Input label="Avec hint" placeholder="Votre nom" hint="Utilisé sur votre profil public" />
            <Input label="Avec erreur" placeholder="Votre email" error="Cet email est invalide" />
            <Input label="Désactivé" placeholder="Non éditable" disabled />
          </div>
        </Section>

        {/* Cards */}
        <Section title="Card">
          <div className="grid grid-cols-1 gap-(--spacing-l) md:grid-cols-2">
            <Card>
              <h4 className="mb-(--spacing-s)">Carte simple</h4>
              <p style={{ color: 'var(--fg-secondary)', fontSize: 'var(--text-body-md)' }}>
                Contenu de la carte avec du texte secondaire pour illustrer la hiérarchie.
              </p>
            </Card>
            <Card>
              <div className="flex items-start justify-between mb-(--spacing-m)">
                <h4>Avec badge</h4>
                <Badge variant="brand">Nouveau</Badge>
              </div>
              <p style={{ color: 'var(--fg-secondary)', fontSize: 'var(--text-body-md)' }}>
                Une carte avec un badge dans le header.
              </p>
              <div className="mt-(--spacing-l) flex gap-(--spacing-s)">
                <Button small variant="Primary">Action</Button>
                <Button small variant="Tertiary">Annuler</Button>
              </div>
            </Card>
          </div>
        </Section>

        {/* Radius */}
        <Section title="Border Radius">
          <Row>
            {[
              { label: 'XXS — 2px', r: 'var(--radius-xxs)' },
              { label: 'XS — 4px', r: 'var(--radius-xs)' },
              { label: 'S — 8px', r: 'var(--radius-s)' },
              { label: 'M — 12px', r: 'var(--radius-m)' },
              { label: 'L — 16px', r: 'var(--radius-l)' },
              { label: 'XL — 20px', r: 'var(--radius-xl)' },
              { label: 'XXL — 24px', r: 'var(--radius-xxl)' },
              { label: 'Max — 32px', r: 'var(--radius-max)' },
            ].map(({ label, r }) => (
              <div
                key={label}
                className="w-16 h-16 bg-(--bg-brand-tertiary) border-2 border-(--border-brand) flex items-center justify-center"
                style={{ borderRadius: r }}
              >
                <span style={{ fontSize: 'var(--text-micro)', color: 'var(--fg-brand-primary)', textAlign: 'center', lineHeight: '1.2' }}>{label}</span>
              </div>
            ))}
          </Row>
        </Section>

      </main>
    </div>
  )
}
