"use client"

import { useCallback, useEffect, useMemo, useState } from "react"

type OfficerRecord = {
  id: string
  school_year_id: string
  school_year_label?: string | null
  officer_position_id?: string | null
  officer_position_label?: string | null
  custom_position_name?: string | null
  first_name: string
  last_name: string
  slug: string
  bio?: string | null
  photo_url?: string | null
  profile_url?: string | null
  email?: string | null
  phone_number?: string | null
  sort_order?: number | null
  is_active: boolean
}

type SchoolYearOption = {
  id: string
  label: string
  is_current: boolean
  is_active: boolean
}

type OfficerPositionOption = {
  id: string
  name: string
  slug: string
  is_active: boolean
}

type OfficerFormValues = {
  school_year_id: string
  officer_position_id: string
  custom_position_name: string
  first_name: string
  last_name: string
  slug: string
  bio: string
  photo_url: string
  profile_url: string
  email: string
  phone_number: string
  sort_order: string
  is_active: boolean
}

type ApiListResponse<T> = {
  items?: T[]
  error?: string
}

type ApiItemResponse<T> = {
  item?: T | null
  error?: string
}

const ALL_SCHOOL_YEARS_FILTER = "all"

function emptyOfficerFormValues(): OfficerFormValues {
  return {
    school_year_id: "",
    officer_position_id: "",
    custom_position_name: "",
    first_name: "",
    last_name: "",
    slug: "",
    bio: "",
    photo_url: "",
    profile_url: "",
    email: "",
    phone_number: "",
    sort_order: "0",
    is_active: true,
  }
}

function slugifyOfficerName(firstName: string, lastName: string) {
  return `${firstName} ${lastName}`
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
}

