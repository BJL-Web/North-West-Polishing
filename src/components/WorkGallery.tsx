'use client'

import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

interface GalleryImage {
  url: string
  alt: string
}

interface WorkGalleryProps {
  images: GalleryImage[]
}

export function WorkGallery({ images }: WorkGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [isPaused, setIsPaused] = useState(false)

  if (images.length === 0) return null

  const duplicatedImages = [...images, ...images]

  return (
    <>
      <section
        className="pt-32 pb-20 overflow-hidden"
        style={{
          background: 'linear-gradient(to right, #dcdcdc 0%, #ececec 12%, #f8f8f8 30%, #ffffff 45%, #ffffff 55%, #f8f8f8 70%, #ececec 88%, #dcdcdc 100%)',
        }}
      >
        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div
            className="flex gap-4 pb-4"
            style={{
              animation: `marquee ${images.length * 5}s linear infinite`,
              animationPlayState: isPaused ? 'paused' : 'running',
            }}
          >
            {duplicatedImages.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index % images.length)}
                className="shrink-0 relative h-56 w-72 bg-bg-secondary overflow-hidden group cursor-pointer border-0 p-0"
              >
                <Image
                  src={image.url}
                  alt={image.alt}
                  fill
                  className="transition-transform duration-500 group-hover:scale-105"
                  style={{ objectFit: 'cover' }}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg
                      width="40"
                      height="40"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth="1.5"
                    >
                      <circle cx="11" cy="11" r="8" />
                      <path d="M21 21l-4.35-4.35M11 8v6M8 11h6" />
                    </svg>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="container-main mt-8">
          <Link
            href="/our-work"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium bg-accent text-white hover:bg-accent-hover transition-colors"
          >
            View All
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>

      {selectedImage !== null && (
        <div
          className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors"
            aria-label="Close"
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation()
              setSelectedImage(selectedImage === 0 ? images.length - 1 : selectedImage - 1)
            }}
            className="absolute left-6 text-white/70 hover:text-white transition-colors"
            aria-label="Previous image"
          >
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>

          <div
            className="relative max-w-5xl max-h-[80vh] w-full h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[selectedImage].url}
              alt={images[selectedImage].alt}
              fill
              className="object-contain"
            />
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation()
              setSelectedImage(selectedImage === images.length - 1 ? 0 : selectedImage + 1)
            }}
            className="absolute right-6 text-white/70 hover:text-white transition-colors"
            aria-label="Next image"
          >
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 font-mono text-sm">
            {selectedImage + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  )
}
