import Image from 'next/image'
import Link from 'next/link'

import { formatPrice } from '@/lib/format'
import type { Product } from '@/lib/products'

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/produkter/${product.slug}`} className="group block">
      <article>
        <div className="relative aspect-square overflow-hidden bg-secondary">
          <Image
            src={product.bilder[0] || '/placeholder.svg'}
            alt={`${product.namn}, ${product.farg}`}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="mt-4 flex items-baseline justify-between gap-4">
          <h3 className="text-sm font-medium">{product.namn}</h3>
          <p className="text-sm text-muted-foreground">
            {formatPrice(product.pris)}
          </p>
        </div>
      </article>
    </Link>
  )
}
