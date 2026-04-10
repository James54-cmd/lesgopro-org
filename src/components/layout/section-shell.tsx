import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface SectionShellProps {
  children: ReactNode
  className?: string
  contentClassName?: string
  muted?: boolean
}

export function SectionShell({
  children,
  className,
  contentClassName,
  muted = false,
}: SectionShellProps) {
  return (
    <section
      className={cn(
        "px-4 py-12 sm:px-6 lg:px-8",
        muted && "bg-cream-surface",
        className
      )}
    >
      <div className={cn("mx-auto max-w-6xl", contentClassName)}>{children}</div>
    </section>
  )
}
