import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface SectionShellProps {
  id?: string
  children: ReactNode
  className?: string
  contentClassName?: string
  tone?: "default" | "muted"
}

export function SectionShell({
  id,
  children,
  className,
  contentClassName,
  tone = "default",
}: SectionShellProps) {
  return (
    <section
      id={id}
      className={cn(
        "px-4 py-12 sm:px-6 lg:px-8",
        tone === "muted" && "bg-cream-surface",
        className
      )}
    >
      <div className={cn("mx-auto max-w-6xl", contentClassName)}>{children}</div>
    </section>
  )
}
