'use client'

import Image from 'next/image'
import { useState } from 'react'

import { cn } from '@/lib/utils'

export function ProductGallery({
  images,
  alt,
}: {
  images: string[]
  alt: string
}) {
  const [active, setActive] = useState(0)

  return (
    <div>
      <div className="relative aspect-square overflow-hidden bg-secondary">
        <Image
          src={images[active] || '/placeholder.svg'}
          alt={alt}
          fill
          priority
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
        />
      </div>

      <div className="mt-4 grid grid-cols-3 gap-4">
        {images.map((image, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setActive(index)}
            aria-label={`Visa bild ${index + 1} av ${images.length}`}
            aria-current={active === index}
            className={cn(
              'relative aspect-square overflow-hidden bg-secondary ring-1 ring-transparent transition-all',
              active === index ? 'ring-foreground' : 'hover:ring-border',
            )}
          >
            <Image
              src={image || '/placeholder.svg'}
              alt=""
              fill
              sizes="150px"
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  )
}
