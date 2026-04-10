import type { ReactNode } from "react"
import { AdminShell } from "@/components/app"

export default function PrivateLayout({ children }: { children: ReactNode }) {
  return <AdminShell>{children}</AdminShell>
}
