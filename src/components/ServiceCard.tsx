import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import type { Service } from '@/payload-types'

interface ServiceCardProps {
  service: Service
  index?: number
  compact?: boolean
}

function ServiceIcon({ slug, title }: { slug?: string | null; title?: string | null }) {
  const name = (slug || title || '').toLowerCase()

  if (name.includes('on-site') || name.includes('onsite') || name.includes('mobile')) {
    return (
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
        <circle cx="12" cy="9" r="2.5" />
      </svg>
    )
  }

  if (name.includes('mechanical') || name.includes('machine')) {
    return (
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <circle cx="12" cy="12" r="3" />
        <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
      </svg>
    )
  }

  if (name.includes('bead') || name.includes('blast') || name.includes('glass')) {
    return (
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M12 3v3M12 18v3M6 12H3M21 12h-3" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="12" cy="12" r="1" fill="currentColor" />
        <path d="M7.5 7.5L5 5M16.5 16.5L19 19M7.5 16.5L5 19M16.5 7.5L19 5" strokeDasharray="2 2" />
      </svg>
    )
  }

  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  )
}

export function ServiceCard({ service, compact = false }: ServiceCardProps) {
  const image = typeof service.image === 'object' ? service.image : null

  if (compact) {
    return (
      <Link
        href={`/services/${service.slug}`}
        className="group relative overflow-hidden h-full no-underline block"
      >
        {image?.url && (
          <Image
            src={image.url}
            alt={image.alt || service.title || ''}
            fill
            className="transition-transform duration-700 group-hover:scale-105 object-cover"
          />
        )}

        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-8">
          <h3 className="text-xl sm:text-3xl font-bold text-white mb-2 sm:mb-3 tracking-tight">{service.title}</h3>

          <div className="flex items-center gap-2 text-sm sm:text-lg font-medium text-white/80 group-hover:text-white transition-colors">
            <span>Learn more</span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </div>
        </div>

        <div
          className="absolute bottom-0 left-0 right-0 h-1"
          style={{
            background:
              'linear-gradient(90deg, #8B8B8B 0%, #C0C0C0 15%, #E8E8E8 30%, #F5F5F5 50%, #E8E8E8 70%, #C0C0C0 85%, #8B8B8B 100%)',
          }}
        />
      </Link>
    )
  }

  return (
    <Link
      href={`/services/${service.slug}`}
      className="group relative bg-white border border-border overflow-hidden h-full no-underline transition-all duration-300 hover:border-accent hover:shadow-md"
    >
      {image?.url && (
        <div className="relative w-full aspect-4/3 overflow-hidden">
          <Image
            src={image.url}
            alt={image.alt || service.title || ''}
            fill
            className="transition-transform duration-700 group-hover:scale-105"
            style={{ objectFit: 'cover' }}
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />

          <div className="absolute top-4 right-4 w-12 h-12 bg-white/90 backdrop-blur-sm flex items-center justify-center text-accent">
            <ServiceIcon slug={service.slug} title={service.title} />
          </div>
        </div>
      )}

      <div className="p-6">
        <h3 className="text-xl font-semibold text-text-primary mb-3 tracking-tight group-hover:text-accent transition-colors">
          {service.title}
        </h3>

        <p className="text-sm text-text-muted leading-relaxed mb-5 line-clamp-3">
          {service.description}
        </p>

        <div className="flex items-center gap-2 text-sm font-medium text-accent">
          <span>Learn more</span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="transition-transform duration-300 group-hover:translate-x-1"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 h-1"
        style={{
          background:
            'linear-gradient(90deg, #8B8B8B 0%, #C0C0C0 15%, #E8E8E8 30%, #F5F5F5 50%, #E8E8E8 70%, #C0C0C0 85%, #8B8B8B 100%)',
        }}
      />
    </Link>
  )
}
