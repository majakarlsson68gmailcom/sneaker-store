'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { useCart } from '@/lib/cart-context'
import { formatPrice } from '@/lib/format'

const SHIPPING = 5900 // 59,00 kr i öre

export function CheckoutSummary() {
  const { items, totalPrice } = useCart()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleCheckout() {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map((item) => ({
            productId: item.productId,
            storlek: item.storlek,
            antal: item.antal,
          })),
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error ?? 'Kunde inte starta betalningen.')
      }

      // Vidarebefordra till Stripe Checkout.
      window.location.href = data.url
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ett fel uppstod.')
      setLoading(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-start gap-6">
        <p className="text-sm text-muted-foreground">
          Din varukorg är tom. Lägg till en produkt innan du går till kassan.
        </p>
        <Button
          size="lg"
          className="h-11 px-6 text-sm"
          render={<Link href="/produkter" />}
          nativeButton={false}
        >
          Se produkter
        </Button>
      </div>
    )
  }

  return (
    <div className="grid gap-12 lg:grid-cols-[1fr_20rem]">
      <ul className="flex flex-col divide-y divide-border">
        {items.map((item) => (
          <li
            key={`${item.productId}-${item.storlek}`}
            className="flex items-center gap-4 py-4"
          >
            <div className="relative size-16 shrink-0 overflow-hidden bg-secondary">
              <Image
                src={item.bild || '/placeholder.svg'}
                alt={item.namn}
                fill
                sizes="64px"
                className="object-cover"
              />
            </div>
            <div className="flex flex-1 flex-col gap-0.5">
              <span className="text-sm font-medium">{item.namn}</span>
              <span className="text-xs text-muted-foreground">
                EU {item.storlek} · Antal {item.antal}
              </span>
            </div>
            <span className="text-sm tabular-nums">
              {formatPrice(item.pris * item.antal)}
            </span>
          </li>
        ))}
      </ul>

      <div className="flex h-fit flex-col gap-4 border border-border p-6">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Delsumma</span>
          <span className="tabular-nums">{formatPrice(totalPrice)}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Frakt</span>
          <span className="tabular-nums">{formatPrice(SHIPPING)}</span>
        </div>
        <div className="flex items-center justify-between border-t border-border pt-4 text-sm font-medium">
          <span>Totalt</span>
          <span className="tabular-nums">{formatPrice(totalPrice + SHIPPING)}</span>
        </div>

        {error ? (
          <p role="alert" className="text-sm text-destructive">
            {error}
          </p>
        ) : null}

        <Button
          size="lg"
          className="mt-2 h-12 w-full text-sm"
          onClick={handleCheckout}
          disabled={loading}
        >
          {loading ? 'Öppnar Stripe…' : 'Betala med Stripe'}
        </Button>
        <p className="text-center text-xs text-muted-foreground">
          Leveransadress samlas in i kassan.
        </p>
      </div>
    </div>
  )
}
