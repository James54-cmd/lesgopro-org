"use client"

import type { KeyboardEvent, RefObject } from "react"
import Image from "next/image"
import { Maximize2, Minimize2, Send, Sparkles, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  AssistantMessage,
  AssistantStatus,
  QuickReply,
} from "@/features/assistant/assistant-types"

export function AssistantHeader({
  isExpanded,
  onClose,
  onToggleExpanded,
}: {
  isExpanded: boolean
  onClose: () => void
  onToggleExpanded: () => void
}) {
  return (
    <div className="flex items-center justify-between border-b border-primary/10 bg-[linear-gradient(180deg,#8B1A1A_0%,#741818_100%)] px-4 py-3.5 text-primary-foreground">
      <div className="flex min-w-0 items-center gap-3">
        <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-secondary/35 bg-white/10">
          <div className="absolute inset-1 rounded-full border border-secondary/20" />
          <div className="relative flex h-9 w-9 items-center justify-center rounded-full bg-white">
            <Image
              src="/brand/lesgopro_ai_logo.png"
              alt="LESGO AI"
              width={22}
              height={22}
            />
          </div>
          <span className="absolute bottom-0.5 right-0.5 block h-2.5 w-2.5 rounded-full border-2 border-primary bg-accent" />
        </div>

        <div className="min-w-0">
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-secondary">
            Mandaue City College
          </p>
          <h2 className="truncate font-display text-[18px] font-semibold leading-tight">
            LESGO AI Assistant
          </h2>
          <p className="text-[11px] text-primary-foreground/75">
            Campus information desk
          </p>
        </div>
      </div>

      <div className="flex items-center gap-1">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full text-primary-foreground/70 hover:bg-white/10 hover:text-primary-foreground"
          onClick={onToggleExpanded}
          aria-label={isExpanded ? "Minimize assistant" : "Expand assistant"}
        >
          {isExpanded ? (
            <Minimize2 className="h-3.5 w-3.5" />
          ) : (
            <Maximize2 className="h-3.5 w-3.5" />
          )}
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full text-primary-foreground/70 hover:bg-white/10 hover:text-primary-foreground"
          onClick={onClose}
          aria-label="Close assistant"
        >
          <X className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  )
}

export function AssistantQuickReplies({
  disabled,
  onSelect,
  quickReplies,
}: {
  disabled?: boolean
  onSelect: (prompt: string) => void
  quickReplies: QuickReply[]
}) {
  if (!quickReplies.length) return null

  return (
    <div className="border-b border-primary/10 bg-[#FCF7EF] px-4 py-3">
      <div className="mb-2 flex items-center justify-between gap-3">
        <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-primary/70">
          Suggested Prompts
        </span>
        <span className="text-[10px] text-muted-foreground">Start with a common question</span>
      </div>

      <div className="flex flex-wrap gap-2">
        {quickReplies.map((reply) => (
          <button
            key={reply.id}
            type="button"
            disabled={disabled}
            onClick={() => onSelect(reply.prompt)}
            className="rounded-md border border-primary/10 bg-white px-3 py-1.5 text-[11px] font-medium text-ink-700 transition-colors hover:border-primary/20 hover:bg-primary/5 hover:text-primary disabled:cursor-not-allowed disabled:opacity-50"
          >
            {reply.label}
          </button>
        ))}
      </div>
    </div>
  )
}

function EmptyState() {
  return (
    <div className="flex h-full min-h-[14rem] flex-col items-center justify-center rounded-xl border border-dashed border-primary/15 bg-[#FCF7EF] px-6 text-center">
      <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full border border-secondary/30 bg-white text-secondary-dark">
        <Sparkles className="h-4 w-4" />
      </div>
      <h3 className="font-display text-lg font-semibold text-primary">Ask LESGO AI anything</h3>
      <p className="mt-2 max-w-xs text-sm leading-relaxed text-ink-400">
        Use the suggested prompts or ask about programs, events, projects, and community details.
      </p>
    </div>
  )
}

function TypingIndicator() {
  return (
    <div className="flex items-end gap-2">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-primary/15 bg-white">
        <Image
          src="/brand/lesgopro_ai_logo.png"
          alt="LESGO AI"
          width={18}
          height={18}
          className="opacity-90"
        />
      </div>
      <div className="flex items-center gap-1 rounded-xl rounded-bl-sm border border-primary/10 bg-[#FDFAF5] px-3 py-2.5 shadow-[0_1px_2px_rgba(26,16,8,0.04)]">
        {[0, 1, 2].map((index) => (
          <span
            key={index}
            className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground/50"
            style={{
              animationDelay: `${index * 0.15}s`,
              animationDuration: "1.1s",
            }}
          />
        ))}
      </div>
    </div>
  )
}

