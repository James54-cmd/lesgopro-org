import { Button } from "@/components/ui/button"

export function Navbar() {
  return (
    <nav className="flex h-[60px] items-center justify-between border-b-[3px] border-secondary bg-primary px-4 sm:px-6 lg:px-8">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center text-primary-dark text-xs font-medium">
          LGP
        </div>
        <div>
          <p className="text-cream text-base font-medium">LESGOPRO</p>
          <p className="text-secondary text-[11px]">Mandaue City College</p>
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
