import type { Metadata } from "next"
import { Cormorant_Garamond, Source_Sans_3 } from "next/font/google"
import type { ReactNode } from "react"
import { OpeningLoader } from "@/components/layout/opening-loader"
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

export const metadata: Metadata = {
  title: "LESGOPRO - Learner's Group of Programmers",
  description: "A community of passionate developers at Mandaue City College building skills and creating real-world impact.",
  icons: {
    icon: "/brand/lesgopro_logo.png",
    shortcut: "/brand/lesgopro_logo.png",
    apple: "/brand/lesgopro_logo.png",
  },
  keywords: ["programming", "developers", "community", "mandaue city college", "students", "technology"],
  authors: [{ name: "LESGOPRO" }],
  creator: "LESGOPRO - Mandaue City College",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://lesgopro.org",
    siteName: "LESGOPRO",
    title: "LESGOPRO - Learner's Group of Programmers",
    description: "A community of passionate developers at Mandaue City College building skills and creating real-world impact.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "LESGOPRO - Learner's Group of Programmers",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LESGOPRO - Learner's Group of Programmers",
    description: "A community of passionate developers at Mandaue City College building skills and creating real-world impact.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="min-h-screen antialiased">
        <OpeningLoader />
        {children}
      </body>
    </html>
  )
}
