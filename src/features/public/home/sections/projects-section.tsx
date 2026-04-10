import Link from "next/link"
import { Code2 } from "lucide-react"
import { SectionHeading } from "@/components/app/section-heading"
import { SectionShell } from "@/components/app/section-shell"
import { Button } from "@/components/ui/button"
import { ProjectCard } from "@/features/public/home/components/project-card"
import { homeContent } from "@/features/public/home/home-content"

export function ProjectsSection() {
  const { featuredProjects, sections } = homeContent

  return (
    <SectionShell id="projects" tone="muted">
      <SectionHeading
        label={sections.projects.label}
        title={sections.projects.title}
        description={sections.projects.description}
        className="mb-8"
      />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {featuredProjects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>

      <div className="mt-8 text-center">
        <Button asChild>
          <Link href="/portal">
            <Code2 className="h-4 w-4" />
            Explore Member Projects
          </Link>
        </Button>
      </div>
    </SectionShell>
  )
}
