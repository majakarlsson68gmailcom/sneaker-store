import Link from 'next/link'

const footerColumns = [
  {
    title: 'Handla',
    links: [
      { href: '/produkter', label: 'Alla produkter' },
      { href: '#', label: 'Nyheter' },
      { href: '#', label: 'Rea' },
    ],
  },
  {
    title: 'Kundservice',
    links: [
      { href: '#', label: 'Fraktinfo' },
      { href: '#', label: 'Returer' },
      { href: '#', label: 'Storleksguide' },
      { href: '#', label: 'Kontakt' },
    ],
  },
  {
    title: 'Om Stride',
    links: [
      { href: '#', label: 'Om oss' },
      { href: '#', label: 'Hållbarhet' },
      { href: '#', label: 'Instagram' },
    ],
  },
]

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
          <div className="col-span-2 sm:col-span-1">
            <span className="text-lg font-semibold tracking-[0.2em] uppercase">
              Stride
            </span>
            <p className="mt-3 max-w-40 text-sm leading-relaxed text-muted-foreground">
              Sneakers för vardagen, gjorda för att hålla.
            </p>
          </div>

          {footerColumns.map((column) => (
            <div key={column.title}>
              <h3 className="text-sm font-medium">{column.title}</h3>
              <ul className="mt-4 flex flex-col gap-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="mt-16 text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} Stride. Alla rättigheter
          förbehållna.
        </p>
      </div>
    </footer>
  )
}
