"use client"

interface BlaiseHelpButtonProps {
  onClick?: () => void
}

export function BlaiseHelpButton({ onClick }: BlaiseHelpButtonProps) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center justify-center w-5 h-5 bg-survey-help text-survey-text text-xs font-bold border border-survey-text-muted"
      aria-label="Help"
    >
      ?
    </button>
  )
}
