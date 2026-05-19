import type { CSSProperties } from 'react'
import { useState, useRef } from 'react'
import { Icon } from './Icon'
import { ProgressBar } from './ProgressBar'

export type FileType = 'image' | 'pdf' | 'video'

export interface UploadedFile {
  name: string
  fileType?: FileType
  progress?: number   // 0–100; if defined and < 100, shows progress bar
}

export interface FileUploadItemProps {
  name: string
  fileType?: FileType
  progress?: number
  onRemove?: () => void
}

export interface FileUploadProps {
  label?: string
  showLabel?: boolean
  files?: UploadedFile[]
  onRemove?: (index: number) => void
  onFiles?: (files: File[]) => void
  error?: boolean
  errorMessage?: string
  accept?: string
  multiple?: boolean
}

const textStyle: CSSProperties = {
  fontFamily: 'var(--font-secondary)',
  fontWeight: 400,
  fontSize: 16,
  lineHeight: '24px',
}

const fileNameStyle: CSSProperties = {
  fontFamily: 'var(--font-secondary)',
  fontWeight: 400,
  fontSize: 14,
  lineHeight: '20px',
}

const iconMap: Record<FileType, string> = {
  image: 'IconPhoto',
  pdf: 'IconFileText',
  video: 'IconMovie',
}

export function FileUploadItem({ name, fileType = 'image', progress, onRemove }: FileUploadItemProps) {
  const isUploading = progress !== undefined && progress < 100
  const iconName = iconMap[fileType]

  return (
    <div className="bg-(--bg-primary) border border-(--border-default) rounded-(--radius-M) flex items-center gap-(--gap-S) pl-(--padding-S) pr-(--padding-M) py-(--padding-S) w-full">
      <div className="bg-(--bg-brand_tertiary) p-(--padding-S) rounded-(--radius-XS) shrink-0">
        <Icon name={iconName} size={24} stroke={2} color="var(--fg-brand_primary)" />
      </div>

      <div className="flex-1 min-w-0 flex flex-col gap-(--gap-XXS)">
        <span className="truncate" style={{ ...fileNameStyle, color: 'var(--text-primary)' }}>
          {name}
        </span>
        {isUploading && <ProgressBar value={progress ?? 0} showScore={false} />}
      </div>

      <button
        type="button"
        onClick={onRemove}
        className="shrink-0 cursor-pointer hover:opacity-60 transition-opacity"
        aria-label="Remove file"
      >
        <Icon name="IconX" size={24} stroke={2} color="var(--fg-tertiary)" />
      </button>
    </div>
  )
}

export function FileUpload({
  label = 'Upload a file',
  showLabel = true,
  files = [],
  onRemove,
  onFiles,
  error = false,
  errorMessage = "The file can't be uploaded",
  accept,
  multiple = false,
}: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault()
    setIsDragging(true)
  }

  function handleDragLeave(e: React.DragEvent) {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setIsDragging(false)
    }
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    setIsDragging(false)
    const dropped = Array.from(e.dataTransfer.files)
    if (dropped.length) onFiles?.(dropped)
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = Array.from(e.target.files ?? [])
    if (selected.length) onFiles?.(selected)
    e.target.value = ''
  }

  const dropZoneBorder = isDragging
    ? 'border border-(--border-action)'
    : error
      ? 'border border-(--border-error_primary)'
      : 'border border-transparent hover:border-(--border-action_hover)'

  return (
    <div className="flex flex-col gap-(--gap-M) w-full">
      {showLabel && (
        <span style={{ ...textStyle, color: 'var(--text-primary)' }}>
          {label}
        </span>
      )}

      <div
        className={`bg-(--bg-secondary) rounded-(--radius-M) px-(--padding-XXL) py-(--padding-XXL) flex items-center justify-center transition-colors ${dropZoneBorder}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <p style={textStyle}>
          <span style={{ color: 'var(--text-primary)' }}>Drag and drop or </span>
          <label
            htmlFor="file-upload-input"
            className="underline cursor-pointer font-semibold"
            style={{ color: 'var(--text-action)' }}
          >
            choose a file
          </label>
          <span style={{ color: 'var(--text-primary)' }}> to upload</span>
        </p>

        <input
          ref={inputRef}
          id="file-upload-input"
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleInputChange}
          className="hidden"
        />
      </div>

      {error && (
        <span style={{ ...textStyle, color: 'var(--text-error)' }}>
          {errorMessage}
        </span>
      )}

      {files.length > 0 && (
        <div className="flex flex-col gap-(--gap-XS)">
          {files.map((file, i) => (
            <FileUploadItem
              key={i}
              name={file.name}
              fileType={file.fileType}
              progress={file.progress}
              onRemove={() => onRemove?.(i)}
            />
          ))}
        </div>
      )}
    </div>
  )
}
