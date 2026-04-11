import {
  BarChart3,
  CalendarDays,
  Eye,
  FolderKanban,
  Globe2,
  GraduationCap,
  Home,
  ImagePlay,
  RadioTower,
  ShieldCheck,
  Users2,
} from "lucide-react"
import type { AdminNavigationItem } from "../admin-navigation-types"

export function useAdminNavigation(): AdminNavigationItem[] {
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
      href: "/admin/school-years",
      icon: GraduationCap,
      match: (pathname: string) => pathname === "/admin/school-years",
    },
    {
      label: "Officers",
      href: "/admin/officers",
      icon: ShieldCheck,
      match: (pathname: string) => pathname === "/admin/officers",
    },
    {
      label: "Site Settings",
      href: "/admin/site-settings",
      icon: Eye,
      match: (pathname: string) => pathname === "/admin/site-settings",
    },
    {
      label: "Programs",
      href: "/admin/programs",
      icon: FolderKanban,
      match: (pathname: string) => pathname === "/admin/programs",
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
  ]
}
