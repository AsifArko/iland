interface SectionHeaderProps {
  title: string;
  className?: string;
}

export function SectionHeader({ title, className = "" }: SectionHeaderProps) {
  return (
    <div className={`flex items-center gap-3 mb-8 ${className}`}>
      <div className="h-px w-8 bg-gradient-to-r from-transparent to-primary/30"></div>
      <span className="text-xs font-medium text-primary/80 uppercase tracking-[0.25em]">
        {title}
      </span>
      <div className="h-px w-8 bg-gradient-to-l from-transparent to-primary/30"></div>
    </div>
  );
}
