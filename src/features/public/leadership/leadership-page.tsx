import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Sparkles, Users2 } from "lucide-react"
import { SectionShell } from "@/components/app/section-shell"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { leadershipPageCopy } from "./leadership-content"
import { getPublicLeadershipData } from "./get-public-leadership"
import { LeaderCard } from "./components/leader-card"
import { LeadershipEmptyState } from "./components/leadership-empty-state"
import { LeadershipPreview } from "./components/leadership-preview"

export async function LeadershipPage() {
  const { currentSchoolYear, isVisible, leaders } = await getPublicLeadershipData()

  if (!isVisible) {
    notFound()
  }

  const schoolYearLabel =
    currentSchoolYear && typeof currentSchoolYear.label === "string" ? currentSchoolYear.label : null
  const officerCount = leaders.filter((leader) => leader.status === "officer").length
  const leadCount = leaders.filter((leader) => leader.status === "lead").length

  return (
    <SectionShell
      id="leadership-page"
      tone="muted"
      className="bg-[radial-gradient(circle_at_top,rgba(201,151,42,0.12),transparent_22%),linear-gradient(180deg,#fdfaf5_0%,#f5f0e8_100%)]"
    >
      <div className="space-y-8">
        <Card className="relative overflow-hidden border-primary/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.98),rgba(253,250,245,0.94))] p-6 shadow-[0_28px_70px_rgba(26,16,8,0.10)] sm:p-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(201,151,42,0.16),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(139,26,26,0.08),transparent_24%)]" />
          <div className="relative">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="section-label">{leadershipPageCopy.eyebrow}</p>
                <h1 className="mt-3 type-h1 text-ink-900">{leadershipPageCopy.title}</h1>
                <p className="mt-3 max-w-3xl type-body">{leadershipPageCopy.description}</p>
              </div>
              <Button asChild variant="outline">
                <Link href="/">
                  <ArrowLeft className="h-4 w-4" />
                  Back Home
                </Link>
              </Button>
            </div>

            {schoolYearLabel ? (
              <div className="mt-5 inline-flex rounded-full border border-primary/10 bg-muted px-4 py-2 text-sm font-medium text-ink-800">
                Current school year: {schoolYearLabel}
              </div>
            ) : null}

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <div className="rounded-[1.5rem] border border-primary/10 bg-white/70 p-4 backdrop-blur">
                <div className="flex items-center gap-2 text-primary">
                  <Users2 className="h-4 w-4" />
                  <span className="text-xs font-semibold uppercase tracking-[0.14em]">Active officers</span>
                </div>
                <p className="mt-3 font-display text-4xl font-semibold text-ink-900">{officerCount}</p>
              </div>
              <div className="rounded-[1.5rem] border border-primary/10 bg-white/70 p-4 backdrop-blur">
                <div className="flex items-center gap-2 text-primary">
                  <Sparkles className="h-4 w-4" />
                  <span className="text-xs font-semibold uppercase tracking-[0.14em]">Support leads</span>
                </div>
                <p className="mt-3 font-display text-4xl font-semibold text-ink-900">{leadCount}</p>
              </div>
              <div className="rounded-[1.5rem] border border-primary/10 bg-white/70 p-4 backdrop-blur">
                <div className="flex items-center gap-2 text-primary">
                  <Sparkles className="h-4 w-4" />
                  <span className="text-xs font-semibold uppercase tracking-[0.14em]">Public preview</span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-ink-700">
                  Photos are optional. Missing portraits automatically become branded initial avatars.
                </p>
              </div>
            </div>
          </div>
        </Card>

        {leaders.length > 0 ? (
          <>
            <LeadershipPreview leaders={leaders} />
            <div className="space-y-4">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="section-label">Directory</p>
                  <h2 className="mt-2 type-h2 text-ink-900">Current public roster</h2>
                </div>
                <p className="max-w-2xl text-sm leading-relaxed text-ink-600">
                  Every card below is driven by the current school year selection in the admin
                  workspace and updates automatically when active officers change.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {leaders.map((leader) => (
                  <LeaderCard key={leader.id} leader={leader} />
                ))}
              </div>
            </div>
          </>
        ) : (
          <LeadershipEmptyState />
        )}
      </div>
    </SectionShell>
  )
}
