"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { validateAdminContentPayload, type ValidationFieldErrors } from "@/lib/validation/admin-content-validation"

type ProgramRecord = {
  id: string
  title: string
  slug: string
  description?: string | null
  thumbnail_url?: string | null
  video_url?: string | null
  cta_url?: string | null
  sort_order?: number | null
  is_published: boolean
}

type ProgramFormValues = {
  title: string
  slug: string
  description: string
  thumbnail_url: string
  video_url: string
  cta_url: string
  sort_order: string
  is_published: boolean
}

type ApiListResponse<T> = {
  items?: T[]
  error?: string
}

type ApiItemResponse<T> = {
  item?: T | null
  error?: string
  fieldErrors?: ValidationFieldErrors
}

function emptyProgramFormValues(): ProgramFormValues {
  return {
    title: "",
    slug: "",
    description: "",
    thumbnail_url: "",
    video_url: "",
    cta_url: "",
    sort_order: "1",
    is_published: false,
  }
}

function slugifyProgramTitle(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
}

function normalizeProgramFormValues(program: ProgramRecord): ProgramFormValues {
  return {
    title: program.title || "",
    slug: program.slug || "",
    description: program.description || "",
    thumbnail_url: program.thumbnail_url || "",
    video_url: program.video_url || "",
    cta_url: program.cta_url || "",
    sort_order:
      typeof program.sort_order === "number" && Number.isFinite(program.sort_order)
        ? String(program.sort_order)
        : "1",
    is_published: Boolean(program.is_published),
  }
}

async function fetchList<T>(endpoint: string) {
  const response = await fetch(endpoint, { method: "GET" })
  const payload = (await response.json()) as ApiListResponse<T>

  if (!response.ok) {
    throw new Error(payload.error || "Unable to load records.")
  }

  return payload.items || []
}

export function useProgramsManagement() {
  const [programs, setPrograms] = useState<ProgramRecord[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<ValidationFieldErrors>({})
  const [editingProgramId, setEditingProgramId] = useState<string | null>(null)
  const [hasManualSlug, setHasManualSlug] = useState(false)
  const [mediaMode, setMediaMode] = useState<"thumbnail" | "video">("thumbnail")
  const [formValues, setFormValues] = useState<ProgramFormValues>(emptyProgramFormValues)

  const isEditing = editingProgramId !== null

  const loadData = useCallback(async () => {
    setIsLoading(true)
    setErrorMessage(null)

    try {
      const nextPrograms = await fetchList<ProgramRecord>("/api/admin/programs")
      setPrograms(nextPrograms)
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Unable to load program management data.")
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    void loadData()
  }, [loadData])

  useEffect(() => {
    if (hasManualSlug) {
      return
    }

    setFormValues((current) => {
      const nextSlug = slugifyProgramTitle(current.title)

      if (current.slug === nextSlug) {
        return current
      }

      return {
        ...current,
        slug: nextSlug,
      }
    })
  }, [formValues.title, hasManualSlug])

  const visibleMediaValue = useMemo(
    () => (mediaMode === "thumbnail" ? formValues.thumbnail_url : formValues.video_url),
    [formValues.thumbnail_url, formValues.video_url, mediaMode]
  )

  function resetForm() {
    setEditingProgramId(null)
    setHasManualSlug(false)
    setMediaMode("thumbnail")
    setFormValues(emptyProgramFormValues())
    setErrorMessage(null)
    setFieldErrors({})
  }

  function startEdit(program: ProgramRecord) {
    setEditingProgramId(program.id)
    setHasManualSlug(true)
    setFormValues(normalizeProgramFormValues(program))
    setMediaMode(program.video_url ? "video" : "thumbnail")
    setErrorMessage(null)
    setFieldErrors({})
  }

  function updateField<K extends keyof ProgramFormValues>(field: K, value: ProgramFormValues[K]) {
    if (fieldErrors[field]) {
      setFieldErrors((current) => {
        const nextErrors = { ...current }
        delete nextErrors[field]
        return nextErrors
      })
    }

    setFormValues((current) => ({
      ...current,
      [field]: value,
    }))

    if (field === "slug") {
      setHasManualSlug(true)
    }
  }

  function updateMediaValue(value: string) {
    if (mediaMode === "thumbnail") {
      updateField("thumbnail_url", value)
      if (value) {
        updateField("video_url", "")
      }
    } else {
      updateField("video_url", value)
      if (value) {
        updateField("thumbnail_url", "")
      }
    }
  }

  function switchMediaMode(nextMode: "thumbnail" | "video") {
    setMediaMode(nextMode)

    if (fieldErrors.thumbnail_url || fieldErrors.video_url) {
      setFieldErrors((current) => {
        const nextErrors = { ...current }
        delete nextErrors.thumbnail_url
        delete nextErrors.video_url
        return nextErrors
      })
    }
  }

  async function submitForm() {
    setIsSubmitting(true)
    setErrorMessage(null)
    setFieldErrors({})

    const payload = {
      title: formValues.title.trim(),
      slug: formValues.slug.trim(),
      description: formValues.description.trim() || null,
      thumbnail_url: formValues.thumbnail_url.trim() || null,
      video_url: formValues.video_url.trim() || null,
      cta_url: formValues.cta_url.trim() || null,
      sort_order: formValues.sort_order.trim() === "" ? null : Number(formValues.sort_order),
      is_published: formValues.is_published,
    }

    const validationResult = validateAdminContentPayload("programs", payload)

    if (!validationResult.success) {
      setErrorMessage(validationResult.error)
      setFieldErrors(validationResult.fieldErrors)
      setIsSubmitting(false)
      return false
    }

    try {
      const endpoint = isEditing ? `/api/admin/programs/${editingProgramId}` : "/api/admin/programs"
      const method = isEditing ? "PATCH" : "POST"
      const response = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(validationResult.data),
      })

      const responsePayload = (await response.json()) as ApiItemResponse<ProgramRecord>

      if (!response.ok) {
        setErrorMessage(responsePayload.error || "Unable to save the program.")
        setFieldErrors(responsePayload.fieldErrors || {})
        return false
      }

      await loadData()
      resetForm()
      return true
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Unable to save the program.")
      return false
    } finally {
      setIsSubmitting(false)
    }
  }

  async function deleteProgram(id: string) {
    setIsSubmitting(true)
    setErrorMessage(null)

    try {
      const response = await fetch(`/api/admin/programs/${id}`, {
        method: "DELETE",
      })

      const payload = (await response.json()) as { error?: string }

      if (!response.ok) {
        setErrorMessage(payload.error || "Unable to delete the program.")
        return false
      }

      await loadData()

      if (editingProgramId === id) {
        resetForm()
      }

      return true
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Unable to delete the program.")
      return false
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleUploadError = useCallback((error: string) => {
    setErrorMessage(error)
  }, [])

  return {
    programs,
    isLoading,
    isSubmitting,
    errorMessage,
    fieldErrors,
    isEditing,
    mediaMode,
    visibleMediaValue,
    formValues,
    loadData,
    resetForm,
    startEdit,
    updateField,
    updateMediaValue,
    switchMediaMode,
    submitForm,
    deleteProgram,
    handleUploadError,
  }
}
