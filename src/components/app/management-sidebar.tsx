"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BrandMark } from "@/components/app/brand-mark"
import { useManagementNavigation } from "@/features/workspace"
import { cn } from "@/lib/utils"

export function ManagementSidebar() {
  const pathname = usePathname()
  const managementNavigation = useManagementNavigation()

  return (
    <aside className="sticky top-0 hidden h-screen w-72 shrink-0 border-r border-primary/10 bg-[linear-gradient(180deg,#fffdf9_0%,#f8f3eb_100%)] xl:flex xl:flex-col">
      <div className="border-b border-primary/10 px-6 py-6">
        <BrandMark href="/" size="sm" className="text-primary-dark [&_p:last-child]:text-ink-400" />
        <p className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-secondary-dark">
          Management Portal
        </p>
        <p className="mt-2 text-sm leading-relaxed text-ink-700">
          Organize school-year stats, leadership, content publishing, and public-facing media.
        </p>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-4 py-5">
        {managementNavigation.map((item) => {
          const Icon = item.icon
          const isActive = item.match(pathname)

          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground shadow-card"
                  : "text-ink-700 hover:bg-white hover:text-primary"
              )}
            >
              <span
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-xl",
                  isActive ? "bg-white/12" : "bg-primary/5 text-primary"
                )}
              >
                <Icon className="h-4 w-4" />
              </span>
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="border-t border-primary/10 px-6 py-5">
        <div className="rounded-2xl bg-primary p-4 text-primary-foreground">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-secondary">
            Current Focus
          </p>
          <p className="mt-2 text-sm font-semibold">Management dashboard and API rails are ready.</p>
          <p className="mt-2 text-sm leading-relaxed text-primary-foreground/80">
            Next step is wiring forms and tables directly to each management route.
          </p>
        </div>
      </div>
    </aside>
  )
}
