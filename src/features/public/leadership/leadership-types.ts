export type LeaderStatus = "officer" | "lead" | "active" | "inactive"

export type PublicLeaderProfile = {
  id: string
  name: string
  role: string
  roleSlug?: string
  specialization?: string
  status: LeaderStatus
  avatarUrl?: string
  profileUrl?: string
  sortOrder?: number
  positionSortOrder?: number
}

export type LeadershipPreviewTone = "head" | "branch" | "support"

export type LeadershipPreviewRow = {
  leaders: PublicLeaderProfile[]
  columns: 1 | 2 | 3
  alignment: "default" | "center" | "edges"
  tone: LeadershipPreviewTone
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
