import { Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SectionHeader } from "@/components/shared/section-header"
import { MemberCard } from "@/components/shared/member-card"
import { leadershipMembers } from "@/features/home/data"

export function MembersSection() {
  return (
    <section className="bg-cream-surface px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          label="Meet the team"
          title="Our Leadership"
          description="Dedicated officers and leads who guide our organization toward excellence."
          className="mb-8"
        />

        <div className="grid max-w-4xl grid-cols-1 gap-4 md:grid-cols-2">
          {leadershipMembers.map((member) => (
            <MemberCard
              key={member.name}
              name={member.name}
              role={member.role}
              specialization={member.specialization}
              status={member.status}
            />
          ))}
        </div>

        <div className="mt-8 text-center">
          <Button variant="outline">
            <Users className="h-4 w-4" />
            View All Members
          </Button>
        </div>
      </div>
    </section>
  )
}
