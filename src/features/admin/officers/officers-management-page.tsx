"use client"

import Link from "next/link"
import Image from "next/image"
import { FormEvent } from "react"
import { ArrowLeft, ArrowUpRight, Filter, Pencil, RefreshCcw, ShieldCheck, Trash2 } from "lucide-react"
import { StatusBadge } from "@/components/app/status-badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ImageUploadField } from "@/components/ui/image-upload-field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useOfficersManagement } from "./use-officers-management"

function OfficerListAvatar({ name, imageUrl }: { name: string; imageUrl: string }) {
  const initials =
    name
      .split(" ")
      .filter(Boolean)
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "OF"

  return (
    <div className="relative flex h-20 w-20 items-center justify-center overflow-hidden rounded-[1.5rem] border border-primary/10 bg-[linear-gradient(145deg,#8B1A1A,#C9972A)] text-lg font-semibold text-white shadow-card">
      {imageUrl ? (
        <Image src={imageUrl} alt={name} fill unoptimized className="object-cover" />
      ) : (
        <>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.25),transparent_45%)]" />
          <span className="relative">{initials}</span>
        </>
      )}
    </div>
  )
}

function formatValue(value: string | number | boolean | null | undefined) {
  if (typeof value === "boolean") {
    return value ? "Yes" : "No"
  }

  if (value === null || value === undefined || value === "") {
    return "—"
  }

  return String(value)
}

