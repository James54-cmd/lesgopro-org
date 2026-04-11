import type { LeadershipPreviewRow, PublicLeaderProfile } from "./leadership-types"

const avatarGradientPresets = [
  "from-[#8B1A1A] via-[#B63E3E] to-[#C9972A]",
  "from-[#7A5500] via-[#C9972A] to-[#E6C36A]",
  "from-[#2D6A3F] via-[#4E8E63] to-[#C8E6D0]",
  "from-[#1F3A5F] via-[#4B6F93] to-[#B7D4EE]",
  "from-[#6A2D5F] via-[#A65A97] to-[#F0C3E8]",
] as const

export function getLeaderInitials(name: string) {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)
}

export function getLeaderAvatarGradient(name: string) {
  const hash = Array.from(name).reduce((total, character) => total + character.charCodeAt(0), 0)
  return avatarGradientPresets[hash % avatarGradientPresets.length]
}

export function compareLeadershipOrder(left: PublicLeaderProfile, right: PublicLeaderProfile) {
  const statusOrder = { officer: 0, lead: 1, active: 2, inactive: 3 } as const
  const statusDiff = statusOrder[left.status] - statusOrder[right.status]

  if (statusDiff !== 0) {
    return statusDiff
  }

  const sortDiff = (left.sortOrder ?? Number.MAX_SAFE_INTEGER) - (right.sortOrder ?? Number.MAX_SAFE_INTEGER)

  if (sortDiff !== 0) {
    return sortDiff
  }

  const positionSortDiff =
    (left.positionSortOrder ?? Number.MAX_SAFE_INTEGER) -
    (right.positionSortOrder ?? Number.MAX_SAFE_INTEGER)

  if (positionSortDiff !== 0) {
    return positionSortDiff
  }

  return left.name.localeCompare(right.name)
}

function isAdviserRole(leader: PublicLeaderProfile) {
  const roleKey = `${leader.roleSlug || ""} ${leader.role}`.toLowerCase()
  return roleKey.includes("adviser") || roleKey.includes("advisor")
}

function compareLeadershipLayoutOrder(left: PublicLeaderProfile, right: PublicLeaderProfile) {
  const sortDiff = (left.sortOrder ?? Number.MAX_SAFE_INTEGER) - (right.sortOrder ?? Number.MAX_SAFE_INTEGER)

  if (sortDiff !== 0) {
    return sortDiff
  }

  return compareLeadershipOrder(left, right)
}

function buildTrailingGridRows(
  leaders: PublicLeaderProfile[],
  tone: LeadershipPreviewRow["tone"]
): LeadershipPreviewRow[] {
  const fullRowCount = Math.floor(leaders.length / 3)
  const remainder = leaders.length % 3
  const rows: LeadershipPreviewRow[] = []

  for (let rowIndex = 0; rowIndex < fullRowCount; rowIndex += 1) {
    const start = rowIndex * 3
    rows.push({
      leaders: leaders.slice(start, start + 3),
      columns: 3,
      alignment: "default",
      tone,
    })
  }

  if (remainder === 1) {
    rows.push({
      leaders: leaders.slice(leaders.length - 1),
      columns: 3,
      alignment: "center",
      tone,
    })
  }

  if (remainder === 2) {
    rows.push({
      leaders: leaders.slice(leaders.length - 2),
      columns: 3,
      alignment: "edges",
      tone,
    })
  }

  return rows
}

function takeLeaderBySortOrder(pool: PublicLeaderProfile[], sortOrder: number) {
  const index = pool.findIndex((leader) => leader.sortOrder === sortOrder)

  if (index === -1) {
    return null
  }

  const [leader] = pool.splice(index, 1)
  return leader
}

export function buildLeadershipPreview(leaders: PublicLeaderProfile[]) {
  const visibleLeaders = leaders
    .filter((leader) => leader.status !== "inactive")
    .sort(compareLeadershipLayoutOrder)
  const advisers = visibleLeaders.filter(isAdviserRole)
  const remainingLeaders = visibleLeaders.filter((leader) => !isAdviserRole(leader))
  const rows: LeadershipPreviewRow[] = []

  const firstLeader = takeLeaderBySortOrder(remainingLeaders, 1)
  const secondLeader = takeLeaderBySortOrder(remainingLeaders, 2)
  const thirdLeader = takeLeaderBySortOrder(remainingLeaders, 3)
  const fourthLeader = takeLeaderBySortOrder(remainingLeaders, 4)

  if (firstLeader) {
    rows.push({
      leaders: [firstLeader],
      columns: 1,
      alignment: "default",
      tone: "head",
    })
  }

  if (secondLeader) {
    rows.push({
      leaders: [secondLeader],
      columns: 1,
      alignment: "default",
      tone: "branch",
    })
  }

  const pairedRowLeaders = [thirdLeader, fourthLeader].filter(
    (leader): leader is PublicLeaderProfile => leader !== null
  )

  if (pairedRowLeaders.length > 0) {
    rows.push({
      leaders: pairedRowLeaders,
      columns: 2,
      alignment: "default",
      tone: "branch",
    })
  }

  rows.push(...buildTrailingGridRows(remainingLeaders, "support"))

  return {
    advisers,
    rows,
  }
}
