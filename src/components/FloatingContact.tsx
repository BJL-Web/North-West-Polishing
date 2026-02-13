'use client'

import { useState, useEffect } from 'react'

interface FloatingContactProps {
  phone: string
  phoneLink: string
  email: string
}

export function FloatingContact({ phone, phoneLink, email }: FloatingContactProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset
      const viewportHeight = window.innerHeight
      setIsVisible(scrollY > viewportHeight * 0.5)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [])

  return (
    <div
      className={`fixed bottom-8 right-8 flex flex-col gap-2 z-[999] transition-all duration-300 md:bottom-4 md:right-4 ${
        isVisible ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-5 pointer-events-none'
      }`}
    >
      <a
        href={`tel:${phoneLink}`}
        className="flex items-center gap-3 py-3 px-4 bg-white/95 backdrop-blur-lg border border-border text-black no-underline text-[0.8125rem] font-medium transition-all duration-200 hover:bg-bg-primary hover:border-text-muted group"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="shrink-0 text-black transition-colors duration-200 group-hover:text-accent"
        >
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
        <span className="inline">Call Us</span>
      </a>
      <a
        href={`mailto:${email}`}
        className="flex items-center gap-3 py-3 px-4 bg-white/95 backdrop-blur-lg border border-border text-black no-underline text-[0.8125rem] font-medium transition-all duration-200 hover:bg-bg-primary hover:border-text-muted group"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="shrink-0 text-black transition-colors duration-200 group-hover:text-accent"
        >
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
        <span className="inline">Email</span>
      </a>
      <a
        href="/contact"
        className="flex items-center justify-center py-3.5 px-6 bg-accent text-white no-underline text-sm font-semibold transition-all duration-200 hover:bg-accent-hover"
      >
        Get Quote
      </a>
    </div>
  )
}
