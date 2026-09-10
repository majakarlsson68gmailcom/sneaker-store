'use client'

import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { useCart } from '@/lib/cart-context'
import type { Product, Size } from '@/lib/products'
import { cn } from '@/lib/utils'

export function ProductPurchase({ product }: { product: Product }) {
  const { addItem } = useCart()
  const [selectedSize, setSelectedSize] = useState<Size | null>(null)
  const [justAdded, setJustAdded] = useState(false)

  useEffect(() => {
    if (!justAdded) return
    const timeout = window.setTimeout(() => setJustAdded(false), 2000)
    return () => window.clearTimeout(timeout)
  }, [justAdded])

  function handleAddToCart() {
    if (selectedSize === null) return
    addItem(product, selectedSize)
    setJustAdded(true)
  }

  const selectedStock = selectedSize !== null ? product.lagersaldo[selectedSize] : null

  return (
    <div className="mt-8">
      <div className="flex items-baseline justify-between">
        <span className="text-sm font-medium">Storlek</span>
        <span className="text-xs text-muted-foreground">EU-storlek</span>
      </div>

      <div
        role="group"
        aria-label="Välj storlek"
        className="mt-3 grid grid-cols-5 gap-2 sm:grid-cols-6"
      >
        {product.storlekar.map((size) => {
          const outOfStock = product.lagersaldo[size] === 0
          const isSelected = selectedSize === size

          return (
            <button
              key={size}
              type="button"
              disabled={outOfStock}
              aria-pressed={isSelected}
              aria-label={outOfStock ? `Storlek ${size}, slutsåld` : `Storlek ${size}`}
              onClick={() => setSelectedSize(size)}
              className={cn(
                'h-11 border text-sm transition-colors',
                outOfStock
                  ? 'cursor-not-allowed border-border text-muted-foreground/40 line-through'
                  : isSelected
                    ? 'border-foreground bg-foreground text-background'
                    : 'border-border hover:border-foreground',
              )}
            >
              {size}
            </button>
          )
        })}
      </div>

      {selectedStock !== null && selectedStock > 0 && selectedStock <= 3 && (
        <p className="mt-3 text-xs text-muted-foreground">
          Endast {selectedStock} kvar i lager
        </p>
      )}

      <Button
        type="button"
        size="lg"
        disabled={selectedSize === null}
        onClick={handleAddToCart}
        className="mt-6 h-12 w-full text-sm"
      >
        {justAdded ? 'Tillagd i varukorgen' : 'Lägg i varukorg'}
      </Button>
    </div>
  )
}