export function OfficersManagementPage() {
  const {
    officers,
    filteredOfficers,
    schoolYears,
    officerPositions,
    currentSchoolYear,
    selectedSchoolYearFilter,
    allSchoolYearsFilterValue,
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
  } = useOfficersManagement()

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    await submitForm()
  }

  const displayName = `${formValues.first_name} ${formValues.last_name}`.trim() || "Officer"
  const activeSchoolYears = schoolYears.filter((schoolYear) => schoolYear.is_active)
  const activeOfficerPositions = officerPositions.filter((position) => position.is_active)
  const selectedFilterLabel =
    selectedSchoolYearFilter === allSchoolYearsFilterValue
      ? "All school years"
      : schoolYears.find((schoolYear) => schoolYear.id === selectedSchoolYearFilter)?.label ||
        "Filtered year"

  return (
    <div className="space-y-6">
      <section className="grid gap-4 xl:grid-cols-2">
        <Card className="relative overflow-hidden border-primary/10 bg-white p-6 shadow-card">
          <div className="relative">
            <div className="flex flex-wrap items-center gap-3">
              <StatusBadge variant="officer">Officer CRUD</StatusBadge>
              <StatusBadge variant="active">Dedicated Page</StatusBadge>
            </div>

            <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/5 text-primary">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <h2 className="type-h1 text-ink-900">Officer Management</h2>
                </div>
                <p className="mt-4 type-body">
                  Assign officers to school years and positions with a cleaner, public-ready roster
                  workflow. Slugs auto-generate, current school year is preselected, and image
                  previews help verify public output.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button asChild variant="outline" size="lg">
                  <Link href="/admin">
                    <ArrowLeft className="h-4 w-4" />
                    Back to Dashboard
                  </Link>
                </Button>
                <Button asChild size="lg">
                  <Link href="/api/admin/officers">
                    Open API Route
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </Card>

        <Card className="border-primary/10 bg-primary p-6 text-primary-foreground shadow-card">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-secondary">Roster Logic</p>
          <h3 className="mt-4 type-h3 text-primary-foreground">Current school year comes first</h3>
          <p className="mt-3 text-sm leading-relaxed text-primary-foreground/80">
            New officers default to the current school year, but you can still move them to a past
            year when you need to preserve older rosters.
          </p>
          {currentSchoolYear ? (
            <div className="mt-5 rounded-2xl bg-white/10 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-secondary">Current year</p>
              <p className="mt-2 text-lg font-semibold">{currentSchoolYear.label}</p>
            </div>
          ) : null}
        </Card>
      </section>

      <div className="grid gap-6 xl:grid-cols-2">
        <Card className="border-primary/10 bg-white shadow-card">
          <CardHeader className="gap-4 border-b border-primary/10 pb-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <CardTitle className="type-h3 text-ink-900">Officer roster</CardTitle>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-700">
                  This list is easier to scan now: school year and position labels are resolved, and
                  the roster remains sorted for public presentation.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <Button type="button" variant="outline" onClick={() => void loadData()} disabled={isLoading || isSubmitting}>
                  <RefreshCcw className="h-4 w-4" />
                  Refresh
                </Button>
                <Button type="button" onClick={resetForm} disabled={isSubmitting}>
                  New Officer
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent className="pt-6">
            <div className="mb-4 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-sm font-semibold text-ink-900">Active records</p>
                <p className="mt-1 text-sm text-ink-600">
                  Filter the roster by school year when you need to review a specific term.
                </p>
              </div>

              <div className="flex flex-col gap-2 sm:min-w-[16rem]">
                <Label htmlFor="officer-school-year-filter" className="text-xs font-semibold uppercase tracking-[0.12em] text-ink-500">
                  <span className="inline-flex items-center gap-2">
                    <Filter className="h-3.5 w-3.5" />
                    School year filter
                  </span>
                </Label>
                <Select value={selectedSchoolYearFilter} onValueChange={setSelectedSchoolYearFilter}>
                  <SelectTrigger id="officer-school-year-filter">
                    <SelectValue placeholder="Filter by school year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={allSchoolYearsFilterValue}>All school years</SelectItem>
                    {schoolYears.map((schoolYear) => (
                      <SelectItem key={schoolYear.id} value={schoolYear.id}>
                        {schoolYear.label}
                        {schoolYear.is_current ? " (Current)" : ""}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="mb-4 flex items-center justify-between gap-4">
              <p className="text-sm font-medium text-ink-700">{selectedFilterLabel}</p>
              <StatusBadge variant="neutral">
                {filteredOfficers.length}
                {selectedSchoolYearFilter === allSchoolYearsFilterValue ? ` of ${officers.length}` : ""}
                {" "}officers
              </StatusBadge>
            </div>

            {errorMessage ? (
              <div className="mb-4 rounded-2xl border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive">
                {errorMessage}
              </div>
            ) : null}

            {isLoading ? (
              <div className="rounded-2xl border border-primary/10 bg-muted/40 px-4 py-8 text-sm text-ink-700">
                Loading officers...
              </div>
            ) : filteredOfficers.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-primary/20 bg-muted/30 px-4 py-8">
                <p className="text-sm font-semibold text-ink-900">No officers for this school year</p>
                <p className="mt-2 text-sm leading-relaxed text-ink-700">
                  Try another school year filter, or create the first officer for this term so it can
                  flow into the public leadership page when active.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredOfficers.map((officer) => (
                  <div
                    key={officer.id}
                    className="flex flex-col gap-4 rounded-2xl border border-primary/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(253,250,245,0.94))] p-4 shadow-sm lg:flex-row lg:items-start lg:justify-between"
                  >
                    <div className="flex min-w-0 gap-4">
                      <OfficerListAvatar
                        name={`${officer.first_name} ${officer.last_name}`}
                        imageUrl={officer.photo_url || ""}
                      />
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="text-base font-semibold text-ink-900">
                            {officer.first_name} {officer.last_name}
                          </p>
                          <StatusBadge variant={officer.is_active ? "active" : "neutral"}>
                            {officer.is_active ? "Active" : "Hidden"}
                          </StatusBadge>
                        </div>
                        <p className="mt-1 text-sm font-medium text-primary">
                          {formatValue(officer.officer_position_label)}
                        </p>
                        <div className="mt-3 flex flex-wrap gap-2 text-xs text-ink-600">
                          <span className="rounded-full bg-muted px-3 py-1">
                            {formatValue(officer.school_year_label)}
                          </span>
                          <span className="rounded-full bg-muted px-3 py-1">
                            Display order: {formatValue(officer.sort_order)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap justify-end gap-2">
                      <Button type="button" variant="outline" size="sm" onClick={() => startEdit(officer)} disabled={isSubmitting}>
                        <Pencil className="h-4 w-4" />
                        Edit
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="border-destructive/20 text-destructive hover:bg-destructive/5 hover:text-destructive"
                        onClick={() => void deleteOfficer(officer.id)}
                        disabled={isSubmitting}
                      >
                        <Trash2 className="h-4 w-4" />
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-primary/10 bg-white shadow-card">
          <CardHeader className="border-b border-primary/10 pb-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <CardTitle className="type-h3 text-ink-900">
                  {isEditing ? "Edit officer" : "Create officer"}
                </CardTitle>
                <p className="mt-2 text-sm leading-relaxed text-ink-700">
                  School year and position are now selectable, slug is generated for you, and image
                  handling is framed around the public avatar preview instead of a raw “photo URL” field.
                </p>
              </div>
              <StatusBadge variant={isEditing ? "lead" : "active"}>
                {isEditing ? "Editing" : "Creating"}
              </StatusBadge>
            </div>
          </CardHeader>

          <CardContent className="pt-6">
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="rounded-[1.5rem] border border-primary/10 bg-[linear-gradient(180deg,rgba(253,250,245,0.94),rgba(248,243,235,0.88))] p-4">
                <div className="flex items-center gap-4">
                  <div className="shrink-0">
                    <ImageUploadField
                      label="Profile photo"
                      value={formValues.photo_url}
                      previewAlt={displayName}
                      onChange={(value) => updateField("photo_url", value)}
                      disabled={isSubmitting}
                      className="min-w-[18rem]"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-ink-900">{displayName}</p>
                    <p className="mt-1 text-sm text-ink-600">
                      {formValues.custom_position_name ||
                        activeOfficerPositions.find((position) => position.id === formValues.officer_position_id)?.name ||
                        "Officer position preview"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="school_year_id">School year</Label>
                  <Select
                    value={formValues.school_year_id}
                    onValueChange={(value) => updateField("school_year_id", value)}
                    disabled={isSubmitting}
                  >
                    <SelectTrigger id="school_year_id">
                      <SelectValue placeholder="Select school year" />
                    </SelectTrigger>
                    <SelectContent>
                      {activeSchoolYears.map((schoolYear) => (
                        <SelectItem key={schoolYear.id} value={schoolYear.id}>
                          {schoolYear.label}
                          {schoolYear.is_current ? " (Current)" : ""}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-ink-500">
                    Defaults to the current school year, but you can switch to a past year when needed.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="officer_position_id">Position</Label>
                  <Select
                    value={formValues.officer_position_id}
                    onValueChange={(value) => updateField("officer_position_id", value)}
                    disabled={isSubmitting}
                  >
                    <SelectTrigger id="officer_position_id">
                      <SelectValue placeholder="Select position" />
                    </SelectTrigger>
                    <SelectContent>
                      {activeOfficerPositions.map((position) => (
                        <SelectItem key={position.id} value={position.id}>
                          {position.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-ink-500">
                    Use custom position only if this officer should not use one of the standard roles.
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="custom_position_name">Custom position name</Label>
                <Input
                  id="custom_position_name"
                  value={formValues.custom_position_name}
                  onChange={(event) => updateField("custom_position_name", event.target.value)}
                  placeholder="Optional custom title"
                  disabled={isSubmitting}
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="first_name">First name</Label>
                  <Input
                    id="first_name"
                    value={formValues.first_name}
                    onChange={(event) => updateField("first_name", event.target.value)}
                    placeholder="Juan"
                    disabled={isSubmitting}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last_name">Last name</Label>
                  <Input
                    id="last_name"
                    value={formValues.last_name}
                    onChange={(event) => updateField("last_name", event.target.value)}
                    placeholder="Dela Cruz"
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="sort_order">Display order</Label>
                  <Input
                    id="sort_order"
                    type="number"
                    value={formValues.sort_order}
                    onChange={(event) => updateField("sort_order", event.target.value)}
                    placeholder="0"
                    disabled={isSubmitting}
                  />
                  <p className="text-xs text-ink-500">
                    Lower numbers appear first.
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="profile_url">Profile link</Label>
                  <Input
                    id="profile_url"
                    type="url"
                    value={formValues.profile_url}
                    onChange={(event) => updateField("profile_url", event.target.value)}
                    placeholder="Optional external profile link"
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={formValues.bio}
                  onChange={(event) => updateField("bio", event.target.value)}
                  placeholder="Short public-facing bio"
                  disabled={isSubmitting}
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formValues.email}
                    onChange={(event) => updateField("email", event.target.value)}
                    placeholder="optional@email.com"
                    disabled={isSubmitting}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone_number">Phone number</Label>
                  <Input
                    id="phone_number"
                    value={formValues.phone_number}
                    onChange={(event) => updateField("phone_number", event.target.value)}
                    placeholder="Optional contact number"
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              <label className="flex items-center gap-3 rounded-xl border border-primary/10 bg-muted/20 px-4 py-3 text-sm text-ink-800">
                <input
                  type="checkbox"
                  checked={formValues.is_active}
                  onChange={(event) => updateField("is_active", event.target.checked)}
                  disabled={isSubmitting}
                  className="h-4 w-4 rounded border-border text-primary focus:ring-primary/15"
                />
                <span>Officer is active and can appear on the public site</span>
              </label>

              <div className="flex flex-wrap gap-3 pt-2">
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Saving..." : isEditing ? "Save officer" : "Create officer"}
                </Button>
                <Button type="button" variant="outline" onClick={resetForm} disabled={isSubmitting}>
                  Reset form
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
