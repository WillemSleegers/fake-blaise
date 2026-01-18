"use client";

import { cn } from "@/lib/utils";

interface BlaiseNavItem {
  id: string;
  label: string;
  active?: boolean;
}

interface BlaiseNavigationProps {
  items: BlaiseNavItem[];
  className?: string;
  onItemClick?: (id: string) => void;
}

export function BlaiseNavigation({ items, className, onItemClick }: BlaiseNavigationProps) {
  return (
    <nav className={cn("bg-survey-bg-light", className)}>
      <div className="px-4 py-1">
        <h2 className="text-sm font-bold text-survey-text">Inhoudsopgave</h2>
      </div>
      <ul className="py-1">
        {items.map((item) => (
          <li key={item.id}>
            <button
              onClick={() => onItemClick?.(item.id)}
              className={cn(
                "w-full text-left pl-[21px] pr-4 py-0.5 text-sm cursor-pointer",
                item.active
                  ? "font-bold text-survey-text"
                  : "text-survey-text-muted"
              )}
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
