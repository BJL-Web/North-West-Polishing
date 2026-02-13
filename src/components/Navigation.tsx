'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import React, { useState, useEffect, useRef } from 'react'

interface ServiceLink {
  title: string
  slug: string
}

interface LogoData {
  url: string
  alt?: string
  width?: number
  height?: number
}

interface NavigationProps {
  logo?: LogoData | null
  heroLogo?: LogoData | null
  logoHeight?: number
  siteName?: string
  services?: ServiceLink[]
  phone?: string
  phoneLink?: string
  email?: string
}

export function Navigation({
  logo,
  heroLogo,
  logoHeight = 50,
  siteName = 'North West Polishing',
  services = [],
  phone,
  phoneLink,
  email,
}: NavigationProps) {
  const pathname = usePathname()
  const isHomePage = pathname === '/'
  const hasDarkHero = isHomePage || pathname === '/services' || pathname.startsWith('/services/') || pathname === '/our-work' || pathname === '/contact'
  const [isScrolled, setIsScrolled] = useState(!hasDarkHero)
  const [logoIntroDone, setLogoIntroDone] = useState(!isHomePage)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (!hasDarkHero) {
      setIsScrolled(true)
      setLogoIntroDone(true)
      return
    }

    const scrollThreshold = isHomePage
      ? window.innerHeight * 0.5 - 100
      : window.innerHeight * 0.4 - 60

    const handleScroll = () => {
      setIsScrolled(window.scrollY > scrollThreshold)
    }

    const handleLogoIntroDone = () => setLogoIntroDone(true)

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('heroLogoIntroDone', handleLogoIntroDone)
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('heroLogoIntroDone', handleLogoIntroDone)
    }
  }, [hasDarkHero, isHomePage])

  useEffect(() => {
    setMobileMenuOpen(false)
    setMobileServicesOpen(false)
  }, [pathname])

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setServicesOpen(true)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setServicesOpen(false)
    }, 150)
  }

  const navClassName = isScrolled
    ? 'bg-white/95 backdrop-blur-xl shadow-[0_2px_20px_rgba(0,0,0,0.1)]'
    : 'bg-gradient-to-b from-black/50 via-black/20 to-transparent'

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[1000] pt-2 pb-2 transition-all duration-300 ${navClassName}`}
      >
        <div className="w-full px-4 sm:px-8 py-2">
          <div className="flex items-center justify-between relative">
            <Link
              href="/"
              className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
                isScrolled || logoIntroDone
                  ? 'opacity-100 scale-100'
                  : 'opacity-0 scale-95 pointer-events-none'
              }`}
            >
              {(() => {
                const activeLogo = isScrolled ? logo : heroLogo || logo
                if (activeLogo?.url) {
                  return (
                    <Image
                      src={activeLogo.url}
                      alt={activeLogo.alt || siteName}
                      width={activeLogo.width || 200}
                      height={activeLogo.height || logoHeight}
                      style={{ height: logoHeight, width: 'auto', objectFit: 'contain' }}
                      className="block max-w-50"
                      priority
                    />
                  )
                }
                return (
                  <span className="flex flex-col font-bold text-[1.375rem] tracking-tight">
                    <span className="leading-tight font-bold text-text-primary">North West</span>
                    <span className="text-[0.6875rem] font-medium tracking-[0.15em] uppercase mt-0.5 text-accent">
                      Polishing
                    </span>
                  </span>
                )
              })()}
            </Link>

            <ul className="hidden lg:flex list-none gap-4 items-center text-[0.9375rem] font-medium relative z-10">
              <li>
                <Link
                  href="/"
                  className={`px-4 py-2 rounded-none transition-all duration-200 ${
                    isScrolled
                      ? 'text-text-secondary hover:text-text-primary hover:bg-bg-secondary'
                      : 'text-white/80 hover:text-white'
                  }`}
                >
                  Home
                </Link>
              </li>
              <li className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <Link
                  href="/services"
                  className={`px-4 py-2 rounded-none transition-all duration-200 inline-flex items-center gap-1.5 ${
                    isScrolled
                      ? 'text-text-secondary hover:text-text-primary hover:bg-bg-secondary'
                      : 'text-white/80 hover:text-white'
                  }`}
                >
                  Services
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    className={`transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`}
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </Link>

                <div
                  className={`absolute top-full left-0 mt-1 min-w-56 transition-all duration-300 ${
                    servicesOpen
                      ? 'opacity-100 translate-y-0 pointer-events-auto'
                      : 'opacity-0 -translate-y-1 pointer-events-none'
                  }`}
                >
                  <div className="py-1">
                    {services.map((service) => (
                      <Link
                        key={service.slug}
                        href={`/services/${service.slug}`}
                        className={`block px-4 py-2 text-sm transition-all duration-200 ${
                          isScrolled
                            ? 'text-text-muted hover:text-text-primary hover:pl-5'
                            : 'text-white/60 hover:text-white hover:pl-5'
                        }`}
                      >
                        {service.title}
                      </Link>
                    ))}
                    <Link
                      href="/services"
                      className={`block px-4 py-2 text-sm font-medium transition-all duration-200 mt-1 ${
                        isScrolled
                          ? 'text-text-secondary hover:text-text-primary hover:pl-5'
                          : 'text-white/80 hover:text-white hover:pl-5'
                      }`}
                    >
                      View All →
                    </Link>
                  </div>
                </div>
              </li>
              <li>
                <Link
                  href="/our-work"
                  className={`px-4 py-2 rounded-none transition-all duration-200 ${
                    isScrolled
                      ? 'text-text-secondary hover:text-text-primary hover:bg-bg-secondary'
                      : 'text-white/80 hover:text-white'
                  }`}
                >
                  Our Work
                </Link>
              </li>
            </ul>

            <div className="hidden lg:flex ml-auto items-center gap-5 relative z-10">
              {phone && (
                <a
                  href={`tel:${phoneLink || phone}`}
                  className={`inline-flex items-center gap-2 text-sm transition-colors duration-200 ${
                    isScrolled
                      ? 'text-text-muted hover:text-text-primary'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <span>{phone}</span>
                </a>
              )}
              {email && (
                <a
                  href={`mailto:${email}`}
                  className={`inline-flex items-center gap-2 text-sm transition-colors duration-200 ${
                    isScrolled
                      ? 'text-text-muted hover:text-text-primary'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  <span>{email}</span>
                </a>
              )}
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-white px-6 py-2.5 font-medium text-[0.875rem] tracking-wide uppercase transition-all duration-200 hover:shadow-lg hover:-translate-y-px group"
                style={{ backgroundColor: '#1a1a1a' }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#333')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#1a1a1a')}
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
            </div>

            <div className="flex lg:hidden items-center gap-3 ml-auto">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`inline-flex items-center justify-center w-11 h-11 transition-colors duration-200 border-0 bg-transparent cursor-pointer ${
                isScrolled
                  ? 'text-text-primary'
                  : 'text-white'
              }`}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 12h18M3 6h18M3 18h18" />
                </svg>
              )}
            </button>
          </div>
          </div>

        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[999] lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileMenuOpen(false)} />
          <div className="absolute top-0 right-0 w-[280px] max-w-[85vw] h-full bg-white shadow-lg overflow-y-auto pt-20 pb-8 px-6">
            <nav className="flex flex-col gap-1">
              <Link
                href="/"
                className="block py-3 px-4 text-text-primary font-medium text-base hover:bg-bg-secondary transition-colors"
              >
                Home
              </Link>

              <div>
                <button
                  onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                  className="flex items-center justify-between w-full py-3 px-4 text-text-primary font-medium text-base hover:bg-bg-secondary transition-colors bg-transparent border-0 cursor-pointer text-left"
                >
                  <span>Services</span>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className={`transition-transform duration-200 ${mobileServicesOpen ? 'rotate-180' : ''}`}
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>
                {mobileServicesOpen && (
                  <div className="pl-4 pb-2">
                    {services.map((service) => (
                      <Link
                        key={service.slug}
                        href={`/services/${service.slug}`}
                        className="block py-2.5 px-4 text-text-muted text-sm hover:text-text-primary transition-colors"
                      >
                        {service.title}
                      </Link>
                    ))}
                    <Link
                      href="/services"
                      className="block py-2.5 px-4 text-text-secondary text-sm font-medium hover:text-text-primary transition-colors"
                    >
                      View All Services
                    </Link>
                  </div>
                )}
              </div>

              <Link
                href="/our-work"
                className="block py-3 px-4 text-text-primary font-medium text-base hover:bg-bg-secondary transition-colors"
              >
                Our Work
              </Link>

              <Link
                href="/contact"
                className="block py-3 px-4 text-text-primary font-medium text-base hover:bg-bg-secondary transition-colors"
              >
                Contact
              </Link>

              <div className="mt-6 pt-6 border-t border-border">
                <Link
                  href="/contact"
                  className="flex items-center justify-center gap-2 w-full bg-accent text-white py-3 px-6 font-medium text-sm tracking-wide uppercase transition-colors hover:bg-accent-hover"
                >
                  <span>Get Quote</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>

              {(phone || email) && (
                <div className="mt-6 pt-6 border-t border-border space-y-4">
                  {phone && (
                    <a
                      href={`tel:${phoneLink || phone}`}
                      className="flex items-center gap-3 text-text-muted text-sm hover:text-text-primary transition-colors px-4"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                      <span>{phone}</span>
                    </a>
                  )}
                  {email && (
                    <a
                      href={`mailto:${email}`}
                      className="flex items-center gap-3 text-text-muted text-sm hover:text-text-primary transition-colors px-4 min-w-0"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <polyline points="22,6 12,13 2,6" />
                      </svg>
                      <span className="truncate">{email}</span>
                    </a>
                  )}
                </div>
              )}
            </nav>
          </div>
        </div>
      )}
    </>
  )
}
