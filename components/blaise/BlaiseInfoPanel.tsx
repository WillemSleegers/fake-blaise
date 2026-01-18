import { cn } from "@/lib/utils";

interface BlaiseInfoPanelProps {
  companyName: string;
  contactPerson: string;
  correspondenceNumber: string;
  className?: string;
}

export function BlaiseInfoPanel({
  companyName,
  contactPerson,
  correspondenceNumber,
  className,
}: BlaiseInfoPanelProps) {
  return (
    <aside
      className={cn(
        "bg-white p-4 text-sm",
        className
      )}
    >
      <div className="space-y-1">
        <p className="text-survey-text">{companyName}</p>
        <p className="text-survey-text">{contactPerson}</p>
        <p className="text-survey-text">Correspondentienummer: {correspondenceNumber}</p>
      </div>
    </aside>
  );
}
