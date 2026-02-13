'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export function HomePageWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  useEffect(() => {
    if (pathname === '/') {
      document.documentElement.classList.add('home-page-wrapper')
      document.body.classList.add('home-page-wrapper')
    } else {
      document.documentElement.classList.remove('home-page-wrapper')
      document.body.classList.remove('home-page-wrapper')
    }

    return () => {
      document.documentElement.classList.remove('home-page-wrapper')
      document.body.classList.remove('home-page-wrapper')
    }
  }, [pathname])

  return <>{children}</>
}

