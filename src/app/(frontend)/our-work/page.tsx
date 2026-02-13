import { getPayload } from 'payload'
import React from 'react'
import config from '@/payload.config'
import { OurWorkGallery } from '@/components/OurWorkGallery'
import { getSiteSettings } from '@/lib/getSiteSettings'
import { generatePageMetadata } from '@/lib/generatePageMetadata'

export async function generateMetadata() {
  const { pageSeo, branding } = await getSiteSettings()
  return generatePageMetadata(pageSeo.ourWork, {
    title: 'Our Work',
    description: 'Browse our portfolio of professional metal polishing and finishing projects.',
  }, branding.siteName, '/our-work')
}

export default async function OurWorkPage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const projects = await payload.find({
    collection: 'projects',
    sort: 'order',
    depth: 2,
  })

  const allImages: { url: string; alt: string }[] = []
  projects.docs.forEach((project) => {
    if (project.images && project.images.length > 0) {
      project.images.forEach((img) => {
        if (typeof img.image === 'object' && img.image?.url) {
          allImages.push({
            url: img.image.url,
            alt: img.image.alt || project.title || '',
          })
        }
      })
    }
  })

  return (
    <div className="min-h-screen bg-bg-primary">
      <div className="relative h-[40vh] min-h-70 flex items-end overflow-hidden bg-black">
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(135deg, #5a5a5a 0%, #7a7a7a 15%, #6a6a6a 30%, #8a8a8a 45%, #7a7a7a 55%, #6a6a6a 70%, #8a8a8a 85%, #5a5a5a 100%)',
          }}
        />
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              'repeating-linear-gradient(90deg, transparent, transparent 1px, rgba(255,255,255,0.02) 1px, rgba(255,255,255,0.02) 2px)',
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.15] pointer-events-none mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%)',
          }}
        />
        <div className="relative z-10 w-full px-4 sm:px-8 pb-8 sm:pb-12">
          <span className="text-xs uppercase tracking-widest text-white/50 mb-3 block">
            Portfolio
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-3">
            Our Work
          </h1>
          <p className="text-base sm:text-lg text-white/70 leading-relaxed max-w-2xl">
            Browse our portfolio of professional metal polishing and finishing projects.
          </p>
        </div>
      </div>

      <OurWorkGallery images={allImages} initialCount={18} loadMoreCount={12} />
    </div>
  )
}
