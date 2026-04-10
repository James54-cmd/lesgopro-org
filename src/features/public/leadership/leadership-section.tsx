import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { SectionHeading } from "@/components/app/section-heading"
import { SectionShell } from "@/components/app/section-shell"
import { Button } from "@/components/ui/button"
import { leadershipSectionCopy } from "./leadership-content"
import { getPublicLeadershipData } from "./get-public-leadership"
import { LeaderCard } from "./components/leader-card"
import { LeadershipEmptyState } from "./components/leadership-empty-state"
import { LeadershipPreview } from "./components/leadership-preview"

export async function LeadershipSection() {
  const { leaders } = await getPublicLeadershipData()
  const officerCount = leaders.filter((leader) => leader.status === "officer").length

  return (
    <SectionShell id="leadership" tone="muted">
      <SectionHeading
        label={leadershipSectionCopy.label}
        title={leadershipSectionCopy.title}
        description={leadershipSectionCopy.description}
        className="mb-8"
      />

      {leaders.length > 0 ? (
        <div className="space-y-8">
          <LeadershipPreview leaders={leaders} />

          <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
            <div className="grid max-w-5xl grid-cols-1 gap-4 md:grid-cols-2">
              {leaders.slice(0, 4).map((leader) => (
                <LeaderCard key={leader.id} leader={leader} />
              ))}
            </div>

            <div className="rounded-[1.75rem] border border-primary/10 bg-[linear-gradient(160deg,rgba(139,26,26,0.98),rgba(99,18,18,0.96))] p-6 text-primary-foreground shadow-[0_24px_60px_rgba(26,16,8,0.16)]">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-secondary">
                Leadership Spotlight
              </p>
              <h3 className="mt-3 type-h3 text-primary-foreground">
                Meet the active team shaping this school year
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-primary-foreground/80">
                The public roster updates from the current school year automatically, so students
                and visitors always see the latest active leadership.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl bg-white/8 p-4">
                  <p className="text-xs uppercase tracking-[0.14em] text-secondary">Visible Officers</p>
                  <p className="mt-2 font-display text-4xl font-semibold">{officerCount}</p>
                </div>
                <div className="rounded-2xl bg-white/8 p-4">
                  <p className="text-xs uppercase tracking-[0.14em] text-secondary">Preview Cards</p>
                  <p className="mt-2 font-display text-4xl font-semibold">{Math.min(leaders.length, 4)}</p>
                </div>
              </div>

              <div className="mt-6">
                <Button asChild size="lg" variant="secondary">
                  <Link href="/leadership">
                    Browse Full Leadership Page
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <LeadershipEmptyState />
      )}
    </SectionShell>
  )
}
