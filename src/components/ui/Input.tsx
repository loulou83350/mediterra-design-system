import React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  hint?: string
  error?: string
}

export function Input({ label, hint, error, id, className = '', ...props }: InputProps) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-')
  return (
    <div className="flex flex-col gap-(--gap-XS)">
      {label && (
        <label htmlFor={inputId} className="text-sm font-semibold text-(--fg-primary)">
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={`h-10 px-(--padding-L) rounded-(--radius-M) border text-base text-(--fg-primary) bg-(--bg-primary) outline-none transition-colors
          border-(--border-default)
          placeholder:text-(--fg-tertiary)
          focus:border-(--border-brand) focus:ring-2 focus:ring-(--blue-200)
          disabled:bg-(--bg-secondary) disabled:text-(--fg-tertiary) disabled:cursor-not-allowed
          ${error ? 'border-(--bg-error_primary) focus:ring-(--red-200)' : ''}
          ${className}`}
        {...props}
      />
      {hint && !error && <p className="text-xs text-(--fg-tertiary)">{hint}</p>}
      {error && <p className="text-xs text-(--fg-error_primary)">{error}</p>}
    </div>
  )
}
