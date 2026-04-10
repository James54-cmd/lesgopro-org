"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { LoaderCircle, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"

export function AdminLogoutButton() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleLogout() {
    setIsSubmitting(true)

    try {
      await fetch("/api/admin/logout", {
        method: "POST",
      })
    } finally {
      router.push("/admin/login")
      router.refresh()
      setIsSubmitting(false)
    }
  }

  return (
    <Button type="button" variant="outline" onClick={handleLogout} disabled={isSubmitting}>
      {isSubmitting ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <LogOut className="h-4 w-4" />}
      {isSubmitting ? "Signing out..." : "Logout"}
    </Button>
  )
}
