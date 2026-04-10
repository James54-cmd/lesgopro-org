import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const statusBadgeVariants = cva(
  "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium",
  {
    variants: {
      variant: {
        officer: "bg-primary/10 text-primary",
        lead: "bg-secondary/15 text-secondary-dark",
        active: "bg-accent/12 text-accent",
        member: "bg-ink-400/10 text-ink-700",
        pending: "bg-secondary/10 text-secondary-dark",
        inactive: "bg-ink-400/20 text-ink-400",
      },
    },
    defaultVariants: {
      variant: "member",
    },
  }
)

export interface StatusBadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof statusBadgeVariants> {}

export type StatusBadgeVariant = NonNullable<
  VariantProps<typeof statusBadgeVariants>["variant"]
>

export function StatusBadge({ 
  className, 
  variant, 
  children, 
  ...props 
}: StatusBadgeProps) {
  return (
    <span
      className={cn(statusBadgeVariants({ variant }), className)}
      {...props}
    >
      {children}
    </span>
  )
}
