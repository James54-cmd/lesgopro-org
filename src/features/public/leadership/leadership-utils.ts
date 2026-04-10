import type { PublicLeaderProfile } from "./leadership-types"

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

export function buildLeadershipPreview(leaders: PublicLeaderProfile[]) {
  const visibleLeaders = leaders.filter((leader) => leader.status !== "inactive")
  const officers = visibleLeaders.filter((leader) => leader.status === "officer")
  const leads = visibleLeaders.filter((leader) => leader.status === "lead" || leader.status === "active")

  const head = officers[0] || visibleLeaders[0] || null
  const executiveTeam = officers.filter((leader) => leader !== head).slice(0, 2)
  const supportTeam = [...officers.filter((leader) => leader !== head).slice(2), ...leads]

  return {
    head,
    executiveTeam,
    supportTeam,
  }
}
