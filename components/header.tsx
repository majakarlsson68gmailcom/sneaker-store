'use client'

import { ShoppingBag } from 'lucide-react'
import Link from 'next/link'

import { useCart } from '@/lib/cart-context'

const navLinks = [
  { href: '/', label: 'Start' },
  { href: '/produkter', label: 'Produkter' },
]

export function Header() {
  const { itemCount } = useCart()

  return (
    <header className="border-b border-border">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6">
        <Link
          href="/"
          className="text-lg font-semibold tracking-[0.2em] uppercase"
        >
          Stride
        </Link>

        <nav aria-label="Huvudmeny" className="hidden gap-8 sm:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/varukorg"
          aria-label={
            itemCount > 0
              ? `Öppna varukorg, ${itemCount} artiklar`
              : 'Öppna varukorg'
          }
          className="relative flex size-10 items-center justify-center text-foreground transition-colors hover:text-muted-foreground"
        >
          <ShoppingBag size={20} strokeWidth={1.5} aria-hidden="true" />
          {itemCount > 0 && (
            <span
              aria-hidden="true"
              className="absolute top-1 right-1 flex size-4 items-center justify-center rounded-full bg-foreground text-[10px] font-medium text-background"
            >
              {itemCount > 9 ? '9+' : itemCount}
            </span>
          )}
        </Link>
      </div>
    </header>
  )
}
