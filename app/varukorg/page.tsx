'use client'

import Link from 'next/link'

import { CartItemRow } from '@/components/cart-item-row'
import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { Button } from '@/components/ui/button'
import { useCart } from '@/lib/cart-context'
import { formatPrice } from '@/lib/format'

export default function CartPage() {
  const { items, totalPrice } = useCart()

  return (
    <>
      <Header />
      <main>
        <div className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
          <h1 className="text-sm font-medium tracking-[0.15em] text-muted-foreground uppercase">
            Varukorg
          </h1>

          {items.length === 0 ? (
            <div className="mt-12 flex flex-col items-start gap-4">
              <p className="text-sm text-muted-foreground">
                Din varukorg är tom.
              </p>
              <Button
                size="lg"
                className="h-11 px-6 text-sm"
                render={<Link href="/produkter" />}
                nativeButton={false}
              >
                Fortsätt handla
              </Button>
            </div>
          ) : (
            <>
              <ul className="mt-8 divide-y divide-border">
                {items.map((item) => (
                  <CartItemRow key={`${item.productId}-${item.storlek}`} item={item} />
                ))}
              </ul>

              <div className="mt-8 flex items-center justify-between border-t border-border pt-6">
                <span className="text-sm font-medium">Totalt</span>
                <span className="text-lg font-semibold">{formatPrice(totalPrice)}</span>
              </div>

              <Button
                size="lg"
                className="mt-8 h-12 w-full text-sm"
                render={<Link href="/kassa" />}
                nativeButton={false}
              >
                Till kassan
              </Button>
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
