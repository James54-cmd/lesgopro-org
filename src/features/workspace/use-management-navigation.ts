import {
  BarChart3,
  CalendarDays,
  FolderKanban,
  Globe2,
  GraduationCap,
  Home,
  ImagePlay,
  RadioTower,
  ShieldCheck,
  Users2,
} from "lucide-react"
import type { ManagementNavigationItem } from "./workspace-management-types"

export function useManagementNavigation(): ManagementNavigationItem[] {
  return [
    {
      label: "Dashboard",
      href: "/admin",
      icon: Home,
      match: (pathname: string) => pathname === "/admin",
    },
    {
      label: "Analytics",
      href: "/admin#analytics",
      icon: BarChart3,
      match: (pathname: string) => pathname === "/admin",
    },
    {
      label: "School Year",
      href: "/admin#school-year",
      icon: GraduationCap,
      match: (pathname: string) => pathname === "/admin",
    },
    {
      label: "Officers",
      href: "/admin#leadership",
      icon: ShieldCheck,
      match: (pathname: string) => pathname === "/admin",
    },
    {
      label: "Programs",
      href: "/admin#programs-projects",
      icon: FolderKanban,
      match: (pathname: string) => pathname === "/admin",
    },
    {
      label: "Events",
      href: "/admin#events-gallery",
      icon: CalendarDays,
      match: (pathname: string) => pathname === "/admin",
    },
    {
      label: "Gallery",
      href: "/admin#events-gallery",
      icon: ImagePlay,
      match: (pathname: string) => pathname === "/admin",
    },
    {
      label: "Socials",
      href: "/admin#socials",
      icon: RadioTower,
      match: (pathname: string) => pathname === "/admin",
    },
    {
      label: "Public Site",
      href: "/",
      icon: Globe2,
      match: () => false,
    },
    {
      label: "Enrollment",
      href: "/admin#school-year",
      icon: Users2,
      match: (pathname: string) => pathname === "/admin",
    },
  ]
}
