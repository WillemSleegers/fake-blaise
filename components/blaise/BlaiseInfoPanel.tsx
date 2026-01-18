interface BlaiseInfoPanelProps {
  companyName: string
  contactPerson: string
  correspondenceNumber: string
}

export function BlaiseInfoPanel({
  companyName,
  contactPerson,
  correspondenceNumber,
}: BlaiseInfoPanelProps) {
  return (
    <div className="w-60 h-15 text-[10px] bg-survey-white rounded-tl rounded-bl">
      <div className="grid grid-rows-4 h-full ms-0.75">
        <div className="text-survey-text">{companyName}</div>
        <div className="text-survey-text">{contactPerson}</div>
        <div></div>
        <div className="text-survey-text">
          Correspondentienummer: {correspondenceNumber}
        </div>
      </div>
    </div>
  )
}
