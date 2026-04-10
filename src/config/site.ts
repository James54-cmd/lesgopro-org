import type { Metadata } from "next"

export type SiteAreaKey = "public" | "admin"

export type NavigationLink = {
  label: string
  href: string
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
  { label: "Leadership", href: "/leadership" },
  { label: "Events", href: "/#events" },
  { label: "Projects", href: "/#projects" },
]

export const footerNavigation: NavigationLink[] = [
  { label: "Public Home", href: "/" },
  { label: "Programs", href: "/#program-offers" },
  { label: "Leadership", href: "/leadership" },
  { label: "Events", href: "/#events" },
  { label: "Projects", href: "/#projects" },
]

export const adminNavigation: NavigationLink[] = [
  { label: "Public Site", href: "/" },
  { label: "Management Dashboard", href: "/admin" },
]

export const adminOverview = {
  eyebrow: "Management Workspace",
  title: "Protected tools for managing the organization site",
  description:
    "Management stays inside the protected route boundary, while the public site remains focused on students and other visitors.",
  modules: [
    {
      id: "content-publishing",
      title: "Content Publishing",
      description:
        "Manage homepage sections, announcements, and visible public content from one place.",
      state: "foundation",
    },
    {
      id: "events-planning",
      title: "Events Planning",
      description:
        "Prepare schedules, event highlights, and upcoming activities before they appear on the public site.",
      state: "next",
    },
    {
      id: "site-operations",
      title: "Site Operations",
      description:
        "Handle management-only settings, workflow checks, and future protected operational tools.",
      state: "planned",
    },
  ],
}
