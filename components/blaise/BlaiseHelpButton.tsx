"use client";

import { cn } from "@/lib/utils";

interface BlaiseHelpButtonProps {
  className?: string;
  onClick?: () => void;
}

export function BlaiseHelpButton({ className, onClick }: BlaiseHelpButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "inline-flex items-center justify-center w-5 h-5 bg-survey-help text-survey-text text-xs font-bold border border-gray-400",
        className
      )}
      aria-label="Help"
    >
      ?
    </button>
  );
}
