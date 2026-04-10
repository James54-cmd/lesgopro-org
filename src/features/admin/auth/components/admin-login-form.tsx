"use client"

import { FormEvent, useState } from "react"
import { useRouter } from "next/navigation"
import { LoaderCircle, LockKeyhole } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type AdminLoginApiResponse = {
  message: string
  user: {
    id: string
    email: string
    firstName: string | null
    lastName: string | null
    slug: string | null
    phoneNumber: string | null
    role: "admin"
    isActive: boolean
    lastLoginAt: string | null
    createdAt: string
    updatedAt: string
  }
  expiresAt: number
}

type AdminLoginApiError = {
  error?: string
}

export function AdminLoginForm() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setIsSubmitting(true)
    setErrorMessage(null)

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })

      const payload = (await response.json()) as AdminLoginApiResponse | AdminLoginApiError

      if (!response.ok) {
        const errorPayload = payload as AdminLoginApiError
        setErrorMessage(errorPayload.error || "Unable to sign in with those credentials.")
        return
      }

      router.push("/admin")
      router.refresh()
    } catch {
      setErrorMessage("Unable to reach the server. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-2 text-center">
        <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <LockKeyhole className="size-5" />
        </div>
        <h1 className="font-display text-3xl font-semibold tracking-tight text-primary-dark">
          Admin login
        </h1>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Sign in with your Supabase admin account to manage the protected workspace.
        </p>
      </div>

      <div className="grid gap-3">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          autoComplete="email"
          placeholder="admin@lesgopro.org"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          disabled={isSubmitting}
          required
        />
      </div>

      <div className="grid gap-3">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          autoComplete="current-password"
          placeholder="Enter your password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          disabled={isSubmitting}
          required
        />
      </div>

      {errorMessage ? (
        <p className="rounded-lg border border-destructive/20 bg-destructive/5 px-3 py-2 text-sm text-destructive">
          {errorMessage}
        </p>
      ) : null}

      <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? <LoaderCircle className="size-4 animate-spin" /> : null}
        {isSubmitting ? "Signing in..." : "Sign in to admin"}
      </Button>

      <p className="text-center text-xs leading-relaxed text-muted-foreground">
        No signup is enabled here. Only pre-created admin accounts can access this area.
      </p>
    </form>
  )
}
