import { cn } from "@/lib/utils";

interface BlaiseTitleBarProps {
  title: string;
  subtitle: string;
  className?: string;
}

export function BlaiseTitleBar({ title, subtitle, className }: BlaiseTitleBarProps) {
  return (
    <div className={cn("w-full", className)}>
      {/* Purple title section */}
      <div className="bg-survey-primary px-10 py-2">
        <h1 className="text-2xl font-bold text-white">{title}</h1>
      </div>
      {/* White subtitle section */}
      <div className="bg-white px-10 py-1 inline-block">
        <span className="text-sm text-survey-text">{subtitle}</span>
      </div>
    </div>
  );
}
