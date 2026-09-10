import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { Hero } from '@/components/hero'
import { ProductGrid } from '@/components/product-grid'
import { products } from '@/lib/products'

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <section className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
          <h2 className="mb-10 text-sm font-medium tracking-[0.15em] text-muted-foreground uppercase">
            Alla modeller
          </h2>
          <ProductGrid products={products} />
        </section>
      </main>
      <Footer />
    </>
  )
}
