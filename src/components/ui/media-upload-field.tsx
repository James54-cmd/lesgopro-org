"use client"

import Image from "next/image"
import { Film, ImagePlus, Trash2, Upload } from "lucide-react"
import { useId, useMemo, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

type MediaUploadFieldProps = {
  label: string
  value: string
  accept: string
  kind: "image" | "video"
  previewAlt: string
  disabled?: boolean
  description?: string
  onChange: (value: string) => void
  className?: string
}

async function readFileAsDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(typeof reader.result === "string" ? reader.result : "")
    reader.onerror = () => reject(new Error("Unable to read the selected file."))
    reader.readAsDataURL(file)
  })
}

export function MediaUploadField({
  label,
  value,
  accept,
  kind,
  previewAlt,
  disabled,
  description,
  onChange,
  className,
}: MediaUploadFieldProps) {
  const inputId = useId()
  const inputRef = useRef<HTMLInputElement | null>(null)
  const inputLabel = kind === "image" ? "Upload image" : "Upload video"
  const previewKind = kind === "image" ? "thumbnail" : "video"
  const icon = useMemo(
    () => (kind === "image" ? <ImagePlus className="h-4 w-4 text-primary" /> : <Film className="h-4 w-4 text-primary" />),
    [kind]
  )

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const nextFile = event.target.files?.[0]

    if (!nextFile) {
      onChange("")
      return
    }

    const nextValue = await readFileAsDataUrl(nextFile)
    onChange(nextValue)
    event.target.value = ""
  }

  function handleRemove() {
    onChange("")

    if (inputRef.current) {
      inputRef.current.value = ""
    }
  }

  return (
    <div className={cn("space-y-2", className)}>
      <Label htmlFor={inputId}>{label}</Label>

      <div className="rounded-2xl border border-primary/10 bg-muted/20 p-4">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_14rem]">
          <div className="space-y-3">
            <input
              id={inputId}
              ref={inputRef}
              type="file"
              accept={accept}
              onChange={handleFileChange}
              disabled={disabled}
              className="sr-only"
            />

            <div className="rounded-2xl border border-dashed border-primary/20 bg-white/80 p-5 text-center">
              <div className="mx-auto flex max-w-sm flex-col items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/5 text-primary">
                  {kind === "image" ? <ImagePlus className="h-5 w-5" /> : <Film className="h-5 w-5" />}
                </div>
                <div>
                  <p className="text-sm font-semibold text-ink-900">
                    Upload a {kind === "image" ? "thumbnail image" : "program video"}
                  </p>
                  <p className="mt-1 text-sm text-ink-600">
                    Pick a {previewKind} file to represent this program on the public site.
                  </p>
                </div>
                <div className="flex flex-wrap justify-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => inputRef.current?.click()}
                    disabled={disabled}
                  >
                    <Upload className="h-4 w-4" />
                    {inputLabel}
                  </Button>

                  {value ? (
                    <Button type="button" variant="ghost" onClick={handleRemove} disabled={disabled}>
                      <Trash2 className="h-4 w-4" />
                      Remove
                    </Button>
                  ) : null}
                </div>
              </div>
            </div>

            {value ? (
              <div className="rounded-2xl border border-primary/10 bg-white p-3">
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-ink-500">
                  Selected {previewKind}
                </p>
                <p className="mt-2 truncate text-sm text-ink-700">
                  {value.startsWith("data:") ? "Uploaded locally and ready to save" : value}
                </p>
              </div>
            ) : null}
          </div>

          <div className="rounded-2xl border border-primary/10 bg-white/80 p-4">
            <div className="flex items-center gap-2 text-sm font-medium text-ink-800">
              {icon}
              {kind === "image" ? "Thumbnail preview" : "Video preview"}
            </div>
            <div className="mt-3 overflow-hidden rounded-[1.25rem] border border-primary/10 bg-[linear-gradient(145deg,#8B1A1A,#C9972A)]">
              {value ? (
                kind === "image" ? (
                  <div className="relative aspect-[4/3]">
                    <Image src={value} alt={previewAlt} fill unoptimized className="object-cover" />
                  </div>
                ) : (
                  <video controls className="aspect-[4/3] h-full w-full bg-black object-cover">
                    <source src={value} />
                  </video>
                )
              ) : (
                <div className="flex aspect-[4/3] items-center justify-center px-4 text-center text-sm font-medium text-white/90">
                  No {previewKind} selected yet
                </div>
              )}
            </div>

            {description ? <p className="mt-3 text-xs leading-relaxed text-ink-500">{description}</p> : null}
          </div>
        </div>
      </div>
    </div>
  )
}
