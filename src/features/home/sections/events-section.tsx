import { Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { EventCard } from "@/components/shared/event-card"
import { SectionHeader } from "@/components/shared/section-header"
import { upcomingEvents } from "@/features/home/data"

export function EventsSection() {
  return (
    <section className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          label="What's happening"
          title="Upcoming Events"
          description="Join us for workshops, hackathons, and community gatherings."
          className="mb-8"
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {upcomingEvents.map((event) => (
            <EventCard
              key={event.title}
              title={event.title}
              description={event.description}
              date={event.date}
              time={event.time}
              type={event.type}
              status={event.status}
              registeredCount={event.registeredCount}
              maxCapacity={event.maxCapacity}
            />
          ))}
        </div>

        <div className="mt-8 text-center">
          <Button>
            <Calendar className="h-4 w-4" />
            View All Events
          </Button>
        </div>
      </div>
    </section>
  )
}
