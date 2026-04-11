import { StatusBadge } from "@/components/app/status-badge"
import { Card } from "@/components/ui/card"
import type { LeadershipPreviewRow, PublicLeaderProfile } from "../leadership-types"
import { buildLeadershipPreview } from "../leadership-utils"
import { cn } from "@/lib/utils"
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
          ? "relative h-full border-primary/15 bg-[linear-gradient(145deg,rgba(255,255,255,0.98),rgba(253,250,245,0.96))] p-6 shadow-[0_24px_60px_rgba(26,16,8,0.12)]"
          : "h-full border-primary/10 bg-white/90 p-4 shadow-card"
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

function getRowClassName(row: LeadershipPreviewRow) {
  if (row.columns === 1) {
    return row.tone === "head" ? "mx-auto max-w-[20rem]" : "mx-auto max-w-sm"
  }

  if (row.columns === 2) {
    return "mx-auto grid w-full max-w-3xl gap-4 md:grid-cols-2"
  }

  return "mx-auto grid w-full max-w-5xl gap-4 md:grid-cols-3"
}

function getRowItemClassName(row: LeadershipPreviewRow, index: number) {
  if (row.columns !== 3) {
    return ""
  }

  if (row.alignment === "center") {
    return index === 0 ? "md:col-start-2" : ""
  }

  if (row.alignment === "edges") {
    return index === 1 ? "md:col-start-3" : ""
  }

  return ""
}

export function LeadershipPreview({ leaders }: LeadershipPreviewProps) {
  const { advisers, rows } = buildLeadershipPreview(leaders)
  const primaryAdviser = advisers.length === 1 ? advisers[0] : null
  const secondaryAdvisers = primaryAdviser ? [] : advisers
  const officerCount = leaders.filter((leader) => leader.status === "officer").length
  const leadCount = leaders.filter((leader) => leader.status === "lead").length

  if (rows.length === 0) {
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

        <div
          className={cn(
            "mt-8 gap-6",
            secondaryAdvisers.length > 0 && "xl:grid xl:grid-cols-[minmax(0,1fr)_18rem] xl:items-start"
          )}
        >
          <div className="flex flex-col items-center">
            {rows.map((row, rowIndex) => (
              <div key={`leadership-row-${rowIndex}`} className="w-full">
                {rowIndex > 0 ? (
                  <div className="mb-6 flex justify-center">
                    <div className="h-8 w-px bg-primary/20" aria-hidden="true" />
                  </div>
                ) : null}

                {rowIndex === 0 && primaryAdviser ? (
                  <div className="mb-6 mx-auto max-w-sm">
                    <LeadershipNode
                      key={`${primaryAdviser.id}-${primaryAdviser.role}-adviser`}
                      leader={primaryAdviser}
                      tone="head"
                    />
                    <div className="mt-6 flex justify-center">
                      <div className="h-8 w-px bg-primary/20" aria-hidden="true" />
                    </div>
                  </div>
                ) : null}

                <div className={getRowClassName(row)}>
                  {row.leaders.map((leader, leaderIndex) => (
                    <div
                      key={`${leader.id}-${leader.role}-${rowIndex}`}
                      className={cn("h-full", getRowItemClassName(row, leaderIndex))}
                    >
                      <LeadershipNode leader={leader} tone={row.tone} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {secondaryAdvisers.length > 0 ? (
            <Card className="mt-8 border-primary/10 bg-white/90 p-5 shadow-card xl:mt-0">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-secondary-dark">
                    Advisory
                  </p>
                  <h4 className="mt-2 text-lg font-semibold text-ink-900">Advisers</h4>
                </div>
                <StatusBadge variant="neutral">{secondaryAdvisers.length}</StatusBadge>
              </div>

              <div className="mt-4 space-y-3">
                {secondaryAdvisers.map((leader) => (
                  <LeadershipNode key={`${leader.id}-${leader.role}-adviser`} leader={leader} tone="support" />
                ))}
              </div>
            </Card>
          ) : null}
        </div>
      </div>
    </div>
  )
}
