import {
  Activity,
  CalendarDays,
  CheckCircle2,
  Clock3,
  FolderKanban,
  GraduationCap,
  ImagePlay,
  RadioTower,
  ShieldCheck,
  Users2,
} from "lucide-react"
import type { ManagementDashboardData } from "./workspace-management-types"

export function useManagementDashboard(): ManagementDashboardData {
  const analyticsCards: ManagementDashboardData["analyticsCards"] = [
    {
      label: "Active School Year",
      value: "1",
      detail: "One current school year should drive the public enrollment stat.",
      icon: GraduationCap,
      badge: "Current",
      tone: "lead" as const,
    },
    {
      label: "Leadership Groups",
      value: "2",
      detail: "Officer positions and officer records stay dynamic and reorderable.",
      icon: ShieldCheck,
      badge: "Dynamic",
      tone: "officer" as const,
    },
    {
      label: "Published Collections",
      value: "5",
      detail: "Programs, projects, events, gallery, and socials can all be published independently.",
      icon: FolderKanban,
      badge: "Ready",
      tone: "active" as const,
    },
    {
      label: "Media-Ready Areas",
      value: "4",
      detail: "Links, thumbnails, videos, and galleries are already modeled in the backend.",
      icon: ImagePlay,
      badge: "Flexible",
      tone: "lead" as const,
    },
  ]

  const collectionCards: ManagementDashboardData["collectionCards"] = [
    {
      id: "school-year",
      title: "School Year And Enrollment",
      icon: GraduationCap,
      description:
        "Set the current school year and the active enrolled IT student count for the homepage analytics.",
      resources: ["/api/admin/school-years", "/api/admin/enrollment-counts"],
    },
    {
      id: "leadership",
      title: "Leadership Management",
      icon: ShieldCheck,
      description:
        "Add dynamic officer positions, assign officers per year, and keep contact details organized.",
      resources: ["/api/admin/officer-positions", "/api/admin/officers"],
    },
    {
      id: "programs-projects",
      title: "Programs And Projects",
      icon: FolderKanban,
      description:
        "Publish learning programs and projects with GitHub repositories, live demos, and visual media.",
      resources: ["/api/admin/programs", "/api/admin/projects"],
    },
    {
      id: "events-gallery",
      title: "Events And Gallery",
      icon: CalendarDays,
      description:
        "Track schedules, recap visuals, thumbnails, and media links for public storytelling.",
      resources: ["/api/admin/events", "/api/admin/gallery-items"],
    },
    {
      id: "socials",
      title: "Social Presence",
      icon: RadioTower,
      description:
        "Keep the organization’s public links in one place so every surface stays consistent.",
      resources: ["/api/admin/social-links"],
    },
  ]

  const operationsTimeline: ManagementDashboardData["operationsTimeline"] = [
    {
      title: "Refresh school-year analytics",
      description: "Update the current school year and save the latest IT student count.",
      icon: Activity,
    },
    {
      title: "Maintain leadership records",
      description: "Review officer positions, assign the current team, and confirm profile details.",
      icon: Users2,
    },
    {
      title: "Publish public-facing content",
      description: "Push updates to programs, projects, events, gallery highlights, and social links.",
      icon: CheckCircle2,
    },
  ]

  const restResources: ManagementDashboardData["restResources"] = [
    "GET /api/content",
    "GET /api/admin/school-years",
    "POST /api/admin/school-years",
    "PATCH /api/admin/school-years/:id",
    "DELETE /api/admin/school-years/:id",
    "GET /api/admin/officers",
    "POST /api/admin/projects",
    "PATCH /api/admin/events/:id",
    "DELETE /api/admin/social-links/:id",
  ]

  const spotlightCard: ManagementDashboardData["spotlightCard"] = {
    badge: "Management",
    title: "Traditional control panel",
    description:
      "The layout now follows a more classic management pattern with a left sidebar, a top-level dashboard, and explicit REST routes for every content collection.",
    icon: Clock3,
  }

  return {
    analyticsCards,
    collectionCards,
    operationsTimeline,
    restResources,
    spotlightCard,
  }
}
