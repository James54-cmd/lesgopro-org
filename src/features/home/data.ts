export interface Member {
  name: string
  role: string
  specialization: string
  status: "officer" | "lead" | "active" | "member" | "pending" | "inactive"
}

export interface Event {
  title: string
  description: string
  date: string
  time: string
  type: string
  status: "open" | "closed" | "cancelled" | "full"
  registeredCount?: number
  maxCapacity?: number
}

export interface Project {
  title: string
  description: string
  tech: string
  status: "In Development" | "Live" | "Beta"
}

export const organizationStats = [
  { value: "120+", label: "Active Members" },
  { value: "45", label: "Projects Built" },
  { value: "25+", label: "Events Hosted" },
  { value: "6", label: "Years Strong" },
]

export const leadershipMembers: Member[] = [
  {
    name: "Juan dela Cruz",
    role: "President",
    specialization: "Full-Stack",
    status: "officer",
  },
  {
    name: "Maria Santos",
    role: "Vice President",
    specialization: "Frontend",
    status: "officer",
  },
  {
    name: "Jose Garcia",
    role: "Tech Lead",
    specialization: "Backend",
    status: "lead",
  },
  {
    name: "Ana Rodriguez",
    role: "Project Manager",
    specialization: "DevOps",
    status: "lead",
  },
]

export const upcomingEvents: Event[] = [
  {
    title: "DevFest MCC 2026",
    description:
      "Annual hackathon for CS and IT students. Build innovative solutions in 48 hours.",
    date: "APR 25, 2026",
    time: "9:00 AM",
    type: "Hackathon",
    status: "open",
    registeredCount: 48,
    maxCapacity: 100,
  },
  {
    title: "React Workshop Series",
    description:
      "Learn modern React development with hooks, context, and best practices.",
    date: "MAY 05, 2026",
    time: "2:00 PM",
    type: "Workshop",
    status: "open",
    registeredCount: 32,
    maxCapacity: 50,
  },
  {
    title: "Open Source Friday",
    description:
      "Contribute to open source projects and collaborate with the community.",
    date: "MAY 12, 2026",
    time: "4:00 PM",
    type: "Community",
    status: "open",
    registeredCount: 15,
  },
]

export const featuredProjects: Project[] = [
  {
    title: "Campus Events App",
    description:
      "Mobile app for discovering and managing campus events, built with React Native.",
    tech: "React Native, Node.js, MongoDB",
    status: "In Development",
  },
  {
    title: "Student Portal",
    description: "Web platform for student services and academic management.",
    tech: "Next.js, TypeScript, PostgreSQL",
    status: "Live",
  },
  {
    title: "Code Review Bot",
    description:
      "Automated code review tool for educational projects using AI workflows.",
    tech: "Python, FastAPI, OpenAI API",
    status: "Beta",
  },
]
