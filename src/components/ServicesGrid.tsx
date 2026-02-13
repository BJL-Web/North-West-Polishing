import React from 'react'
import { ServiceCard } from './ServiceCard'
import type { Service } from '@/payload-types'
import Link from 'next/link'
interface ServicesGridProps {
  services: Service[]
  label?: string
  title?: string
  description?: string
  buttonText?: string
}

export function ServicesGrid({ services, label = 'What We Do', title = 'Our Services', description = 'Professional metal polishing and finishing services to meet your exact specifications. From on-site work to precision mechanical polishing, we deliver quality results.', buttonText = 'Find Out More' }: ServicesGridProps) {
  return (
    <div>
      <div className="mb-10">
        <span className="text-xs uppercase tracking-widest text-text-muted mb-3 block">
          {label}
        </span>
        <h1 className="text-4xl font-semibold tracking-tight text-text-primary mb-4">
          {title}
        </h1>
        <div className="flex items-end justify-between gap-8 flex-wrap">
          <p className="text-lg text-text-muted leading-relaxed max-w-2xl">
            {description}
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 text-[1rem] font-semibold bg-accent text-white shrink-0 transition-all duration-200 hover:bg-gray-100 group"
          >
            <span>{buttonText}</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="transition-transform duration-200 group-hover:translate-x-1"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 w-screen relative left-1/2 -translate-x-1/2">
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} compact />
        ))}
      </div>
    </div>
  )
}
