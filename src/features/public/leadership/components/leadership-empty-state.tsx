import { Card } from "@/components/ui/card"

export function LeadershipEmptyState() {
  return (
    <Card className="relative overflow-hidden border-dashed border-primary/20 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(253,250,245,0.92))] p-8 text-center shadow-card">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(201,151,42,0.12),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(139,26,26,0.08),transparent_28%)]" />
      <div className="relative">
        <p className="section-label">Leadership</p>
        <h3 className="mt-3 type-h3 text-ink-900">No active officers yet</h3>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-ink-700">
          This public area will populate automatically once the admin dashboard has active officers
          for the current school year.
        </p>
      </div>
    </Card>
  )
}
