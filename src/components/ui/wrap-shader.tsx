"use client"

import Image from "next/image"
import { ArrowRight, Code2, GraduationCap } from "lucide-react"
import { Warp } from "@paper-design/shaders-react"
import { Button } from "@/components/ui/button"

export default function WarpShaderHero() {
  const scrollToSection = (id: string) => {
    const section = document.getElementById(id)
    if (!section) return

    const top = section.getBoundingClientRect().top + window.scrollY - 16
    window.scrollTo({ top, behavior: "smooth" })
  }

  return (
    <section className="relative min-h-[760px] overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(201,151,42,0.16),transparent_32%),radial-gradient(circle_at_78%_24%,rgba(139,26,26,0.08),transparent_28%),linear-gradient(135deg,#fdfaf5_0%,#f7f0e4_48%,#f4ebdd_100%)] md:min-h-[820px] lg:min-h-[860px]">
      <div className="absolute inset-0 opacity-45">
        <Warp
          style={{ height: "100%", width: "100%" }}
          proportion={0.42}
          softness={1}
          distortion={0.14}
          swirl={0.45}
          swirlIterations={7}
          shape="checks"
          shapeScale={0.09}
          scale={1.05}
          rotation={12}
          speed={0.55}
          colors={[
            "hsla(40, 33%, 93%, 0.92)",
            "hsla(41, 65%, 48%, 0.75)",
            "hsla(0, 68%, 32%, 0.68)",
            "hsla(136, 41%, 30%, 0.52)",
          ]}
        />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-cream/80 via-cream/55 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-40 bg-gradient-to-b from-transparent via-background/40 to-background" />
      <div className="pointer-events-none absolute left-0 top-0 h-72 w-72 -translate-x-1/3 -translate-y-1/4 rounded-full bg-secondary/18 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-20 h-80 w-80 translate-x-1/4 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-20 h-72 w-72 rounded-full bg-accent/12 blur-3xl" />

      <div className="relative z-10 px-6 pb-20 pt-8 sm:px-8 sm:pb-20 sm:pt-10 md:pt-12 lg:px-20 lg:pb-14">
        <div className="mx-auto w-full max-w-7xl">
          <div className="grid items-center gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:gap-10">
            <div className="space-y-6 text-center lg:space-y-8 lg:text-left">
              <div className="inline-block">
                <span className="inline-flex items-center gap-2 rounded-full border border-primary/10 bg-white/65 px-3 py-1.5 text-xs font-semibold text-primary shadow-card backdrop-blur-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  Mandaue City College
                </span>
              </div>

              <h1 className="max-w-4xl text-balance font-display text-5xl font-semibold leading-[0.98] text-ink-900 md:text-6xl lg:text-7xl">
                Build Real IT Skills with a Student-Driven Community
              </h1>

              <p className="mx-auto max-w-xl text-base leading-relaxed text-ink-700 md:text-lg lg:mx-0 lg:text-xl">
                Join workshops, events, and projects that support our Bachelor
                of Science in Information Technology journey, from beginner
                foundations to production-ready development.
              </p>

              <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:justify-center lg:justify-start">
                <Button
                  size="lg"
                  className="rounded-xl bg-secondary px-7 text-primary-dark hover:brightness-105"
                  onClick={() => scrollToSection("program-offers")}
                >
                  <GraduationCap className="h-4 w-4" />
                  View Program Offer
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-xl border-primary/20 bg-white/70 px-7 text-ink-900 hover:bg-white"
                  onClick={() => scrollToSection("overview")}
                >
                  <span>Explore Community</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>

              <button
                type="button"
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary-light"
                onClick={() => scrollToSection("overview")}
              >
                See Highlights
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            <div className="relative min-h-[360px] sm:min-h-[460px] lg:min-h-[600px]">
              <div className="pointer-events-none absolute -top-14 right-6 hidden h-64 w-64 rounded-full bg-secondary/22 blur-3xl lg:block" />
              <div className="pointer-events-none absolute bottom-10 left-0 hidden h-80 w-80 rounded-full bg-primary/10 blur-3xl lg:block" />
              <div className="pointer-events-none absolute inset-x-8 bottom-10 h-28 rounded-full bg-primary-dark/15 blur-3xl" />

              <div className="absolute inset-y-0 right-0 flex w-full items-center justify-center lg:justify-end">
                <div className="relative w-full max-w-[540px] aspect-square">
                  <div className="absolute inset-2 rounded-[2rem] border border-primary/10 bg-white/40 shadow-[0_24px_70px_rgba(26,16,8,0.12)] backdrop-blur-md" />
                  <div className="absolute inset-4 overflow-hidden rounded-[1.8rem] border border-white/70 bg-[linear-gradient(160deg,rgba(255,255,255,0.94)_0%,rgba(253,250,245,0.88)_38%,rgba(245,240,232,0.82)_100%)]">
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_18%,rgba(201,151,42,0.2),transparent_28%),radial-gradient(circle_at_26%_82%,rgba(139,26,26,0.1),transparent_30%)]" />
                    <div className="pointer-events-none absolute inset-x-[14%] bottom-[13%] top-[16%] rounded-[46%_54%_58%_42%/40%_44%_56%_60%] bg-gradient-to-b from-secondary/14 via-white/70 to-primary/8 blur-md" />
                    <div className="absolute inset-x-0 inset-y-[1%] bottom-0">
                      <Image
                        src="/brand/group-coding.png"
                        alt="LESGOPRO featured student"
                        fill
                        priority
                        sizes="(min-width: 1024px) 46vw, 90vw"
                        className="object-cover object-[center_58%] scale-[1.08] drop-shadow-[0_18px_34px_rgba(26,16,8,0.16)]"
                      />
                    </div>
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-white via-white/80 to-transparent" />
                  </div>
                </div>

                <div className="absolute bottom-8 left-8 rounded-2xl border border-white/80 bg-white/88 px-4 py-3 shadow-popover backdrop-blur-sm">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-primary">
                    Program Focus
                  </p>
                  <p className="mt-1 max-w-[240px] text-sm font-semibold leading-snug text-ink-900">
                    Bachelor of Science in Information Technology
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 border-t border-primary/12 pt-10 sm:mt-14 sm:pt-12">
            <div className="flex flex-col gap-10 sm:flex-row sm:gap-14 lg:gap-20">
              <div>
                <p className="font-display text-4xl font-semibold text-primary md:text-5xl">
                  120+
                </p>
                <p className="mt-2 text-xs font-semibold uppercase tracking-[0.18em] text-ink-400">
                  Active Members
                </p>
              </div>
              <div>
                <p className="font-display text-4xl font-semibold text-primary md:text-5xl">
                  45
                </p>
                <p className="mt-2 text-xs font-semibold uppercase tracking-[0.18em] text-ink-400">
                  Projects Built
                </p>
              </div>
              <div>
                <p className="font-display text-4xl font-semibold text-primary md:text-5xl">
                  25+
                </p>
                <p className="mt-2 text-xs font-semibold uppercase tracking-[0.18em] text-ink-400">
                  Events Hosted
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
