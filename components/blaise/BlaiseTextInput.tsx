"use client"

interface BlaiseTextInputProps {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  required?: boolean
}

export function BlaiseTextInput({
  id,
  label,
  value,
  onChange,
  placeholder,
  required,
}: BlaiseTextInputProps) {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-survey-text mb-1">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        type="text"
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full max-w-md px-2 py-1 border border-survey-text-muted text-survey-text bg-survey-white"
        required={required}
      />
    </div>
  )
}
