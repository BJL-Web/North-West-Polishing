import type { Metadata } from 'next'
import type { Media } from '@/payload-types'

interface SeoInput {
  metaTitle?: string | null
  metaDescription?: string | null
  ogImage?: Media | null
}

const DEFAULT_SITE_NAME = 'North West Laser Bend'
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://northwestlaserbend.co.uk'

export function generatePageMetadata(
  seo: SeoInput | undefined,
  defaults: { title: string; description: string },
  siteName?: string,
  pathname?: string,
): Metadata {
  const name = siteName || DEFAULT_SITE_NAME
  const title = seo?.metaTitle || defaults.title
  const description = seo?.metaDescription || defaults.description
  const fullTitle = title.includes(name) ? title : `${title} | ${name}`
  const canonicalUrl = pathname ? `${SITE_URL}${pathname}` : undefined

  const metadata: Metadata = {
    title: fullTitle,
    description,
    ...(canonicalUrl && { alternates: { canonical: canonicalUrl } }),
    openGraph: {
      title: fullTitle,
      description,
      type: 'website',
      siteName: name,
      ...(canonicalUrl && { url: canonicalUrl }),
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
    },
  }

  const imageUrl = seo?.ogImage?.url
  if (imageUrl) {
    const ogImage = {
      url: imageUrl,
      width: seo.ogImage?.width || 1200,
      height: seo.ogImage?.height || 630,
      alt: seo.ogImage?.alt || title,
    }
    metadata.openGraph = { ...metadata.openGraph, images: [ogImage] }
    metadata.twitter = { ...metadata.twitter, images: [imageUrl] }
  }

  return metadata
}
