import { Cormorant_Garamond, Source_Sans_3 } from "next/font/google"
import type { ReactNode } from "react"
import { siteMetadata } from "@/config/site"
import { RootOverlays } from "@/components/app/root-overlays"
import "@/styles/globals.css"

const display = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
  display: "swap",
})

const body = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600"],
  display: "swap",
})

export const metadata = siteMetadata

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="min-h-screen antialiased">
        <RootOverlays />
        {children}
      </body>
    </html>
  )
}
