interface BlaiseLayoutProps {
  children: React.ReactNode
}

export function BlaiseLayout({ children }: BlaiseLayoutProps) {
  return (
    <div className="min-h-screen w-full bg-survey-bg font-sans">
      <div className="mx-auto max-w-318.5 min-h-screen border-l-10 border-l-survey-border bg-survey-white">
        {children}
      </div>
    </div>
  )
}
