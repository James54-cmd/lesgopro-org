import * as React from "react"
import { cn } from "@/lib/utils"

interface SectionHeaderProps {
  label: string
  title: string
  description?: string
  className?: string
}

export function SectionHeader({
  label,
  title,
  description,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <p className="section-label">
        {label}
      </p>
      <h2 className="text-2xl font-medium tracking-tight text-ink-900">
        {title}
      </h2>
      {description && (
        <p className="text-[15px] leading-relaxed text-ink-700 max-w-2xl">
          {description}
        </p>
      )}
    </div>
  )
}