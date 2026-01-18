import { cn } from "@/lib/utils";

interface BlaiseContentProps {
  children: React.ReactNode;
  className?: string;
}

export function BlaiseContent({ children, className }: BlaiseContentProps) {
  return (
    <main
      className={cn(
        "bg-white flex-1 px-8 py-6",
        className
      )}
    >
      {children}
    </main>
  );
}

interface BlaiseContentSectionProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export function BlaiseContentSection({ title, children, className }: BlaiseContentSectionProps) {
  return (
    <section className={cn("mb-6", className)}>
      {title && (
        <h2 className="text-lg font-bold text-survey-text mb-2">{title}</h2>
      )}
      <div className="text-base text-survey-text">{children}</div>
    </section>
  );
}
