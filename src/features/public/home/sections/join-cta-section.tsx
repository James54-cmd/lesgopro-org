import Link from "next/link"
import { Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { homeContent } from "@/features/public/home/home-content"

export function JoinCtaSection() {
  const { cta } = homeContent

  return (
    <section className="bg-primary px-4 py-16 text-center sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <Award className="mx-auto mb-4 h-12 w-12 text-secondary" />
        <h2 className="type-h1 mb-4 text-cream">
          {cta.title}
        </h2>
        <p className="mx-auto mb-8 max-w-2xl text-base leading-relaxed text-cream/70">
          {cta.description}
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button asChild size="lg" className="bg-secondary text-primary-dark hover:brightness-105">
            <Link href="/portal">
              {cta.primaryLabel}
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-cream/30 text-cream hover:bg-cream/10 hover:text-cream"
          >
            <Link href="/#access-layers">{cta.secondaryLabel}</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
