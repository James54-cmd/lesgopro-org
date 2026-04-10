import Link from "next/link"
import { CalendarDays, FileText, ShieldCheck } from "lucide-react"
import { StatusBadge } from "@/components/app/status-badge"
import { adminOverview } from "@/config/site"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

const moduleIcons = {
  "content-publishing": FileText,
  "events-planning": CalendarDays,
  "site-operations": ShieldCheck,
} as const

const moduleStateMeta = {
  foundation: {
    label: "Foundation Ready",
    variant: "active",
  },
  next: {
    label: "Next Build",
    variant: "lead",
  },
  planned: {
    label: "Planned",
    variant: "neutral",
  },
} as const

export function AdminOverview() {
  return (
    <div className="space-y-8">
      <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <Card className="border-primary/10 bg-white p-6 shadow-card">
          <span className="section-label">{adminOverview.eyebrow}</span>
          <h2 className="mt-3 type-h2 text-ink-900">{adminOverview.title}</h2>
          <p className="mt-3 type-body">{adminOverview.description}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/">Back to Public Site</Link>
            </Button>
          </div>
        </Card>

        <Card className="border-primary/10 bg-primary p-6 text-primary-foreground shadow-card">
          <h2 className="type-h2 text-primary-foreground">Why this structure works</h2>
          <p className="mt-3 text-base leading-relaxed text-primary-foreground/80">
            Public discovery stays simple, while all sensitive workflows stay
            behind a dedicated admin route. That makes auth, permissions, and
            internal tooling easier to extend later.
          </p>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {adminOverview.modules.map((module) => {
          const Icon = moduleIcons[module.id as keyof typeof moduleIcons]
          const stateMeta =
            moduleStateMeta[module.state as keyof typeof moduleStateMeta]

          return (
            <Card
              key={module.id}
              className="border-primary/10 bg-white p-6 shadow-card transition-shadow hover:shadow-card-hover"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/5 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <StatusBadge variant={stateMeta.variant}>{stateMeta.label}</StatusBadge>
              </div>

              <h3 className="mt-5 type-h3 text-ink-900">{module.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-700">
                {module.description}
              </p>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
