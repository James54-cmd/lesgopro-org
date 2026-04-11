"use client"

import Image from "next/image"
import { ChangeEvent, useId, useRef } from "react"
import { ImagePlus, Trash2, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

type ImageUploadFieldProps = {
  label: string
  value: string
  previewAlt: string
  description?: string
  disabled?: boolean
  onChange: (value: string) => void
  className?: string
}

function fallbackInitials(name: string) {
  const initials = name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()

  return initials || "OF"
}

export function ImageUploadField({
  label,
  value,
  previewAlt,
  description,
  disabled,
  onChange,
  className,
}: ImageUploadFieldProps) {
  const inputId = useId()
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  async function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]

    if (!file) {
      return
    }

    const nextValue = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader()

      reader.onload = () => resolve(typeof reader.result === "string" ? reader.result : "")
      reader.onerror = () => reject(new Error("Unable to read the selected image."))
      reader.readAsDataURL(file)
    })

    onChange(nextValue)
    event.target.value = ""
  }

  return (
    <div className={cn("space-y-2", className)}>
      <Label htmlFor={inputId}>{label}</Label>

      <div className="rounded-2xl border border-primary/10 bg-muted/20 p-4">
        <div className="grid gap-4 sm:grid-cols-[6rem_minmax(0,1fr)] sm:items-start">
          <div className="relative flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-[1.5rem] border border-primary/10 bg-[linear-gradient(145deg,#8B1A1A,#C9972A)] text-xl font-semibold text-white shadow-card">
            {value ? (
              <Image src={value} alt={previewAlt} fill unoptimized className="object-cover" />
            ) : (
              <>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.25),transparent_45%)]" />
                <span className="relative">{fallbackInitials(previewAlt)}</span>
              </>
            )}
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2 text-sm font-medium text-ink-800">
              <ImagePlus className="h-4 w-4 text-primary" />
              Officer photo
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <input
                id={inputId}
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
                disabled={disabled}
              />

              <Button
                type="button"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                disabled={disabled}
              >
                <Upload className="h-4 w-4" />
                Upload image
              </Button>

              {value ? (
                <Button type="button" variant="outline" onClick={() => onChange("")} disabled={disabled}>
                  <Trash2 className="h-4 w-4" />
                  Remove
                </Button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
