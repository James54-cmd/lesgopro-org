"use client"

import Link from "next/link"
import Image from "next/image"
import { FormEvent } from "react"
import { ArrowLeft, ArrowUpRight, FolderKanban, Pencil, RefreshCcw, Trash2 } from "lucide-react"
import { StatusBadge } from "@/components/app/status-badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { MediaUploadField } from "@/components/ui/media-upload-field"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { useProgramsManagement } from "./use-programs-management"

function ProgramMediaPreview({
  title,
  thumbnailUrl,
  videoUrl,
}: {
  title: string
  thumbnailUrl: string
  videoUrl: string
}) {
  if (videoUrl) {
    return (
      <video controls className="aspect-[4/3] h-full w-full rounded-[1.5rem] border border-primary/10 bg-black object-cover">
        <source src={videoUrl} />
      </video>
    )
  }

  if (thumbnailUrl) {
    return (
      <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] border border-primary/10">
        <Image src={thumbnailUrl} alt={title} fill unoptimized className="object-cover" />
      </div>
    )
  }

  return (
    <div className="flex aspect-[4/3] items-center justify-center rounded-[1.5rem] border border-primary/10 bg-[linear-gradient(145deg,#8B1A1A,#C9972A)] p-4 text-center text-sm font-medium text-white">
      No media uploaded yet
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

export function ProgramsManagementPage() {
  const {
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
  } = useProgramsManagement()

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    await submitForm()
  }

  return (
    <div className="space-y-6">
      <section className="grid gap-4 xl:grid-cols-2">
        <Card className="border-primary/10 bg-white p-6 shadow-card">
          <div className="flex flex-wrap items-center gap-3">
            <StatusBadge variant="officer">Program CRUD</StatusBadge>
            <StatusBadge variant="active">Dedicated Page</StatusBadge>
          </div>

          <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/5 text-primary">
                  <FolderKanban className="h-5 w-5" />
                </div>
                <h2 className="type-h1 text-ink-900">Program Management</h2>
              </div>
              <p className="mt-4 type-body">
                Manage the public program catalog with dedicated media uploads, cleaner publishing
                controls, and CTA links for visitors exploring the organization site.
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
                <Link href="/api/admin/programs">
                  Open API Route
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </Card>

        <Card className="border-primary/10 bg-primary p-6 text-primary-foreground shadow-card">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-secondary">
            Publishing Notes
          </p>
          <h3 className="mt-4 type-h3 text-primary-foreground">Media-first program publishing</h3>
          <p className="mt-3 text-sm leading-relaxed text-primary-foreground/80">
            Each program can carry a thumbnail image or a video upload. The admin form keeps those
            choices explicit so public cards stay polished instead of half-configured.
          </p>
        </Card>
      </section>

      <div className="grid gap-6 xl:grid-cols-2">
        <Card className="border-primary/10 bg-white shadow-card">
          <CardHeader className="gap-4 border-b border-primary/10 pb-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <CardTitle className="type-h3 text-ink-900">Program catalog</CardTitle>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-700">
                  Published programs can power the public site once their content, media, and CTA
                  links are ready.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <Button type="button" variant="outline" onClick={() => void loadData()} disabled={isLoading || isSubmitting}>
                  <RefreshCcw className="h-4 w-4" />
                  Refresh
                </Button>
                <Button type="button" onClick={resetForm} disabled={isSubmitting}>
                  New Program
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent className="pt-6">
            <div className="mb-4 flex items-center justify-between gap-4">
              <p className="text-sm font-semibold text-ink-900">Program records</p>
              <StatusBadge variant="neutral">{programs.length} programs</StatusBadge>
            </div>

            {errorMessage ? (
              <div className="mb-4 rounded-2xl border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive">
                {errorMessage}
              </div>
            ) : null}

            {isLoading ? (
              <div className="rounded-2xl border border-primary/10 bg-muted/40 px-4 py-8 text-sm text-ink-700">
                Loading programs...
              </div>
            ) : programs.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-primary/20 bg-muted/30 px-4 py-8">
                <p className="text-sm font-semibold text-ink-900">No programs yet</p>
                <p className="mt-2 text-sm leading-relaxed text-ink-700">
                  Add the first program so the public site has something to feature.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {programs.map((program) => (
                  <div
                    key={program.id}
                    className="flex flex-col gap-4 rounded-2xl border border-primary/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(253,250,245,0.94))] p-4 shadow-sm"
                  >
                    <div className="grid gap-4 md:grid-cols-[7rem_minmax(0,1fr)]">
                      <div className="overflow-hidden rounded-[1.25rem] border border-primary/10">
                        <ProgramMediaPreview
                          title={program.title}
                          thumbnailUrl={program.thumbnail_url || ""}
                          videoUrl={program.video_url || ""}
                        />
                      </div>

                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="text-base font-semibold text-ink-900">{program.title}</p>
                          <StatusBadge variant={program.is_published ? "active" : "neutral"}>
                            {program.is_published ? "Published" : "Draft"}
                          </StatusBadge>
                        </div>
                        <p className="mt-1 text-sm text-ink-600">{program.slug}</p>
                        <div className="mt-3 flex flex-wrap gap-2 text-xs text-ink-600">
                          <span className="rounded-full bg-muted px-3 py-1">
                            Sort order: {formatValue(program.sort_order)}
                          </span>
                          <span className="rounded-full bg-muted px-3 py-1">
                            CTA: {formatValue(program.cta_url)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap justify-end gap-2">
                      <Button type="button" variant="outline" size="sm" onClick={() => startEdit(program)} disabled={isSubmitting}>
                        <Pencil className="h-4 w-4" />
                        Edit
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="border-destructive/20 text-destructive hover:bg-destructive/5 hover:text-destructive"
                        onClick={() => void deleteProgram(program.id)}
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
                  {isEditing ? "Edit program" : "Create program"}
                </CardTitle>
                <p className="mt-2 text-sm leading-relaxed text-ink-700">
                  Choose the media type first, then upload the asset that should represent the
                  program publicly.
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
                <div className="flex flex-wrap gap-3">
                  {(["thumbnail", "video"] as const).map((option) => (
                    <Button
                      key={option}
                      type="button"
                      variant={mediaMode === option ? "default" : "outline"}
                      className={cn(
                        "min-w-[9rem]",
                        mediaMode === option ? "bg-primary text-primary-foreground" : undefined
                      )}
                      onClick={() => switchMediaMode(option)}
                      disabled={isSubmitting}
                    >
                      {option === "thumbnail" ? "Thumbnail Image" : "Video Upload"}
                    </Button>
                  ))}
                </div>

                <div className="mt-4">
                  <MediaUploadField
                    label={mediaMode === "thumbnail" ? "Program thumbnail" : "Program video"}
                    value={visibleMediaValue}
                    accept={mediaMode === "thumbnail" ? "image/*" : "video/*"}
                    kind={mediaMode === "thumbnail" ? "image" : "video"}
                    previewAlt={formValues.title || "Program media"}
                    onChange={updateMediaValue}
                    disabled={isSubmitting}
                    description={
                      mediaMode === "thumbnail"
                        ? "Upload a cover image for cards and previews."
                        : "Upload a short program video when you want motion instead of a static image."
                    }
                  />
                  {fieldErrors.thumbnail_url || fieldErrors.video_url ? (
                    <p className="mt-2 text-xs text-destructive">
                      {fieldErrors.thumbnail_url || fieldErrors.video_url}
                    </p>
                  ) : null}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">Program title</Label>
                <Input
                  id="title"
                  value={formValues.title}
                  onChange={(event) => updateField("title", event.target.value)}
                  placeholder="Bachelor of Science in Information Technology"
                  disabled={isSubmitting}
                  aria-invalid={Boolean(fieldErrors.title)}
                />
                {fieldErrors.title ? <p className="text-xs text-destructive">{fieldErrors.title}</p> : null}
              </div>

              <div className="space-y-2">
                <Label htmlFor="slug">Slug</Label>
                <Input
                  id="slug"
                  value={formValues.slug}
                  onChange={(event) => updateField("slug", event.target.value)}
                  placeholder="bachelor-of-science-in-information-technology"
                  disabled={isSubmitting}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formValues.description}
                  onChange={(event) => updateField("description", event.target.value)}
                  placeholder="Describe what students can expect from this program."
                  disabled={isSubmitting}
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="cta_url">CTA URL</Label>
                  <Input
                    id="cta_url"
                    type="url"
                    value={formValues.cta_url}
                    onChange={(event) => updateField("cta_url", event.target.value)}
                    placeholder="https://example.com/apply"
                    disabled={isSubmitting}
                    aria-invalid={Boolean(fieldErrors.cta_url)}
                  />
                  {fieldErrors.cta_url ? <p className="text-xs text-destructive">{fieldErrors.cta_url}</p> : null}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sort_order">Sort order</Label>
                  <Input
                    id="sort_order"
                    type="number"
                    value={formValues.sort_order}
                    onChange={(event) => updateField("sort_order", event.target.value)}
                    placeholder="1"
                    disabled={isSubmitting}
                    aria-invalid={Boolean(fieldErrors.sort_order)}
                  />
                  {fieldErrors.sort_order ? <p className="text-xs text-destructive">{fieldErrors.sort_order}</p> : null}
                </div>
              </div>

              <label className="flex items-center gap-3 rounded-xl border border-primary/10 bg-muted/20 px-4 py-3 text-sm text-ink-800">
                <Checkbox
                  checked={formValues.is_published}
                  onCheckedChange={(checked) => updateField("is_published", checked === true)}
                  disabled={isSubmitting}
                />
                <span>Program is published and can appear on the public site</span>
              </label>

              <div className="flex flex-wrap gap-3 pt-2">
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Saving..." : isEditing ? "Save program" : "Create program"}
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
