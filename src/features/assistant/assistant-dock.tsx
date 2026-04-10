"use client"

import { KeyboardEvent, useEffect, useMemo, useRef, useState } from "react"
import { DEFAULT_QUICK_REPLIES } from "@/features/assistant/assistant-config"
import {
  AssistantComposer,
  AssistantHeader,
  AssistantMessageList,
  AssistantQuickReplies,
  AssistantTrigger,
} from "@/features/assistant/presentation"
import { useAssistantConversation } from "@/features/assistant/use-assistant-conversation"
import {
  AssistantMessage,
  AssistantTransport,
  QuickReply,
} from "@/features/assistant/assistant-types"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

type AIAssistantDockProps = {
  initialMessages?: AssistantMessage[]
  quickReplies?: QuickReply[]
  systemPrompt?: string
  transport?: AssistantTransport
}

export function AIAssistantDock({
  initialMessages,
  quickReplies = DEFAULT_QUICK_REPLIES,
  systemPrompt,
  transport,
}: AIAssistantDockProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [unread, setUnread] = useState(1)

  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const previousAssistantCountRef = useRef(0)

  const {
    canSend,
    error,
    input,
    isTyping,
    maxInputLength,
    messages,
    retryLastMessage,
    sendMessage,
    setInput,
    status,
  } = useAssistantConversation({
    initialMessages,
    systemPrompt,
    transport,
  })

  useEffect(() => {
    const assistantCount = messages.filter((message) => message.role === "assistant").length

    if (
      assistantCount > previousAssistantCountRef.current &&
      previousAssistantCountRef.current > 0 &&
      !isOpen
    ) {
      setUnread((current) => current + 1)
    }

    previousAssistantCountRef.current = assistantCount
  }, [isOpen, messages])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isTyping])

  useEffect(() => {
    if (!isOpen) return

    const timeoutId = window.setTimeout(() => {
      textareaRef.current?.focus()
    }, 120)

    return () => window.clearTimeout(timeoutId)
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return

    const handleEscape = (event: globalThis.KeyboardEvent) => {
      if (event.key !== "Escape") return

      if (isExpanded) {
        setIsExpanded(false)
        return
      }

      setIsOpen(false)
    }

    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [isExpanded, isOpen])

  useEffect(() => {
    if (!textareaRef.current) return

    textareaRef.current.style.height = "auto"
    textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 112)}px`
  }, [input])

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault()
      void sendMessage(input)
    }
  }

  const handleSend = () => {
    void sendMessage(input)
    setIsOpen(true)
    setUnread(0)
  }

  const toggleOpen = () => {
    setIsOpen((current) => !current)
    setUnread(0)
  }

  const panelClassName = useMemo(
    () =>
      cn(
        "fixed z-[90] transition-all duration-300 ease-out",
        isExpanded
          ? "inset-0"
          : "inset-x-3 bottom-20 top-[7.5rem] sm:inset-auto sm:bottom-24 sm:right-6 sm:h-[38rem] sm:w-[24rem]"
      ),
    [isExpanded]
  )

  return (
    <>
      <button
        type="button"
        aria-label="Close assistant overlay"
        className={cn(
          "fixed inset-0 z-[80] transition-all duration-300 ease-out",
          isOpen
            ? "pointer-events-auto bg-[rgba(26,16,8,0.24)] opacity-100 backdrop-blur-[1px]"
            : "pointer-events-none bg-transparent opacity-0 backdrop-blur-0"
        )}
        onClick={() => {
          setIsExpanded(false)
          setIsOpen(false)
        }}
      />

      <div
        id="lesgo-assistant-panel"
        className={cn(
          panelClassName,
          isOpen
            ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
            : "pointer-events-none translate-y-4 scale-[0.98] opacity-0"
        )}
        role="dialog"
        aria-label="LESGO AI assistant"
        aria-modal={isExpanded ? "true" : "false"}
      >
        <Card
          className={cn(
            "flex h-full flex-col overflow-hidden border-primary/10 bg-white transition-all duration-300 ease-out",
            isExpanded
              ? "rounded-none border-0 shadow-none"
              : "shadow-[0_10px_32px_rgba(26,16,8,0.14)]"
          )}
        >
          <AssistantHeader
            isExpanded={isExpanded}
            onClose={() => setIsOpen(false)}
            onToggleExpanded={() => setIsExpanded((current) => !current)}
          />

          <AssistantQuickReplies
            quickReplies={quickReplies}
            disabled={status === "sending"}
            onSelect={(prompt) => {
              setIsOpen(true)
              setUnread(0)
              void sendMessage(prompt)
            }}
          />

          <AssistantMessageList
            isTyping={isTyping}
            messages={messages}
            scrollAnchorRef={messagesEndRef}
          />

          <AssistantComposer
            disabled={!canSend}
            error={error}
            input={input}
            inputRef={textareaRef}
            maxInputLength={maxInputLength}
            onChange={setInput}
            onKeyDown={handleKeyDown}
            onRetry={() => void retryLastMessage()}
            onSubmit={handleSend}
            status={status}
          />
        </Card>
      </div>

      <div
        className={cn(
          "fixed bottom-4 right-4 z-[95] transition-all duration-200 ease-out sm:bottom-6 sm:right-6",
          isOpen
            ? "pointer-events-none translate-y-3 scale-95 opacity-0"
            : "pointer-events-auto translate-y-0 scale-100 opacity-100"
        )}
      >
        <AssistantTrigger isOpen={isOpen} unreadCount={unread} onClick={toggleOpen} />
      </div>
    </>
  )
}
