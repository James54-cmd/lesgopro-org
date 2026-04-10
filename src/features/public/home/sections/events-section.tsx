import { SectionHeading } from "@/components/app/section-heading"
import { SectionShell } from "@/components/app/section-shell"
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
    </SectionShell>
  )
}
