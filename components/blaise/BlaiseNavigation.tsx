"use client"

interface BlaiseNavItem {
  id: string
  label: string
  active?: boolean
  visited?: boolean
}

interface BlaiseNavigationProps {
  items: BlaiseNavItem[]
  onItemClick?: (id: string) => void
}

export function BlaiseNavigation({
  items,
  onItemClick,
}: BlaiseNavigationProps) {
  return (
    <nav className="bg-survey-bg-light w-62.5 h-112.5 pt-2">
      <h2 className="px-4 text-[13px] font-bold text-survey-text">
        Inhoudsopgave
      </h2>
      <ul className="">
        {items.map((item) => (
          <li key={item.id}>
            <button
              onClick={() => onItemClick?.(item.id)}
              className={`w-full text-left pl-5.25 pr-4 text-[13px] cursor-pointer ${
                item.active
                  ? "font-bold text-survey-text"
                  : item.visited
                    ? "text-survey-text"
                    : "text-survey-text-muted"
              }`}
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}
