"use client"

interface BlaiseButtonProps {
  children: React.ReactNode
  onClick?: () => void
}

export function BlaiseButton({ children, onClick }: BlaiseButtonProps) {
  return (
    <button
      onClick={onClick}
      className="w-30 h-7.5 pt-0.5 align-bottom bg-survey-primary text-survey-white font-normal cursor-pointer rounded"
    >
      {children}
    </button>
  )
}
