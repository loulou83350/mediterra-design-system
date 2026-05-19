// Nomenclature exacte Figma — aucune liberté sur les noms

type ColorSwatch = { name: string; value: string; primitive?: string }
type ColorGroup = { group: string; colors: ColorSwatch[] }

const primitives: ColorGroup[] = [
  {
    group: 'Colors / Blue - Brand Colors',
    colors: [
      { name: 'blue-050', value: '#f0faff' },
      { name: 'blue-100', value: '#e0f3fe' },
      { name: 'blue-200', value: '#b9e8fe' },
      { name: 'blue-300', value: '#7ad8fe' },
      { name: 'blue-400', value: '#35c5fb' },
      { name: 'blue-500', value: '#0baeec' },
      { name: 'blue-600', value: '#008cca' },
      { name: 'blue-700', value: '#0170a3' },
      { name: 'blue-800', value: '#055f87' },
      { name: 'blue-900', value: '#0a4e70' },
      { name: 'blue-950', value: '#07314a' },
      { name: 'blue-900 60%', value: '#07314a99' },
      { name: 'blue-900 80%', value: '#07314acc' },
    ],
  },
  {
    group: 'Colors / Blue',
    colors: [
      { name: 'blue-050', value: '#f0faff' },
      { name: 'blue-100', value: '#e0f3fe' },
      { name: 'blue-200', value: '#b9e8fe' },
      { name: 'blue-300', value: '#7ad8fe' },
      { name: 'blue-400', value: '#35c5fb' },
      { name: 'blue-500', value: '#0baeec' },
      { name: 'blue-600', value: '#008cca' },
      { name: 'blue-700', value: '#0170a3' },
      { name: 'blue-800', value: '#055f87' },
      { name: 'blue-900', value: '#0a4e70' },
      { name: 'blue-950', value: '#07314a' },
    ],
  },
  {
    group: 'Colors / Green',
    colors: [
      { name: 'green-050', value: '#f0fdf3' },
      { name: 'green-100', value: '#dcfce4' },
      { name: 'green-200', value: '#baf8ca' },
      { name: 'green-300', value: '#85f0a2' },
      { name: 'green-400', value: '#4be074' },
      { name: 'green-500', value: '#20c74f' },
      { name: 'green-600', value: '#15a43d' },
      { name: 'green-700', value: '#148133' },
      { name: 'green-800', value: '#15662d' },
      { name: 'green-900', value: '#135427' },
      { name: 'green-950', value: '#052e12' },
    ],
  },
  {
    group: 'Colors / Orange',
    colors: [
      { name: 'orange-050', value: '#fcf9ea' },
      { name: 'orange-100', value: '#faf1c7' },
      { name: 'orange-200', value: '#f6e092' },
      { name: 'orange-300', value: '#f0c754' },
      { name: 'orange-400', value: '#ebb230' },
      { name: 'orange-500', value: '#da9718' },
      { name: 'orange-600', value: '#bc7312' },
      { name: 'orange-700', value: '#965212' },
      { name: 'orange-800', value: '#7d4216' },
      { name: 'orange-900', value: '#6a3719' },
      { name: 'orange-950', value: '#3e1c0a' },
    ],
  },
  {
    group: 'Colors / Red',
    colors: [
      { name: 'red-050', value: '#fef2f3' },
      { name: 'red-100', value: '#fde6e8' },
      { name: 'red-200', value: '#fad1d6' },
      { name: 'red-300', value: '#f6abb4' },
      { name: 'red-400', value: '#ee6e80' },
      { name: 'red-500', value: '#e54e67' },
      { name: 'red-600', value: '#d12d50' },
      { name: 'red-700', value: '#b02042' },
      { name: 'red-800', value: '#931e3d' },
      { name: 'red-900', value: '#7e1d3b' },
      { name: 'red-950', value: '#460b1c' },
    ],
  },
  {
    group: 'Colors / Neutral',
    colors: [
      { name: 'Grey-050', value: '#f7f9fc' },
      { name: 'Grey-100', value: '#f7f9fc' },
      { name: 'Grey-200', value: '#edf0f7' },
      { name: 'Grey-300', value: '#e2e7f0' },
      { name: 'Grey-400', value: '#cbd2e0' },
      { name: 'Grey-500', value: '#a0abc0' },
      { name: 'Grey-600', value: '#717d96' },
      { name: 'Grey-700', value: '#4a5468' },
      { name: 'Grey-800', value: '#2d3648' },
      { name: 'Grey-900', value: '#1a202c' },
      { name: 'Grey-950', value: '#1a202c' },
    ],
  },
  {
    group: 'Colors / Basics',
    colors: [
      { name: 'White', value: '#ffffff' },
    ],
  },
]

