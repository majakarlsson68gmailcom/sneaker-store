import { NextResponse } from 'next/server'

import { getStripe } from '@/lib/stripe'
import { products, type Size } from '@/lib/products'

const SHIPPING_AMOUNT = 5900 // 59,00 kr i öre
const MAX_QTY_PER_LINE = 10

type IncomingItem = {
  productId: string
  storlek: number
  antal: number
}

export async function POST(request: Request) {
  const stripe = getStripe()
  if (!stripe) {
    return NextResponse.json(
      { error: 'Betalning är inte konfigurerad. STRIPE_SECRET_KEY saknas.' },
      { status: 500 },
    )
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Ogiltig begäran.' }, { status: 400 })
  }

  const incoming = (body as { items?: IncomingItem[] })?.items
  if (!Array.isArray(incoming) || incoming.length === 0) {
    return NextResponse.json({ error: 'Varukorgen är tom.' }, { status: 400 })
  }

  // Priser hämtas ALLTID från serverdatan (lib/products.ts). Klienten kan bara
  // ange vilken produkt, storlek och antal den vill köpa – aldrig priset.
  const lineItems: {
    price_data: {
      currency: string
      unit_amount: number
      product_data: { name: string; description: string }
    }
    quantity: number
  }[] = []

  for (const item of incoming) {
    const product = products.find((p) => p.id === item.productId)
    if (!product) {
      return NextResponse.json(
        { error: `Okänd produkt: ${item.productId}` },
        { status: 400 },
      )
    }

    const storlek = Number(item.storlek) as Size
    if (!product.storlekar.includes(storlek)) {
      return NextResponse.json(
        { error: `Ogiltig storlek för ${product.namn}.` },
        { status: 400 },
      )
    }

    const antal = Number(item.antal)
    if (!Number.isInteger(antal) || antal < 1 || antal > MAX_QTY_PER_LINE) {
      return NextResponse.json(
        { error: `Ogiltigt antal för ${product.namn}.` },
        { status: 400 },
      )
    }

    // Kontrollera lagersaldo mot serverdatan.
    if (product.lagersaldo[storlek] < antal) {
      return NextResponse.json(
        { error: `Otillräckligt lager för ${product.namn} (EU ${storlek}).` },
        { status: 400 },
      )
    }

    lineItems.push({
      price_data: {
        currency: 'sek',
        unit_amount: product.pris, // öre, från servern
        product_data: {
          name: `${product.namn} — EU ${storlek}`,
          description: product.farg,
        },
      },
      quantity: antal,
    })
  }

  const origin =
    request.headers.get('origin') ?? new URL(request.url).origin

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: lineItems,
      shipping_address_collection: {
        allowed_countries: ['SE', 'NO', 'DK', 'FI'],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            display_name: 'Standardfrakt',
            fixed_amount: { amount: SHIPPING_AMOUNT, currency: 'sek' },
          },
        },
      ],
      success_url: `${origin}/order/tack?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/varukorg`,
    })

    if (!session.url) {
      return NextResponse.json(
        { error: 'Kunde inte skapa betalningssession.' },
        { status: 500 },
      )
    }

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('[v0] Stripe checkout error:', error)
    return NextResponse.json(
      { error: 'Något gick fel vid skapandet av betalningen.' },
      { status: 500 },
    )
  }
}
