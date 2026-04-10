import {
  AccessLayersSection,
  EventsSection,
  GallerySection,
  HeroSection,
  JoinCtaSection,
  MembersSection,
  ProgramOffersSection,
  ProjectsSection,
  StatsSection,
} from "@/features/public/home/sections"

const sections = [
  HeroSection,
  StatsSection,
  ProgramOffersSection,
  AccessLayersSection,
  MembersSection,
  EventsSection,
  ProjectsSection,
  GallerySection,
  JoinCtaSection,
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
