"use client"

import Image from "next/image"
import { cn } from "@/lib/utils"

// Wingdings icon component for matching original survey styling
function WingdingsIcon({
  char,
  className,
}: {
  char: string
  className?: string
}) {
  return (
    <span className={cn("font-['Wingdings'] text-[16px] font-bold text-survey-text", className)}>
      {char}
    </span>
  )
}

interface BlaiseHeaderActionProps {
  icon: React.ReactNode
  label: string
  onClick?: () => void
  className?: string
}

export function BlaiseHeaderAction({
  icon,
  label,
  onClick,
  className,
}: BlaiseHeaderActionProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-1 px-3 py-1 text-sm text-gray-700 hover:text-gray-900 cursor-pointer",
        className
      )}
    >
      {icon}
      <span className="text-[10px] font-bold text-survey-text">{label}</span>
    </button>
  )
}

interface BlaiseHeaderActionsProps {
  onSave?: () => void
  onSaveAndClose?: () => void
  onPrint?: () => void
  onHelp?: () => void
  className?: string
}

export function BlaiseHeaderActions({
  onSave,
  onSaveAndClose,
  onPrint,
  onHelp,
  className,
}: BlaiseHeaderActionsProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <BlaiseHeaderAction
        icon={<WingdingsIcon char="<" />}
        label="Opslaan"
        onClick={onSave}
      />
      <BlaiseHeaderAction
        icon={<span className="text-[16px] font-bold text-survey-text">×</span>}
        label="Opslaan en sluiten"
        onClick={onSaveAndClose}
      />
      <BlaiseHeaderAction
        icon={<Image src="/Print.png" alt="Print" width={16} height={16} />}
        label="Printen"
        onClick={onPrint}
      />
      <BlaiseHeaderAction
        icon={<WingdingsIcon char="M" />}
        label="Help"
        onClick={onHelp}
      />
    </div>
  )
}
