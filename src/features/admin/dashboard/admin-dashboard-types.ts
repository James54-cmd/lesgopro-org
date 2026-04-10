import type { LucideIcon } from "lucide-react"
import type { StatusBadgeVariant } from "@/components/app"

export type AdminAnalyticsCard = {
  label: string
  value: string
  detail: string
  icon: LucideIcon
  badge: string
  tone: StatusBadgeVariant
}

export type AdminCollectionCard = {
  id: string
  title: string
  icon: LucideIcon
  description: string
  resources: string[]
}

export type AdminTimelineStep = {
  title: string
  description: string
  icon: LucideIcon
}

export type AdminSpotlightCard = {
  badge: string
  title: string
  description: string
  icon: LucideIcon
}

export type AdminDashboardData = {
  analyticsCards: AdminAnalyticsCard[]
  collectionCards: AdminCollectionCard[]
  operationsTimeline: AdminTimelineStep[]
  restResources: string[]
  spotlightCard: AdminSpotlightCard
}
