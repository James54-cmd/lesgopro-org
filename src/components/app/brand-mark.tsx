import Image from "next/image"
import Link from "next/link"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"

type BrandMarkProps = {
  href?: string
  size?: "sm" | "md" | "lg"
  direction?: "row" | "column"
  showSchoolName?: boolean
  className?: string
}

const imageSize = {
  sm: 40,
  md: 52,
  lg: 64,
} as const

export function BrandMark({
  href,
  size = "sm",
  direction = "row",
  showSchoolName = true,
  className,
}: BrandMarkProps) {
  const content = (
    <div
      className={cn(
        "flex gap-3",
        direction === "column" ? "flex-col items-center text-center" : "items-center text-left",
        className
      )}
    >
      <Image
        src={siteConfig.logos.primary}
        alt={`${siteConfig.name} logo`}
        width={imageSize[size]}
        height={imageSize[size]}
        className={cn(
          "rounded-full border border-secondary/35 object-cover",
          size === "sm" && "h-10 w-10",
          size === "md" && "h-[52px] w-[52px]",
          size === "lg" && "h-16 w-16"
        )}
        priority={size === "sm"}
      />
      <div className="min-w-0">
        <p
          className={cn(
            "font-display font-semibold leading-none tracking-tight",
            size === "sm" && "text-xl",
            size === "md" && "text-2xl",
            size === "lg" && "text-3xl"
          )}
        >
          {siteConfig.name}
        </p>
        {showSchoolName ? (
          <p className={cn("mt-1 text-xs", size === "lg" && "text-sm")}>
            {siteConfig.schoolName}
          </p>
        ) : null}
      </div>
    </div>
  )

  if (!href) {
    return content
  }

  return <Link href={href}>{content}</Link>
}
