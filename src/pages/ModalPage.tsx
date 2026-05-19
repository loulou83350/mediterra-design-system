import { useState } from 'react'
import { Modal, Drawer } from '../components/ui/Modal'
import type { ModalProps, DrawerProps } from '../components/ui/Modal'
import { ComponentPage, Control, ControlSelect, ControlToggle } from './ComponentLayout'

const MODAL_TYPES = ['default', 'img-vertical', 'img-horizontal'] as const
type ModalType = typeof MODAL_TYPES[number]

const SAMPLE_IMAGE = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&q=80'

const SAMPLE_CONTENT = (
  <p style={{ fontFamily: 'var(--font-secondary)', fontSize: 16, lineHeight: '24px', color: 'var(--text-secondary)', margin: 0 }}>
    This is the content slot. Put any real content here — text, form fields, a list, or any other component.
  </p>
)

// ─── Page ─────────────────────────────────────────────────────────────────────

export function ModalPage() {
  // Playground controls
  const [modalType, setModalType]           = useState<ModalType>('default')
  const [closeAction, setCloseAction]       = useState(true)
  const [showPrimary, setShowPrimary]       = useState(true)
  const [showSecondary, setShowSecondary]   = useState(true)
  const [drawerImage, setDrawerImage]       = useState(false)

  // Open state — tracks which overlay is open: null | 'modal' | 'drawer' | string key for state demos
  const [open, setOpen] = useState<string | null>(null)

  const close = () => setOpen(null)

  const modalProps: Omit<ModalProps, 'open' | 'onClose'> = {
    type: modalType,
    title: 'Modal title',
    closeAction,
    imageSrc: modalType !== 'default' ? SAMPLE_IMAGE : undefined,
    children: SAMPLE_CONTENT,
    primaryAction: showPrimary ? { label: 'Confirm', onClick: close } : undefined,
    secondaryAction: showSecondary ? { label: 'Cancel', onClick: close } : undefined,
  }

  const drawerProps: Omit<DrawerProps, 'open' | 'onClose'> = {
    title: 'Drawer title',
    closeAction,
    imageSrc: drawerImage ? SAMPLE_IMAGE : undefined,
    children: SAMPLE_CONTENT,
    primaryAction: showPrimary ? { label: 'Confirm', onClick: close } : undefined,
    secondaryAction: showSecondary ? { label: 'Cancel', onClick: close } : undefined,
  }

  const triggerCls = 'inline-flex items-center justify-center border-0 rounded-(--radius-S) transition-colors cursor-pointer whitespace-nowrap py-(--padding-S) pl-(--padding-M) pr-(--padding-L) text-[16px] leading-6 bg-(--bg-action) text-(--text-action_white) hover:bg-(--bg-action_hover)'
  const triggerFont = { fontFamily: 'var(--font-primary)', fontWeight: 800 }

  return (
    <>
      <ComponentPage
        title="Modal & Drawer"
        description="Two dialog components in one page. Modal: a dialog component typically used in desktop or larger screen environments — it overlays the current interface, requiring the user to interact with it before returning to the underlying content; ideal for tasks that require focused attention, such as forms, confirmations, or detailed information. Drawer: a dialog component primarily used on mobile devices, but applicable on larger screens too — unlike a modal, the drawer slides in from the bottom of the screen, allowing users to access additional content or controls without losing sight of the main interface; ideal for quick actions, settings, or additional navigation options that don't require the full-screen focus of a modal."
        controls={
          <>
            <Control label="Modal Type">
              <ControlSelect value={modalType} options={[...MODAL_TYPES]} onChange={v => setModalType(v as ModalType)} />
            </Control>
            <Control label="Close Button">
              <ControlToggle value={closeAction} onChange={setCloseAction} />
            </Control>
            <Control label="Primary Action">
              <ControlToggle value={showPrimary} onChange={setShowPrimary} />
            </Control>
            <Control label="Secondary Action">
              <ControlToggle value={showSecondary} onChange={setShowSecondary} />
            </Control>
            <Control label="Drawer Image">
              <ControlToggle value={drawerImage} onChange={setDrawerImage} />
            </Control>
          </>
        }
        preview={
          <div className="flex flex-wrap gap-(--gap-M)">
            <button type="button" style={triggerFont} className={triggerCls} onClick={() => setOpen('playground-modal')}>
              Open Modal
            </button>
            <button type="button" style={triggerFont} className={triggerCls} onClick={() => setOpen('playground-drawer')}>
              Open Drawer
            </button>
          </div>
        }
        states={[
          {
            label: 'Modal — default (no image)',
            node: (
              <button type="button" style={triggerFont} className={triggerCls} onClick={() => setOpen('state-modal-default')}>
                Open Modal
              </button>
            ),
          },
          {
            label: 'Modal — image top',
            node: (
              <button type="button" style={triggerFont} className={triggerCls} onClick={() => setOpen('state-modal-img-v')}>
                Open Modal with image top
              </button>
            ),
          },
          {
            label: 'Modal — image side (900px)',
            node: (
              <button type="button" style={triggerFont} className={triggerCls} onClick={() => setOpen('state-modal-img-h')}>
                Open Modal with image side
              </button>
            ),
          },
          {
            label: 'Drawer — default (blur overlay)',
            node: (
              <button type="button" style={triggerFont} className={triggerCls} onClick={() => setOpen('state-drawer-default')}>
                Open Drawer
              </button>
            ),
          },
          {
            label: 'Drawer — with image (no blur)',
            node: (
              <button type="button" style={triggerFont} className={triggerCls} onClick={() => setOpen('state-drawer-img')}>
                Open Drawer with image
              </button>
            ),
          },
        ]}
      />

      {/* Playground overlays */}
      <Modal
        open={open === 'playground-modal'}
        onClose={close}
        {...modalProps}
      />
      <Drawer
        open={open === 'playground-drawer'}
        onClose={close}
        {...drawerProps}
      />

      {/* State demo overlays */}
      <Modal
        open={open === 'state-modal-default'}
        onClose={close}
        type="default"
        title="Default modal"
        children={SAMPLE_CONTENT}
        primaryAction={{ label: 'Confirm', onClick: close }}
        secondaryAction={{ label: 'Cancel', onClick: close }}
      />
      <Modal
        open={open === 'state-modal-img-v'}
        onClose={close}
        type="img-vertical"
        title="Image top"
        imageSrc={SAMPLE_IMAGE}
        children={SAMPLE_CONTENT}
        primaryAction={{ label: 'Confirm', onClick: close }}
        secondaryAction={{ label: 'Cancel', onClick: close }}
      />
      <Modal
        open={open === 'state-modal-img-h'}
        onClose={close}
        type="img-horizontal"
        title="Image side"
        imageSrc={SAMPLE_IMAGE}
        children={SAMPLE_CONTENT}
        primaryAction={{ label: 'Confirm', onClick: close }}
        secondaryAction={{ label: 'Cancel', onClick: close }}
      />
      <Drawer
        open={open === 'state-drawer-default'}
        onClose={close}
        title="Drawer"
        children={SAMPLE_CONTENT}
        primaryAction={{ label: 'Confirm', onClick: close }}
        secondaryAction={{ label: 'Cancel', onClick: close }}
      />
      <Drawer
        open={open === 'state-drawer-img'}
        onClose={close}
        title="Drawer with image"
        imageSrc={SAMPLE_IMAGE}
        children={SAMPLE_CONTENT}
        primaryAction={{ label: 'Confirm', onClick: close }}
        secondaryAction={{ label: 'Cancel', onClick: close }}
      />
    </>
  )
}
