export type Size = 36 | 37 | 38 | 39 | 40 | 41 | 42 | 43 | 44 | 45 | 46

export type Product = {
  id: string
  slug: string
  namn: string
  /** Pris i öre (SEK). 129900 = 1 299,00 kr */
  pris: number
  storlekar: Size[]
  farg: string
  bilder: [string, string, string]
  kortBeskrivning: string
  langBeskrivning: string
  lagersaldo: Record<Size, number>
}

export const products: Product[] = [
  {
    id: '1',
    slug: 'aero-runner',
    namn: 'Aero Runner',
    pris: 179900,
    storlekar: [38, 39, 40, 41, 42, 43, 44],
    farg: 'Vit / Grå',
    bilder: [
      '/products/aero-runner.png',
      '/products/aero-runner.png',
      '/products/aero-runner.png',
    ],
    kortBeskrivning: 'Lätt löparsko för daglig träning.',
    langBeskrivning:
      'Aero Runner är byggd för milen efter milen. Andningsaktiv mesh-ovandel, responsiv mellansula och en grepptålig gummisula ger dig stöd oavsett underlag. En lätt konstruktion gör skon lika bekväm i vardagen som på löprundan.',
    lagersaldo: {
      36: 0,
      37: 0,
      38: 4,
      39: 6,
      40: 8,
      41: 5,
      42: 7,
      43: 0,
      44: 2,
      45: 0,
      46: 0,
    },
  },
  {
    id: '2',
    slug: 'court-classic',
    namn: 'Court Classic',
    pris: 149900,
    storlekar: [36, 37, 38, 39, 40, 41, 42, 43, 44],
    farg: 'Vit / Svart',
    bilder: [
      '/products/court-classic.png',
      '/products/court-classic.png',
      '/products/court-classic.png',
    ],
    kortBeskrivning: 'Tidlös läderklassiker för vardagsbruk.',
    langBeskrivning:
      'Court Classic hyllar den klassiska basketskon med en ren silhuett i äkta läder. Detaljer i svart på häl och tå ger kontrast, medan en dämpad sula håller dig bekväm från morgon till kväll. En sko som fungerar till precis allt.',
    lagersaldo: {
      36: 3,
      37: 5,
      38: 6,
      39: 8,
      40: 9,
      41: 7,
      42: 6,
      43: 4,
      44: 0,
      45: 0,
      46: 0,
    },
  },
  {
    id: '3',
    slug: 'trail-edge',
    namn: 'Trail Edge',
    pris: 199900,
    storlekar: [39, 40, 41, 42, 43, 44, 45, 46],
    farg: 'Oliv / Brun',
    bilder: [
      '/products/trail-edge.png',
      '/products/trail-edge.png',
      '/products/trail-edge.png',
    ],
    kortBeskrivning: 'Robust terrängsko för lös mark.',
    langBeskrivning:
      'Trail Edge är gjord för stigar, grus och blöt mark. Ett djupt profilerat sulmönster ger grepp när det behövs som mest, och en förstärkt tåbox skyddar mot stenar och rötter. Vattenavvisande material håller fötterna torra längre.',
    lagersaldo: {
      36: 0,
      37: 0,
      38: 0,
      39: 4,
      40: 5,
      41: 6,
      42: 7,
      43: 5,
      44: 4,
      45: 2,
      46: 0,
    },
  },
  {
    id: '4',
    slug: 'cloud-step',
    namn: 'Cloud Step',
    pris: 129900,
    storlekar: [36, 37, 38, 39, 40, 41, 42, 43],
    farg: 'Vit',
    bilder: [
      '/products/cloud-step.png',
      '/products/cloud-step.png',
      '/products/cloud-step.png',
    ],
    kortBeskrivning: 'Superlätt stickad sneaker i rent vitt.',
    langBeskrivning:
      'Cloud Step väger nästan ingenting. Ovandelen är stickad i ett stycke för en sömlös passform, och en mjuk skumsula gör varje steg fjädrande lätt. En minimalistisk favorit som passar till det mesta.',
    lagersaldo: {
      36: 5,
      37: 6,
      38: 7,
      39: 9,
      40: 10,
      41: 8,
      42: 0,
      43: 3,
      44: 0,
      45: 0,
      46: 0,
    },
  },
  {
    id: '5',
    slug: 'retro-89',
    namn: 'Retro 89',
    pris: 169900,
    storlekar: [37, 38, 39, 40, 41, 42, 43, 44, 45],
    farg: 'Röd / Marinblå / Vit',
    bilder: [
      '/products/retro-89.png',
      '/products/retro-89.png',
      '/products/retro-89.png',
    ],
    kortBeskrivning: 'Färgstark retrosneaker med chunky sula.',
    langBeskrivning:
      'Retro 89 tar inspiration från 80-talets löparskor med sitt klassiska färgblocksmönster i rött, marinblått och vitt. En rejäl mellansula ger höjd och dämpning, samtidigt som skon behåller sin nostalgiska charm.',
    lagersaldo: {
      36: 0,
      37: 2,
      38: 4,
      39: 5,
      40: 6,
      41: 6,
      42: 5,
      43: 4,
      44: 2,
      45: 0,
      46: 0,
    },
  },
  {
    id: '6',
    slug: 'urban-glide',
    namn: 'Urban Glide',
    pris: 189900,
    storlekar: [38, 39, 40, 41, 42, 43, 44, 45],
    farg: 'Svart',
    bilder: [
      '/products/urban-glide.png',
      '/products/urban-glide.png',
      '/products/urban-glide.png',
    ],
    kortBeskrivning: 'Matt högtopp i svart läder.',
    langBeskrivning:
      'Urban Glide är en högtopp i matt svart läder med en ren, arkitektonisk siluett. Ett dolt fodrat skaft ger extra stöd runt ankeln, och en slimmad gummisula håller helhetsintrycket sofistikerat.',
    lagersaldo: {
      36: 0,
      37: 0,
      38: 3,
      39: 4,
      40: 6,
      41: 7,
      42: 6,
      43: 5,
      44: 3,
      45: 0,
      46: 0,
    },
  },
]

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug)
}
