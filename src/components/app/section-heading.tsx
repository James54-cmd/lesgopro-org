import { cn } from "@/lib/utils"

interface SectionHeadingProps {
  label: string
  title: string
  description?: string
  className?: string
}

export function SectionHeading({
  label,
  title,
  description,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <p className="section-label">{label}</p>
      <h2 className="type-h2 text-ink-900">{title}</h2>
      {description && (
        <p className="type-body max-w-2xl">{description}</p>
      )}
    </div>
  )
}