function MessageBubble({ message }: { message: AssistantMessage }) {
  const isAssistant = message.role === "assistant"

  return (
    <div className={cn("flex items-end gap-2", !isAssistant && "flex-row-reverse")}>
      {isAssistant ? (
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-primary/15 bg-white">
          <Image
            src="/brand/lesgopro_ai_logo.png"
            alt="LESGO AI"
            width={18}
            height={18}
            className="opacity-90"
          />
        </div>
      ) : (
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-primary/10 bg-[#F3ECE2] px-2 text-[11px] font-semibold text-primary/75">
          You
        </div>
      )}

      <div className={cn("flex max-w-[80%] flex-col gap-1", !isAssistant && "items-end")}>
        <div
          className={cn(
            "px-3.5 py-2.5 text-sm leading-relaxed",
            isAssistant
              ? "rounded-xl rounded-bl-sm border border-primary/10 bg-[#FDFAF5] text-foreground shadow-[0_1px_2px_rgba(26,16,8,0.04)]"
              : "rounded-xl rounded-br-sm border border-primary/10 bg-primary text-primary-foreground shadow-[0_2px_10px_rgba(139,26,26,0.12)]"
          )}
        >
          {message.content}
        </div>
        <span className="px-0.5 text-[10px] text-muted-foreground">{message.createdAt}</span>
      </div>
    </div>
  )
}

export function AssistantMessageList({
  isTyping,
  messages,
  scrollAnchorRef,
}: {
  isTyping: boolean
  messages: AssistantMessage[]
  scrollAnchorRef: RefObject<HTMLDivElement>
}) {
  return (
    <div className="flex min-h-0 flex-1 flex-col bg-[linear-gradient(180deg,#fff_0%,#fdfaf5_100%)]">
      <div className="border-b border-primary/10 bg-white/70 px-4 py-2">
        <p className="text-[11px] leading-relaxed text-ink-400">
          LESGO AI can answer questions now and can later connect to a live assistant service.
        </p>
      </div>

      <div className="min-h-0 flex-1 space-y-4 overflow-y-auto px-4 py-4">
        {messages.length === 0 ? <EmptyState /> : null}
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        {isTyping ? <TypingIndicator /> : null}
        <div ref={scrollAnchorRef} />
      </div>
    </div>
  )
}

export function AssistantComposer({
  disabled,
  error,
  input,
  inputRef,
  maxInputLength,
  onChange,
  onKeyDown,
  onRetry,
  onSubmit,
  status,
}: {
  disabled?: boolean
  error?: string | null
  input: string
  inputRef: RefObject<HTMLTextAreaElement>
  maxInputLength: number
  onChange: (value: string) => void
  onKeyDown: (event: KeyboardEvent<HTMLTextAreaElement>) => void
  onRetry: () => void
  onSubmit: () => void
  status: AssistantStatus
}) {
  return (
    <div className="shrink-0 border-t border-primary/10 bg-[#FCF7EF] px-4 py-4">
      <div className="rounded-xl border border-primary/10 bg-white p-2 shadow-[0_1px_2px_rgba(26,16,8,0.04)] transition-colors focus-within:border-primary/25">
        <label className="sr-only" htmlFor="lesgo-input">
          Message LESGO AI
        </label>

        <div className="flex items-end gap-2">
          <textarea
            ref={inputRef}
            id="lesgo-input"
            rows={1}
            value={input}
            onChange={(event) => onChange(event.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Ask about programs, events, projects, and community details..."
            className="min-h-[3.25rem] flex-1 resize-none overflow-hidden bg-transparent px-2 py-2.5 text-[13px] leading-5 text-foreground placeholder:text-muted-foreground focus:outline-none"
            style={{ maxHeight: 112 }}
          />

          <button
            type="button"
            disabled={disabled}
            aria-label="Send message"
            onClick={onSubmit}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary text-secondary-foreground transition-all hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between gap-3 px-0.5">
        <div className="flex min-w-0 items-center gap-2">
          <span
            className={cn(
              "inline-block h-1.5 w-1.5 rounded-full",
              status === "sending" ? "bg-secondary" : status === "error" ? "bg-primary" : "bg-accent"
            )}
          />
          <span className="truncate text-[10px] text-muted-foreground">
            {status === "sending"
              ? "LESGO AI is preparing a response"
              : error || "Shift + Enter for a new line"}
          </span>
          {status === "error" ? (
            <button
              type="button"
              onClick={onRetry}
              className="text-[10px] font-semibold text-primary hover:text-primary-light"
            >
              Retry
            </button>
          ) : null}
        </div>

        <span className="shrink-0 text-[10px] text-muted-foreground">
          {input.length} / {maxInputLength}
        </span>
      </div>
    </div>
  )
}

export function AssistantTrigger({
  isOpen,
  unreadCount,
  onClick,
}: {
  isOpen: boolean
  unreadCount: number
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-expanded={isOpen}
      aria-controls="lesgo-assistant-panel"
      className="relative flex h-14 items-center gap-3 rounded-full border border-primary/15 bg-white pl-2 pr-5 text-[13px] font-medium text-primary shadow-[0_6px_20px_rgba(26,16,8,0.12)] transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/25"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-full border border-secondary/30 bg-[#FCF7EF]">
        <Image src="/brand/lesgopro_ai_logo.png" alt="LESGO AI" width={20} height={20} />
      </div>

      <div className="text-left">
        <span className="block text-[10px] uppercase tracking-[0.14em] text-secondary-dark/80">
          Campus Help
        </span>
        <span className="block text-[13px] font-semibold text-primary">LESGO AI</span>
      </div>

      {unreadCount > 0 && !isOpen ? (
        <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-secondary text-[10px] font-semibold text-secondary-foreground">
          {unreadCount}
        </span>
      ) : null}
    </button>
  )
}
