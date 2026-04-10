"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import {
  DEFAULT_SYSTEM_PROMPT,
  DEFAULT_WELCOME_MESSAGE,
  createMessage,
} from "@/components/layout/ai-assistant/config"
import { mockAssistantTransport } from "@/components/layout/ai-assistant/mock-transport"
import {
  AssistantMessage,
  AssistantStatus,
  AssistantTransport,
} from "@/components/layout/ai-assistant/types"

type UseAssistantConversationOptions = {
  initialMessages?: AssistantMessage[]
  maxInputLength?: number
  systemPrompt?: string
  transport?: AssistantTransport
}

export function useAssistantConversation({
  initialMessages = [DEFAULT_WELCOME_MESSAGE],
  maxInputLength = 280,
  systemPrompt = DEFAULT_SYSTEM_PROMPT,
  transport = mockAssistantTransport,
}: UseAssistantConversationOptions = {}) {
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<AssistantMessage[]>(initialMessages)
  const [status, setStatus] = useState<AssistantStatus>("idle")
  const [error, setError] = useState<string | null>(null)

  const abortControllerRef = useRef<AbortController | null>(null)

  useEffect(() => {
    return () => {
      abortControllerRef.current?.abort()
    }
  }, [])

  const canSend = useMemo(() => {
    return input.trim().length > 0 && status !== "sending"
  }, [input, status])

  const updateInput = useCallback(
    (value: string) => {
      setInput(value.slice(0, maxInputLength))
    },
    [maxInputLength]
  )

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim()
      if (!trimmed || status === "sending") return

      abortControllerRef.current?.abort()

      const userMessage = createMessage("user", trimmed)
      const nextMessages = [...messages, userMessage]
      const controller = new AbortController()

      abortControllerRef.current = controller
      setMessages(nextMessages)
      setInput("")
      setStatus("sending")
      setError(null)

      try {
        const result = await transport(
          {
            messages: nextMessages,
            prompt: trimmed,
            systemPrompt,
          },
          controller.signal
        )

        setMessages((current) => [
          ...current,
          createMessage("assistant", result.content),
        ])
        setStatus("idle")
      } catch (error) {
        if (controller.signal.aborted) return

        setStatus("error")
        setError("The assistant could not respond right now. Please try again.")
        setMessages((current) => [
          ...current,
          createMessage(
            "assistant",
            "I’m having trouble responding right now. Please try again in a moment."
          ),
        ])
      }
    },
    [messages, status, systemPrompt, transport]
  )

  const retryLastMessage = useCallback(async () => {
    const lastUserMessage = [...messages]
      .reverse()
      .find((message) => message.role === "user")

    if (!lastUserMessage || status === "sending") return

    await sendMessage(lastUserMessage.content)
  }, [messages, sendMessage, status])

  return {
    canSend,
    error,
    input,
    isTyping: status === "sending",
    maxInputLength,
    messages,
    retryLastMessage,
    sendMessage,
    setInput: updateInput,
    status,
  }
}
