import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { StatusBadge } from "@/components/app/status-badge"
import { adminOverview } from "@/config/site"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useAdminDashboard } from "./dashboard/hooks/use-admin-dashboard"

export function AdminOverview() {
  const { analyticsCards, collectionCards, operationsTimeline, restResources, spotlightCard } =
    useAdminDashboard()

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
              <spotlightCard.icon className="h-5 w-5" />
            </div>
            <StatusBadge variant="lead">{spotlightCard.badge}</StatusBadge>
          </div>
          <h3 className="mt-5 type-h3 text-primary-foreground">{spotlightCard.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-primary-foreground/80">
            {spotlightCard.description}
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

      <section className="grid gap-4 md:grid-cols-2">
        <Card className="border-primary/10 bg-white p-6 shadow-card">
          <p className="section-label">Management Pages</p>
          <h3 className="mt-3 type-h3 text-ink-900">Dedicated CRUD pages are taking shape</h3>
          <p className="mt-3 text-sm leading-relaxed text-ink-700">
            School Year and Officer management now live on their own page routes instead of being
            embedded inside the dashboard. The next collections can follow the same pattern.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href="/admin/school-years">
                Open School Year CRUD
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/admin/officers">
                Open Officer CRUD
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </Card>

        <Card className="border-primary/10 bg-white p-6 shadow-card">
          <p className="section-label">Route Direction</p>
          <h3 className="mt-3 type-h3 text-ink-900">Traditional page-based management</h3>
          <p className="mt-3 text-sm leading-relaxed text-ink-700">
            The dashboard stays focused on analytics and oversight, while each collection gets its
            own dedicated route for tables, forms, and operational workflows.
          </p>
        </Card>
      </section>
    </div>
  )
}
