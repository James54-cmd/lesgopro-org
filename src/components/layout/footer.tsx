export function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="bg-primary-dark px-4 py-8 text-center sm:px-6 lg:px-8">
      <p className="text-secondary text-lg font-medium mb-1">LESGOPRO</p>
      <p className="text-cream/50 text-xs mb-5">
        Learner's Group of Programmers · Mandaue City College
      </p>
      <div className="flex gap-5 justify-center mb-5">
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
      <div className="border-t border-cream/10 pt-4 text-cream/30 text-[11px]">
        © {currentYear} LESGOPRO · Mandaue City College · All rights reserved.
      </div>
    </footer>
  )
}
