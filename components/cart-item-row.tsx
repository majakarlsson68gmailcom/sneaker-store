'use client'

import { Minus, Plus, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { type CartItem, useCart } from '@/lib/cart-context'
import { formatPrice } from '@/lib/format'

export function CartItemRow({ item }: { item: CartItem }) {
  const { updateQuantity, removeItem } = useCart()

  return (
    <li className="flex gap-4 py-6 sm:gap-6">
      <Link
        href={`/produkter/${item.slug}`}
        className="relative aspect-square w-24 shrink-0 overflow-hidden bg-secondary sm:w-32"
      >
        <Image
          src={item.bild || '/placeholder.svg'}
          alt={item.namn}
          fill
          sizes="128px"
          className="object-cover"
        />
      </Link>

      <div className="flex flex-1 flex-col justify-between">
        <div className="flex items-start justify-between gap-4">
          <div>
            <Link
              href={`/produkter/${item.slug}`}
              className="text-sm font-medium hover:underline"
            >
              {item.namn}
            </Link>
            <p className="mt-1 text-sm text-muted-foreground">{item.farg}</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Storlek {item.storlek}
            </p>
          </div>

          <button
            type="button"
            onClick={() => removeItem(item.productId, item.storlek)}
            aria-label={`Ta bort ${item.namn}, storlek ${item.storlek}`}
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            <X size={18} strokeWidth={1.5} aria-hidden="true" />
          </button>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center border border-border">
            <button
              type="button"
              onClick={() => updateQuantity(item.productId, item.storlek, item.antal - 1)}
              aria-label="Minska antal"
              className="flex size-8 items-center justify-center text-foreground transition-colors hover:bg-muted"
            >
              <Minus size={14} strokeWidth={1.5} aria-hidden="true" />
            </button>
            <span className="w-8 text-center text-sm" aria-live="polite">
              {item.antal}
            </span>
            <button
              type="button"
              onClick={() => updateQuantity(item.productId, item.storlek, item.antal + 1)}
              aria-label="Öka antal"
              className="flex size-8 items-center justify-center text-foreground transition-colors hover:bg-muted"
            >
              <Plus size={14} strokeWidth={1.5} aria-hidden="true" />
            </button>
          </div>

          <p className="text-sm font-medium">{formatPrice(item.pris * item.antal)}</p>
        </div>
      </div>
    </li>
  )
}
