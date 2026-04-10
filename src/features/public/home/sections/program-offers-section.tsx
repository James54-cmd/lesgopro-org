import { ArrowRight, BookOpen, GraduationCap, Layers } from "lucide-react"
import { SectionHeading } from "@/components/app/section-heading"
import { SectionShell } from "@/components/app/section-shell"
import { homeContent } from "@/features/public/home/home-content"

export function ProgramOffersSection() {
  const { programFooterNote, programOffers, sections } = homeContent

  return (
    <SectionShell id="program-offers" tone="muted">
      <SectionHeading
        label={sections.programs.label}
        title={sections.programs.title}
        description={sections.programs.description}
        className="mb-12"
      />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {programOffers.map((program, index) => (
          <article
            key={program.title}
            className="group relative overflow-hidden rounded-2xl border border-primary/10 bg-white transition-shadow duration-300 hover:shadow-card-hover"
          >
            {/* Top accent bar */}
            <div className="h-1 w-full bg-secondary" />

            <div className="p-7">
              {/* Degree badge + index number */}
              <div className="mb-6 flex items-start justify-between">
                <span className="inline-flex items-center gap-2 rounded-full bg-primary/8 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-primary">
                  <GraduationCap className="h-3.5 w-3.5" />
                  {program.degreeType}
                </span>
                <span className="font-display text-5xl font-bold leading-none text-primary/6 select-none">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              {/* Title */}
              <h3 className="type-h2 mb-3 text-ink-900 transition-colors group-hover:text-primary">
                {program.title}
              </h3>

              {/* Description */}
              <p className="type-body mb-6 max-w-prose text-ink-500">
                {program.description}
              </p>

              {/* Divider */}
              <div className="mb-5 h-px bg-primary/8" />

              {/* Meta row */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="inline-flex items-center gap-2 text-sm font-medium text-ink-700">
                  <BookOpen className="h-4 w-4 text-secondary" />
                  {program.audienceNote}
                </p>

                <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-primary opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                  Learn more
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Bottom note */}
      <p className="mt-8 flex items-center justify-center gap-2 text-center text-sm text-ink-400">
        <Layers className="h-4 w-4 text-secondary" />
        {programFooterNote}
      </p>
    </SectionShell>
  )
}
