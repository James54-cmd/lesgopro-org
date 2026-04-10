import { SectionShell } from "@/components/app/section-shell"
import { StatCard } from "@/features/public/home/components/stat-card"
import { homeContent } from "@/features/public/home/home-content"

export function StatsSection() {
  const { organizationStats, statsIntro } = homeContent

  return (
    <SectionShell id="overview">
      <div className="mb-10 text-center">
        <p className="mx-auto mb-4 inline-flex rounded-full border border-primary/20 bg-primary/5 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-primary">
          {statsIntro.eyebrow}
        </p>
        <h2 className="type-h1 mx-auto max-w-3xl text-ink-900">
          {statsIntro.title}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-ink-700">
          {statsIntro.description}
        </p>
        <div className="mx-auto mt-6 h-px w-24 bg-secondary/40" />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {organizationStats.map((stat) => (
          <StatCard key={stat.label} stat={stat} />
        ))}
      </div>
    </SectionShell>
  )
}
