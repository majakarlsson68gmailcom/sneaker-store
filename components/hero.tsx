import Image from 'next/image'

export function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-6 pt-10 sm:pt-16">
      <div className="relative aspect-4/3 w-full overflow-hidden bg-secondary sm:aspect-21/9">
        <Image
          src="/hero/hero-sneaker.png"
          alt="Aero Runner sneaker i vitt och grått, fotograferad i studiobelysning"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <div className="mt-8 max-w-md">
        <h1 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          Sneakers gjorda för att bäras
        </h1>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground text-pretty">
          Ett litet utbud, noga utvalt. Kvalitetsmaterial, ren design och
          komfort som håller hela dagen.
        </p>
      </div>
    </section>
  )
}
