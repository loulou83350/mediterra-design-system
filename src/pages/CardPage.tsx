import { useState } from 'react'
import { Card, CardImage, EmptyState, CardCTA } from '../components/ui/Card'
import { ComponentPage, Control, ControlSelect, ControlToggle, IconPicker } from './ComponentLayout'

type CardType = 'Card' | 'CardImage' | 'EmptyState' | 'CardCTA'
type ContentType = 'Placeholder' | 'Text' | 'Stats' | 'List'

const CARD_TYPES: CardType[] = ['Card', 'CardImage', 'EmptyState', 'CardCTA']
const CONTENT_TYPES: ContentType[] = ['Placeholder', 'Text', 'Stats', 'List']

// ─── Content examples ─────────────────────────────────────────────────────────

const Placeholder = () => (
  <div style={{ height: 80, backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-S)' }} />
)

const TextContent = () => (
  <p style={{ fontFamily: 'var(--font-secondary)', fontWeight: 400, fontSize: 14, lineHeight: '20px', color: 'var(--text-secondary)', margin: 0 }}>
    This card can hold any content you pass as children — paragraphs, forms, data tables, or custom components. Replace this text with your real content.
  </p>
)

const StatsContent = () => (
  <div style={{ display: 'flex', gap: 'var(--gap-L)' }}>
    {[{ value: '12.4k', label: 'Users' }, { value: '98%', label: 'Uptime' }, { value: '3.2s', label: 'Avg. load' }].map(({ value, label }) => (
      <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--gap-XXS)' }}>
        <span style={{ fontFamily: 'var(--font-primary)', fontWeight: 800, fontSize: 24, lineHeight: '32px', color: 'var(--text-primary)' }}>{value}</span>
        <span style={{ fontFamily: 'var(--font-secondary)', fontWeight: 400, fontSize: 14, lineHeight: '20px', color: 'var(--text-secondary)' }}>{label}</span>
      </div>
    ))}
  </div>
)

const ListContent = () => (
  <ol style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 'var(--gap-S)' }}>
    {['Connect your data source', 'Configure your pipeline', 'Review and publish'].map((item, i) => (
      <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 'var(--gap-S)' }}>
        <span style={{ fontFamily: 'var(--font-primary)', fontWeight: 800, fontSize: 12, lineHeight: '16px', color: 'var(--text-brand)', backgroundColor: 'var(--bg-brand_tertiary)', borderRadius: '50%', width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{i + 1}</span>
        <span style={{ fontFamily: 'var(--font-secondary)', fontWeight: 400, fontSize: 14, lineHeight: '20px', color: 'var(--text-secondary)' }}>{item}</span>
      </li>
    ))}
  </ol>
)

function ContentPreview({ type }: { type: ContentType }) {
  if (type === 'Text') return <TextContent />
  if (type === 'Stats') return <StatsContent />
  if (type === 'List') return <ListContent />
  return <Placeholder />
}

const CTAContent = () => (
  <p style={{ fontFamily: 'var(--font-primary)', fontWeight: 800, fontSize: 24, lineHeight: '32px', color: 'var(--text-invert)', margin: 0 }}>
    Start your free trial today
  </p>
)

