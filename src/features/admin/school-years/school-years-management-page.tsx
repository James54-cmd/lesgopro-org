"use client"

import Link from "next/link"
import { ArrowLeft, ArrowUpRight, GraduationCap } from "lucide-react"
import { StatusBadge } from "@/components/app/status-badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ManagementResourcePanel } from "../management/components/management-resource-panel"
import { getManagementResourceDefinition } from "../management/admin-management-resources"

export function SchoolYearsManagementPage() {
  const schoolYearsDefinition = getManagementResourceDefinition("school-years")

  if (!schoolYearsDefinition) {
    return null
  }

  return (
    <div className="space-y-8">
      <section className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <Card className="relative overflow-hidden border-primary/10 bg-white p-6 shadow-card">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(201,151,42,0.14),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(139,26,26,0.08),transparent_26%)]" />
          <div className="relative">
            <div className="flex flex-wrap items-center gap-3">
              <StatusBadge variant="lead">School Year CRUD</StatusBadge>
              <StatusBadge variant="active">Page Route</StatusBadge>
            </div>

            <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/5 text-primary">
                    <GraduationCap className="h-5 w-5" />
                  </div>
                  <h2 className="type-h1 text-ink-900">School Year Management</h2>
                </div>
                <p className="mt-4 type-body">
                  Create, update, and remove school-year records here. The current school year
                  drives the enrollment snapshot and other public-facing organization data.
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
                  <Link href="/api/admin/school-years">
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
          <h3 className="mt-4 type-h3 text-primary-foreground">One record should stay current</h3>
          <p className="mt-3 text-sm leading-relaxed text-primary-foreground/80">
            Marking a school year as current will unset the old current record in the database.
            That keeps the public site aligned with a single active cycle.
          </p>
        </Card>
      </section>

      <ManagementResourcePanel definition={schoolYearsDefinition} />
    </div>
  )
}
