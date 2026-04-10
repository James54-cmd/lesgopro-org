import {
  EventsSection,
  GallerySection,
  HeroSection,
  ProgramOffersSection,
  ProjectsSection,
  StatsSection,
} from "@/features/public/home/sections"
import { LeadershipSection } from "@/features/public/leadership"

export async function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <ProgramOffersSection />
      <LeadershipSection />
      <EventsSection />
      <ProjectsSection />
      <GallerySection />
    </>
  )
}
