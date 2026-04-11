"use client"

import { useCallback, useEffect, useState } from "react"

type SiteSettingsRecord = {
  id: string
  show_public_leadership: boolean
}

type ApiListResponse<T> = {
  items?: T[]
  error?: string
}

type ApiItemResponse<T> = {
  item?: T | null
  error?: string
}

export function useSiteSettingsManagement() {
  const [settings, setSettings] = useState<SiteSettingsRecord | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const loadSettings = useCallback(async () => {
    setIsLoading(true)
    setErrorMessage(null)

    try {
      const response = await fetch("/api/admin/site-settings", { method: "GET" })
      const payload = (await response.json()) as ApiListResponse<SiteSettingsRecord>

      if (!response.ok) {
        throw new Error(payload.error || "Unable to load site settings.")
      }

      setSettings(payload.items?.[0] || null)
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Unable to load site settings.")
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    void loadSettings()
  }, [loadSettings])

  async function updatePublicLeadershipVisibility(isVisible: boolean) {
    if (!settings) {
      setErrorMessage("Site settings are not available yet.")
      return false
    }

    setIsSubmitting(true)
    setErrorMessage(null)

    try {
      const response = await fetch(`/api/admin/site-settings/${settings.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          show_public_leadership: isVisible,
        }),
      })

      const payload = (await response.json()) as ApiItemResponse<SiteSettingsRecord>

      if (!response.ok) {
        throw new Error(payload.error || "Unable to update site settings.")
      }

      if (payload.item) {
        setSettings(payload.item)
      }

      return true
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Unable to update site settings.")
      return false
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    settings,
    isLoading,
    isSubmitting,
    errorMessage,
    loadSettings,
    updatePublicLeadershipVisibility,
  }
}
