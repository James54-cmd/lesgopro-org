import Link from "next/link"
import { Users } from "lucide-react"
import { SectionHeading } from "@/components/app/section-heading"
import { SectionShell } from "@/components/app/section-shell"
import { Button } from "@/components/ui/button"
import { MemberCard } from "@/features/public/home/components/member-card"
import { homeContent } from "@/features/public/home/home-content"

export function MembersSection() {
  const { leadershipMembers, sections } = homeContent

  return (
    <SectionShell id="leadership" tone="muted">
      <SectionHeading
        label={sections.members.label}
        title={sections.members.title}
        description={sections.members.description}
        className="mb-8"
      />

      <div className="grid max-w-4xl grid-cols-1 gap-4 md:grid-cols-2">
        {leadershipMembers.map((member) => (
          <MemberCard key={member.name} member={member} />
        ))}
      </div>

      <div className="mt-8 text-center">
        <Button asChild variant="outline">
          <Link href="/portal">
            <Users className="h-4 w-4" />
            Open Member Portal
          </Link>
        </Button>
      </div>
    </SectionShell>
  )
}
