'use client'

import Link from 'next/link'
import { useEffect } from 'react'

import { Button } from '@/components/ui/button'
import { useCart } from '@/lib/cart-context'

export function OrderConfirmation() {
  const { clearCart } = useCart()

  // Töm varukorgen när bekräftelsesidan visas efter ett lyckat köp.
  useEffect(() => {
    clearCart()
  }, [clearCart])

  return (
    <div className="flex flex-col items-start gap-6">
      <p className="text-sm font-medium tracking-[0.15em] text-muted-foreground uppercase">
        Orderbekräftelse
      </p>
      <h1 className="text-3xl font-medium text-balance sm:text-4xl">
        Tack för din order!
      </h1>
      <p className="text-pretty leading-relaxed text-muted-foreground">
        Din betalning har genomförts och din order är på väg att behandlas. Du
        får snart en bekräftelse via e-post med detaljer om din leverans. Din
        varukorg har tömts.
      </p>
      <Button
        size="lg"
        className="mt-2 h-11 px-6 text-sm"
        render={<Link href="/produkter" />}
        nativeButton={false}
      >
        Fortsätt handla
      </Button>
    </div>
  )
}
