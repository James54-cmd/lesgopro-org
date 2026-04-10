import { Award } from "lucide-react"
import { Button } from "@/components/ui/button"

export function JoinCtaSection() {
  return (
    <section className="bg-primary px-4 py-16 text-center sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <Award className="mx-auto mb-4 h-12 w-12 text-secondary" />
        <h2 className="mb-4 text-3xl font-medium tracking-tight text-cream">
          Ready to Level Up Your Skills?
        </h2>
        <p className="mx-auto mb-8 max-w-2xl text-[15px] leading-relaxed text-cream/70">
          Join LESGOPRO and be part of a vibrant community that&apos;s passionate
          about technology, learning, and building the future together.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button
            size="lg"
            className="bg-secondary text-primary-dark hover:brightness-105"
          >
            Apply for Membership
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-cream/30 text-cream hover:bg-cream/10 hover:text-cream"
          >
            Learn More
          </Button>
        </div>
      </div>
    </section>
  )
}
