import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { ProductGallery } from '@/components/product-gallery'
import { ProductPurchase } from '@/components/product-purchase'
import { formatPrice } from '@/lib/format'
import { getProductBySlug, products } from '@/lib/products'

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const product = getProductBySlug(slug)

  if (!product) {
    return {}
  }

  return {
    title: `${product.namn} — Stride`,
    description: product.kortBeskrivning,
  }
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const product = getProductBySlug(slug)

  if (!product) {
    notFound()
  }

  return (
    <>
      <Header />
      <main>
        <div className="mx-auto max-w-6xl px-6 py-12 sm:py-16">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
            <ProductGallery
              images={product.bilder}
              alt={`${product.namn}, ${product.farg}`}
            />

            <div className="lg:pt-4">
              <h1 className="text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
                {product.namn}
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">{product.farg}</p>
              <p className="mt-4 text-xl font-medium">{formatPrice(product.pris)}</p>
              <p className="mt-6 text-sm leading-relaxed text-pretty text-muted-foreground">
                {product.kortBeskrivning}
              </p>

              <ProductPurchase product={product} />

              <div className="mt-12 border-t border-border pt-8">
                <h2 className="text-sm font-medium tracking-[0.15em] text-muted-foreground uppercase">
                  Om skon
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-pretty text-muted-foreground">
                  {product.langBeskrivning}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
