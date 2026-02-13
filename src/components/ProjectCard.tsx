import Image from 'next/image'
import React from 'react'
import type { Project } from '@/payload-types'

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  const firstImage =
    project.images && project.images.length > 0 && typeof project.images[0].image === 'object'
      ? project.images[0].image
      : null

  if (!firstImage?.url) return null

  return (
    <div className="relative aspect-4/3 bg-bg-secondary overflow-hidden group">
      <Image
        src={firstImage.url}
        alt={firstImage.alt || project.title || ''}
        fill
        className="transition-transform duration-500 group-hover:scale-105"
        style={{ objectFit: 'cover' }}
      />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
    </div>
  )
}
