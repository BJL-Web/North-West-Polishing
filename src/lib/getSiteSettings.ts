import { getPayload } from 'payload'
import config from '@payload-config'
import type { Media } from '@/payload-types'

export interface SiteSettingsBranding {
  logo?: Media | null
  heroLogo?: Media | null
  heroLogoHeight?: number
  heroLogoMode?: 'static' | 'animated'
  heroBackgroundMode?: 'slides' | 'gallery'
  logoHeight?: number
  splashLogoHeight?: number
  siteName?: string
  tagline?: string
}

export interface SiteSettingsContact {
  phone?: string
  phoneLink?: string
  email?: string
  location?: string
  businessHours?: string
  googleMapsEmbed?: string
}

export interface PageSeoData {
  metaTitle?: string | null
  metaDescription?: string | null
  ogImage?: Media | null
}

export interface SiteSettingsHomeContent {
  servicesLabel?: string
  servicesTitle?: string
  servicesDescription?: string
  servicesButtonText?: string
  ctaTitle?: string
  ctaDescription?: string
  ctaButtonText?: string
}

export interface SiteSettingsFooterContent {
  contactHeading?: string
  contactText?: string
  contactLinkText?: string
  copyrightText?: string
}

export interface SiteSettingsPageSeo {
  home?: PageSeoData
  services?: PageSeoData
  ourWork?: PageSeoData
  contact?: PageSeoData
}

export async function getSiteSettings() {
  const payload = await getPayload({ config })

  const settings = await payload.findGlobal({
    slug: 'site-settings',
    depth: 2,
  })

  const branding = settings.branding as SiteSettingsBranding | undefined
  const contactInfo = settings.contactInfo as SiteSettingsContact | undefined
  const pageSeoRaw = (settings as unknown as Record<string, unknown>).pageSeo as SiteSettingsPageSeo | undefined
  const homeContentRaw = (settings as unknown as Record<string, unknown>).homeContent as SiteSettingsHomeContent | undefined
  const footerContentRaw = (settings as unknown as Record<string, unknown>).footerContent as SiteSettingsFooterContent | undefined

  const resolveOgImage = (img: unknown): Media | null => {
    if (img && typeof img === 'object' && 'url' in (img as Record<string, unknown>)) return img as Media
    return null
  }

  return {
    branding: {
      logo: branding?.logo && typeof branding.logo === 'object' ? branding.logo : null,
      heroLogo: branding?.heroLogo && typeof branding.heroLogo === 'object' ? branding.heroLogo : null,
      heroLogoHeight: branding?.heroLogoHeight ?? 80,
      heroLogoMode: (branding?.heroLogoMode as 'static' | 'animated') ?? 'static',
      heroBackgroundMode: ((branding as unknown as Record<string, unknown>)?.heroBackgroundMode as 'slides' | 'gallery') ?? 'slides',
      logoHeight: branding?.logoHeight ?? 50,
      splashLogoHeight: branding?.splashLogoHeight ?? 120,
      siteName: branding?.siteName ?? 'North West Polishing',
      tagline: branding?.tagline ?? 'Professional metal polishing and finishing services',
    },
    contactInfo: {
      phone: contactInfo?.phone ?? '0161 123 4567',
      phoneLink: contactInfo?.phoneLink ?? '01611234567',
      email: contactInfo?.email ?? 'info@nwpolishing.co.uk',
      location: contactInfo?.location ?? 'Manchester, UK',
      businessHours: contactInfo?.businessHours ?? 'Mon–Fri 7am–5pm',
      googleMapsEmbed:
        contactInfo?.googleMapsEmbed ??
        'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d152515.98633109063!2d-2.3795375!3d53.4723272!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487a4d4c5226f5db%3A0xd9be143804fe6baa!2sManchester!5e0!3m2!1sen!2suk!4v1699999999999!5m2!1sen!2suk',
    },
    homeContent: {
      servicesLabel: homeContentRaw?.servicesLabel ?? 'What We Do',
      servicesTitle: homeContentRaw?.servicesTitle ?? 'Our Services',
      servicesDescription: homeContentRaw?.servicesDescription ?? 'Professional metal polishing and finishing services to meet your exact specifications. From on-site work to precision mechanical polishing, we deliver quality results.',
      servicesButtonText: homeContentRaw?.servicesButtonText ?? 'Find Out More',
      ctaTitle: homeContentRaw?.ctaTitle ?? 'Get In Touch',
      ctaDescription: homeContentRaw?.ctaDescription ?? "Get a detailed quote within 24 hours. Send us your specifications and we'll take care of the rest.",
      ctaButtonText: homeContentRaw?.ctaButtonText ?? 'Request Quote',
    },
    footerContent: {
      contactHeading: footerContentRaw?.contactHeading ?? 'Contact',
      contactText: footerContentRaw?.contactText ?? 'Get in touch for a quote',
      contactLinkText: footerContentRaw?.contactLinkText ?? 'Request Quote',
      copyrightText: footerContentRaw?.copyrightText || null,
    },
    pageSeo: {
      home: {
        metaTitle: pageSeoRaw?.home?.metaTitle || null,
        metaDescription: pageSeoRaw?.home?.metaDescription || null,
        ogImage: resolveOgImage(pageSeoRaw?.home?.ogImage),
      },
      services: {
        metaTitle: pageSeoRaw?.services?.metaTitle || null,
        metaDescription: pageSeoRaw?.services?.metaDescription || null,
        ogImage: resolveOgImage(pageSeoRaw?.services?.ogImage),
      },
      ourWork: {
        metaTitle: pageSeoRaw?.ourWork?.metaTitle || null,
        metaDescription: pageSeoRaw?.ourWork?.metaDescription || null,
        ogImage: resolveOgImage(pageSeoRaw?.ourWork?.ogImage),
      },
      contact: {
        metaTitle: pageSeoRaw?.contact?.metaTitle || null,
        metaDescription: pageSeoRaw?.contact?.metaDescription || null,
        ogImage: resolveOgImage(pageSeoRaw?.contact?.ogImage),
      },
    },
  }
}
