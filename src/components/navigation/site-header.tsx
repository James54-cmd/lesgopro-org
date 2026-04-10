import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { BrandMark } from "@/components/app/brand-mark"
import { publicNavigation } from "@/config/site"
import { Button } from "@/components/ui/button"

export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b-4 border-secondary bg-primary/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <BrandMark
          href="/"
          className="text-cream [&_p:last-child]:text-secondary"
          showSchoolName
        />

        <nav className="hidden items-center gap-1 lg:flex">
          {publicNavigation.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="rounded-full px-3 py-2 text-sm font-medium text-cream/80 transition-colors hover:bg-white/10 hover:text-cream"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Button
          asChild
          variant="secondary"
          size="sm"
          className="bg-secondary text-primary-dark hover:brightness-105"
        >
          <Link href="/portal">
            Private Portal
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </header>
  )
}
