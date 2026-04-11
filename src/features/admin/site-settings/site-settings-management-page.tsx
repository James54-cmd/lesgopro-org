"use client"

import Link from "next/link"
import { ArrowLeft, ArrowUpRight, Eye, EyeOff, RefreshCcw, Settings2 } from "lucide-react"
import { StatusBadge } from "@/components/app/status-badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useSiteSettingsManagement } from "./use-site-settings-management"

export function SiteSettingsManagementPage() {
  const {
    settings,
    isLoading,
    isSubmitting,
    errorMessage,
    loadSettings,
    updatePublicLeadershipVisibility,
  } = useSiteSettingsManagement()

  const isLeadershipVisible = settings?.show_public_leadership ?? true

  return (
    <div className="space-y-6">
      <section className="grid gap-4 xl:grid-cols-2">
        <Card className="border-primary/10 bg-white p-6 shadow-card">
          <div className="flex flex-wrap items-center gap-3">
            <StatusBadge variant="officer">Site Settings</StatusBadge>
            <StatusBadge variant="active">Public Controls</StatusBadge>
          </div>

          <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/5 text-primary">
                  <Settings2 className="h-5 w-5" />
                </div>
                <h2 className="type-h1 text-ink-900">Public Visibility Settings</h2>
              </div>
              <p className="mt-4 type-body">
                Control whether the leadership section is visible on the public site without
                changing officer records or school year data.
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
                <Link href="/leadership">
                  Open Public Page
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </Card>

        <Card className="border-primary/10 bg-primary p-6 text-primary-foreground shadow-card">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-secondary">
            Current State
          </p>
          <h3 className="mt-4 type-h3 text-primary-foreground">
            Leadership visibility is {isLeadershipVisible ? "enabled" : "hidden"}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-primary-foreground/80">
            When enabled, the homepage leadership section and the public leadership page are visible
            to visitors. When disabled, both are hidden from public view.
          </p>
        </Card>
      </section>

      <Card className="border-primary/10 bg-white shadow-card">
        <CardHeader className="border-b border-primary/10 pb-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <CardTitle className="type-h3 text-ink-900">Leadership section</CardTitle>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-700">
                This setting controls the public leadership section globally, so admins can quickly
                hide it without editing the current officer roster.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => void loadSettings()}
                disabled={isLoading || isSubmitting}
              >
                <RefreshCcw className="h-4 w-4" />
                Refresh
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-6">
          {errorMessage ? (
            <div className="mb-4 rounded-2xl border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive">
              {errorMessage}
            </div>
          ) : null}

          {isLoading ? (
            <div className="rounded-2xl border border-primary/10 bg-muted/40 px-4 py-8 text-sm text-ink-700">
              Loading site settings...
            </div>
          ) : settings ? (
            <div className="rounded-[1.75rem] border border-primary/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(253,250,245,0.94))] p-6 shadow-sm">
              <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                <div className="max-w-2xl">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/5 text-primary">
                      {isLeadershipVisible ? (
                        <Eye className="h-5 w-5" />
                      ) : (
                        <EyeOff className="h-5 w-5" />
                      )}
                    </div>
                    <div>
                      <p className="text-base font-semibold text-ink-900">Public leadership section</p>
                      <p className="mt-1 text-sm text-ink-600">
                        {isLeadershipVisible
                          ? "Visible on the homepage and leadership page."
                          : "Hidden from the homepage and leadership page."}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Button
                    type="button"
                    variant={isLeadershipVisible ? "outline" : "default"}
                    onClick={() => void updatePublicLeadershipVisibility(true)}
                    disabled={isSubmitting || isLeadershipVisible}
                  >
                    <Eye className="h-4 w-4" />
                    Show to Public
                  </Button>
                  <Button
                    type="button"
                    variant={isLeadershipVisible ? "default" : "outline"}
                    className={
                      isLeadershipVisible
                        ? "bg-ink-900 text-white hover:bg-ink-800"
                        : undefined
                    }
                    onClick={() => void updatePublicLeadershipVisibility(false)}
                    disabled={isSubmitting || !isLeadershipVisible}
                  >
                    <EyeOff className="h-4 w-4" />
                    Hide from Public
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-primary/20 bg-muted/30 px-4 py-8">
              <p className="text-sm font-semibold text-ink-900">No site settings found</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-700">
                Run the site settings migration so the default public visibility record is created.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
