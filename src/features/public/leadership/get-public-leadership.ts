import { getPublicSiteContent } from "@/lib/api/supabase-content-server"
import type { PublicLeaderProfile } from "./leadership-types"

function readString(value: unknown) {
  return typeof value === "string" && value.length > 0 ? value : null
}

function readRecord(value: unknown) {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null
}

function formatLabel(value: string) {
  return value
    .split("-")
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(" ")
}

function mapOfficerToLeaderProfile(officer: Record<string, unknown>): PublicLeaderProfile | null {
  const id = readString(officer.id)
  const firstName = readString(officer.first_name)
  const lastName = readString(officer.last_name)

  if (!id || !firstName || !lastName) {
    return null
  }

  const position = readRecord(officer.position)
  const positionSlug = readString(position?.slug)

  return {
    id,
    name: `${firstName} ${lastName}`,
    role: readString(officer.position_name) || "Officer",
    specialization: positionSlug ? formatLabel(positionSlug) : undefined,
    status: positionSlug?.includes("lead") ? "lead" : "officer",
    avatarUrl: readString(officer.photo_url) || undefined,
    profileUrl: readString(officer.profile_url) || undefined,
  }
}

export async function getPublicLeadershipData() {
  const content = await getPublicSiteContent()
  const leaders = Array.isArray(content.officers)
    ? content.officers
        .map((officer) => readRecord(officer))
        .filter((officer): officer is Record<string, unknown> => officer !== null)
        .map(mapOfficerToLeaderProfile)
        .filter((leader): leader is PublicLeaderProfile => leader !== null)
    : []

  const currentSchoolYear =
    content.currentSchoolYear &&
    typeof content.currentSchoolYear === "object" &&
    !Array.isArray(content.currentSchoolYear)
      ? (content.currentSchoolYear as Record<string, unknown>)
      : null

  return {
    currentSchoolYear,
    leaders: [...leaders].sort((left, right) => {
      const statusOrder = { officer: 0, lead: 1, active: 2, inactive: 3 } as const
      return statusOrder[left.status] - statusOrder[right.status] || left.name.localeCompare(right.name)
    }),
  }
}
