export type LeaderStatus = "officer" | "lead" | "active" | "inactive"

export type PublicLeaderProfile = {
  id: string
  name: string
  role: string
  specialization?: string
  status: LeaderStatus
  avatarUrl?: string
  profileUrl?: string
}

export type LeadershipSectionCopy = {
  label: string
  title: string
  description: string
}

export type LeadershipPageCopy = {
  eyebrow: string
  title: string
  description: string
}
