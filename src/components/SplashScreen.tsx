'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

interface SplashScreenProps {
  children: React.ReactNode
  logo?: {
    url: string
    alt?: string
    width?: number
    height?: number
  } | null
  splashLogoHeight?: number
  siteName?: string
  tagline?: string
}

export function SplashScreen({
  children,
  logo,
  splashLogoHeight = 120,
  siteName = 'North West Polishing',
  tagline = 'Your Complete Solution for Professional Metal Polishing & Finishing',
}: SplashScreenProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [isFading, setIsFading] = useState(false)

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setIsFading(true)
    }, 2500)

    const removeTimer = setTimeout(() => {
      setIsLoading(false)
      document.body.classList.add('splash-done')
    }, 3000)

    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(removeTimer)
    }
  }, [])

  return (
    <>
      {isLoading && (
        <div
          className={`fixed inset-0 z-[9999] bg-white/[0.98] flex items-center justify-center transition-opacity duration-500 ${
            isFading ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <div className="text-center animate-[splash-fade-in_0.6s_ease] px-4">
            <div className="flex items-center justify-center gap-4 sm:gap-6 mb-6 sm:mb-10">
              {logo?.url ? (
                <Image
                  src={logo.url}
                  alt={logo.alt || siteName}
                  width={logo.width || 400}
                  height={logo.height || splashLogoHeight}
                  style={{ height: splashLogoHeight, width: 'auto', objectFit: 'contain' }}
                  className="block max-w-[280px] sm:max-w-[400px]"
                  priority
                />
              ) : (
                <>
                  <span className="text-[2.5rem] sm:text-[3.5rem] font-bold text-text-primary tracking-tight font-barlow">
                    NW
                  </span>
                  <span className="w-px h-10 sm:h-12 bg-accent" />
                  <span className="flex flex-col items-start gap-0 text-base sm:text-lg font-semibold tracking-[0.2em] text-text-primary font-barlow leading-[1.3]">
                    <span>METAL</span>
                    <span className="text-accent text-xs sm:text-sm tracking-[0.15em]">POLISHING</span>
                  </span>
                </>
              )}
            </div>
            <div className="flex items-center justify-center gap-4 sm:gap-6">
              <span className="w-6 sm:w-10 h-px bg-border shrink-0" />
              <p className="text-sm sm:text-base font-medium text-text-secondary tracking-[0.08em] uppercase font-mono m-0 max-w-[500px]">
                {tagline}
              </p>
              <span className="w-6 sm:w-10 h-px bg-border shrink-0" />
            </div>
          </div>
        </div>
      )}
      <div
        className={`transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
      >
        {children}
      </div>
    </>
  )
}
