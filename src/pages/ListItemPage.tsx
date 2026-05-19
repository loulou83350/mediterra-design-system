import { useState } from 'react'
import { ListItem } from '../components/ui/ListItem'
import type { ListItemVariant } from '../components/ui/ListItem'
import { ComponentPage, Control, ControlSelect, ControlToggle, IconPicker } from './ComponentLayout'

export function ListItemPage() {
  const [variant, setVariant]           = useState<ListItemVariant>('default')
  const [showHeadIcon, setShowHeadIcon] = useState(true)
  const [headIcon, setHeadIcon]         = useState('IconPlus')
  const [showSubtitle, setShowSubtitle] = useState(true)
  const [title, setTitle]               = useState('Title')
  const [actionLabel, setActionLabel]   = useState('Download')
  const [actionIcon, setActionIcon]     = useState('IconDownload')
  const [tagLabel, setTagLabel]         = useState('Verified')

  const inputCls = 'h-8 px-(--padding-M) rounded-(--radius-S) border border-(--border-default) text-sm text-(--fg-primary) bg-(--bg-primary) outline-none focus:border-(--border-brand) w-full'

  return (
    <ComponentPage
      title="List Item"
      description="The List Item component is a versatile UI element used to display individual items within a list. It is a foundational element in many interfaces, often serving as a container for various types of content such as text, icons, images, and actions. List Items are commonly used in settings, content lists, and any interface where multiple items need to be presented in a structured and repeatable manner."
      controls={
        <>
          <Control label="Variant">
            <ControlSelect
              value={variant}
              options={['default', 'multiple-action', 'action', 'tag', 'placeholder']}
              onChange={v => setVariant(v as ListItemVariant)}
            />
          </Control>
          <Control label="Head Icon">
            <ControlToggle value={showHeadIcon} onChange={setShowHeadIcon} />
          </Control>
          {showHeadIcon && (
            <Control label="Icon">
              <IconPicker value={headIcon} onChange={setHeadIcon} />
            </Control>
          )}
          <Control label="Subtitle">
            <ControlToggle value={showSubtitle} onChange={setShowSubtitle} />
          </Control>
          <Control label="Title">
            <input
              value={title}
              onChange={e => setTitle(e.target.value)}
              className={inputCls}
            />
          </Control>
          {variant === 'action' && (
            <>
              <Control label="Action label">
                <input
                  value={actionLabel}
                  onChange={e => setActionLabel(e.target.value)}
                  className={inputCls}
                />
              </Control>
              <Control label="Action icon">
                <IconPicker value={actionIcon} onChange={setActionIcon} />
              </Control>
            </>
          )}
          {variant === 'tag' && (
            <Control label="Tag label">
              <input
                value={tagLabel}
                onChange={e => setTagLabel(e.target.value)}
                className={inputCls}
              />
            </Control>
          )}
        </>
      }
      preview={
        <div className="w-96 border border-(--border-default) rounded-(--radius-M) overflow-hidden">
          <ListItem
            variant={variant}
            title={title}
            showHeadIcon={showHeadIcon}
            headIcon={headIcon}
            showSubtitle={showSubtitle}
            actionLabel={actionLabel}
            actionIcon={actionIcon}
            tagLabel={tagLabel}
          />
        </div>
      }
      states={[
        {
          label: 'Default variants',
          node: (
            <div className="flex flex-col border border-(--border-default) rounded-(--radius-M) overflow-hidden divide-y divide-(--border-default) w-full max-w-lg">
              <ListItem title="Default item" subtitle="Secondary information" />
              <ListItem showSubtitle={false} title="Without subtitle" />
              <ListItem showHeadIcon={false} title="Without head icon" subtitle="No icon on the left" />
            </div>
          ),
        },
        {
          label: 'Multiple action',
          node: (
            <div className="flex flex-col border border-(--border-default) rounded-(--radius-M) overflow-hidden divide-y divide-(--border-default) w-full max-w-lg">
              <ListItem variant="multiple-action" title="With menu" subtitle="Tap ⋮ for actions" />
              <ListItem variant="multiple-action" title="Another row" subtitle="Context menu available" />
            </div>
          ),
        },
        {
          label: 'With action',
          node: (
            <div className="flex flex-col border border-(--border-default) rounded-(--radius-M) overflow-hidden divide-y divide-(--border-default) w-full max-w-lg">
              <ListItem variant="action" title="Downloadable file" subtitle="PDF — 2.4 MB" actionLabel="Download" actionIcon="IconDownload" />
              <ListItem variant="action" title="Add to your library" subtitle="Available for offline use" actionLabel="Add" actionIcon="IconBookmark" />
            </div>
          ),
        },
        {
          label: 'With tag',
          node: (
            <div className="flex flex-col border border-(--border-default) rounded-(--radius-M) overflow-hidden divide-y divide-(--border-default) w-full max-w-lg">
              <ListItem variant="tag" title="Verified item" subtitle="Validated by admin" tagLabel="Verified" />
              <ListItem variant="tag" title="Completed task" subtitle="Marked as done" tagLabel="Done" />
            </div>
          ),
        },
        {
          label: 'With placeholder',
          node: (
            <div className="flex flex-col border border-(--border-default) rounded-(--radius-M) overflow-hidden divide-y divide-(--border-default) w-full max-w-lg">
              <ListItem variant="placeholder" title="Media item" subtitle="Thumbnail on the right" />
              <ListItem variant="placeholder" title="Custom content" subtitle="Pass any ReactNode as tailContent" />
            </div>
          ),
        },
        {
          label: 'All variants stacked',
          node: (
            <div className="flex flex-col border border-(--border-default) rounded-(--radius-M) overflow-hidden divide-y divide-(--border-default) w-full max-w-lg">
              <ListItem title="Default item" subtitle="Secondary information" />
              <ListItem variant="multiple-action" title="With menu" subtitle="Tap ⋮ for actions" />
              <ListItem variant="action" title="Downloadable file" subtitle="PDF — 2.4 MB" actionLabel="Download" />
              <ListItem variant="tag" title="Tagged item" subtitle="Validated by admin" tagLabel="Verified" />
              <ListItem variant="placeholder" title="Media item" subtitle="Thumbnail on the right" />
            </div>
          ),
        },
      ]}
    />
  )
}