function normalizeOfficerFormValues(
  officer: OfficerRecord,
  defaultSchoolYearId: string | null
): OfficerFormValues {
  return {
    school_year_id: officer.school_year_id || defaultSchoolYearId || "",
    officer_position_id: officer.officer_position_id || "",
    custom_position_name: officer.custom_position_name || "",
    first_name: officer.first_name || "",
    last_name: officer.last_name || "",
    slug: officer.slug || "",
    bio: officer.bio || "",
    photo_url: officer.photo_url || "",
    profile_url: officer.profile_url || "",
    email: officer.email || "",
    phone_number: officer.phone_number || "",
    sort_order:
      typeof officer.sort_order === "number" && Number.isFinite(officer.sort_order)
        ? String(officer.sort_order)
        : "0",
    is_active: Boolean(officer.is_active),
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

export function useOfficersManagement() {
  const [officers, setOfficers] = useState<OfficerRecord[]>([])
  const [schoolYears, setSchoolYears] = useState<SchoolYearOption[]>([])
  const [officerPositions, setOfficerPositions] = useState<OfficerPositionOption[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [editingOfficerId, setEditingOfficerId] = useState<string | null>(null)
  const [hasManualSlug, setHasManualSlug] = useState(false)
  const [selectedSchoolYearFilter, setSelectedSchoolYearFilter] = useState(ALL_SCHOOL_YEARS_FILTER)
  const [formValues, setFormValues] = useState<OfficerFormValues>(emptyOfficerFormValues)

  const currentSchoolYear = useMemo(
    () => schoolYears.find((schoolYear) => schoolYear.is_current && schoolYear.is_active) || null,
    [schoolYears]
  )
  const filteredOfficers = useMemo(() => {
    if (selectedSchoolYearFilter === ALL_SCHOOL_YEARS_FILTER) {
      return officers
    }

    return officers.filter((officer) => officer.school_year_id === selectedSchoolYearFilter)
  }, [officers, selectedSchoolYearFilter])

  const defaultSchoolYearId = currentSchoolYear?.id || schoolYears[0]?.id || null
  const isEditing = editingOfficerId !== null

  const loadData = useCallback(async () => {
    setIsLoading(true)
    setErrorMessage(null)

    try {
      const [nextOfficers, nextSchoolYears, nextOfficerPositions] = await Promise.all([
        fetchList<OfficerRecord>("/api/admin/officers"),
        fetchList<SchoolYearOption>("/api/admin/school-years"),
        fetchList<OfficerPositionOption>("/api/admin/officer-positions"),
      ])

      setOfficers(nextOfficers)
      setSchoolYears(nextSchoolYears)
      setOfficerPositions(nextOfficerPositions)
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Unable to load officer management data.")
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    void loadData()
  }, [loadData])

  useEffect(() => {
    if (!isEditing && defaultSchoolYearId && !formValues.school_year_id) {
      setFormValues((current) => ({
        ...current,
        school_year_id: defaultSchoolYearId,
      }))
    }
  }, [defaultSchoolYearId, formValues.school_year_id, isEditing])

  useEffect(() => {
    if (!schoolYears.length) {
      return
    }

    const hasMatchingYear = schoolYears.some((schoolYear) => schoolYear.id === selectedSchoolYearFilter)

    if (selectedSchoolYearFilter === ALL_SCHOOL_YEARS_FILTER || !hasMatchingYear) {
      setSelectedSchoolYearFilter(defaultSchoolYearId || ALL_SCHOOL_YEARS_FILTER)
    }
  }, [defaultSchoolYearId, schoolYears, selectedSchoolYearFilter])

  useEffect(() => {
    if (hasManualSlug) {
      return
    }

    setFormValues((current) => {
      const nextSlug = slugifyOfficerName(current.first_name, current.last_name)

      if (current.slug === nextSlug) {
        return current
      }

      return {
        ...current,
        slug: nextSlug,
      }
    })
  }, [formValues.first_name, formValues.last_name, hasManualSlug])

  function resetForm() {
    setEditingOfficerId(null)
    setHasManualSlug(false)
    setFormValues({
      ...emptyOfficerFormValues(),
      school_year_id: defaultSchoolYearId || "",
    })
    setErrorMessage(null)
  }

  function startEdit(officer: OfficerRecord) {
    setEditingOfficerId(officer.id)
    setHasManualSlug(true)
    setFormValues(normalizeOfficerFormValues(officer, defaultSchoolYearId))
    setErrorMessage(null)
  }

  function updateField<K extends keyof OfficerFormValues>(field: K, value: OfficerFormValues[K]) {
    setFormValues((current) => ({
      ...current,
      [field]: value,
    }))

    if (field === "slug") {
      setHasManualSlug(true)
    }
  }

  async function submitForm() {
    setIsSubmitting(true)
    setErrorMessage(null)

    const payload = {
      school_year_id: formValues.school_year_id || defaultSchoolYearId,
      officer_position_id: formValues.officer_position_id || null,
      custom_position_name: formValues.custom_position_name.trim() || null,
      first_name: formValues.first_name.trim(),
      last_name: formValues.last_name.trim(),
      slug: formValues.slug.trim(),
      bio: formValues.bio.trim() || null,
      photo_url: formValues.photo_url.trim() || null,
      profile_url: formValues.profile_url.trim() || null,
      email: formValues.email.trim() || null,
      phone_number: formValues.phone_number.trim() || null,
      sort_order: formValues.sort_order.trim() === "" ? 0 : Number(formValues.sort_order),
      is_active: formValues.is_active,
    }

    if (!payload.school_year_id) {
      setErrorMessage("Select a school year before saving this officer.")
      setIsSubmitting(false)
      return false
    }

    try {
      const endpoint = isEditing ? `/api/admin/officers/${editingOfficerId}` : "/api/admin/officers"
      const method = isEditing ? "PATCH" : "POST"
      const response = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      const responsePayload = (await response.json()) as ApiItemResponse<OfficerRecord>

      if (!response.ok) {
        setErrorMessage(responsePayload.error || "Unable to save the officer.")
        return false
      }

      await loadData()
      resetForm()
      return true
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Unable to save the officer.")
      return false
    } finally {
      setIsSubmitting(false)
    }
  }

  async function deleteOfficer(id: string) {
    setIsSubmitting(true)
    setErrorMessage(null)

    try {
      const response = await fetch(`/api/admin/officers/${id}`, {
        method: "DELETE",
      })

      const payload = (await response.json()) as { error?: string }

      if (!response.ok) {
        setErrorMessage(payload.error || "Unable to delete the officer.")
        return false
      }

      await loadData()

      if (editingOfficerId === id) {
        resetForm()
      }

      return true
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Unable to delete the officer.")
      return false
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    officers,
    filteredOfficers,
    schoolYears,
    officerPositions,
    currentSchoolYear,
    selectedSchoolYearFilter,
    allSchoolYearsFilterValue: ALL_SCHOOL_YEARS_FILTER,
    isLoading,
    isSubmitting,
    errorMessage,
    isEditing,
    formValues,
    loadData,
    resetForm,
    startEdit,
    setSelectedSchoolYearFilter,
    updateField,
    submitForm,
    deleteOfficer,
  }
}
