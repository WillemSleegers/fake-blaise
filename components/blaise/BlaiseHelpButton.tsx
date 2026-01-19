"use client"

import Image from "next/image"

interface BlaiseHelpButtonProps {
  onClick?: () => void
}

export function BlaiseHelpButton({ onClick }: BlaiseHelpButtonProps) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center justify-center"
      aria-label="Help"
    >
      <Image src="/QuestionMark.png" alt="Help" width={20} height={20} />
    </button>
  )
}
