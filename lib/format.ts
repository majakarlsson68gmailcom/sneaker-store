/**
 * Formaterar ett pris angivet i öre till en svensk prissträng, t.ex. "1 299 kr".
 */
export function formatPrice(ore: number): string {
  const kronor = Math.round(ore / 100)
  const formatted = kronor.toLocaleString('sv-SE')
  return `${formatted} kr`
}
