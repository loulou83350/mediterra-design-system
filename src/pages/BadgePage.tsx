import { useState } from 'react'
import { Badge } from '../components/ui/Badge'
import { ComponentPage, Control, ControlSelect } from './ComponentLayout'

export function BadgePage() {
  const [variant, setVariant] = useState('brand')
  const [label, setLabel] = useState('New')

  return (
    <ComponentPage
      title="Badge"
      description="Short label to indicate a status, category or notification."
      controls={
        <>
          <Control label="Variant">
            <ControlSelect value={variant} options={['brand', 'success', 'warning', 'error', 'neutral']} onChange={setVariant} />
          </Control>
          <Control label="Text">
            <input
              value={label}
              onChange={e => setLabel(e.target.value)}
              className="h-8 px-(--padding-S) rounded-(--radius-S) border border-(--border-default) text-sm text-(--fg-primary) bg-(--bg-primary) outline-none focus:border-(--border-brand) w-full"
            />
          </Control>
        </>
      }
      preview={<Badge variant={variant as any}>{label}</Badge>}
      states={[
        {
          label: 'All variants',
          node: <>
            <Badge variant="brand">Brand</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="error">Error</Badge>
            <Badge variant="neutral">Neutral</Badge>
          </>
        },
        {
          label: 'Content examples',
          node: <>
            <Badge variant="success">Active</Badge>
            <Badge variant="warning">Pending</Badge>
            <Badge variant="error">Error</Badge>
            <Badge variant="brand">Beta</Badge>
            <Badge variant="neutral">Archived</Badge>
            <Badge variant="neutral">v2.1.0</Badge>
          </>
        },
      ]}
    />
  )
}
