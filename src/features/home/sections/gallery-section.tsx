import Image from "next/image"
import { Camera } from "lucide-react"
import { SectionShell } from "@/components/layout/section-shell"
import { SectionHeader } from "@/components/shared/section-header"
import { StatusBadge } from "@/components/shared/status-badge"
import { galleryItems } from "@/features/home/data"

export function GallerySection() {
  const [featured, ...rest] = galleryItems

  return (
    <SectionShell>
      <SectionHeader
        label="Moments"
        title="LESGOPRO Gallery"
        description="Snapshots from workshops, hackathons, and community activities that define our culture."
        className="mb-8"
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <article className="group relative overflow-hidden rounded-2xl border border-primary/10 bg-white shadow-card lg:col-span-2">
          <div className="relative h-80 w-full">
            <Image
              src={featured.imageUrl}
              alt={featured.alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/90 via-primary-dark/30 to-transparent" />
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <div className="mb-3 flex items-center gap-2">
              <Camera className="h-4 w-4 text-secondary" />
              <StatusBadge variant="lead">{featured.tag}</StatusBadge>
            </div>
            <h3 className="type-h2 mb-2 text-cream">{featured.title}</h3>
            <p className="text-sm leading-relaxed text-cream/80">{featured.caption}</p>
          </div>
        </article>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1">
          {rest.map((item) => (
            <article
              key={item.title}
              className="group overflow-hidden rounded-xl border border-primary/10 bg-white shadow-card"
            >
              <div className="relative h-40 w-full">
                <Image
                  src={item.imageUrl}
                  alt={item.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="space-y-2 p-4">
                <StatusBadge variant="member">{item.tag}</StatusBadge>
                <h3 className="type-h3 text-ink-900">{item.title}</h3>
                <p className="text-sm leading-relaxed text-ink-700">{item.caption}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </SectionShell>
  )
}
