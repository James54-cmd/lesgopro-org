import Image from "next/image"

export function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="bg-primary-dark px-4 py-8 text-center sm:px-6 lg:px-8">
      <Image
        src="/brand/lesgopro_logo.png"
        alt="LESGOPRO logo"
        width={64}
        height={64}
        className="mx-auto mb-3 h-16 w-16 rounded-full border border-secondary/40 object-cover"
      />
      <p className="mb-1 font-display text-2xl font-semibold tracking-tight text-secondary">
        LESGOPRO
      </p>
      <p className="mb-4 text-xs text-cream/50">
        Learner&apos;s Group of Programmers · Mandaue City College
      </p>
      <div className="mb-4 flex justify-center gap-4">
        {[
          { label: "Facebook", href: "#" },
          { label: "GitHub", href: "#" },
          { label: "Email", href: "#" },
          { label: "Events", href: "#" }
        ].map(link => (
          <a 
            key={link.label} 
            href={link.href} 
            className="text-cream/60 text-xs hover:text-cream transition-colors"
          >
            {link.label}
          </a>
        ))}
      </div>
      <div className="border-t border-cream/10 pt-4 text-xs text-cream/30">
        © {currentYear} LESGOPRO · Mandaue City College · All rights reserved.
      </div>
    </footer>
  )
}
