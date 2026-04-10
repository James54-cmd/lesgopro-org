import { Code2, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="bg-primary-dark px-4 py-16 text-center sm:px-6 lg:px-8">
      <span className="mb-5 inline-block rounded-full border border-secondary/50 bg-secondary/10 px-4 py-1 text-xs text-secondary">
        Mandaue City College · Est. 2020
      </span>
      <h1 className="mb-3 text-4xl font-medium tracking-tight text-cream">
        Learner&apos;s Group of <span className="text-secondary">Programmers</span>
      </h1>
      <p className="mx-auto mb-8 max-w-xl text-[15px] leading-relaxed text-cream/60">
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
    </section>
  )
}
