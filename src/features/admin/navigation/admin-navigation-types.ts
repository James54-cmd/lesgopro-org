import type { LucideIcon } from "lucide-react"

export type AdminNavigationItem = {
  label: string
  href: string
  icon: LucideIcon
  match: (pathname: string) => boolean
}
