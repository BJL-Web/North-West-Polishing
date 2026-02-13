import { getPayload } from 'payload'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import React from 'react'
import type { Metadata } from 'next'
import config from '@/payload.config'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { ServiceGallery } from '@/components/ServiceGallery'
import { StructuredData } from '@/components/StructuredData'
import { getSiteSettings } from '@/lib/getSiteSettings'
import { generatePageMetadata } from '@/lib/generatePageMetadata'
import type { Media } from '@/payload-types'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { branding } = await getSiteSettings()

  const services = await payload.find({
    collection: 'services',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 2,
  })

  const service = services.docs[0]
  if (!service) return { title: 'Service Not Found' }

  const meta = service.meta
  const ogImage = meta?.image && typeof meta.image === 'object' ? meta.image as Media : null

  return generatePageMetadata(
    { metaTitle: meta?.title, metaDescription: meta?.description, ogImage },
    { title: service.title, description: service.description },
    branding.siteName,
    `/services/${slug}`,
  )
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { contactInfo } = await getSiteSettings()

  const services = await payload.find({
    collection: 'services',
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
    depth: 2,
  })

  const service = services.docs[0]

  if (!service) {
    notFound()
  }

  const galleryImages =
    service.gallery?.map((item) => {
      const img = typeof item.image === 'object' ? item.image : null
      return {
        url: img?.url || '',
        alt: img?.alt || '',
        caption: item.caption || '',
      }
    }) || []

  const heroImage = typeof service.image === 'object' ? service.image : null

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.description,
    provider: {
      '@type': 'LocalBusiness',
      name: 'North West Laser Bend',
      telephone: contactInfo.phone,
      email: contactInfo.email,
    },
    ...(heroImage?.url && { image: heroImage.url }),
  }

  return (
    <div className="min-h-screen bg-bg-primary">
      <StructuredData data={serviceSchema} />
      <div className="relative h-[45vh] min-h-70 flex items-end overflow-hidden bg-black">
        {heroImage?.url ? (
          <>
            <Image
              src={heroImage.url}
              alt={heroImage.alt || service.title || ''}
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/50" />
          </>
        ) : (
          <>
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
          </>
        )}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)',
          }}
        />
        <div className="relative z-10 w-full pb-8 sm:pb-12">
          <div className="container-main">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-white/50 mb-3 hover:text-white/80 transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Our Services
            </Link>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-3">
              {service.title}
            </h1>
            {service.description && (
              <p className="text-base sm:text-lg text-white/70 leading-relaxed">
                {service.description}
              </p>
            )}
          </div>
        </div>
      </div>

      <section className="py-10 sm:py-16">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-16">
            <div className="lg:col-span-2">
              {service.content && (
                <div className="prose prose-lg max-w-none">
                  <RichText data={service.content} />
                </div>
              )}
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-32">
                <div className="bg-bg-secondary p-6 sm:p-8 mb-6">
                  <h3 className="text-lg font-semibold text-text-primary mb-4">Get a Quote</h3>
                  <p className="text-sm text-text-muted mb-6">
                    Interested in this service? Contact us for a free, no-obligation quote.
                  </p>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 w-full bg-accent text-white px-6 py-3 font-medium text-sm hover:bg-accent-hover transition-colors"
                  >
                    <span>Request Quote</span>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>

                <div className="bg-bg-secondary p-6 sm:p-8">
                  <h3 className="text-lg font-semibold text-text-primary mb-4">Contact Us</h3>
                  <div className="space-y-3 text-sm">
                    <a
                      href={`tel:${contactInfo.phoneLink}`}
                      className="flex items-center gap-3 text-text-muted hover:text-accent transition-colors"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                      <span>{contactInfo.phone}</span>
                    </a>
                    <a
                      href={`mailto:${contactInfo.email}`}
                      className="flex items-center gap-3 text-text-muted hover:text-accent transition-colors"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <polyline points="22,6 12,13 2,6" />
                      </svg>
                      <span>{contactInfo.email}</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {galleryImages.length > 0 && (
        <section>
          <ServiceGallery images={galleryImages} initialCount={6} />
        </section>
      )}

      <section className="relative py-12 sm:py-20 bg-black text-white overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 30%, #1e1e1e 60%, #252525 100%)',
          }}
        />
        <div className="container-main relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
            <p className="text-white/60 mb-8">
              Contact us today to discuss your project requirements and receive a detailed quote.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-white text-black px-8 py-4 font-medium text-sm hover:bg-white/90 transition-colors"
            >
              <span>Get in Touch</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
