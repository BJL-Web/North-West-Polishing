'use client'

import Image from 'next/image'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'

interface SlideData {
  title: string
  accent: string
  subtitle: string
  description: string
  backgroundImage: {
    url: string
    alt?: string
  } | null
  overlayOpacity: number
  backgroundBlur: number
  showLogo: boolean
  showTitle: boolean
  showDescription: boolean
  showGetQuote: boolean
  showViewWork: boolean
  titleSize: number
  descriptionSize: number
  stats: {
    number: string
    unit: string
    label: string
  }[]
}

interface HeroSlideshowProps {
  slides: SlideData[]
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

export function HeroSlideshow({
  slides,
  heroLogo,
  heroLogoHeight = 80,
  heroLogoMode = 'static',
  heroBackgroundMode = 'slides',
  galleryImages = [],
  siteName = 'North West Polishing',
}: HeroSlideshowProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [displaySlide, setDisplaySlide] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 })
  const [sweepPosition, setSweepPosition] = useState(-100)
  const [typedChars, setTypedChars] = useState(0)
  const [currentGalleryImage, setCurrentGalleryImage] = useState(0)
  const useGalleryBg = heroBackgroundMode === 'gallery' && galleryImages.length > 0

  useEffect(() => {
    if (!useGalleryBg || galleryImages.length <= 1) return
    const interval = setInterval(() => {
      setCurrentGalleryImage((prev) => (prev + 1) % galleryImages.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [useGalleryBg, galleryImages.length])

  const [logoPhase, setLogoPhase] = useState<'waiting' | 'expanding' | 'shrinking' | 'done'>(
    heroLogoMode !== 'animated' ? 'done' : 'waiting',
  )

  useEffect(() => {
    if (heroLogoMode !== 'animated') return

    let expandTimer: NodeJS.Timeout
    let shrinkTimer: NodeJS.Timeout

    const startIntro = () => {
      setLogoPhase('expanding')

      expandTimer = setTimeout(() => {
        setLogoPhase('shrinking')

        shrinkTimer = setTimeout(() => {
          setLogoPhase('done')
          window.dispatchEvent(new CustomEvent('heroLogoIntroDone'))
        }, 500)
      }, 2500)
    }

    if (document.body.classList.contains('splash-done')) {
      startIntro()
    } else {
      const observer = new MutationObserver(() => {
        if (document.body.classList.contains('splash-done')) {
          observer.disconnect()
          startIntro()
        }
      })
      observer.observe(document.body, { attributes: true, attributeFilter: ['class'] })
      return () => {
        observer.disconnect()
        clearTimeout(expandTimer)
        clearTimeout(shrinkTimer)
      }
    }

    return () => {
      clearTimeout(expandTimer)
      clearTimeout(shrinkTimer)
    }
  }, [heroLogoMode])

  const [typewriterReady, setTypewriterReady] = useState(heroLogoMode !== 'animated')

  useEffect(() => {
    setTypedChars(0)
  }, [displaySlide])

  useEffect(() => {
    if (heroLogoMode !== 'animated' || logoPhase !== 'done') return
    const timer = setTimeout(() => {
      setTypewriterReady(true)
    }, 1000)
    return () => clearTimeout(timer)
  }, [heroLogoMode, logoPhase])

  useEffect(() => {
    const description = slides[displaySlide]?.description || ''
    if (isAnimating || !typewriterReady || typedChars >= description.length)
      return

    const isFirstAnimatedType = heroLogoMode === 'animated' && displaySlide === 0
    const speed = isFirstAnimatedType ? Math.max(2, Math.floor(500 / description.length)) : 20

    const timer = setTimeout(() => {
      setTypedChars((prev) => Math.min(prev + 1, description.length))
    }, speed)

    return () => clearTimeout(timer)
  }, [
    typedChars,
    displaySlide,
    isAnimating,
    slides,
    typewriterReady,
    heroLogoMode,
  ])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100
      const y = (e.clientY / window.innerHeight) * 100
      setMousePosition({ x, y })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useEffect(() => {
    const sweepInterval = setInterval(() => {
      setSweepPosition((prev) => {
        if (prev >= 200) return -100
        return prev + 0.5
      })
    }, 30)

    return () => clearInterval(sweepInterval)
  }, [])

  useEffect(() => {
    if (slides.length <= 1) return

    const interval = setInterval(() => {
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length)
        setDisplaySlide((prev) => (prev + 1) % slides.length)
        setTimeout(() => {
          setIsAnimating(false)
        }, 50)
      }, 500)
    }, 6000)

    return () => clearInterval(interval)
  }, [slides.length])

  const handleSlideChange = (index: number) => {
    if (index !== currentSlide && !isAnimating) {
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentSlide(index)
        setDisplaySlide(index)
        setTimeout(() => {
          setIsAnimating(false)
        }, 50)
      }, 500)
    }
  }

  const slide = slides[displaySlide]

  if (!slide) return null

  return (
    <section className="flex-1  w-full h-full  bg-bg-primary relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        {useGalleryBg ? (
          <>
            {galleryImages.map((img, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-[1.5s] ease-in-out ${
                  index === currentGalleryImage ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <Image
                  src={img.url}
                  alt={img.alt}
                  fill
                  priority={index === 0}
                  className={`transition-transform duration-[8s] ease-out ${
                    index === currentGalleryImage ? 'scale-105' : ''
                  }`}
                  style={{ objectFit: 'cover', objectPosition: 'center' }}
                />
              </div>
            ))}
            <div className="absolute inset-0 bg-black/40 pointer-events-none" />
          </>
        ) : (
          slides.map((s, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-[0.8s] ease-in-out ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {s.backgroundImage?.url ? (
                <>
                  <Image
                    src={s.backgroundImage.url}
                    alt={s.backgroundImage.alt || ''}
                    fill
                    priority={index === 0}
                    className={`transition-transform duration-[8s] ease-out ${
                      index === currentSlide ? 'scale-105' : ''
                    }`}
                    style={{
                      objectFit: 'cover',
                      objectPosition: 'center',
                      filter: s.backgroundBlur > 0 ? `blur(${s.backgroundBlur}px)` : undefined,
                      transform: s.backgroundBlur > 0 ? 'scale(1.1)' : undefined,
                    }}
                  />
                  {s.overlayOpacity > 0 && (
                    <div
                      className="absolute inset-0 bg-black pointer-events-none"
                      style={{ opacity: s.overlayOpacity / 100 }}
                    />
                  )}
                </>
              ) : (
                <>
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `
                        linear-gradient(135deg,
                          #5a5a5a 0%,
                          #7a7a7a 15%,
                          #6a6a6a 30%,
                          #8a8a8a 45%,
                          #7a7a7a 55%,
                          #6a6a6a 70%,
                          #8a8a8a 85%,
                          #5a5a5a 100%
                        )
                      `,
                    }}
                  />
                  <div
                    className="absolute inset-0 opacity-40"
                    style={{
                      backgroundImage: `
                        repeating-linear-gradient(
                          90deg,
                          transparent,
                          transparent 1px,
                          rgba(255,255,255,0.02) 1px,
                          rgba(255,255,255,0.02) 2px
                        )
                      `,
                    }}
                  />
                  <div
                    className="absolute inset-0 opacity-[0.15] pointer-events-none mix-blend-overlay"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                    }}
                  />
                  <div
                    className="absolute inset-0 transition-all duration-500 ease-out pointer-events-none"
                    style={{
                      background: `
                        radial-gradient(
                          ellipse 100% 60% at ${mousePosition.x}% ${mousePosition.y}%,
                          rgba(255,255,255,0.18) 0%,
                          rgba(255,255,255,0.08) 20%,
                          rgba(255,255,255,0.02) 40%,
                          transparent 70%
                        )
                      `,
                    }}
                  />
                  <div
                    className="absolute inset-0 transition-all duration-700 ease-out pointer-events-none"
                    style={{
                      background: `
                        radial-gradient(
                          ellipse 150% 100% at ${mousePosition.x * 0.8 + 10}% ${mousePosition.y * 0.8 + 10}%,
                          rgba(255,255,255,0.06) 0%,
                          transparent 50%
                        )
                      `,
                    }}
                  />
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: `
                        linear-gradient(
                          115deg,
                          transparent ${sweepPosition - 30}%,
                          rgba(255,255,255,0.01) ${sweepPosition - 15}%,
                          rgba(255,255,255,0.05) ${sweepPosition - 5}%,
                          rgba(255,255,255,0.08) ${sweepPosition}%,
                          rgba(255,255,255,0.05) ${sweepPosition + 5}%,
                          rgba(255,255,255,0.01) ${sweepPosition + 15}%,
                          transparent ${sweepPosition + 30}%
                        )
                      `,
                    }}
                  />
                  {s.overlayOpacity > 0 && (
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{ opacity: s.overlayOpacity / 100 }}
                    />
                  )}
                </>
              )}
            </div>
          ))
        )}
      </div>

      <div className="absolute inset-0 z-1 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 80% 70% at 50% 50%, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.15) 60%, transparent 100%)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 40%)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, transparent 30%)',
          }}
        />
      </div>

      {heroLogoMode === 'animated' && heroLogo?.url && (
        <div
          className={`absolute inset-0 z-20 flex items-center justify-center pointer-events-none ${
            logoPhase === 'waiting'
              ? 'opacity-0 scale-[0.8] transition-none'
              : logoPhase === 'expanding'
                ? 'opacity-100 scale-[1.15] transition-all duration-[2s] ease-out'
                : logoPhase === 'shrinking'
                  ? 'opacity-0 scale-[0.5] transition-all duration-500 ease-in'
                  : 'opacity-0 scale-[0.5] pointer-events-none transition-none'
          }`}
        >
          <Image
            src={heroLogo.url}
            alt={heroLogo.alt || siteName}
            width={heroLogo.width || 400}
            height={heroLogo.height || heroLogoHeight}
            style={{ height: heroLogoHeight, width: 'auto', objectFit: 'contain' }}
            priority
          />
        </div>
      )}

      <div className="relative z-10 flex items-center justify-center text-center max-w-[1600px] mx-auto h-full px-4 sm:px-8">
        <div className="relative w-full">
          <div
            className={`transition-all duration-700 ease-in-out w-full ${
              isAnimating ? 'opacity-0 translate-y-4' : ''
            }`}
            style={{
              opacity: isAnimating ? 0 : 1,
              transform: isAnimating ? 'translateY(16px)' : 'translateY(0)',
            }}
          >
            {slide.showLogo && heroLogo?.url && heroLogoMode !== 'animated' && (
              <div className="flex justify-center overflow-hidden opacity-100 scale-100 transition-all duration-700 mb-14">
                <Image
                  src={heroLogo.url}
                  alt={heroLogo.alt || siteName}
                  width={heroLogo.width || 400}
                  height={heroLogo.height || heroLogoHeight}
                  style={{ height: heroLogoHeight, width: 'auto', objectFit: 'contain' }}
                  priority
                />
              </div>
            )}

            {slide.showTitle && (
              <h1
                className={`leading-[1.1] w-full text-center transition-all duration-1000 ease-out ${
                  heroLogoMode === 'animated' && logoPhase !== 'done'
                    ? 'opacity-0 scale-95 h-0 m-0 overflow-hidden'
                    : 'animate-[expand-in_0.8s_ease-out_both]'
                }`}
              >
                <span className="block font-semibold text-3xl sm:text-4xl md:text-5xl tracking-wide text-white text-shadow-2xs">
                  {slide.title}
                </span>
              </h1>
            )}

            {slide.showDescription && (
              <div
                className={`transition-all duration-[1s] ease-out ${
                  heroLogoMode === 'animated' && logoPhase !== 'done'
                    ? 'opacity-0 scale-95 translate-y-4'
                    : 'opacity-100 scale-100 translate-y-0'
                }`}
              >
                <p
                  className="font-title text-white/90 mt-4 m-auto text-regular tracking-normal leading-relaxed text-shadow-2xs relative"
                  style={{ fontSize: `${slide.descriptionSize}rem` }}
                >
                  <span className="invisible">{slide.description}</span>
                  <span className="absolute inset-0">{slide.description.slice(0, typedChars)}</span>
                </p>
              </div>
            )}

            {(slide.showGetQuote || slide.showViewWork) && (
              <div
                className={`flex items-center justify-center gap-3 sm:gap-4 mt-8 sm:mt-12 flex-wrap px-4 sm:px-0 transition-all duration-[1s] ease-out ${
                  heroLogoMode === 'animated' && logoPhase !== 'done'
                    ? 'opacity-0 scale-95 translate-y-4'
                    : 'opacity-100 scale-100 translate-y-0'
                }`}
              >
                {slide.showGetQuote && (
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 text-white px-7 py-3 font-medium text-sm tracking-wide uppercase transition-all duration-200 hover:shadow-lg hover:-translate-y-px group"
                    style={{ backgroundColor: '#6a6a6a' }}
                  >
                    <span>Get Quote</span>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="transition-transform duration-200 group-hover:translate-x-0.5"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </Link>
                )}
                {slide.showViewWork && (
                  <Link
                    href="/our-work"
                    className="inline-flex items-center gap-2 border border-white/40 text-white px-7 py-3 font-medium text-sm tracking-wide uppercase transition-all duration-200 hover:bg-white/10 hover:border-white/60 hover:-translate-y-px group"
                  >
                    <span>View Our Work</span>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="transition-transform duration-200 group-hover:translate-x-0.5"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {slides.length > 1 && (
        <div className="absolute right-4 sm:right-10 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-5">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`w-[3px] bg-white/30 border-none cursor-pointer transition-all duration-300 p-0 hover:bg-white/60 ${
                index === currentSlide ? 'bg-white h-14' : 'h-10'
              }`}
              onClick={() => handleSlideChange(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  )
}
