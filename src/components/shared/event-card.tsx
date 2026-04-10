import { Card } from "@/components/ui/card"
import { StatusBadge } from "@/components/shared/status-badge"
import { cn } from "@/lib/utils"

interface EventCardProps {
  title: string
  description: string
  date: string
  time: string
  type: string
  status: "open" | "closed" | "cancelled" | "full"
  registeredCount?: number
  maxCapacity?: number
  className?: string
}

export function EventCard({
  title,
  description,
  date,
  time,
  type,
  status,
  registeredCount,
  maxCapacity,
  className
}: EventCardProps) {
  const statusVariant = 
    status === "open" ? "active" :
    status === "closed" ? "inactive" :
    status === "cancelled" ? "inactive" :
    "pending"

  const statusLabel = 
    status === "open" ? "Open" :
    status === "closed" ? "Closed" :
    status === "cancelled" ? "Cancelled" :
    "Full"

  return (
    <Card className={cn("rounded-xl border-primary/10 overflow-hidden", className)}>
      <div className="bg-primary px-4 py-3">
        <p className="text-secondary text-[11px] font-medium mb-1">
          {date} · {time}
        </p>
        <p className="text-cream text-[15px] font-medium">{title}</p>
      </div>
      <div className="px-4 py-3">
        <p className="text-sm text-ink-700 leading-relaxed">{description}</p>
      </div>
      <div className="px-4 py-2.5 border-t border-primary/8 flex justify-between items-center">
        <div className="flex gap-2">
          <StatusBadge variant="officer" className="bg-primary/10 text-primary">
            {type}
          </StatusBadge>
          <StatusBadge variant={statusVariant}>
            {statusLabel}
          </StatusBadge>
        </div>
        {registeredCount !== undefined && (
          <span className="text-xs text-ink-400">
            {registeredCount}{maxCapacity ? ` / ${maxCapacity}` : ''} registered
          </span>
        )}
      </div>
    </Card>
  )
}