import Link from "next/link"
import {
  Activity,
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  FolderKanban,
  GraduationCap,
  ImagePlay,
  RadioTower,
  ShieldCheck,
  Users2,
} from "lucide-react"
import { StatusBadge } from "@/components/app/status-badge"
import { adminOverview } from "@/config/site"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

const analyticsCards = [
  {
    label: "Active School Year",
    value: "1",
    detail: "One current school year should drive the public enrollment stat.",
    icon: GraduationCap,
    badge: "Current",
    tone: "lead" as const,
  },
  {
    label: "Leadership Groups",
    value: "2",
    detail: "Officer positions and officer records stay dynamic and reorderable.",
    icon: ShieldCheck,
    badge: "Dynamic",
    tone: "officer" as const,
  },
  {
    label: "Published Collections",
    value: "5",
    detail: "Programs, projects, events, gallery, and socials can all be published independently.",
    icon: FolderKanban,
    badge: "Ready",
    tone: "active" as const,
  },
  {
    label: "Media-Ready Areas",
    value: "4",
    detail: "Links, thumbnails, videos, and galleries are already modeled in the backend.",
    icon: ImagePlay,
    badge: "Flexible",
    tone: "lead" as const,
  },
]

const collectionCards = [
  {
    id: "school-year",
    title: "School Year And Enrollment",
    icon: GraduationCap,
    description: "Set the current school year and the active enrolled IT student count for the homepage analytics.",
    resources: [
      "/api/admin/school-years",
      "/api/admin/enrollment-counts",
    ],
  },
  {
    id: "leadership",
    title: "Leadership Management",
    icon: ShieldCheck,
    description: "Add dynamic officer positions, assign officers per year, and keep contact details organized.",
    resources: [
      "/api/admin/officer-positions",
      "/api/admin/officers",
    ],
  },
  {
    id: "programs-projects",
    title: "Programs And Projects",
    icon: FolderKanban,
    description: "Publish learning programs and projects with GitHub repositories, live demos, and visual media.",
    resources: [
      "/api/admin/programs",
      "/api/admin/projects",
    ],
  },
  {
    id: "events-gallery",
    title: "Events And Gallery",
    icon: CalendarDays,
    description: "Track schedules, recap visuals, thumbnails, and media links for public storytelling.",
    resources: [
      "/api/admin/events",
      "/api/admin/gallery-items",
    ],
  },
  {
    id: "socials",
    title: "Social Presence",
    icon: RadioTower,
    description: "Keep the organization’s public links in one place so every surface stays consistent.",
    resources: [
      "/api/admin/social-links",
    ],
  },
]

const operationsTimeline = [
  {
    title: "Refresh school-year analytics",
    description: "Update the current school year and save the latest IT student count.",
    icon: Activity,
  },
  {
    title: "Maintain leadership records",
    description: "Review officer positions, assign the current team, and confirm profile details.",
    icon: Users2,
  },
  {
    title: "Publish public-facing content",
    description: "Push updates to programs, projects, events, gallery highlights, and social links.",
    icon: CheckCircle2,
  },
]

const restResources = [
  "GET /api/content",
  "GET /api/admin/school-years",
  "POST /api/admin/school-years",
  "PATCH /api/admin/school-years/:id",
  "DELETE /api/admin/school-years/:id",
  "GET /api/admin/officers",
  "POST /api/admin/projects",
  "PATCH /api/admin/events/:id",
  "DELETE /api/admin/social-links/:id",
]

