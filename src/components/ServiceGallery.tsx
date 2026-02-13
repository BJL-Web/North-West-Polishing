'use client'

import Image from 'next/image'
import React, { useState, useRef, useEffect } from 'react'

interface GalleryImage {
  url: string
  alt: string
  caption: string
}

interface ServiceGalleryProps {
  images: GalleryImage[]
  initialCount?: number
}

export function ServiceGallery({ images }: ServiceGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)
  const [isExpanded, setIsExpanded] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isExpanded || isPaused) return

    const scrollContainer = scrollRef.current
    if (!scrollContainer) return

    let animationId: number
    let scrollPosition = 0
    const scrollSpeed = 0.5

    const scroll = () => {
      scrollPosition += scrollSpeed
      if (scrollPosition >= scrollContainer.scrollWidth / 2) {
        scrollPosition = 0
      }
      scrollContainer.scrollLeft = scrollPosition
      animationId = requestAnimationFrame(scroll)
    }

    animationId = requestAnimationFrame(scroll)

    return () => cancelAnimationFrame(animationId)
  }, [isExpanded, isPaused])

  if (images.length === 0) return null

  const scrollImages = [...images, ...images]

  return (
    <>
      <div className="relative">
        {!isExpanded && (
          <div
            ref={scrollRef}
            className="flex overflow-hidden"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {scrollImages.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(image)}
                className="group relative shrink-0 w-64 h-64 md:w-80 md:h-80 overflow-hidden bg-bg-primary cursor-pointer border-0 p-0"
              >
                {image.url && (
                  <Image
                    src={image.url}
                    alt={
                      image.alt || image.caption || `Gallery image ${(index % images.length) + 1}`
                    }
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300" />

                {image.caption && (
                  <div className="absolute inset-x-0 bottom-0 p-4 bg-linear-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-white text-sm line-clamp-2">{image.caption}</p>
                  </div>
                )}

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
        )}

        {isExpanded && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(image)}
                className="group relative aspect-square overflow-hidden bg-bg-primary cursor-pointer border-0 p-0"
              >
                {image.url && (
                  <Image
                    src={image.url}
                    alt={image.alt || image.caption || `Gallery image ${index + 1}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300" />

                {image.caption && (
                  <div className="absolute inset-x-0 bottom-0 p-4 bg-linear-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-white text-sm line-clamp-2">{image.caption}</p>
                  </div>
                )}

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
        )}

        {!isExpanded && (
          <div className="absolute bottom-0 left-0 right-0 flex justify-center items-end pb-6 pt-20 bg-linear-to-t from-black/70 via-black/40 to-transparent">
            <button
              onClick={() => setIsExpanded(true)}
              className="group flex items-center gap-3 bg-white/95 backdrop-blur-sm px-8 py-3 font-medium text-sm text-text-primary hover:bg-white transition-colors cursor-pointer border-0"
            >
              <span>View Our Work</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="transition-transform group-hover:translate-y-0.5"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
          </div>
        )}

        {isExpanded && (
          <div className="absolute bottom-0 left-0 right-0 flex justify-center items-end pb-6 pt-20 bg-linear-to-t from-black/70 via-black/40 to-transparent">
            <button
              onClick={() => setIsExpanded(false)}
              className="group flex items-center gap-3 bg-white/95 backdrop-blur-sm px-8 py-3 font-medium text-sm text-text-primary hover:bg-white transition-colors cursor-pointer border-0"
            >
              <span>Show Less</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="transition-transform group-hover:-translate-y-0.5"
              >
                <path d="M18 15l-6-6-6 6" />
              </svg>
            </button>
          </div>
        )}
      </div>

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
                alt={selectedImage.alt || selectedImage.caption || ''}
                fill
                className="object-contain"
                sizes="(max-width: 1280px) 100vw, 1280px"
              />
            </div>

            {selectedImage.caption && (
              <div className="mt-4 text-center">
                <p className="text-white/90 text-lg">{selectedImage.caption}</p>
              </div>
            )}
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation()
              const currentIndex = images.findIndex((img) => img.url === selectedImage.url)
              const prevIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1
              setSelectedImage(images[prevIndex])
            }}
            className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors border-0 cursor-pointer"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
            >
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
            className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors border-0 cursor-pointer"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
            >
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
