import { Card } from "@/components/ui/card"
import {
  StatusBadge,
  type StatusBadgeVariant,
} from "@/components/app/status-badge"
import type { EventItem, EventStatus } from "@/features/public/home/home-types"
import { cn } from "@/lib/utils"

const eventStatusMeta: Record<
  EventStatus,
  { label: string; variant: StatusBadgeVariant }
> = {
  open: {
    label: "Open",
    variant: "active",
  },
  closed: {
    label: "Closed",
    variant: "inactive",
  },
  cancelled: {
    label: "Cancelled",
    variant: "inactive",
  },
  full: {
    label: "Full",
    variant: "pending",
  },
}

interface EventCardProps {
  event: EventItem
  className?: string
}

export function EventCard({ event, className }: EventCardProps) {
  const statusMeta = eventStatusMeta[event.status]

  return (
    <Card className={cn("rounded-xl border-primary/10 overflow-hidden", className)}>
      <div className="bg-primary px-4 py-3">
        <p className="mb-1 text-xs font-medium text-secondary">
          {event.date} · {event.time}
        </p>
        <p className="text-base font-medium text-cream">{event.title}</p>
      </div>
      <div className="px-4 py-3">
        <p className="text-sm text-ink-700 leading-relaxed">{event.description}</p>
      </div>
      <div className="flex items-center justify-between border-t border-primary/8 px-4 py-2">
        <div className="flex gap-2">
          <StatusBadge variant="officer" className="bg-primary/10 text-primary">
            {event.type}
          </StatusBadge>
          <StatusBadge variant={statusMeta.variant}>{statusMeta.label}</StatusBadge>
        </div>
        {event.registeredCount !== undefined && (
          <span className="text-xs text-ink-400">
            {event.registeredCount}
            {event.maxCapacity ? ` / ${event.maxCapacity}` : ""} registered
          </span>
        )}
      </div>
    </Card>
  )
}
