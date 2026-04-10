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

export interface ProgramOffer {
  title: string
  description: string
  degreeType: string
}

export interface GalleryItem {
  title: string
  caption: string
  imageUrl: string
  alt: string
  tag: string
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

export const programOffers: ProgramOffer[] = [
  {
    title: "Bachelor of Science in Information Technology",
    description:
      "A comprehensive program focused on software development, networking, databases, and modern IT solutions for real-world applications.",
    degreeType: "Undergraduate Program",
  },
]

export const galleryItems: GalleryItem[] = [
  {
    title: "DevFest Main Stage",
    caption: "Opening ceremony and keynote at MCC auditorium.",
    imageUrl:
      "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=1600&q=80",
    alt: "Students gathered for a technology event",
    tag: "Event",
  },
  {
    title: "Workshop Collaboration",
    caption: "Frontend workshop with peer programming sessions.",
    imageUrl:
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80",
    alt: "Students collaborating in a classroom",
    tag: "Workshop",
  },
  {
    title: "Project Demo Day",
    caption: "Teams presenting capstone and club projects.",
    imageUrl:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
    alt: "Students presenting a project",
    tag: "Projects",
  },
  {
    title: "Community Mentoring",
    caption: "Officer mentoring session for new members.",
    imageUrl:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80",
    alt: "Small group mentoring session",
    tag: "Community",
  },
  {
    title: "Hackathon Night",
    caption: "Late-night building and iteration with teams.",
    imageUrl:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80",
    alt: "Developers working on laptops at night",
    tag: "Hackathon",
  },
]
