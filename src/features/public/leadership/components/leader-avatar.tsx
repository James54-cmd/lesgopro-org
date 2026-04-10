import { cn } from "@/lib/utils"
import { getLeaderAvatarGradient, getLeaderInitials } from "../leadership-utils"

type LeaderAvatarProps = {
  name: string
  avatarUrl?: string
  size?: "sm" | "md" | "lg"
  className?: string
}

const avatarSizeStyles = {
  sm: "h-12 w-12 text-sm",
  md: "h-16 w-16 text-base",
  lg: "h-20 w-20 text-lg",
} as const

export function LeaderAvatar({
  name,
  avatarUrl,
  size = "md",
  className,
}: LeaderAvatarProps) {
  const initials = getLeaderInitials(name)
  const gradientClassName = getLeaderAvatarGradient(name)

  return (
    <div
      className={cn(
        "relative flex shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/70 font-semibold text-white shadow-[0_14px_28px_rgba(26,16,8,0.18)]",
        avatarSizeStyles[size],
        avatarUrl ? "bg-cover bg-center bg-no-repeat" : `bg-gradient-to-br ${gradientClassName}`,
        className
      )}
      style={avatarUrl ? { backgroundImage: `url(${avatarUrl})` } : undefined}
      role="img"
      aria-label={avatarUrl ? `${name} avatar` : `${name} initials avatar`}
    >
      {avatarUrl ? (
        <span className="sr-only">{name}</span>
      ) : (
        <>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.3),transparent_45%)]" />
          <span className="relative">{initials}</span>
        </>
      )}
    </div>
  )
}
