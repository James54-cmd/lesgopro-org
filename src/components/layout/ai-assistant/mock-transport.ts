import {
  AssistantTransport,
  AssistantTransportRequest,
} from "@/components/layout/ai-assistant/types"

function resolveReply({ prompt }: AssistantTransportRequest) {
  const normalized = prompt.toLowerCase()

  if (
    normalized.includes("program") ||
    normalized.includes("course") ||
    normalized.includes("bsit")
  ) {
    return "The site currently highlights BS Information Technology, with an emphasis on software development, networking, databases, and practical technical skills."
  }

  if (
    normalized.includes("event") ||
    normalized.includes("workshop") ||
    normalized.includes("activity") ||
    normalized.includes("hackathon")
  ) {
    return "LESGOPRO regularly spotlights workshops, collaborative build sessions, campus activities, and event updates for students who want to stay involved."
  }

  if (
    normalized.includes("project") ||
    normalized.includes("build") ||
    normalized.includes("app")
  ) {
    return "Featured student work includes practical campus-focused builds such as event tools, portals, and software projects that reflect real-world development experience."
  }

  if (
    normalized.includes("community") ||
    normalized.includes("member") ||
    normalized.includes("join")
  ) {
    return "LESGOPRO is a student-led technology community at Mandaue City College centered on mentoring, collaboration, and helping learners grow through real projects."
  }

  if (
    normalized.includes("navigate") ||
    normalized.includes("where") ||
    normalized.includes("find")
  ) {
    return "You can explore the homepage sections for programs, events, projects, and members. If you want, ask me for a specific section and I can guide you there."
  }

  return "I’m ready to help with LESGOPRO information such as programs, events, projects, community details, and site navigation. Ask a more specific question and I can narrow it down."
}

export const mockAssistantTransport: AssistantTransport = async (
  request,
  signal
) => {
  await new Promise<void>((resolve, reject) => {
    const timeoutId = window.setTimeout(resolve, 900)

    signal?.addEventListener(
      "abort",
      () => {
        window.clearTimeout(timeoutId)
        reject(new DOMException("Request aborted", "AbortError"))
      },
      { once: true }
    )
  })

  return {
    content: resolveReply(request),
  }
}
