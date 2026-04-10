import type { HomeContent } from "@/features/public/home/home-types"

export const homeContent: HomeContent = {
  hero: {
    eyebrow: "Mandaue City College",
    title: "Build real IT skills with a student-driven community",
    description:
      "Join workshops, events, and projects that support our Bachelor of Science in Information Technology journey, from beginner foundations to production-ready development.",
    primaryAction: {
      label: "View Program Offer",
      targetId: "program-offers",
    },
    secondaryAction: {
      label: "Explore Community",
      targetId: "overview",
    },
    tertiaryAction: {
      label: "See Highlights",
      targetId: "overview",
    },
    focusLabel: "Program Focus",
    focusValue: "Bachelor of Science in Information Technology",
  },
  statsIntro: {
    eyebrow: "Organization at a glance",
    title: "Building tomorrow's developers",
    description:
      "LESGOPRO brings together passionate students to learn, create, and grow in programming and software development.",
  },
  sections: {
    programs: {
      label: "Academic Pathways",
      title: "Program Offer",
      description:
        "Build a strong foundation in computing through our industry-aligned academic offering.",
    },
    leadership: {
      label: "Meet the team",
      title: "Leadership Team",
      description:
        "The officers and leads guiding LESGOPRO's activities, projects, and student initiatives.",
    },
    events: {
      label: "What's happening",
      title: "Upcoming Events",
      description: "Join us for workshops, hackathons, and community gatherings.",
    },
    projects: {
      label: "What we've built",
      title: "Featured Projects",
      description:
        "Student-led projects that solve real problems and showcase practical skills.",
    },
    gallery: {
      label: "Moments",
      title: "LESGOPRO Gallery",
      description:
        "Snapshots from workshops, hackathons, and community activities that define our culture.",
    },
  },
  programFooterNote:
    "All programs are offered at Mandaue City College under CHED-accredited curriculum.",
  organizationStats: [
    { value: "120+", label: "Students Reached" },
    { value: "45", label: "Projects Built" },
    { value: "25+", label: "Events Hosted" },
    { value: "6", label: "Years Strong" },
  ],
  upcomingEvents: [
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
  ],
  featuredProjects: [
    {
      title: "Campus Events App",
      description:
        "Mobile app for discovering and managing campus events, built with React Native.",
      techStack: ["React Native", "Node.js", "MongoDB"],
      status: "inDevelopment",
    },
    {
      title: "Student Portal",
      description: "Web platform for student services and academic management.",
      techStack: ["Next.js", "TypeScript", "PostgreSQL"],
      status: "live",
    },
    {
      title: "Code Review Bot",
      description:
        "Automated code review tool for educational projects using AI workflows.",
      techStack: ["Python", "FastAPI", "OpenAI API"],
      status: "beta",
    },
  ],
  programOffers: [
    {
      title: "Bachelor of Science in Information Technology",
      description:
        "A comprehensive program focused on software development, networking, databases, and modern IT solutions for real-world applications.",
      degreeType: "Undergraduate Program",
      audienceNote: "Ideal for future software developers and IT professionals.",
    },
  ],
  galleryItems: [
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
      caption: "Officer mentoring session for newer students.",
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
  ],
}
