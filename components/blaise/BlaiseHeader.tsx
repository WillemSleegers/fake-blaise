import Image from "next/image";
import { BlaiseHeaderActions } from "./BlaiseHeaderActions";

interface BlaiseHeaderProps {
  onSave?: () => void;
  onSaveAndClose?: () => void;
  onPrint?: () => void;
  onHelp?: () => void;
}

export function BlaiseHeader({ onSave, onSaveAndClose, onPrint, onHelp }: BlaiseHeaderProps) {
  return (
    <header className="flex items-center justify-between bg-white px-4 py-2">
      {/* Logo */}
      <div className="flex items-center gap-2">
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
  );
}
