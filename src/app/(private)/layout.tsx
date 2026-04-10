import type { ReactNode } from "react"
import { PrivateShell } from "@/components/app"

export default function PrivateLayout({ children }: { children: ReactNode }) {
  return <PrivateShell>{children}</PrivateShell>
}
