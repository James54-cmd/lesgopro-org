import Image from "next/image"
import { Card } from "@/components/ui/card"
import { StatusBadge } from "@/components/app/status-badge"
import type { LeaderProfile } from "@/features/public/home/home-types"
import { cn } from "@/lib/utils"

const leaderStatusLabel = {
  officer: "Officer",
  lead: "Lead",
  active: "Active",
  inactive: "Inactive",
} as const

interface LeaderCardProps {
  leader: LeaderProfile
  avatar?: string
  className?: string
}

export function LeaderCard({
  leader,
  avatar,
  className,
}: LeaderCardProps) {
  const initials = leader.name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)

  return (
    <Card className={cn("flex items-center gap-3 border-primary/10 p-4", className)}>
      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary text-sm font-medium text-cream">
        {avatar ? (
          <Image
            src={avatar}
            alt={leader.name}
            width={44}
            height={44}
            className="h-full w-full rounded-full object-cover"
          />
        ) : (
          initials
        )}
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium text-ink-900">{leader.name}</p>
        <p className="mt-1 text-xs text-ink-400">
          {leader.role}
          {leader.specialization && ` · ${leader.specialization}`}
        </p>
      </div>
      <StatusBadge variant={leader.status} className="ml-auto">
        {leaderStatusLabel[leader.status]}
      </StatusBadge>
    </Card>
  )
}