const semantic: ColorGroup[] = [
  {
    group: 'Background',
    colors: [
      { name: 'bg-page',               value: '#f7f9fc',   primitive: 'Grey-050' },
      { name: 'bg-primary',            value: '#ffffff',   primitive: 'White' },
      { name: 'bg-secondary',          value: '#f7f9fc',   primitive: 'Grey-050' },
      { name: 'bg-tertiary',           value: '#f7f9fc',   primitive: 'Grey-100' },
      { name: 'bg-quaterny',           value: '#edf0f7',   primitive: 'Grey-200' },
      { name: 'bg-brand_primary',      value: '#0baeec',   primitive: 'primary' },
      { name: 'bg-brand_secondary',    value: '#b9e8fe',   primitive: 'blue-200' },
      { name: 'bg-brand_tertiary',     value: '#f0faff',   primitive: 'blue-050' },
      { name: 'bg-action',             value: '#0baeec',   primitive: 'primary' },
      { name: 'bg-action_hover',       value: '#0170a3',   primitive: 'blue-700' },
      { name: 'bg-action_white',       value: '#ffffff',   primitive: 'White' },
      { name: 'bg-action_white_hover', value: '#b9e8fe',   primitive: 'blue-200' },
      { name: 'bg-overlay',            value: '#1a202ccc', primitive: 'Grey-950 / 80%' },
      { name: 'bg-tooltips',           value: '#1a202c',   primitive: 'Grey-950' },
      { name: 'bg-white',              value: '#ffffff',   primitive: 'White' },
      { name: 'bg-succes_primary',     value: '#20c74f',   primitive: 'green-500' },
      { name: 'bg-succes_secondary',   value: '#baf8ca',   primitive: 'green-200' },
      { name: 'bg-succes_tertiary',    value: '#f0fdf3',   primitive: 'green-050' },
      { name: 'bg-warning_primary',    value: '#da9718',   primitive: 'orange-500' },
      { name: 'bg-warning_secondary',  value: '#f6e092',   primitive: 'orange-200' },
      { name: 'bg-warning_tertiary',   value: '#fcf9ea',   primitive: 'orange-050' },
      { name: 'bg-error_primary',      value: '#e54e67',   primitive: 'red-500' },
      { name: 'bg-error_secondary',    value: '#fad1d6',   primitive: 'red-200' },
      { name: 'bg-error_tertiary',     value: '#fef2f3',   primitive: 'red-050' },
      { name: 'bg-neutral_primary',    value: '#0baeec',   primitive: 'blue-500' },
      { name: 'bg-neutral_secondary',  value: '#b9e8fe',   primitive: 'blue-200' },
      { name: 'bg-neutral_tertiary',   value: '#f0faff',   primitive: 'blue-050' },
    ],
  },
  {
    group: 'Foreground',
    colors: [
      { name: 'fg-primary',            value: '#1a202c', primitive: 'Grey-950' },
      { name: 'fg-secondary',          value: '#4a5468', primitive: 'Grey-700' },
      { name: 'fg-tertiary',           value: '#717d96', primitive: 'Grey-600' },
      { name: 'fg-quaterny',           value: '#cbd2e0', primitive: 'Grey-400' },
      { name: 'fg-quinternary',        value: '#e2e7f0', primitive: 'Grey-300' },
      { name: 'fg-brand_primary',      value: '#0baeec', primitive: 'primary' },
      { name: 'fg-brand_secondary',    value: '#b9e8fe', primitive: 'blue-200' },
      { name: 'fg-brand_tertiary',     value: '#f0faff', primitive: 'blue-050' },
      { name: 'fg-action',             value: '#0baeec', primitive: 'primary' },
      { name: 'fg-action_hover',       value: '#0170a3', primitive: 'blue-700' },
      { name: 'fg-action_white',       value: '#ffffff', primitive: 'White' },
      { name: 'fg-action_white_hover', value: '#b9e8fe', primitive: 'blue-200' },
      { name: 'fg-white',              value: '#ffffff', primitive: 'White' },
      { name: 'fg-succes_primary',     value: '#20c74f', primitive: 'green-500' },
      { name: 'fg-succes_secondary',   value: '#baf8ca', primitive: 'green-200' },
      { name: 'fg-succes_tertiary',    value: '#f0fdf3', primitive: 'green-050' },
      { name: 'fg-warning_primary',    value: '#da9718', primitive: 'orange-500' },
      { name: 'fg-warning_secondary',  value: '#f6e092', primitive: 'orange-200' },
      { name: 'fg-warning_tertiary',   value: '#fcf9ea', primitive: 'orange-050' },
      { name: 'fg-error_primary',      value: '#e54e67', primitive: 'red-500' },
      { name: 'fg-error_secondary',    value: '#fad1d6', primitive: 'red-200' },
      { name: 'fg-error_tertiary',     value: '#fef2f3', primitive: 'red-050' },
      { name: 'fg-neutral_primary',    value: '#0baeec', primitive: 'blue-500' },
      { name: 'fg-neutral_secondary',  value: '#b9e8fe', primitive: 'blue-200' },
      { name: 'fg-neutral_tertiary',   value: '#f0faff', primitive: 'blue-050' },
    ],
  },
  {
    group: 'Text',
    colors: [
      { name: 'text-primary',       value: '#1a202c', primitive: 'Grey-950' },
      { name: 'text-secondary',     value: '#4a5468', primitive: 'Grey-700' },
      { name: 'text-tertiary',      value: '#717d96', primitive: 'Grey-600' },
      { name: 'text-link',          value: '#0baeec', primitive: 'primary' },
      { name: 'text-link_hover',    value: '#0170a3', primitive: 'blue-700' },
      { name: 'text-action',        value: '#0baeec', primitive: 'primary' },
      { name: 'text-action_hover',  value: '#0170a3', primitive: 'blue-700' },
      { name: 'text-action_white',  value: '#ffffff', primitive: 'White' },
      { name: 'text-white-action',  value: '#ffffff', primitive: 'White' },
      { name: 'text-brand',         value: '#0baeec', primitive: 'primary' },
      { name: 'text-neutral',       value: '#0baeec', primitive: 'blue-500' },
      { name: 'text-success',       value: '#15a43d', primitive: 'green-600' },
      { name: 'text-warning',       value: '#da9718', primitive: 'orange-500' },
      { name: 'text-error',         value: '#e54e67', primitive: 'red-500' },
      { name: 'text-placeholder',   value: '#717d96', primitive: 'Grey-600' },
      { name: 'text-invert',        value: '#ffffff', primitive: 'White' },
    ],
  },
  {
    group: 'Border',
    colors: [
      { name: 'border-default',         value: '#e2e7f0', primitive: 'Grey-300' },
      { name: 'border-brand',           value: '#0baeec', primitive: 'primary' },
      { name: 'border-action',          value: '#0baeec', primitive: 'primary' },
      { name: 'border-action_hover',    value: '#0170a3', primitive: 'blue-700' },
      { name: 'border-success_primary', value: '#20c74f', primitive: 'green-500' },
      { name: 'border-warning_primary', value: '#da9718', primitive: 'orange-500' },
      { name: 'border-error_primary',   value: '#e54e67', primitive: 'red-500' },
      { name: 'border-white',           value: '#ffffff', primitive: 'White' },
      { name: 'border-neutral_primary', value: '#0baeec', primitive: 'blue-500' },
    ],
  },
]

