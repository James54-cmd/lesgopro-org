import Link from "next/link"
import { ArrowRight, LockKeyhole, ShieldCheck, Sparkles } from "lucide-react"
import { SectionHeading } from "@/components/app/section-heading"
import { SectionShell } from "@/components/app/section-shell"
import { StatusBadge } from "@/components/app/status-badge"
import { homeContent } from "@/features/public/home/home-content"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

const accessIcons = {
  public: Sparkles,
  private: LockKeyhole,
  admin: ShieldCheck,
} as const

const accessBadgeVariant = {
  public: "active",
  private: "lead",
  admin: "officer",
} as const

export function AccessLayersSection() {
  const { accessLayers, sections } = homeContent

  return (
    <SectionShell id="access-layers">
      <SectionHeading
        label={sections.access.label}
        title={sections.access.title}
        description={sections.access.description}
        className="mb-8"
      />

      <div className="grid gap-4 lg:grid-cols-3">
        {accessLayers.map((layer) => {
          const Icon = accessIcons[layer.key]

          return (
            <Card
              key={layer.key}
              className="rounded-2xl border border-primary/10 bg-white p-6 shadow-card"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/5 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <StatusBadge variant={accessBadgeVariant[layer.key]}>
                  {layer.access}
                </StatusBadge>
              </div>

              <h3 className="mt-5 type-h3 text-ink-900">{layer.label}</h3>
              <p className="mt-2 text-sm font-medium text-primary">{layer.audience}</p>
              <p className="mt-3 text-sm leading-relaxed text-ink-700">
                {layer.summary}
              </p>

              <Button asChild variant="ghost" className="mt-5 px-0 text-primary">
                <Link href={layer.href}>
                  Open Layer
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </Card>
          )
        })}
      </div>
    </SectionShell>
  )
}
