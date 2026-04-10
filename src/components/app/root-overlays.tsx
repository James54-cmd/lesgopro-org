"use client"

import { usePathname } from "next/navigation"
import { OpeningLoader } from "@/components/app/opening-loader"
import { AIAssistantDock } from "@/features/assistant"

const hiddenOverlayPaths = new Set(["/admin/login"])

export function RootOverlays() {
  const pathname = usePathname()

  if (pathname && hiddenOverlayPaths.has(pathname)) {
    return null
  }

  return (
    <>
      <OpeningLoader />
      <AIAssistantDock />
    </>
  )
}