// Checkerboard pour les couleurs très claires ou transparentes
const checkerStyle: React.CSSProperties = {
  backgroundImage: `
    linear-gradient(45deg, #e5e7eb 25%, transparent 25%),
    linear-gradient(-45deg, #e5e7eb 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, #e5e7eb 75%),
    linear-gradient(-45deg, transparent 75%, #e5e7eb 75%)
  `,
  backgroundSize: '8px 8px',
  backgroundPosition: '0 0, 0 4px, 4px -4px, -4px 0px',
}

function isLight(hex: string): boolean {
  const h = hex.replace('#', '').slice(0, 6)
  const r = parseInt(h.slice(0, 2), 16)
  const g = parseInt(h.slice(2, 4), 16)
  const b = parseInt(h.slice(4, 6), 16)
  return (r * 299 + g * 587 + b * 114) / 1000 > 220
}

function Swatch({ name, value, primitive }: ColorSwatch) {
  const veryLight = isLight(value)
  return (
    <div className="flex flex-col overflow-hidden rounded-(--radius-M) border border-(--border-default)">
      {/* Swatch avec checkerboard pour les clairs */}
      <div className="relative h-14 w-full" style={veryLight ? checkerStyle : undefined}>
        <div className="absolute inset-0" style={{ backgroundColor: value }} />
      </div>
      <div className="p-(--padding-S) bg-(--bg-primary) border-t border-(--border-default)">
        <p className="text-xs font-semibold text-(--fg-primary) truncate">{name}</p>
        <p className="text-xs text-(--fg-tertiary) mt-0.5 font-mono">{value}</p>
        {primitive && (
          <p className="text-xs text-(--fg-brand_primary) mt-0.5 truncate">↳ {primitive}</p>
        )}
      </div>
    </div>
  )
}

