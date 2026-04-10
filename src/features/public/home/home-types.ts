export type EventStatus = "open" | "closed" | "cancelled" | "full"

export type ProjectStatus = "inDevelopment" | "live" | "beta"

export interface HeroAction {
  label: string
  targetId: string
}

export interface HeroContent {
  eyebrow: string
  title: string
  description: string
  primaryAction: HeroAction
  secondaryAction: HeroAction
  tertiaryAction: HeroAction
  focusLabel: string
  focusValue: string
}

export interface SectionCopy {
  label: string
  title: string
  description: string
}

export interface StatItem {
  value: string
  label: string
}

export interface EventItem {
  title: string
  description: string
  date: string
  time: string
  type: string
  status: EventStatus
  registeredCount?: number
  maxCapacity?: number
}

export interface ProjectItem {
  title: string
  description: string
  techStack: string[]
  status: ProjectStatus
}

export interface ProgramOffer {
  title: string
  description: string
  degreeType: string
  audienceNote: string
}

export interface GalleryItem {
  title: string
  caption: string
  imageUrl: string
  alt: string
  tag: string
}

export interface HomeContent {
  hero: HeroContent
  statsIntro: {
    eyebrow: string
    title: string
    description: string
  }
  sections: {
    programs: SectionCopy
    leadership: SectionCopy
    events: SectionCopy
    projects: SectionCopy
    gallery: SectionCopy
  }
  programFooterNote: string
  organizationStats: StatItem[]
  upcomingEvents: EventItem[]
  featuredProjects: ProjectItem[]
  programOffers: ProgramOffer[]
  galleryItems: GalleryItem[]
}
