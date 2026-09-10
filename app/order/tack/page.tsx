import type { Metadata } from 'next'

import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { OrderConfirmation } from '@/components/order-confirmation'

export const metadata: Metadata = {
  title: 'Tack för din order — Stride',
}

export default function ThankYouPage() {
  return (
    <>
      <Header />
      <main>
        <div className="mx-auto max-w-2xl px-6 py-24 sm:py-32">
          <OrderConfirmation />
        </div>
      </main>
      <Footer />
    </>
  )
}
