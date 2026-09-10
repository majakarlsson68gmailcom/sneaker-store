import type { Metadata } from 'next'

import { CheckoutSummary } from '@/components/checkout-summary'
import { Footer } from '@/components/footer'
import { Header } from '@/components/header'

export const metadata: Metadata = {
  title: 'Kassa — Stride',
}

export default function CheckoutPage() {
  return (
    <>
      <Header />
      <main>
        <div className="mx-auto max-w-5xl px-6 py-16 sm:py-24">
          <h1 className="mb-12 text-sm font-medium tracking-[0.15em] text-muted-foreground uppercase">
            Kassa
          </h1>
          <CheckoutSummary />
        </div>
      </main>
      <Footer />
    </>
  )
}