export function AdminOverview() {
  return (
    <div className="space-y-8">
      <section className="grid gap-4 xl:grid-cols-[1.25fr_0.75fr]">
        <Card className="relative overflow-hidden border-primary/10 bg-white p-6 shadow-card">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(201,151,42,0.14),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(139,26,26,0.08),transparent_26%)]" />
          <div className="relative">
            <span className="section-label">{adminOverview.eyebrow}</span>
            <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <h2 className="type-h1 text-ink-900">{adminOverview.title}</h2>
                <p className="mt-3 type-body">{adminOverview.description}</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button asChild size="lg">
                  <Link href="/api/content">
                    Open Public Feed
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/">
                    View Public Site
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </Card>

        <Card className="border-primary/10 bg-primary p-6 text-primary-foreground shadow-card">
          <div className="flex items-center justify-between gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
              <Clock3 className="h-5 w-5" />
            </div>
            <StatusBadge variant="lead">Management</StatusBadge>
          </div>
          <h3 className="mt-5 type-h3 text-primary-foreground">Traditional control panel</h3>
          <p className="mt-3 text-sm leading-relaxed text-primary-foreground/80">
            The layout now follows a more classic management pattern with a left sidebar, a
            top-level dashboard, and explicit REST routes for every content collection.
          </p>
        </Card>
      </section>

      <section id="analytics" className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="section-label">Analytics</p>
            <h3 className="mt-2 type-h2 text-ink-900">Operational snapshot</h3>
          </div>
          <StatusBadge variant="active">Live structure</StatusBadge>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {analyticsCards.map((card) => {
            const Icon = card.icon

            return (
              <Card key={card.label} className="border-primary/10 bg-white p-5 shadow-card">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/5 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <StatusBadge variant={card.tone}>{card.badge}</StatusBadge>
                </div>
                <p className="mt-5 text-sm font-medium text-ink-700">{card.label}</p>
                <p className="mt-1 font-display text-4xl font-semibold tracking-tight text-ink-900">
                  {card.value}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-ink-700">{card.detail}</p>
              </Card>
            )
          })}
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="grid gap-4">
          {collectionCards.map((card) => {
            const Icon = card.icon

            return (
              <Card
                key={card.title}
                id={card.id}
                className="border-primary/10 bg-white p-6 shadow-card transition-shadow hover:shadow-card-hover"
              >
                <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                  <div className="flex gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/5 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="type-h3 text-ink-900">{card.title}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-ink-700">{card.description}</p>
                    </div>
                  </div>
                  <StatusBadge variant="neutral">{card.resources.length} routes</StatusBadge>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {card.resources.map((resource) => (
                    <Link
                      key={resource}
                      href={resource}
                      className="rounded-full border border-primary/10 bg-muted px-3 py-1 text-xs font-medium text-ink-700 transition-colors hover:border-primary/20 hover:text-primary"
                    >
                      {resource}
                    </Link>
                  ))}
                </div>
              </Card>
            )
          })}
        </div>

        <div className="space-y-4">
          <Card className="border-primary/10 bg-white p-6 shadow-card">
            <div className="flex items-center justify-between gap-4">
              <h3 className="type-h3 text-ink-900">Management Flow</h3>
              <StatusBadge variant="officer">3 steps</StatusBadge>
            </div>

            <div className="mt-5 space-y-4">
              {operationsTimeline.map((item, index) => {
                const Icon = item.icon

                return (
                  <div key={item.title} className="flex items-start gap-4 rounded-2xl border border-primary/10 bg-muted/60 p-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white text-primary shadow-sm ring-1 ring-primary/10">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold uppercase tracking-[0.14em] text-secondary-dark">
                          Step {index + 1}
                        </span>
                      </div>
                      <p className="mt-1 text-sm font-semibold text-ink-900">{item.title}</p>
                      <p className="mt-1 text-sm leading-relaxed text-ink-700">{item.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </Card>

          <Card className="border-primary/10 bg-white p-6 shadow-card">
            <div className="flex items-center justify-between gap-4">
              <h3 className="type-h3 text-ink-900">REST Route Board</h3>
              <StatusBadge variant="lead">API first</StatusBadge>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-ink-700">
              These routes now follow the usual collection and item pattern for easy management and
              future form wiring.
            </p>

            <div className="mt-5 space-y-2">
              {restResources.map((route) => (
                <div
                  key={route}
                  className="rounded-xl border border-primary/10 bg-muted/40 px-3 py-2 font-mono text-xs text-ink-700"
                >
                  {route}
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>
    </div>
  )
}
