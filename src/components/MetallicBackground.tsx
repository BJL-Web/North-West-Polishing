'use client'

import React, { useState, useEffect } from 'react'

interface MetallicBackgroundProps {
  children: React.ReactNode
  className?: string
  intensity?: 'subtle' | 'medium' | 'full'
  interactive?: boolean
}

export function MetallicBackground({
  children,
  className = '',
  intensity = 'medium',
  interactive = true,
}: MetallicBackgroundProps) {
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 })

  useEffect(() => {
    if (!interactive) return

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100
      const y = (e.clientY / window.innerHeight) * 100
      setMousePosition({ x, y })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [interactive])

  const opacityMap = {
    subtle: { grain: 0.08, shine: 0.08 },
    medium: { grain: 0.12, shine: 0.12 },
    full: { grain: 0.15, shine: 0.18 },
  }

  const opacity = opacityMap[intensity]

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div
        className="absolute inset-0 pointer-events-none"
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
        className="absolute inset-0 opacity-40 pointer-events-none"
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
        className="absolute inset-0 pointer-events-none mix-blend-overlay"
        style={{
          opacity: opacity.grain,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {interactive && (
        <div
          className="absolute inset-0 transition-all duration-500 ease-out pointer-events-none"
          style={{
            background: `
              radial-gradient(
                ellipse 100% 80% at ${mousePosition.x}% ${mousePosition.y}%,
                rgba(255,255,255,${opacity.shine}) 0%,
                rgba(255,255,255,${opacity.shine * 0.4}) 20%,
                transparent 50%
              )
            `,
          }}
        />
      )}

      <div className="relative z-10">{children}</div>
    </div>
  )
}
