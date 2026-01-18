import Image from "next/image"
import { BlaiseHeaderActions } from "./BlaiseHeaderActions"

interface BlaiseHeaderProps {
  onSave?: () => void
  onSaveAndClose?: () => void
  onPrint?: () => void
  onHelp?: () => void
}

export function BlaiseHeader({
  onSave,
  onSaveAndClose,
  onPrint,
  onHelp,
}: BlaiseHeaderProps) {
  return (
    <header className="flex items-start justify-between px-4">
      {/* Logo */}
      <div className="flex items-center gap-2 my-4.5 ml-10">
        <Image
          src="/Logo.PNG"
          alt="CBS Logo"
          width={32}
          height={50}
          className="object-contain"
        />
      </div>

      {/* Action buttons */}
      <BlaiseHeaderActions
        onSave={onSave}
        onSaveAndClose={onSaveAndClose}
        onPrint={onPrint}
        onHelp={onHelp}
      />
    </header>
  )
}