function ColorGroupSection({ group, colors }: ColorGroup) {
  return (
    <section className="flex flex-col gap-(--gap-M)">
      <h3 className="text-sm font-semibold text-(--fg-tertiary) uppercase tracking-wider border-b border-(--border-default) pb-(--padding-S)">
        {group}
      </h3>
      <div className="grid grid-cols-4 gap-(--gap-M) sm:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10">
        {colors.map(c => <Swatch key={c.name + c.value} {...c} />)}
      </div>
    </section>
  )
}

export function ColorsPage() {
  return (
    <div className="p-(--padding-XXXL) flex flex-col gap-(--gap-XXXL)">
      <div>
        <h1 style={{ fontFamily: 'var(--font-primary)', fontWeight: 800 }}>Colors</h1>
        <p className="mt-(--gap-S) text-sm text-(--fg-secondary)">
          Exact Figma variable naming. Semantic tokens (↳) reference their source primitive.
        </p>
      </div>

      <div className="flex flex-col gap-(--gap-XXXL)">
        <div>
          <h2 className="text-base font-semibold text-(--fg-primary) mb-(--gap-L)">Primitives</h2>
          <div className="flex flex-col gap-(--gap-XXL)">
            {primitives.map(g => <ColorGroupSection key={g.group} {...g} />)}
          </div>
        </div>

        <div>
          <h2 className="text-base font-semibold text-(--fg-primary) mb-(--gap-L)">Semantic tokens</h2>
          <div className="flex flex-col gap-(--gap-XXL)">
            {semantic.map(g => <ColorGroupSection key={g.group} {...g} />)}
          </div>
        </div>
      </div>
    </div>
  )
}
