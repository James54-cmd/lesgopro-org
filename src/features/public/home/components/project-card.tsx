import {
  StatusBadge,
  type StatusBadgeVariant,
} from "@/components/app/status-badge"
import { Card } from "@/components/ui/card"
import type { ProjectItem, ProjectStatus } from "@/features/public/home/home-types"

const projectStatusMeta: Record<
  ProjectStatus,
  { label: string; variant: StatusBadgeVariant }
> = {
  inDevelopment: {
    label: "In Development",
    variant: "pending",
  },
  live: {
    label: "Live",
    variant: "active",
  },
  beta: {
    label: "Beta",
    variant: "lead",
  },
}

type ProjectCardProps = {
  project: ProjectItem
}

export function ProjectCard({ project }: ProjectCardProps) {
  const statusMeta = projectStatusMeta[project.status]

  return (
    <Card className="rounded-xl border border-primary/10 bg-white p-6 shadow-card">
      <div className="mb-4 flex items-start justify-between gap-3">
        <h3 className="type-h3 text-ink-900">{project.title}</h3>
        <StatusBadge variant={statusMeta.variant}>{statusMeta.label}</StatusBadge>
      </div>

      <p className="text-sm leading-relaxed text-ink-700">{project.description}</p>

      <div className="mt-5 flex flex-wrap gap-2">
        {project.techStack.map((tech) => (
          <span
            key={tech}
            className="rounded-full bg-primary/5 px-3 py-1 text-xs font-medium text-primary"
          >
            {tech}
          </span>
        ))}
      </div>
    </Card>
  )
}
