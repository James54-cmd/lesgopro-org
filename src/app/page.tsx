import { Footer } from "@/components/layout/footer"
import { Navbar } from "@/components/layout/navbar"
import {
  EventsSection,
  GallerySection,
  HeroSection,
  JoinCtaSection,
  MembersSection,
  ProjectsSection,
  StatsSection,
} from "@/features/home/sections"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <HeroSection />
      <StatsSection />
      <MembersSection />
      <EventsSection />
      <ProjectsSection />
      <GallerySection />
      <JoinCtaSection />
      <Footer />
    </div>
  )
}
