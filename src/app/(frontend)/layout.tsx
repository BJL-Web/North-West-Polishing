import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Barlow } from 'next/font/google'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { Navigation } from '@/components/Navigation'
import { SplashScreen } from '@/components/SplashScreen'
import { FloatingContact } from '@/components/FloatingContact'
import { getSiteSettings } from '@/lib/getSiteSettings'
import { StructuredData } from '@/components/StructuredData'
import type { Metadata, Viewport } from 'next'
import './styles.css'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://northwestlaserbend.co.uk'

const barlow = Barlow({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-barlow',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#000000',
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'North West Laser Bend',
    template: '%s | North West Laser Bend',
  },
  description: 'Professional metal polishing and finishing services in the North West.',
  robots: {
    index: true,
    follow: true,
  },
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props
  const { branding, contactInfo, footerContent } = await getSiteSettings()
  const payload = await getPayload({ config: await config })
  const servicesData = await payload.find({
    collection: 'services',
    limit: 3,
    sort: 'order',
    depth: 0,
  })
  const services = servicesData.docs.map((s) => ({ title: s.title, slug: s.slug }))

  const logoData = branding.logo
    ? {
        url: branding.logo.url || '',
        alt: branding.logo.alt || branding.siteName,
        width: branding.logo.width || undefined,
        height: branding.logo.height || undefined,
      }
    : null

  const heroLogoData = branding.heroLogo
    ? {
        url: branding.heroLogo.url || '',
        alt: branding.heroLogo.alt || branding.siteName,
        width: branding.heroLogo.width || undefined,
        height: branding.heroLogo.height || undefined,
      }
    : logoData

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: branding.siteName,
    description: branding.tagline,
    url: SITE_URL,
    telephone: contactInfo.phone,
    email: contactInfo.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: contactInfo.location,
    },
    ...(logoData?.url && { logo: logoData.url }),
  }

  return (
    <html lang="en" className={barlow.variable}>
      <head />
      <body>
        <StructuredData data={localBusinessSchema} />
        <SplashScreen
            logo={logoData}
            splashLogoHeight={branding.splashLogoHeight}
            siteName={branding.siteName}
            tagline={branding.tagline}
          >
            <Navigation
              logo={logoData}
              heroLogo={heroLogoData}
              logoHeight={branding.logoHeight}
              siteName={branding.siteName}
              services={services}
              phone={contactInfo.phone}
              phoneLink={contactInfo.phoneLink}
              email={contactInfo.email}
            />
            <main>{children}</main>
            <FloatingContact phone={contactInfo.phone} phoneLink={contactInfo.phoneLink} email={contactInfo.email} />
            <footer className="bg-bg-secondary border-t border-border mt-0 pt-10 sm:pt-16 pb-6 relative before:absolute before:top-0 before:left-0 before:w-20 before:h-px before:bg-accent">
              <div className="max-w-300 mx-auto px-4 sm:px-8 grid grid-cols-1 sm:grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-8 sm:gap-10 mb-12">
                <div>
                  {logoData?.url ? (
                    <div className="mb-3">
                      <Image
                        src={logoData.url}
                        alt={logoData.alt || branding.siteName}
                        width={logoData.width || 200}
                        height={logoData.height || branding.logoHeight}
                        style={{
                          height: branding.logoHeight,
                          width: 'auto',
                          objectFit: 'contain',
                        }}
                        className="block max-w-45"
                      />
                    </div>
                  ) : (
                    <h3 className="text-lg font-semibold mb-2 text-text-primary">
                      {branding.siteName}
                    </h3>
                  )}
                  <p className="text-sm text-text-muted mb-0">{branding.tagline}</p>
                </div>
                <div>
                  <h4 className="text-[0.6875rem] font-semibold uppercase tracking-[0.12em] mb-4 text-text-muted font-mono">
                    Services
                  </h4>
                  <ul className="list-none">
                    {services.map((service) => (
                      <li key={service.slug} className="py-1.5">
                        <Link
                          href={`/services/${service.slug}`}
                          className="text-text-muted text-sm hover:text-accent transition-colors duration-200"
                        >
                          {service.title}
                        </Link>
                      </li>
                    ))}
                    <li className="py-1.5">
                      <Link
                        href="/services"
                        className="text-text-secondary font-medium text-sm transition-colors duration-200 hover:text-accent hover:opacity-100"
                      >
                        View All Services
                      </Link>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-[0.6875rem] font-semibold uppercase tracking-[0.12em] mb-4 text-text-muted font-mono">
                    {footerContent.contactHeading}
                  </h4>
                  <p className="text-sm text-text-muted mb-0">{footerContent.contactText}</p>
                  <Link
                    href="/contact"
                    className="text-text-secondary font-medium text-sm transition-colors duration-200 hover:text-accent hover:opacity-100"
                  >
                    {footerContent.contactLinkText}
                  </Link>
                </div>
              </div>
              <div className="max-w-300 mx-auto px-4 sm:px-8 pt-6 text-center border-t border-border text-text-muted text-[0.8125rem]">
                <p>
                  &copy; {new Date().getFullYear()} {footerContent.copyrightText || branding.siteName}. All rights reserved.
                </p>
                <p className="mt-2">
                  Website by{' '}
                  <a
                    href="https://brooklynjl.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-secondary hover:text-accent transition-colors duration-200"
                  >
                    BJL
                  </a>
                </p>
              </div>
            </footer>
          </SplashScreen>
      </body>
    </html>
  )
}
