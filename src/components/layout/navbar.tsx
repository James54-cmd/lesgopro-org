import Image from "next/image"
import { Button } from "@/components/ui/button"

export function Navbar() {
  return (
    <nav className="flex h-16 items-center justify-between border-b-4 border-secondary bg-primary px-4 sm:px-6 lg:px-8">
      <div className="flex items-center gap-3">
        <Image
          src="/brand/lesgopro_logo.png"
          alt="LESGOPRO logo"
          width={40}
          height={40}
          className="h-10 w-10 rounded-full border border-secondary/40 object-cover"
          priority
        />
        <div>
          <p className="font-display text-xl font-semibold leading-none tracking-tight text-cream">
            LESGOPRO
          </p>
          <p className="text-secondary text-xs">Mandaue City College</p>
        </div>
      </div>
      <Button 
        variant="secondary" 
        size="sm"
        className="bg-secondary text-primary-dark hover:brightness-105"
      >
        Join Us
      </Button>
    </nav>
  )
}
