import { useState } from 'react'
import { Banner } from '../components/ui/Banner'
import { ComponentPage, Control, ControlToggle } from './ComponentLayout'

export function BannerPage() {
  const [expand, setExpand]                     = useState(true)
  const [title, setTitle]                       = useState('Message Title')
  const [description, setDescription]           = useState('Message description about this important update or announcement.')
  const [showExpandCollapse, setShowExpandCollapse] = useState(true)
  const [showPrimary, setShowPrimary]           = useState(true)
  const [primaryLabel, setPrimaryLabel]         = useState('Action 1')
  const [showSecondary, setShowSecondary]       = useState(true)
  const [secondaryLabel, setSecondaryLabel]     = useState('Action 2')
  const [showLoader, setShowLoader]             = useState(false)

  const inputCls = 'h-8 px-(--padding-M) rounded-(--radius-S) border border-(--border-default) text-sm text-(--fg-primary) bg-(--bg-primary) outline-none focus:border-(--border-brand) w-full'

  return (
    <ComponentPage
      title="Banner"
      description="A Banner is a flexible message component that appears prominently but is less intrusive than a global alert. Banners can be used for informational purposes, non-critical updates, or promotional messages. They often contain additional actions, such as links or buttons, and can be collapsed or expanded based on user interaction. Banners are suitable for non-urgent communications that still need visibility but do not require persistent display."
      controls={
        <>
          <Control label="Expanded">
            <ControlToggle value={expand} onChange={setExpand} />
          </Control>
          <Control label="Title">
            <input value={title} onChange={e => setTitle(e.target.value)} className={inputCls} />
          </Control>
          <Control label="Description">
            <input value={description} onChange={e => setDescription(e.target.value)} className={inputCls} />
          </Control>
          <Control label="Expand/Collapse button">
            <ControlToggle value={showExpandCollapse} onChange={setShowExpandCollapse} />
          </Control>
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
          {!expand && (
            <Control label="Show loader">
              <ControlToggle value={showLoader} onChange={setShowLoader} />
            </Control>
          )}
        </>
      }
      preview={
        <div className="w-full">
          <Banner
            title={title}
            description={description}
            expand={expand}
            onToggle={() => setExpand(e => !e)}
            showExpandCollapse={showExpandCollapse}
            primaryAction={showPrimary ? { label: primaryLabel, onClick: () => {} } : undefined}
            secondaryAction={showSecondary ? { label: secondaryLabel, onClick: () => {} } : undefined}
            showLoader={showLoader}
          />
        </div>
      }
      states={[
        {
          label: 'Expanded — with image placeholder',
          node: (
            <div className="w-full">
              <Banner
                title="Welcome to Mediterra"
                description="Discover our new features and updates. This banner highlights the most important announcement for your users."
                expand
                showExpandCollapse
                primaryAction={{ label: 'Get started', onClick: () => {} }}
                secondaryAction={{ label: 'Learn more', onClick: () => {} }}
              />
            </div>
          ),
        },
        {
          label: 'Collapsed',
          node: (
            <div className="w-full">
              <Banner
                title="Welcome to Mediterra"
                description="Discover our new features and updates. This banner highlights the most important announcement for your users."
                expand={false}
                showExpandCollapse
                primaryAction={{ label: 'Get started', onClick: () => {} }}
                secondaryAction={{ label: 'Learn more', onClick: () => {} }}
              />
            </div>
          ),
        },
        {
          label: 'Collapsed — with loader',
          node: (
            <div className="w-full">
              <Banner
                title="Syncing your data…"
                description="Please wait while we update your account information."
                expand={false}
                showExpandCollapse={false}
                showLoader
                primaryAction={{ label: 'Cancel', onClick: () => {} }}
              />
            </div>
          ),
        },
        {
          label: 'Without actions',
          node: (
            <div className="w-full flex flex-col gap-(--gap-M)">
              <Banner
                title="Informational banner"
                description="No action required — this is purely an informational message."
                expand
              />
              <Banner
                title="Informational banner"
                description="Collapsed, no actions."
                expand={false}
              />
            </div>
          ),
        },
      ]}
    />
  )
}
