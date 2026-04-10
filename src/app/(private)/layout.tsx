import type { ReactNode } from "react"
import { AdminShell } from "@/components/app"
import { requireCurrentAdminSession } from "@/lib/api/admin-auth-session"

export default async function PrivateLayout({ children }: { children: ReactNode }) {
  await requireCurrentAdminSession()

  return <AdminShell>{children}</AdminShell>
}
