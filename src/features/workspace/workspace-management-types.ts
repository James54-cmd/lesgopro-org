import type { LucideIcon } from "lucide-react"
import type { StatusBadgeVariant } from "@/components/app"

export type ManagementNavigationItem = {
  label: string
  href: string
  icon: LucideIcon
  match: (pathname: string) => boolean
}

export type ManagementAnalyticsCard = {
  label: string
  value: string
  detail: string
  icon: LucideIcon
  badge: string
  tone: StatusBadgeVariant
}

export type ManagementCollectionCard = {
  id: string
  title: string
  icon: LucideIcon
  description: string
  resources: string[]
}

export type ManagementTimelineStep = {
  title: string
  description: string
  icon: LucideIcon
}

export type ManagementSpotlightCard = {
  badge: string
  title: string
  description: string
  icon: LucideIcon
}

export type ManagementDashboardData = {
  analyticsCards: ManagementAnalyticsCard[]
  collectionCards: ManagementCollectionCard[]
  operationsTimeline: ManagementTimelineStep[]
  restResources: string[]
  spotlightCard: ManagementSpotlightCard
}
