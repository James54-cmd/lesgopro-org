import { getPublicSiteContent } from "@/lib/api/supabase-content-server"
import { compareLeadershipOrder } from "./leadership-utils"
import type { PublicLeaderProfile } from "./leadership-types"

function readString(value: unknown) {
  return typeof value === "string" && value.length > 0 ? value : null
}

function readRecord(value: unknown) {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null
}

function readNumber(value: unknown) {
  return typeof value === "number" && Number.isFinite(value) ? value : undefined
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
  const positionSlug =
    readString(officer.officer_position_slug) || readString(position?.slug) || undefined
  const role = readString(officer.position_name) || "Officer"
  const specializationLabel = positionSlug ? formatLabel(positionSlug) : undefined

  return {
    id,
    name: `${firstName} ${lastName}`,
    role,
    roleSlug: positionSlug,
    specialization:
      specializationLabel && specializationLabel.toLowerCase() !== role.toLowerCase()
        ? specializationLabel
        : undefined,
    status: positionSlug?.includes("lead") ? "lead" : "officer",
    avatarUrl: readString(officer.photo_url) || undefined,
    profileUrl: readString(officer.profile_url) || undefined,
    sortOrder: readNumber(officer.sort_order),
    positionSortOrder:
      readNumber(officer.officer_position_sort_order) || readNumber(position?.sort_order),
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
    leaders: [...leaders].sort(compareLeadershipOrder),
  }
}
