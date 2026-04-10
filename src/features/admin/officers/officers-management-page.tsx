"use client"

import Link from "next/link"
import { ArrowLeft, ArrowUpRight, ShieldCheck } from "lucide-react"
import { StatusBadge } from "@/components/app/status-badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { getManagementResourceDefinition } from "../management/admin-management-resources"
import { ManagementResourcePanel } from "../management/components/management-resource-panel"

export function OfficersManagementPage() {
  const officersDefinition = getManagementResourceDefinition("officers")

  if (!officersDefinition) {
    return null
  }

  return (
    <div className="space-y-8">
      <section className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <Card className="relative overflow-hidden border-primary/10 bg-white p-6 shadow-card">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(201,151,42,0.14),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(139,26,26,0.08),transparent_26%)]" />
          <div className="relative">
            <div className="flex flex-wrap items-center gap-3">
              <StatusBadge variant="officer">Officer CRUD</StatusBadge>
              <StatusBadge variant="active">Page Route</StatusBadge>
            </div>

            <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/5 text-primary">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <h2 className="type-h1 text-ink-900">Officer Management</h2>
                </div>
                <p className="mt-4 type-body">
                  Maintain the active roster for each school year, connect members to officer
                  positions, and manage the public-facing profile details used on the site.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button asChild variant="outline" size="lg">
                  <Link href="/admin">
                    <ArrowLeft className="h-4 w-4" />
                    Back to Dashboard
                  </Link>
                </Button>
                <Button asChild size="lg">
                  <Link href="/api/admin/officers">
                    Open API Route
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </Card>

        <Card className="border-primary/10 bg-primary p-6 text-primary-foreground shadow-card">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-secondary">
            Notes
          </p>
          <h3 className="mt-4 type-h3 text-primary-foreground">Roster follows school-year ownership</h3>
          <p className="mt-3 text-sm leading-relaxed text-primary-foreground/80">
            Public leadership should come from active officers attached to the current school year.
            Keep older officers in past years instead of overwriting the current roster.
          </p>
        </Card>
      </section>

      <ManagementResourcePanel definition={officersDefinition} />
    </div>
  )
}
