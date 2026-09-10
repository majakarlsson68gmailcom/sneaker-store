'use client'

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

import type { Product, Size } from '@/lib/products'

const STORAGE_KEY = 'stride-cart'

export type CartItem = {
  productId: string
  slug: string
  namn: string
  pris: number
  bild: string
  farg: string
  storlek: Size
  antal: number
}

type CartContextValue = {
  items: CartItem[]
  itemCount: number
  totalPrice: number
  addItem: (product: Product, storlek: Size, antal?: number) => void
  updateQuantity: (productId: string, storlek: Size, antal: number) => void
  removeItem: (productId: string, storlek: Size) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  // Styr när det är säkert att skriva till localStorage. Måste vara React
  // state (inte en ref) så att skriv-effekten nedan alltid ser samma
  // render-pass som den inlästa varukorgen – annars hinner den skriva en
  // tom varukorg till localStorage innan den inlästa datan har hunnit
  // committas, och skriver över det som just lästes in.
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY)
      if (stored) {
        setItems(JSON.parse(stored))
      }
    } catch {
      // Skadad data i localStorage ignoreras och varukorgen startar tom.
    } finally {
      setIsHydrated(true)
    }
  }, [])

  useEffect(() => {
    if (!isHydrated) return
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items, isHydrated])

  function addItem(product: Product, storlek: Size, antal = 1) {
    setItems((current) => {
      const existing = current.find(
        (item) => item.productId === product.id && item.storlek === storlek,
      )

      if (existing) {
        return current.map((item) =>
          item.productId === product.id && item.storlek === storlek
            ? { ...item, antal: item.antal + antal }
            : item,
        )
      }

      return [
        ...current,
        {
          productId: product.id,
          slug: product.slug,
          namn: product.namn,
          pris: product.pris,
          bild: product.bilder[0],
          farg: product.farg,
          storlek,
          antal,
        },
      ]
    })
  }

  function updateQuantity(productId: string, storlek: Size, antal: number) {
    setItems((current) => {
      if (antal <= 0) {
        return current.filter(
          (item) => !(item.productId === productId && item.storlek === storlek),
        )
      }
      return current.map((item) =>
        item.productId === productId && item.storlek === storlek
          ? { ...item, antal }
          : item,
      )
    })
  }

  function removeItem(productId: string, storlek: Size) {
    setItems((current) =>
      current.filter((item) => !(item.productId === productId && item.storlek === storlek)),
    )
  }

  function clearCart() {
    setItems([])
  }

  const itemCount = useMemo(
    () => items.reduce((sum, item) => sum + item.antal, 0),
    [items],
  )
  const totalPrice = useMemo(
    () => items.reduce((sum, item) => sum + item.pris * item.antal, 0),
    [items],
  )

  const value: CartContextValue = {
    items,
    itemCount,
    totalPrice,
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart måste användas inom en CartProvider')
  }
  return context
}
