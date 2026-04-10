import type { Metadata } from "next"
import { Inter } from "next/font/google"
import type { ReactNode } from "react"
import "@/styles/globals.css"

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  title: "LESGOPRO - Learner's Group of Programmers",
  description: "A community of passionate developers at Mandaue City College building skills and creating real-world impact.",
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
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen antialiased">
        {children}
      </body>
    </html>
  )
}
