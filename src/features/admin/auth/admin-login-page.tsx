import Image from "next/image"
import Link from "next/link"
import { BrandMark } from "@/components/app/brand-mark"
import { AdminLoginForm } from "./components/admin-login-form"

export function AdminLoginPage() {
  return (
    <section className="min-h-[calc(100svh-4rem)]">
      <div className="grid min-h-[calc(100svh-4rem)] lg:grid-cols-2">
        <div className="flex flex-col gap-4 bg-background p-6 md:p-10">
          <div className="flex justify-center md:justify-start">
            <Link href="/" className="inline-flex">
              <BrandMark
                size="sm"
                showSchoolName={false}
                className="text-primary-dark [&_p:last-child]:text-muted-foreground"
              />
            </Link>
          </div>

          <div className="flex flex-1 items-center justify-center">
            <div className="w-full max-w-sm">
              <AdminLoginForm />
            </div>
          </div>
        </div>

        <div className="relative hidden bg-muted lg:block">
          <Image
            src="/gallery/hero/slide-2.jpg"
            alt="LESGOPRO members during a club session"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-primary-dark/55" />
          <div className="absolute inset-x-0 bottom-0 p-10 text-cream">
            <p className="max-w-md font-display text-4xl font-semibold leading-tight">
              Keep the public site open and the admin workspace protected.
            </p>
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-cream/80">
              This login uses your Supabase email and password, then returns the admin JWT
              session from the new API route.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
