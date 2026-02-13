import { getPayload } from 'payload'
import React from 'react'
import config from '@/payload.config'
import { Hero } from '@/components/Hero'
import { ServiceCard } from '@/components/ServiceCard'

import { getSiteSettings } from '@/lib/getSiteSettings'
import { generatePageMetadata } from '@/lib/generatePageMetadata'

export async function generateMetadata() {
  const { pageSeo, branding } = await getSiteSettings()
  return generatePageMetadata(
    pageSeo.home,
    {
      title: 'Professional Metal Polishing & Finishing',
      description: 'Professional metal polishing and finishing services in the North West.',
    },
    branding.siteName,
    '/',
  )
}

export default async function HomePage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { branding } = await getSiteSettings()

  const [services, projects] = await Promise.all([
    payload.find({
      collection: 'services',
      limit: 3,
      sort: 'order',
    }),
    payload.find({
      collection: 'projects',
      where: {
        featured: {
          equals: true,
        },
      },
      limit: 20,
      sort: 'order',
      depth: 2,
    }),
  ])

  const heroLogoSource = branding.heroLogo || branding.logo
  const heroLogoData = heroLogoSource
    ? {
        url: heroLogoSource.url || '',
        alt: heroLogoSource.alt || branding.siteName,
        width: heroLogoSource.width || undefined,
        height: heroLogoSource.height || undefined,
      }
    : null

  const galleryImages: { url: string; alt: string }[] = []
  projects.docs.forEach((project) => {
    if (project.images && project.images.length > 0) {
      project.images.forEach((img) => {
        if (typeof img.image === 'object' && img.image?.url) {
          galleryImages.push({
            url: img.image.url,
            alt: img.image.alt || project.title || '',
          })
        }
      })
    }
  })

  return (
    <div className="h-screen overflow-hidden flex flex-col">
      <div
        className="h-[50vh] flex flex-col relative overflow-hidden isolate shrink-0"
        style={{ contain: 'paint' }}
      >
        <Hero
          heroLogo={heroLogoData}
          heroLogoHeight={branding.heroLogoHeight}
          heroLogoMode={branding.heroLogoMode}
          heroBackgroundMode={branding.heroBackgroundMode}
          galleryImages={galleryImages}
          siteName={branding.siteName}
        />
      </div>

      {services.docs.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 relative z-10 flex-1 min-h-0">
          {services.docs.map((service) => (
            <ServiceCard key={service.id} service={service} compact />
          ))}
        </div>
      )}
    </div>
  )
}
