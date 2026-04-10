import Link from "next/link"
import { Calendar } from "lucide-react"
import { SectionHeading } from "@/components/app/section-heading"
import { SectionShell } from "@/components/app/section-shell"
import { Button } from "@/components/ui/button"
import { EventCard } from "@/features/public/home/components/event-card"
import { homeContent } from "@/features/public/home/home-content"

export function EventsSection() {
  const { sections, upcomingEvents } = homeContent

  return (
    <SectionShell id="events">
      <SectionHeading
        label={sections.events.label}
        title={sections.events.title}
        description={sections.events.description}
        className="mb-8"
      />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {upcomingEvents.map((event) => (
          <EventCard key={event.title} event={event} />
        ))}
      </div>

      <div className="mt-8 text-center">
        <Button asChild>
          <Link href="/portal">
            <Calendar className="h-4 w-4" />
            Open Member Calendar
          </Link>
        </Button>
      </div>
    </SectionShell>
  )
}
