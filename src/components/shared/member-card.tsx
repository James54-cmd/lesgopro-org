import Image from "next/image"
import { Card } from "@/components/ui/card"
import { StatusBadge } from "@/components/shared/status-badge"
import { cn } from "@/lib/utils"

interface MemberCardProps {
  name: string
  role: string
  specialization?: string
  status: "officer" | "lead" | "active" | "member" | "pending" | "inactive"
  avatar?: string
  className?: string
}

export function MemberCard({ 
  name, 
  role, 
  specialization, 
  status, 
  avatar,
  className 
}: MemberCardProps) {
  // Get initials from name
  const initials = name
    .split(" ")
    .map(word => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)

  return (
    <Card className={cn("border-primary/10 p-4 flex items-center gap-3", className)}>
      <div className="w-11 h-11 rounded-full bg-primary flex items-center justify-center text-cream text-sm font-medium flex-shrink-0">
        {avatar ? (
          <Image
            src={avatar}
            alt={name}
            width={44}
            height={44}
            className="h-full w-full rounded-full object-cover"
          />
        ) : (
          initials
        )}
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium text-ink-900">{name}</p>
        <p className="text-xs text-ink-400 mt-0.5">
          {role}
          {specialization && ` · ${specialization}`}
        </p>
      </div>
      <StatusBadge variant={status} className="ml-auto">
        {status === "officer" ? "Officer" : 
         status === "lead" ? "Lead" :
         status === "active" ? "Active" :
         status === "member" ? "Member" :
         status === "pending" ? "Pending" :
         "Inactive"}
      </StatusBadge>
    </Card>
  )
}
