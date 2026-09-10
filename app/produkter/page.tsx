import type { Metadata } from 'next'

import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { ProductGrid } from '@/components/product-grid'
import { products } from '@/lib/products'

export const metadata: Metadata = {
  title: 'Produkter — Stride',
  description: 'Utforska alla sneakers hos Stride.',
}

export default function ProdukterPage() {
  return (
    <>
      <Header />
      <main>
        <section className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
          <h1 className="mb-10 text-sm font-medium tracking-[0.15em] text-muted-foreground uppercase">
            Alla produkter
          </h1>
          <ProductGrid products={products} />
        </section>
      </main>
      <Footer />
    </>
  )
}