export function CardPage() {
  const [cardType, setCardType] = useState<CardType>('Card')
  const [contentType, setContentType] = useState<ContentType>('Placeholder')

  // Card state
  const [showIcon, setShowIcon]   = useState(true)
  const [iconName, setIconName]   = useState('IconComponents')
  const [showTitle, setShowTitle] = useState(true)
  const [cardTitle, setCardTitle] = useState('Title')

  // CardImage state
  const [vertical, setVertical]             = useState(true)
  const [showImageTitle, setShowImageTitle] = useState(true)
  const [imageTitle, setImageTitle]         = useState('Title')

  // EmptyState state
  const [background, setBackground]       = useState(true)
  const [emptyTitle, setEmptyTitle]       = useState('Nothing here')
  const [emptySubtitle, setEmptySubtitle] = useState('This place is empty')
  const [showAction, setShowAction]       = useState(true)

  // Shared action state
  const [showPrimary, setShowPrimary]       = useState(true)
  const [primaryLabel, setPrimaryLabel]     = useState('Main action')
  const [showSecondary, setShowSecondary]   = useState(true)
  const [secondaryLabel, setSecondaryLabel] = useState('Second action')

  const primaryAction   = showPrimary   ? { label: primaryLabel,   onClick: () => {} } : undefined
  const secondaryAction = showSecondary ? { label: secondaryLabel, onClick: () => {} } : undefined

  const inputCls = 'h-8 px-(--padding-M) rounded-(--radius-S) border border-(--border-default) text-sm text-(--fg-primary) bg-(--bg-primary) outline-none focus:border-(--border-brand) w-full'

  return (
    <ComponentPage
      title="Card"
      description="Four card types in one page. Basic Card: the simplest form of a card — provides a clean, structured layout for displaying text, links, buttons, or other UI elements, typically used to showcase a concise set of information such as a user profile, a data summary, or a product description. Card with Image: extends the basic card by incorporating an image at the top or side; useful for visually-rich content where a photo or graphic contextualises the information. Empty State: a special type of card used to convey a message or guide users when there is no content to display — includes an illustration, a brief message, and an optional action to help the user get started. Card CTA: a call-to-action card with a brand gradient background, designed to drive a specific user action."
      controls={
        <>
          <Control label="Card Type">
            <ControlSelect value={cardType} options={CARD_TYPES} onChange={v => setCardType(v as CardType)} />
          </Control>

          {/* Content type — visible for Card and CardImage */}
          {(cardType === 'Card' || cardType === 'CardImage') && (
            <Control label="Content">
              <ControlSelect value={contentType} options={CONTENT_TYPES} onChange={v => setContentType(v as ContentType)} />
            </Control>
          )}

          {/* Card controls */}
          {cardType === 'Card' && (
            <>
              <Control label="Show Icon">
                <ControlToggle value={showIcon} onChange={setShowIcon} />
              </Control>
              {showIcon && (
                <Control label="Icon">
                  <IconPicker value={iconName} onChange={setIconName} />
                </Control>
              )}
              <Control label="Show Title">
                <ControlToggle value={showTitle} onChange={setShowTitle} />
              </Control>
              {showTitle && (
                <Control label="Title">
                  <input value={cardTitle} onChange={e => setCardTitle(e.target.value)} className={inputCls} />
                </Control>
              )}
            </>
          )}

          {/* CardImage controls */}
          {cardType === 'CardImage' && (
            <>
              <Control label="Vertical">
                <ControlToggle value={vertical} onChange={setVertical} />
              </Control>
              <Control label="Show Title">
                <ControlToggle value={showImageTitle} onChange={setShowImageTitle} />
              </Control>
              {showImageTitle && (
                <Control label="Title">
                  <input value={imageTitle} onChange={e => setImageTitle(e.target.value)} className={inputCls} />
                </Control>
              )}
            </>
          )}

          {/* EmptyState controls */}
          {cardType === 'EmptyState' && (
            <>
              <Control label="Background">
                <ControlToggle value={background} onChange={setBackground} />
              </Control>
              <Control label="Title">
                <input value={emptyTitle} onChange={e => setEmptyTitle(e.target.value)} className={inputCls} />
              </Control>
              <Control label="Subtitle">
                <input value={emptySubtitle} onChange={e => setEmptySubtitle(e.target.value)} className={inputCls} />
              </Control>
              <Control label="Show Action">
                <ControlToggle value={showAction} onChange={setShowAction} />
              </Control>
              {showAction && (
                <Control label="Action label">
                  <input value={primaryLabel} onChange={e => setPrimaryLabel(e.target.value)} className={inputCls} />
                </Control>
              )}
            </>
          )}

          {/* Shared action controls (Card, CardImage, CardCTA) */}
          {cardType !== 'EmptyState' && (
            <>
              <Control label="Primary action">
                <ControlToggle value={showPrimary} onChange={setShowPrimary} />
              </Control>
              {showPrimary && (
                <Control label="Primary label">
                  <input value={primaryLabel} onChange={e => setPrimaryLabel(e.target.value)} className={inputCls} />
                </Control>
              )}
              <Control label="Secondary action">
                <ControlToggle value={showSecondary} onChange={setShowSecondary} />
              </Control>
              {showSecondary && (
                <Control label="Secondary label">
                  <input value={secondaryLabel} onChange={e => setSecondaryLabel(e.target.value)} className={inputCls} />
                </Control>
              )}
            </>
          )}
        </>
      }
      preview={
        <div style={{ width: '100%', maxWidth: cardType === 'CardImage' && !vertical ? 700 : cardType === 'EmptyState' ? 600 : 480 }}>
          {cardType === 'Card' && (
            <Card
              icon={iconName as any}
              showIcon={showIcon}
              title={cardTitle}
              showTitle={showTitle}
              primaryAction={primaryAction}
              secondaryAction={secondaryAction}
            >
              <ContentPreview type={contentType} />
            </Card>
          )}
          {cardType === 'CardImage' && (
            <CardImage
              vertical={vertical}
              title={imageTitle}
              showTitle={showImageTitle}
              primaryAction={primaryAction}
              secondaryAction={secondaryAction}
            >
              <ContentPreview type={contentType} />
            </CardImage>
          )}
          {cardType === 'EmptyState' && (
            <EmptyState
              background={background}
              title={emptyTitle}
              subtitle={emptySubtitle}
              action={showAction ? { label: primaryLabel, onClick: () => {} } : undefined}
            />
          )}
          {cardType === 'CardCTA' && (
            <CardCTA primaryAction={primaryAction} secondaryAction={secondaryAction}>
              <CTAContent />
            </CardCTA>
          )}
        </div>
      }
      states={[
        {
          label: 'Card — with icon and actions',
          node: (
            <div style={{ width: '100%', maxWidth: 480 }}>
              <Card
                primaryAction={{ label: 'Main action', onClick: () => {} }}
                secondaryAction={{ label: 'Second action', onClick: () => {} }}
              >
                <TextContent />
              </Card>
            </div>
          ),
        },
        {
          label: 'Card — stats content',
          node: (
            <div style={{ width: '100%', maxWidth: 480 }}>
              <Card showIcon={false} primaryAction={{ label: 'View report', onClick: () => {} }}>
                <StatsContent />
              </Card>
            </div>
          ),
        },
        {
          label: 'Card — list content',
          node: (
            <div style={{ width: '100%', maxWidth: 480 }}>
              <Card title="Getting started" primaryAction={{ label: 'Get started', onClick: () => {} }}>
                <ListContent />
              </Card>
            </div>
          ),
        },
        {
          label: 'CardImage — vertical',
          node: (
            <div style={{ width: '100%', maxWidth: 480 }}>
              <CardImage
                vertical
                primaryAction={{ label: 'Main action', onClick: () => {} }}
                secondaryAction={{ label: 'Second action', onClick: () => {} }}
              >
                <TextContent />
              </CardImage>
            </div>
          ),
        },
        {
          label: 'CardImage — horizontal',
          node: (
            <div style={{ width: '100%', maxWidth: 700 }}>
              <CardImage
                vertical={false}
                primaryAction={{ label: 'Main action', onClick: () => {} }}
                secondaryAction={{ label: 'Second action', onClick: () => {} }}
              >
                <TextContent />
              </CardImage>
            </div>
          ),
        },
        {
          label: 'EmptyState — with background',
          node: (
            <div style={{ width: '100%', maxWidth: 600 }}>
              <EmptyState background action={{ label: 'Get started', onClick: () => {} }} />
            </div>
          ),
        },
        {
          label: 'EmptyState — transparent',
          node: (
            <div style={{ width: '100%', maxWidth: 600 }}>
              <EmptyState background={false} action={{ label: 'Get started', onClick: () => {} }} />
            </div>
          ),
        },
        {
          label: 'CardCTA',
          node: (
            <div style={{ width: '100%', maxWidth: 480 }}>
              <CardCTA
                primaryAction={{ label: 'Main action', onClick: () => {} }}
                secondaryAction={{ label: 'Second action', onClick: () => {} }}
              >
                <CTAContent />
              </CardCTA>
            </div>
          ),
        },
      ]}
    />
  )
}
