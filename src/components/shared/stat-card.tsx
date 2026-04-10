import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface StatCardProps {
  value: string
  label: string
  className?: string
}

export function StatCard({ value, label, className }: StatCardProps) {
  return (
    <Card className={cn("rounded-xl border-primary/10", className)}>
      <CardContent className="p-6 text-center">
        <p className="text-4xl font-medium text-primary">{value}</p>
        <p className="mt-1 text-xs text-ink-400">{label}</p>
      </CardContent>
    </Card>
  )
}
