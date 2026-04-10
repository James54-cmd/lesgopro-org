import { Footer } from "@/components/layout/footer"
import { Navbar } from "@/components/layout/navbar"
import {
  EventsSection,
  HeroSection,
  JoinCtaSection,
  MembersSection,
  ProgramOffersSection,
  ProjectsSection,
  StatsSection,
} from "@/features/home/sections"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <HeroSection />
      <StatsSection />
      <ProgramOffersSection />
      <MembersSection />
      <EventsSection />
      <ProjectsSection />
      <JoinCtaSection />
      <Footer />
    </div>
  )
}
