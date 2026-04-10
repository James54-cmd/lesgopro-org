import { SectionHeading } from "@/components/app/section-heading"
import { SectionShell } from "@/components/app/section-shell"
import { LeaderCard } from "@/features/public/home/components/leader-card"
import { homeContent } from "@/features/public/home/home-content"

export function LeadershipSection() {
  const { leadershipTeam, sections } = homeContent

  return (
    <SectionShell id="leadership" tone="muted">
      <SectionHeading
        label={sections.leadership.label}
        title={sections.leadership.title}
        description={sections.leadership.description}
        className="mb-8"
      />

      <div className="grid max-w-4xl grid-cols-1 gap-4 md:grid-cols-2">
        {leadershipTeam.map((leader) => (
          <LeaderCard key={leader.name} leader={leader} />
        ))}
      </div>
    </SectionShell>
  )
}
