import { getPayload } from 'payload'
import React from 'react'
import config from '@/payload.config'
import { HeroSlideshow } from './HeroSlideshow'

interface HeroProps {
  heroLogo?: {
    url: string
    alt?: string
    width?: number
    height?: number
  } | null
  heroLogoHeight?: number
  heroLogoMode?: 'static' | 'animated'
  heroBackgroundMode?: 'slides' | 'gallery'
  galleryImages?: { url: string; alt: string }[]
  siteName?: string
}

export async function Hero({ heroLogo = null, heroLogoHeight = 80, heroLogoMode = 'static', heroBackgroundMode = 'slides', galleryImages = [], siteName = 'North West Polishing' }: HeroProps) {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const heroSlides = await payload.find({
    collection: 'hero-slides',
    where: {
      active: {
        equals: true,
      },
    },
    sort: 'order',
    depth: 1,
  })

  const slides = heroSlides.docs.map((slide) => {
    const backgroundImage =
      slide.backgroundImage && typeof slide.backgroundImage === 'object'
        ? slide.backgroundImage
        : null

    return {
      title: slide.title,
      accent: slide.accent,
      subtitle: slide.subtitle,
      description: slide.description,
      backgroundImage: backgroundImage
        ? {
            url: backgroundImage.url || '',
            alt: backgroundImage.alt || '',
          }
        : null,
      overlayOpacity: slide.overlayOpacity ?? 0,
      backgroundBlur: slide.backgroundBlur || 0,
      showLogo: slide.showLogo ?? true,
      showTitle: slide.showTitle ?? true,
      showDescription: slide.showDescription ?? true,
      showGetQuote: slide.showGetQuote ?? true,
      showViewWork: slide.showViewWork ?? true,
      titleSize: slide.titleSize ?? 2.7,
      descriptionSize: slide.descriptionSize ?? 1.5,
      stats:
        slide.stats?.map((stat) => ({
          number: stat.number,
          unit: stat.unit || '',
          label: stat.label,
        })) || [],
    }
  })

  const defaultSlides = [
    {
      title: 'Professional',
      accent: 'Metal Polishing',
      subtitle: 'Mirror Finish',
      description:
        'Expert metal polishing services delivering flawless mirror finishes. From stainless steel to brass and aluminium, we bring out the best in every surface.',
      backgroundImage: null,
      overlayOpacity: 0,
      backgroundBlur: 0,
      showLogo: true,
      showTitle: true,
      showDescription: true,
      showGetQuote: true,
      showViewWork: true,
      titleSize: 2.7,
      descriptionSize: 1.5,
      stats: [
        { number: '15+', unit: 'yrs', label: 'Experience' },
        { number: '500+', unit: '', label: 'Projects Completed' },
        { number: '100%', unit: '', label: 'Quality Guaranteed' },
      ],
    },
    {
      title: 'Expert',
      accent: 'Surface Finishing',
      subtitle: 'Satin & Brushed',
      description:
        'Professional surface finishing for architectural and commercial applications. Consistent results with attention to detail on every project.',
      backgroundImage: null,
      overlayOpacity: 0,
      backgroundBlur: 0,
      showLogo: true,
      showTitle: true,
      showDescription: true,
      showGetQuote: true,
      showViewWork: true,
      titleSize: 2.7,
      descriptionSize: 1.5,
      stats: [
        { number: '24hr', unit: '', label: 'Fast Turnaround' },
        { number: 'All', unit: '', label: 'Metal Types' },
        { number: '100%', unit: '', label: 'Satisfaction' },
      ],
    },
  ]

  return (
    <HeroSlideshow
      slides={slides.length > 0 ? slides : defaultSlides}
      heroLogo={heroLogo}
      heroLogoHeight={heroLogoHeight}
      heroLogoMode={heroLogoMode}
      heroBackgroundMode={heroBackgroundMode}
      galleryImages={galleryImages}
      siteName={siteName}
    />
  )
}
