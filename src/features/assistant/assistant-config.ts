import { AssistantMessage, QuickReply } from "@/features/assistant/assistant-types"

function createTimestamp() {
  return new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })
}

export function createMessage(
  role: AssistantMessage["role"],
  content: string
): AssistantMessage {
  return {
    id: `${role}-${crypto.randomUUID()}`,
    role,
    content,
    createdAt: createTimestamp(),
  }
}

export const DEFAULT_SYSTEM_PROMPT =
  "You are LESGO AI, the official campus assistant for LESGOPRO at Mandaue City College. Help users with programs, events, student projects, organization details, and website navigation in a warm, concise, and helpful tone."

export const DEFAULT_WELCOME_MESSAGE = createMessage(
  "assistant",
  "Welcome to LESGO AI. Ask about programs, events, student projects, or how to explore the organization."
)

export const DEFAULT_QUICK_REPLIES: QuickReply[] = [
  {
    id: "programs",
    label: "Programs",
    prompt: "What academic programs and learning opportunities does LESGOPRO highlight?",
  },
  {
    id: "events",
    label: "Events",
    prompt: "What upcoming events, workshops, or activities should students look out for?",
  },
  {
    id: "projects",
    label: "Projects",
    prompt: "Show me the kinds of student projects featured by LESGOPRO.",
  },
  {
    id: "community",
    label: "Community",
    prompt: "Tell me about the LESGOPRO community and what students can expect.",
  },
]
