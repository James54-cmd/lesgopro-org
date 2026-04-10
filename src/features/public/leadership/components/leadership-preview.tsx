import { StatusBadge } from "@/components/app/status-badge"
import { Card } from "@/components/ui/card"
import type { PublicLeaderProfile } from "../leadership-types"
import { buildLeadershipPreview } from "../leadership-utils"
import { LeaderAvatar } from "./leader-avatar"

type LeadershipPreviewProps = {
  leaders: PublicLeaderProfile[]
}

function LeadershipNode({
  leader,
  tone,
}: {
  leader: PublicLeaderProfile
  tone: "head" | "branch" | "support"
}) {
  return (
    <Card
      className={
        tone === "head"
          ? "relative border-primary/15 bg-[linear-gradient(145deg,rgba(255,255,255,0.98),rgba(253,250,245,0.96))] p-6 shadow-[0_24px_60px_rgba(26,16,8,0.12)]"
          : "border-primary/10 bg-white/90 p-4 shadow-card"
      }
    >
      <div className={tone === "head" ? "flex flex-col items-center text-center" : "flex items-center gap-3"}>
        <LeaderAvatar
          name={leader.name}
          avatarUrl={leader.avatarUrl}
          size={tone === "head" ? "lg" : tone === "branch" ? "md" : "sm"}
        />
        <div className={tone === "head" ? "mt-4" : "min-w-0"}>
          <p className={tone === "head" ? "type-h3 text-ink-900" : "text-sm font-semibold text-ink-900"}>
            {leader.name}
          </p>
          <p className="mt-1 text-sm text-ink-600">{leader.role}</p>
          {leader.specialization ? (
            <p className="mt-1 text-xs uppercase tracking-[0.14em] text-secondary-dark">
              {leader.specialization}
            </p>
          ) : null}
        </div>
      </div>
    </Card>
  )
}

export function LeadershipPreview({ leaders }: LeadershipPreviewProps) {
  const { head, executiveTeam, supportTeam } = buildLeadershipPreview(leaders)
  const officerCount = leaders.filter((leader) => leader.status === "officer").length
  const leadCount = leaders.filter((leader) => leader.status === "lead").length

  if (!head) {
    return null
  }

  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-primary/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.94),rgba(248,243,235,0.92))] p-6 shadow-[0_28px_80px_rgba(26,16,8,0.08)] sm:p-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(201,151,42,0.18),transparent_26%),radial-gradient(circle_at_bottom_left,rgba(139,26,26,0.10),transparent_28%)]" />

      <div className="relative">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="section-label">Public Preview</p>
            <h3 className="mt-2 type-h2 text-ink-900">Organizational Chart</h3>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-700">
              A quick view of the current public leadership structure, centered around the active
              school year.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <StatusBadge variant="officer">{officerCount} officers</StatusBadge>
            <StatusBadge variant="active">{leadCount} support leads</StatusBadge>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center">
          <LeadershipNode leader={head} tone="head" />

          {executiveTeam.length > 0 || supportTeam.length > 0 ? (
            <div className="mt-5 h-8 w-px bg-primary/20" aria-hidden="true" />
          ) : null}

          {executiveTeam.length > 0 ? (
            <div className="w-full max-w-4xl">
              <div className="mx-auto hidden h-px w-[58%] bg-primary/20 md:block" aria-hidden="true" />
              <div className="grid gap-4 md:grid-cols-2">
                {executiveTeam.map((leader) => (
                  <LeadershipNode key={`${leader.id}-${leader.role}`} leader={leader} tone="branch" />
                ))}
              </div>
            </div>
          ) : null}

          {supportTeam.length > 0 ? (
            <>
              <div className="mt-6 h-8 w-px bg-primary/20" aria-hidden="true" />
              <div className="w-full">
                <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                  {supportTeam.map((leader) => (
                    <LeadershipNode key={`${leader.id}-${leader.role}`} leader={leader} tone="support" />
                  ))}
                </div>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  )
}
