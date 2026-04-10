import { Code2, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-primary-dark px-4 py-16 text-center sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute -left-24 -top-20 h-64 w-64 rounded-full bg-secondary/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-20 h-64 w-64 rounded-full bg-accent/20 blur-3xl" />
      <div className="relative mx-auto max-w-4xl">
        <span className="mb-5 inline-block rounded-full border border-secondary/50 bg-secondary/10 px-4 py-1 text-xs text-secondary">
          Mandaue City College · Est. 2020
        </span>
        <h1 className="type-display mb-4 text-cream">
          Learner&apos;s Group of <span className="text-secondary">Programmers</span>
        </h1>
        <p className="mx-auto mb-8 max-w-2xl text-base leading-relaxed text-cream/70">
          A community of passionate developers building skills and creating
          real-world impact.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
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
    </section>
  )
}
