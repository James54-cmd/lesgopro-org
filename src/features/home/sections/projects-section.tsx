import { Code2, ExternalLink, Github } from "lucide-react"
import { SectionShell } from "@/components/layout/section-shell"
import { Button } from "@/components/ui/button"
import { SectionHeader } from "@/components/shared/section-header"
import { StatusBadge } from "@/components/shared/status-badge"
import { featuredProjects } from "@/features/home/data"

function projectStatusToVariant(
  status: "In Development" | "Live" | "Beta"
): "active" | "pending" | "member" {
  if (status === "Live") return "active"
  if (status === "Beta") return "pending"
  return "member"
}

export function ProjectsSection() {
  return (
    <SectionShell muted>
      <SectionHeader
        label="What we've built"
        title="Featured Projects"
        description="Student-led projects that solve real problems and showcase practical skills."
        className="mb-8"
      />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {featuredProjects.map((project) => (
          <div
            key={project.title}
            className="rounded-xl border border-primary/10 bg-white p-6 shadow-card"
          >
            <div className="mb-3 flex items-start justify-between gap-3">
              <h3 className="type-h3 text-ink-900">{project.title}</h3>
              <StatusBadge variant={projectStatusToVariant(project.status)}>
                {project.status}
              </StatusBadge>
            </div>
            <p className="mb-3 text-sm leading-relaxed text-ink-700">
              {project.description}
            </p>
            <p className="mb-4 text-xs text-ink-400">{project.tech}</p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Github className="h-3 w-3" />
                Code
              </Button>
              <Button variant="ghost" size="sm">
                <ExternalLink className="h-3 w-3" />
                Demo
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <Button>
          <Code2 className="h-4 w-4" />
          View All Projects
        </Button>
      </div>
    </SectionShell>
  )
}
