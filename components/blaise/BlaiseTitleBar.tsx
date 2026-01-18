interface BlaiseTitleBarProps {
  title: string
  subtitle: string
}

export function BlaiseTitleBar({ title, subtitle }: BlaiseTitleBarProps) {
  return (
    <div className="bg-survey-accent">
      {/* Section 1: Purple title */}
      <div className="bg-linear-to-b from-survey-white from-50% to-survey-accent to-50%">
        <h1 className="bg-survey-primary ps-10 pe-2 pt-0.5 h-10 text-[25px] font-normal text-survey-white text-right rounded-tr rounded-br">
          {title}
        </h1>
      </div>

      {/* Section 2: Subtitle */}
      <div className="h-7.5">
        <div className="bg-survey-white px-10 py-1 inline-block rounded-tr rounded-br">
          <span className="text-sm text-survey-text">{subtitle}</span>
        </div>
      </div>
      {/* Section 3: Cyan background */}
      <div className="h-7.5"></div>
    </div>
  )
}
