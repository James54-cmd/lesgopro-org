import { SectionShell } from "@/components/layout/section-shell"
import { SectionHeader } from "@/components/shared/section-header"
import { StatCard } from "@/components/shared/stat-card"
import { organizationStats } from "@/features/home/data"

export function StatsSection() {
  return (
    <SectionShell>
      <SectionHeader
        label="Organization at a glance"
        title="Building Tomorrow's Developers"
        description="LESGOPRO brings together passionate students to learn, create, and grow in programming and software development."
        className="mb-8 text-center"
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {organizationStats.map((stat) => (
          <StatCard key={stat.label} value={stat.value} label={stat.label} />
        ))}
      </div>
    </SectionShell>
  )
}
