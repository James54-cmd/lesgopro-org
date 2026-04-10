import { Card, CardContent } from "@/components/ui/card"
import type { StatItem } from "@/features/public/home/home-types"
import { cn } from "@/lib/utils"

interface StatCardProps {
  stat: StatItem
  className?: string
}

export function StatCard({ stat, className }: StatCardProps) {
  return (
    <Card className={cn("rounded-xl border-primary/10", className)}>
      <CardContent className="p-6 text-center">
        <p className="text-4xl font-medium text-primary">{stat.value}</p>
        <p className="mt-1 text-xs text-ink-400">{stat.label}</p>
      </CardContent>
    </Card>
  )
}
