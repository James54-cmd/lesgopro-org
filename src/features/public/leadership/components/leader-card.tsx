import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { StatusBadge } from "@/components/app/status-badge"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { PublicLeaderProfile } from "../leadership-types"
import { LeaderAvatar } from "./leader-avatar"

const leaderStatusLabel = {
  officer: "Officer",
  lead: "Lead",
  active: "Active",
  inactive: "Inactive",
} as const

type LeaderCardProps = {
  leader: PublicLeaderProfile
  className?: string
}

export function LeaderCard({ leader, className }: LeaderCardProps) {
  const card = (
    <Card
      className={cn(
        "group relative overflow-hidden border-primary/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(253,250,245,0.92))] p-5 shadow-card transition-all duration-200 hover:-translate-y-1 hover:border-primary/20 hover:shadow-[0_22px_48px_rgba(26,16,8,0.12)]",
        className
      )}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(201,151,42,0.14),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(139,26,26,0.06),transparent_24%)] opacity-70" />
      <div className="relative">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <LeaderAvatar name={leader.name} avatarUrl={leader.avatarUrl} size="sm" />
            <div className="min-w-0">
              <p className="text-base font-semibold text-ink-900">{leader.name}</p>
              <p className="mt-1 text-sm font-medium text-primary">{leader.role}</p>
            </div>
          </div>
          <StatusBadge variant={leader.status}>{leaderStatusLabel[leader.status]}</StatusBadge>
        </div>

        <div className="mt-4 flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-400">
              Focus Area
            </p>
            <p className="mt-1 text-sm text-ink-700">
              {leader.specialization || "Community leadership"}
            </p>
          </div>

          {leader.profileUrl ? (
            <span className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.14em] text-primary transition-transform duration-200 group-hover:translate-x-0.5">
              View
              <ArrowUpRight className="h-3.5 w-3.5" />
            </span>
          ) : null}
        </div>
      </div>
    </Card>
  )

  if (leader.profileUrl) {
    return <Link href={leader.profileUrl}>{card}</Link>
  }

  return card
}
