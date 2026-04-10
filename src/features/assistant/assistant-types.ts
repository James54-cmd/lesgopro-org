export type AssistantRole = "assistant" | "user" | "system"

export type AssistantStatus = "idle" | "sending" | "error"

export type AssistantMessage = {
  id: string
  role: AssistantRole
  content: string
  createdAt: string
}

export type QuickReply = {
  id: string
  label: string
  prompt: string
}

export type AssistantTransportRequest = {
  messages: AssistantMessage[]
  prompt: string
  systemPrompt?: string
}

export type AssistantTransportResult = {
  content: string
}

export type AssistantTransport = (
  request: AssistantTransportRequest,
  signal?: AbortSignal
) => Promise<AssistantTransportResult>
