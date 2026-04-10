import type { ReactNode } from "react"
import { AdminLogoutButton } from "@/features/admin"
import { ManagementSidebar } from "@/components/app/management-sidebar"

type AdminShellProps = {
  children: ReactNode
}

export function AdminShell({ children }: AdminShellProps) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(201,151,42,0.12),transparent_24%),linear-gradient(180deg,#fdfaf5_0%,#f5f0e8_100%)] xl:flex">
      <ManagementSidebar />

      <div className="min-w-0 flex-1">
        <header className="border-b border-primary/10 bg-white/85 backdrop-blur">
          <div className="px-4 py-5 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-3xl">
                <span className="inline-flex rounded-full bg-secondary/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-secondary-dark">
                  Protected Management Area
                </span>
                <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-ink-900">
                  Traditional management dashboard for the organization site
                </h1>
                <p className="mt-3 max-w-2xl text-base leading-relaxed text-ink-700">
                  Monitor the current school year, publishing collections, leadership records,
                  and public media from one protected workspace.
                </p>
              </div>

              <div className="flex items-center justify-start lg:justify-end">
                <AdminLogoutButton />
              </div>
            </div>
          </div>
        </header>

        <main className="px-4 py-8 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  )
}
