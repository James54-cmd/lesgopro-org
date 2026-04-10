import {
  EventsSection,
  GallerySection,
  HeroSection,
  LeadershipSection,
  ProgramOffersSection,
  ProjectsSection,
  StatsSection,
} from "@/features/public/home/sections"

const sections = [
  HeroSection,
  StatsSection,
  ProgramOffersSection,
  LeadershipSection,
  EventsSection,
  ProjectsSection,
  GallerySection,
]

export function HomePage() {
  return (
    <>
      {sections.map((Section) => (
        <Section key={Section.name} />
      ))}
    </>
  )
}
