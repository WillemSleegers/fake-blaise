"use client";

import { cn } from "@/lib/utils";

interface BlaiseButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function BlaiseButton({ children, className, ...props }: BlaiseButtonProps) {
  return (
    <button
      className={cn(
        "bg-survey-primary text-white hover:bg-survey-primary/90 px-6 py-2 font-normal cursor-pointer",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
