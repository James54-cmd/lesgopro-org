import Link from "next/link"
import { BrandMark } from "@/components/app/brand-mark"
import { footerNavigation } from "@/config/site"

export function SiteFooter() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-primary-dark px-4 py-10 text-center text-cream sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <BrandMark
          href="/"
          size="lg"
          direction="column"
          className="mx-auto text-secondary [&_p:last-child]:text-cream/65"
        />
        <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-cream/65">
          Public pages stay focused on students and visitors, while admin tools
          stay in a separate protected area.
        </p>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {footerNavigation.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="rounded-full border border-cream/10 px-4 py-2 text-xs font-medium text-cream/75 transition-colors hover:border-secondary/30 hover:text-cream"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="mt-8 border-t border-cream/10 pt-4 text-xs text-cream/35">
          © {currentYear} LESGOPRO · Mandaue City College
        </div>
      </div>
    </footer>
  )
}
