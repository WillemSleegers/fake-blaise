import { cn } from "@/lib/utils";

interface BlaiseLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function BlaiseLayout({ children, className }: BlaiseLayoutProps) {
  return (
    <div
      className={cn(
        "min-h-screen w-full bg-survey-bg font-sans",
        className
      )}
    >
      <div className="mx-auto max-w-[1274px] min-h-screen border-l-[10px] border-l-[rgb(39,29,108)] bg-white">
        {children}
      </div>
    </div>
  );
}
