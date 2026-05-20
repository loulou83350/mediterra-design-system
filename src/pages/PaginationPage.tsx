import { useState } from 'react'
import { Pagination } from '../components/ui/Pagination'
import { ComponentPage, Control, ControlToggle } from './ComponentLayout'

const inputCls = 'h-8 px-(--padding-M) rounded-(--radius-S) border border-(--border-default) text-sm text-(--fg-primary) bg-(--bg-primary) outline-none focus:border-(--border-brand) w-full'

export function PaginationPage() {
  const [currentPage, setCurrentPage]     = useState(1)
  const [totalPages, setTotalPages]       = useState(200)
  const [showGoToFirst, setShowGoToFirst] = useState(true)
  const [showGoToLast, setShowGoToLast]   = useState(true)

  // Interactive demo
  const [demoPage, setDemoPage] = useState(1)

  return (
    <ComponentPage
      title="Pagination"
      description="Standard page navigation component. Shows page numbers with ellipsis for large sets, and optional jump-to-first/last controls. Current page highlighted in brand blue; hover state in dark blue."
      controls={
        <>
          <Control label="Current Page">
            <input
              type="number"
              min={1} max={totalPages}
              value={currentPage}
              onChange={e => {
                const v = parseInt(e.target.value)
                if (!isNaN(v) && v >= 1 && v <= totalPages) setCurrentPage(v)
              }}
              className={inputCls}
            />
          </Control>
          <Control label="Total Pages">
            <input
              type="number"
              min={1} max={9999}
              value={totalPages}
              onChange={e => {
                const v = parseInt(e.target.value)
                if (!isNaN(v) && v >= 1) {
                  setTotalPages(v)
                  setCurrentPage(Math.min(currentPage, v))
                }
              }}
              className={inputCls}
            />
          </Control>
          <Control label="Go to First («)">
            <ControlToggle value={showGoToFirst} onChange={setShowGoToFirst} />
          </Control>
          <Control label="Go to Last (»)">
            <ControlToggle value={showGoToLast} onChange={setShowGoToLast} />
          </Control>
        </>
      }
      preview={
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          showGoToFirst={showGoToFirst}
          showGoToLast={showGoToLast}
          onChange={setCurrentPage}
        />
      }
      states={[
        {
          label: 'Interactive',
          node: (
            <div className="flex flex-col gap-(--gap-M) items-center">
              <Pagination
                currentPage={demoPage}
                totalPages={20}
                onChange={setDemoPage}
              />
              <span style={{ fontFamily: 'var(--font-secondary)', fontSize: 14, color: 'var(--text-tertiary)' }}>
                Page {demoPage} of 20
              </span>
            </div>
          ),
        },
        {
          label: 'Page 1 — prev disabled',
          node: <Pagination currentPage={1} totalPages={200} />,
        },
        {
          label: 'Page 100 — middle',
          node: <Pagination currentPage={100} totalPages={200} />,
        },
        {
          label: 'Last page — next disabled',
          node: <Pagination currentPage={200} totalPages={200} />,
        },
        {
          label: 'Without Go to First / Last',
          node: <Pagination currentPage={5} totalPages={20} showGoToFirst={false} showGoToLast={false} />,
        },
        {
          label: 'Few pages (≤ 7 — no ellipsis)',
          node: <Pagination currentPage={3} totalPages={5} />,
        },
      ]}
    />
  )
}
