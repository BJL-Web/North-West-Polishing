import React from 'react'
import { ContactForm } from '@/components/ContactForm'
import { getSiteSettings } from '@/lib/getSiteSettings'
import { generatePageMetadata } from '@/lib/generatePageMetadata'

export async function generateMetadata() {
  const { pageSeo, branding } = await getSiteSettings()
  return generatePageMetadata(pageSeo.contact, {
    title: 'Get a Quote',
    description: 'Contact us for a detailed quote on your metal polishing and finishing project.',
  }, branding.siteName, '/contact')
}

export default async function ContactPage() {
  const { contactInfo } = await getSiteSettings()
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
        <div className="relative z-10 w-full pb-8 sm:pb-12">
          <div className="container-main">
            <span className="text-xs uppercase tracking-widest text-white/50 mb-3 block">
              Get in Touch
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-3">
              Get a Quote
            </h1>
            <p className="text-base sm:text-lg text-white/70 leading-relaxed max-w-2xl">
              Fill out the form below and we&apos;ll get back to you with a quote for your project.
            </p>
          </div>
        </div>
      </div>

      <section className="py-10 sm:py-16">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-16">
            <div className="lg:col-span-1">
              <div className="sticky top-32">
                <h2 className="text-2xl font-semibold text-text-primary mb-4">
                  Contact Information
                </h2>
                <p className="text-text-muted mb-8 leading-relaxed">
                  Have questions? We&apos;re here to help. Reach out to us for more information about
                  our services or to discuss your project requirements.
                </p>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-bg-secondary flex items-center justify-center shrink-0">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="text-accent"
                      >
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <polyline points="22,6 12,13 2,6" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-text-primary mb-1">Email</p>
                      <a
                        href={`mailto:${contactInfo.email}`}
                        className="text-text-muted hover:text-accent transition-colors"
                      >
                        {contactInfo.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-bg-secondary flex items-center justify-center shrink-0">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="text-accent"
                      >
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-text-primary mb-1">Phone</p>
                      <a
                        href={`tel:${contactInfo.phoneLink}`}
                        className="text-text-muted hover:text-accent transition-colors"
                      >
                        {contactInfo.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-bg-secondary flex items-center justify-center shrink-0">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="text-accent"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-text-primary mb-1">Business Hours</p>
                      <p className="text-text-muted">{contactInfo.businessHours}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-bg-secondary flex items-center justify-center shrink-0">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="text-accent"
                      >
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-text-primary mb-1">Location</p>
                      <p className="text-text-muted">{contactInfo.location}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <div className="h-48 w-full bg-bg-secondary">
                    <iframe
                      src={contactInfo.googleMapsEmbed}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Location Map"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
