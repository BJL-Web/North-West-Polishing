'use client'

import Image from 'next/image'
import React, { useState, useRef, useEffect } from 'react'

interface GalleryImage {
  url: string
  alt: string
}

interface OurWorkGalleryProps {
  images: GalleryImage[]
  initialCount?: number
  loadMoreCount?: number
}

export function OurWorkGallery({
  images,
  initialCount = 12,
  loadMoreCount = 6,
}: OurWorkGalleryProps) {
  const [visibleCount, setVisibleCount] = useState(initialCount)
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)
  const loaderRef = useRef<HTMLDivElement>(null)

  const visibleImages = images.slice(0, visibleCount)
  const hasMore = visibleCount < images.length

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setVisibleCount((prev) => Math.min(prev + loadMoreCount, images.length))
        }
      },
      { threshold: 0.1 }
    )

    if (loaderRef.current) {
      observer.observe(loaderRef.current)
    }

    return () => observer.disconnect()
  }, [hasMore, loadMoreCount, images.length])

  if (images.length === 0) {
    return (
      <p className="text-text-muted text-center py-20">No images available yet.</p>
    )
  }

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
        {visibleImages.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(image)}
            className="group relative aspect-3/4 overflow-hidden bg-bg-primary cursor-pointer border-0 p-0"
          >
            {image.url && (
              <Image
                src={image.url}
                alt={image.alt || `Gallery image ${index + 1}`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            )}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
            <div className="absolute top-3 right-3 w-8 h-8 bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
              </svg>
            </div>
          </button>
        ))}
      </div>

      {hasMore && (
        <div ref={loaderRef} className="h-20 flex items-center justify-center">
          <div className="flex items-center gap-2 text-text-muted text-sm">
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span>Loading more...</span>
          </div>
        </div>
      )}

      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 w-12 h-12 bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors border-0 cursor-pointer"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          <div
            className="relative max-w-5xl max-h-[85vh] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-video">
              <Image
                src={selectedImage.url}
                alt={selectedImage.alt || ''}
                fill
                className="object-contain"
                sizes="(max-width: 1280px) 100vw, 1280px"
              />
            </div>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation()
              const currentIndex = images.findIndex((img) => img.url === selectedImage.url)
              const prevIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1
              setSelectedImage(images[prevIndex])
            }}
            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-12 sm:h-12 bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors border-0 cursor-pointer"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation()
              const currentIndex = images.findIndex((img) => img.url === selectedImage.url)
              const nextIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1
              setSelectedImage(images[nextIndex])
            }}
            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-12 sm:h-12 bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors border-0 cursor-pointer"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 text-sm">
            {images.findIndex((img) => img.url === selectedImage.url) + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  )
}
