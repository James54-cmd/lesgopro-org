"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { Code2 } from "lucide-react"

const LOADER_VISIBLE_MS = 1300
const LOADER_EXIT_MS = 450

type LoaderPhase = "visible" | "exit" | "hidden"

type OpeningLoaderProps = {
  onHidden?: () => void
}

export function OpeningLoader({ onHidden }: OpeningLoaderProps) {
  const [phase, setPhase] = useState<LoaderPhase>("visible")

  useEffect(() => {
    const exitTimer = window.setTimeout(() => {
      setPhase("exit")
    }, LOADER_VISIBLE_MS)

    const hideTimer = window.setTimeout(() => {
      setPhase("hidden")
    }, LOADER_VISIBLE_MS + LOADER_EXIT_MS)

    return () => {
      window.clearTimeout(exitTimer)
      window.clearTimeout(hideTimer)
    }
  }, [])

  useEffect(() => {
    if (phase !== "hidden") {
      return
    }

    onHidden?.()
  }, [onHidden, phase])

  if (phase === "hidden") {
    return null
  }

  return (
    <div
      className={`fixed inset-0 z-[120] flex items-center justify-center bg-gradient-to-br from-primary-dark via-primary to-[#2a120d] transition-opacity duration-500 ${
        phase === "exit" ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
      aria-label="Opening loading screen"
      aria-live="polite"
      role="status"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-1/2 -top-1/2 h-full w-full animate-pulse rounded-full bg-gradient-to-br from-secondary/25 to-transparent blur-3xl" />
        <div
          className="animation-delay-2000 absolute -bottom-1/2 -right-1/2 h-full w-full animate-pulse rounded-full bg-gradient-to-tl from-accent/25 to-transparent blur-3xl"
        />
      </div>

      <div className="relative mx-auto w-full max-w-sm px-6 text-center text-cream">
        <div className="relative mx-auto mb-8 flex h-32 w-32 items-center justify-center">
          <div
            className="absolute inset-0 animate-spin rounded-full border border-transparent border-r-secondary border-t-secondary"
            style={{ animationDuration: "2.4s", borderWidth: "3px" }}
          />
          <div
            className="absolute inset-2 animate-spin rounded-full border border-transparent border-b-accent-light border-l-accent-light"
            style={{
              animationDirection: "reverse",
              animationDuration: "1.8s",
              borderWidth: "2px",
            }}
          />
          <div className="absolute inset-4 rounded-full bg-gradient-to-br from-secondary/30 to-accent/25 blur-lg" />
          <div className="absolute inset-4 rounded-full border border-cream/20 bg-gradient-to-br from-secondary/10 to-accent/10 backdrop-blur-sm" />

          <div className="relative z-10 flex items-center justify-center">
            <Image
              src="/brand/lesgopro_logo.png"
              alt="LESGOPRO logo"
              width={64}
              height={64}
              priority
              className="drop-shadow-lg"
            />
          </div>
        </div>

        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-secondary">
          LESGOPRO
        </p>
        <h2 className="mb-4 text-3xl font-bold leading-tight text-cream">
          Learner&apos;s Group of Programmers
        </h2>

        <p className="mx-auto inline-flex items-center gap-2 text-sm text-cream/80">
          <Code2 className="h-4 w-4 animate-pulse text-secondary" />
          <span>Preparing your workspace</span>
        </p>

        <div className="mx-auto mt-8 h-1 w-full overflow-hidden rounded-full bg-cream/15 shadow-lg">
          <span
            className="block h-full rounded-full bg-gradient-to-r from-secondary via-secondary-light to-accent-light shadow-lg"
            style={{
              animation: `progress-bar ${LOADER_VISIBLE_MS}ms cubic-bezier(0.4, 0, 0.2, 1) forwards`,
            }}
          />
        </div>

        <div className="mt-6 flex justify-center gap-1.5">
          <div
            className="h-2 w-2 animate-bounce rounded-full bg-secondary"
            style={{ animationDelay: "0s" }}
          />
          <div
            className="h-2 w-2 animate-bounce rounded-full bg-secondary"
            style={{ animationDelay: "0.2s" }}
          />
          <div
            className="h-2 w-2 animate-bounce rounded-full bg-secondary"
            style={{ animationDelay: "0.4s" }}
          />
        </div>
      </div>

      <style>{`
        @keyframes progress-bar {
          0% {
            width: 0%;
          }
          100% {
            width: 100%;
          }
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  )
}
