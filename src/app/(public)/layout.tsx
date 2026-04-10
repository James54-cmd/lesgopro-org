import type { ReactNode } from "react"
import { SiteFooter, SiteHeader } from "@/components/navigation"

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="pt-16">{children}</main>
      <SiteFooter />
    </div>
  )
}
