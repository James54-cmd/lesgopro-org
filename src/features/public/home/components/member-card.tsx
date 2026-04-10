import Image from "next/image"
import { Card } from "@/components/ui/card"
import { StatusBadge } from "@/components/app/status-badge"
import type { Member } from "@/features/public/home/home-types"
import { cn } from "@/lib/utils"

const memberStatusLabel = {
  officer: "Officer",
  lead: "Lead",
  active: "Active",
  member: "Member",
  pending: "Pending",
  inactive: "Inactive",
} as const

interface MemberCardProps {
  member: Member
  avatar?: string
  className?: string
}

export function MemberCard({
  member,
  avatar,
  className,
}: MemberCardProps) {
  const initials = member.name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)

  return (
    <Card className={cn("flex items-center gap-3 border-primary/10 p-4", className)}>
      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary text-sm font-medium text-cream">
        {avatar ? (
          <Image
            src={avatar}
            alt={member.name}
            width={44}
            height={44}
            className="h-full w-full rounded-full object-cover"
          />
        ) : (
          initials
        )}
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium text-ink-900">{member.name}</p>
        <p className="mt-1 text-xs text-ink-400">
          {member.role}
          {member.specialization && ` · ${member.specialization}`}
        </p>
      </div>
      <StatusBadge variant={member.status} className="ml-auto">
        {memberStatusLabel[member.status]}
      </StatusBadge>
    </Card>
  )
}
