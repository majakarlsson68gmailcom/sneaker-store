import 'server-only'

import Stripe from 'stripe'

let client: Stripe | null = null

/**
 * Hämtar en Stripe-klient. Instansieras lat så att modulen kan importeras
 * även när STRIPE_SECRET_KEY saknas – konstruktorn kastar annars direkt vid
 * import och API-routen hinner aldrig returnera ett vettigt felmeddelande.
 * Returnerar null om nyckeln saknas.
 */
export function getStripe(): Stripe | null {
  if (!process.env.STRIPE_SECRET_KEY) {
    return null
  }
  if (!client) {
    client = new Stripe(process.env.STRIPE_SECRET_KEY)
  }
  return client
}
