"use client"

import Image from "next/image"
import { Code2, Calendar, Users, Trophy, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

const heroSlides = [
  "/gallery/hero/slide-1.jpg",
  "/gallery/hero/slide-2.jpg",
  "/gallery/hero/slide-3.jpg",
]

export function HeroSection() {
  const scrollToOverview = () => {
    const section = document.getElementById("overview")
    if (!section) return

    const top = section.getBoundingClientRect().top + window.scrollY - 16
    window.scrollTo({ top, behavior: "smooth" })
  }

  return (
    <section className="relative flex items-center overflow-hidden bg-primary-dark px-4 py-12 sm:px-6 md:min-h-[calc(100vh-4rem)] md:py-16 lg:px-8 lg:py-20">
      <div className="pointer-events-none absolute inset-0">
        {heroSlides.map((src, index) => (
          <div
            key={src}
            className="hero-slide absolute inset-0"
            style={{ animationDelay: `${index * 6}s` }}
          >
            <Image
              src={src}
              alt=""
              fill
              className="object-cover"
              sizes="100vw"
              priority={index === 0}
            />
          </div>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-primary-dark/88 via-primary-dark/72 to-primary-dark/80" />
      <div className="pointer-events-none absolute -left-24 -top-20 h-64 w-64 rounded-full bg-secondary/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-20 h-64 w-64 rounded-full bg-accent/20 blur-3xl" />
      <div className="relative mx-auto w-full max-w-6xl">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="text-center lg:text-left">
            <span className="hero-reveal mb-5 inline-block rounded-full border border-secondary/50 bg-secondary/10 px-4 py-1 text-xs text-secondary">
              Mandaue City College · Est. 2020
            </span>
            <h1 className="hero-reveal hero-reveal-delay-1 mb-4 font-display text-5xl font-semibold leading-tight tracking-tight text-cream md:text-6xl lg:text-7xl">
              Learner&apos;s Group of{" "}
              <span className="text-secondary">Programmers</span>
            </h1>
            <p className="hero-reveal hero-reveal-delay-2 mx-auto mb-8 max-w-2xl text-base leading-relaxed text-cream/75 lg:mx-0">
              A community of passionate developers building skills and creating
              real-world impact through workshops, projects, and student-led
              innovation.
            </p>
            <div className="hero-reveal hero-reveal-delay-3 flex flex-wrap justify-center gap-3 lg:justify-start">
              <Button
                size="lg"
                className="bg-secondary text-primary-dark hover:brightness-105"
              >
                <Code2 className="h-4 w-4" />
                Explore Projects
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-cream/30 text-cream hover:bg-cream/10 hover:text-cream"
              >
                <Calendar className="h-4 w-4" />
                View Events
              </Button>
            </div>
          </div>

          <aside className="hero-reveal hero-reveal-delay-3 hero-float hidden rounded-2xl border border-cream/20 bg-cream/10 p-6 text-cream shadow-modal backdrop-blur-md lg:block">
            <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-secondary/40 bg-secondary/10 px-3 py-1 text-xs font-medium uppercase tracking-widest text-secondary">
              <Sparkles className="h-3.5 w-3.5" />
              This Month
            </p>
            <h3 className="type-h2 mb-6 text-cream">Club Snapshot</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-xl border border-cream/20 bg-primary-dark/40 p-4">
                <span className="inline-flex items-center gap-2 text-sm text-cream/80">
                  <Users className="h-4 w-4 text-secondary" />
                  Active Members
                </span>
                <span className="font-display text-2xl text-secondary">120+</span>
              </div>
              <div className="flex items-center justify-between rounded-xl border border-cream/20 bg-primary-dark/40 p-4">
                <span className="inline-flex items-center gap-2 text-sm text-cream/80">
                  <Trophy className="h-4 w-4 text-secondary" />
                  Projects Built
                </span>
                <span className="font-display text-2xl text-secondary">45</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
      <button
        type="button"
        onClick={scrollToOverview}
        className="group absolute right-4 top-1/2 z-10 hidden -translate-y-1/2 md:flex md:flex-col md:items-center md:gap-3 lg:right-6"
        aria-label="Scroll down to organization overview"
      >
        <span className="text-[10px] uppercase tracking-[0.25em] text-secondary/90 transition-colors group-hover:text-secondary">
          Scroll
        </span>
        <span className="relative h-16 w-px bg-secondary/35">
          <span className="scroll-hint-wheel absolute left-1/2 top-2 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-secondary" />
        </span>
      </button>
    </section>
  )
}
