import type { ReactNode } from "react"
import Link from "next/link"
import { BrandMark } from "@/components/app/brand-mark"
import { AdminLogoutButton } from "@/features/admin/auth"
import { adminNavigation } from "@/config/site"

type AdminShellProps = {
  children: ReactNode
}

export function AdminShell({ children }: AdminShellProps) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(201,151,42,0.12),transparent_24%),linear-gradient(180deg,#fdfaf5_0%,#f5f0e8_100%)]">
      <header className="border-b border-primary/10 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <BrandMark href="/" />
            <div className="flex flex-wrap items-center gap-2">
              <nav className="flex flex-wrap gap-2">
                {adminNavigation.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="rounded-full border border-primary/10 bg-white px-4 py-2 text-sm font-medium text-ink-700 transition-colors hover:border-primary/20 hover:text-primary"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
              <AdminLogoutButton />
            </div>
          </div>

          <div className="max-w-3xl pb-2">
            <span className="inline-flex rounded-full bg-secondary/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-secondary-dark">
              Protected Admin Area
            </span>
            <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-ink-900">
              Protected space for administrators
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-ink-700">
              The public site stays focused on students and visitors, while
              management tools stay inside a separate protected shell for admins.
            </p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">{children}</main>
    </div>
  )
}
