import { useState } from 'react'
import { FileUpload, FileUploadItem } from '../components/ui/FileUpload'
import type { UploadedFile } from '../components/ui/FileUpload'
import { ComponentPage, Control, ControlToggle } from './ComponentLayout'

const DEMO_FILES: UploadedFile[] = [
  { name: 'Screenshot955.png', fileType: 'image' },
  { name: 'CNI.pdf', fileType: 'pdf' },
  { name: 'Review.mp4', fileType: 'video' },
]

export function FileUploadPage() {
  const [showLabel, setShowLabel]   = useState(true)
  const [error, setError]           = useState(false)
  const [errorMsg, setErrorMsg]     = useState("The file can't be uploaded because of an error")
  const [multiple, setMultiple]     = useState(true)
  const [files, setFiles]           = useState<UploadedFile[]>([])

  const inputCls = 'h-8 px-(--padding-M) rounded-(--radius-S) border border-(--border-default) text-sm text-(--fg-primary) bg-(--bg-primary) outline-none focus:border-(--border-brand) w-full'

  function handleFiles(newFiles: File[]) {
    const mapped: UploadedFile[] = newFiles.map(f => {
      const ext = f.name.split('.').pop()?.toLowerCase() ?? ''
      const fileType = ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext)
        ? 'image'
        : ext === 'pdf'
          ? 'pdf'
          : ['mp4', 'mov', 'avi', 'webm'].includes(ext)
            ? 'video'
            : 'image'
      return { name: f.name, fileType }
    })
    setFiles(prev => [...prev, ...mapped])
  }

  function handleRemove(index: number) {
    setFiles(prev => prev.filter((_, i) => i !== index))
  }

  return (
    <ComponentPage
      title="File Upload"
      description="The Upload a File component allows users to select and upload files from their device. It supports various file types and often includes drag-and-drop functionality."
      controls={
        <>
          <Control label="Label">
            <ControlToggle value={showLabel} onChange={setShowLabel} />
          </Control>
          <Control label="Error">
            <ControlToggle value={error} onChange={setError} />
          </Control>
          {error && (
            <Control label="Error message">
              <input value={errorMsg} onChange={e => setErrorMsg(e.target.value)} className={inputCls} />
            </Control>
          )}
          <Control label="Multiple files">
            <ControlToggle value={multiple} onChange={setMultiple} />
          </Control>
          <Control label="Files (playground)">
            <button
              type="button"
              onClick={() => setFiles(DEMO_FILES)}
              className="h-8 w-full px-(--padding-M) rounded-(--radius-S) border border-(--border-default) text-sm text-(--fg-primary) bg-(--bg-primary) hover:bg-(--bg-secondary) transition-colors cursor-pointer"
            >
              Load demo files
            </button>
          </Control>
          <Control label="">
            <button
              type="button"
              onClick={() => setFiles([])}
              className="h-8 w-full px-(--padding-M) rounded-(--radius-S) border border-(--border-default) text-sm text-(--fg-primary) bg-(--bg-primary) hover:bg-(--bg-secondary) transition-colors cursor-pointer"
            >
              Clear files
            </button>
          </Control>
        </>
      }
      preview={
        <div className="w-96">
          <FileUpload
            label="Upload a file"
            showLabel={showLabel}
            files={files}
            onFiles={handleFiles}
            onRemove={handleRemove}
            error={error}
            errorMessage={errorMsg}
            multiple={multiple}
          />
        </div>
      }
      states={[
        {
          label: 'Drop zone states',
          node: (
            <div className="grid grid-cols-2 gap-(--gap-L) w-full">
              <FileUpload label="Default (empty)" files={[]} />
              <FileUpload label="Error" error errorMessage="The file can't be uploaded because of an error" files={[]} />
            </div>
          ),
        },
        {
          label: 'With files uploaded',
          node: (
            <div className="w-96">
              <FileUpload
                label="Upload a file"
                files={DEMO_FILES}
                onRemove={() => {}}
              />
            </div>
          ),
        },
        {
          label: 'Uploading in progress',
          node: (
            <div className="w-96">
              <FileUpload
                label="Uploading…"
                files={[
                  { name: 'Screenshot955.png', fileType: 'image', progress: 60 },
                  { name: 'CNI.pdf', fileType: 'pdf', progress: 30 },
                  { name: 'Review.mp4', fileType: 'video' },
                ]}
                onRemove={() => {}}
              />
            </div>
          ),
        },
        {
          label: 'File item — all types',
          node: (
            <div className="flex flex-col gap-(--gap-S) w-80">
              <FileUploadItem name="Screenshot955.png" fileType="image" />
              <FileUploadItem name="CNI.pdf" fileType="pdf" />
              <FileUploadItem name="Review.mp4" fileType="video" />
              <FileUploadItem name="Uploading.png" fileType="image" progress={60} />
            </div>
          ),
        },
      ]}
    />
  )
}
