import type { Metadata } from "next"

export type AccessLayerKey = "public" | "private" | "admin"
export type PrivateWorkspaceArea = "member" | "admin"

export type NavigationLink = {
  label: string
  href: string
}

export type AccessLayer = {
  key: AccessLayerKey
  label: string
  href: string
  audience: string
  summary: string
  access: string
}

export type WorkspaceModule = {
  id: string
  title: string
  description: string
  state: "foundation" | "next" | "planned"
}

export const siteConfig = {
  name: "LESGOPRO",
  fullName: "LESGOPRO - Learner's Group of Programmers",
  schoolName: "Mandaue City College",
  description:
    "A community of passionate developers at Mandaue City College building skills and creating real-world impact.",
  url: "https://lesgopro.org",
  logos: {
    primary: "/brand/lesgopro_logo.png",
    assistant: "/brand/lesgopro_ai_logo.png",
  },
} as const

export const siteMetadata: Metadata = {
  title: siteConfig.fullName,
  description: siteConfig.description,
  icons: {
    icon: siteConfig.logos.primary,
    shortcut: siteConfig.logos.primary,
    apple: siteConfig.logos.primary,
  },
  keywords: [
    "programming",
    "developers",
    "community",
    "mandaue city college",
    "students",
    "technology",
  ],
  authors: [{ name: siteConfig.name }],
  creator: `${siteConfig.name} - ${siteConfig.schoolName}`,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.fullName,
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.logos.primary,
        width: 1200,
        height: 1200,
        alt: siteConfig.fullName,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.fullName,
    description: siteConfig.description,
    images: [siteConfig.logos.primary],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export const publicNavigation: NavigationLink[] = [
  { label: "Overview", href: "/#overview" },
  { label: "Programs", href: "/#program-offers" },
  { label: "Leadership", href: "/#leadership" },
  { label: "Events", href: "/#events" },
  { label: "Projects", href: "/#projects" },
  { label: "Access", href: "/#access-layers" },
]

export const footerNavigation: NavigationLink[] = [
  { label: "Public Home", href: "/" },
  { label: "Private Portal", href: "/portal" },
  { label: "Programs", href: "/#program-offers" },
  { label: "Events", href: "/#events" },
  { label: "Projects", href: "/#projects" },
  { label: "Access Layers", href: "/#access-layers" },
]

export const accessLayers: AccessLayer[] = [
  {
    key: "public",
    label: "Public Experience",
    href: "/#overview",
    audience: "Students, guests, and other visitors",
    summary:
      "Open-facing pages for program information, organization highlights, and community discovery.",
    access: "Open access",
  },
  {
    key: "private",
    label: "Private Portal",
    href: "/portal",
    audience: "Authenticated members",
    summary:
      "A member-only space for updates, resources, collaboration, and internal activity flows.",
    access: "Sign-in required",
  },
  {
    key: "admin",
    label: "Admin Workspace",
    href: "/portal/admin",
    audience: "Admins inside the private area",
    summary:
      "Restricted tools nested under the private workspace for approvals, publishing, and internal operations.",
    access: "Role restricted",
  },
]

export const privateNavigation: NavigationLink[] = [
  { label: "Public Site", href: "/" },
  { label: "Member Portal", href: "/portal" },
  { label: "Admin Workspace", href: "/portal/admin" },
]

export const privateAreaOverview: Record<
  PrivateWorkspaceArea,
  {
    eyebrow: string
    title: string
    description: string
    modules: WorkspaceModule[]
  }
> = {
  member: {
    eyebrow: "Member Portal",
    title: "A clean private space for member collaboration and resources",
    description:
      "This protected area is ready for member-only content so internal tools can grow without cluttering the public site.",
    modules: [
      {
        id: "member-home",
        title: "Member Home",
        description:
          "A personalized dashboard for updates, quick actions, and role-aware shortcuts.",
        state: "foundation",
      },
      {
        id: "project-hub",
        title: "Project Hub",
        description:
          "A shared space for active builds, documentation, and collaboration across teams.",
        state: "next",
      },
      {
        id: "event-calendar",
        title: "Event Calendar",
        description:
          "A member-only calendar for attendance, schedules, and internal coordination.",
        state: "planned",
      },
    ],
  },
  admin: {
    eyebrow: "Admin Workspace",
    title: "Admin tools nested inside the private layer",
    description:
      "Admin pages now sit inside the private structure so they can share the same protected shell, navigation, and future auth boundary.",
    modules: [
      {
        id: "content-publishing",
        title: "Content Publishing",
        description:
          "Manage homepage sections, announcements, and visible content from a dedicated admin area.",
        state: "foundation",
      },
      {
        id: "member-approvals",
        title: "Member Approvals",
        description:
          "Review applications, update roles, and keep member data organized.",
        state: "next",
      },
      {
        id: "operations-desk",
        title: "Operations Desk",
        description:
          "Handle internal tasks, publishing workflows, and role-specific operations.",
        state: "planned",
      },
    ],
  },
}
