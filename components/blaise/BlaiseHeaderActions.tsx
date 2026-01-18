"use client"

import Image from "next/image"

function WingdingsIcon({ char }: { char: string }) {
  return (
    <span className="font-['Wingdings'] text-[16px] font-bold text-survey-text">
      {char}
    </span>
  )
}

interface BlaiseHeaderActionProps {
  icon: React.ReactNode
  label: string
  onClick?: () => void
}

function BlaiseHeaderAction({ icon, label, onClick }: BlaiseHeaderActionProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-1 px-1.5 py-1 text-sm text-survey-text hover:text-survey-primary cursor-pointer"
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
}

export function BlaiseHeaderActions({
  onSave,
  onSaveAndClose,
  onPrint,
  onHelp,
}: BlaiseHeaderActionsProps) {
  return (
    <div className="flex items-center">
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
        icon={<span className="text-[16px] font-bold text-survey-text">?</span>}
        label="Help"
        onClick={onHelp}
      />
    </div>
  )
}
