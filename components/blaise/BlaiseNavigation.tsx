"use client"

interface BlaiseNavItem {
  id: string
  label: string
  active?: boolean
  visited?: boolean
  parentId?: string
}

interface BlaiseNavigationProps {
  items: BlaiseNavItem[]
  onItemClick?: (id: string) => void
  activePageId?: string
}

export function BlaiseNavigation({
  items,
  onItemClick,
  activePageId,
}: BlaiseNavigationProps) {
  // Determine which parent section is currently active
  const activeItem = items.find((item) => item.id === activePageId)
  const activeParentId = activeItem?.parentId || activePageId

  // Filter items: show all top-level items, but only show subpages when in that section
  const visibleItems = items.filter((item) => {
    if (!item.parentId) return true // Always show top-level items
    return item.parentId === activeParentId // Only show subpages of the active section
  })

  return (
    <nav className="bg-survey-bg-light w-62.5 h-112.5 pt-2">
      <h2 className="px-4 text-[13px] font-bold text-survey-text">
        Inhoudsopgave
      </h2>
      <ul className="">
        {visibleItems.map((item) => (
          <li key={item.id}>
            <button
              onClick={() => onItemClick?.(item.id)}
              className={`w-full text-left pr-4 text-[13px] cursor-pointer ${
                item.parentId ? "pl-9" : "pl-5.25"
              } ${
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
