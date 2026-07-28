import React from 'react'
import Link from 'next/link'
import { getPayload } from 'payload'
import { headers as getHeaders } from 'next/headers'
import config from '@/payload.config'

import { BookCarousel } from '@/components/BookCarousel'
import { BachecaGrid } from '@/components/BachecaGrid'
import { DeliveryCard } from '@/components/DeliveryCard'
import { CartaDocenteCard } from '@/components/CartaDocenteCard'

export const metadata = {
  title: 'Libreria Nunnari & Sfameni',
  description: 'Libreria Nunnari & Sfameni. A Messina dal 1932. Testi universitari scolastici professionali e concorsi',
}

export default async function HomePage() {
  const headers = await getHeaders()

  // Initialize Payload Local API for direct server-side queries
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  // 1. Fetch general newest books (overall newest, limit to 100)
  let dbBooks: any[] = []
  try {
    const response = await payload.find({
      collection: 'libri',
      depth: 2,
      limit: 100, // Limit general carousel to 100 books
      sort: '-updatedAt',
      overrideAccess: true,
    })
    dbBooks = response.docs || []
  } catch (error) {
    console.error('Error fetching books from Payload:', error)
  }

  // 2. Fetch dynamic sector carousels ordered by ordineVisuale (ascending 1..n)
  let dynamicSectorCarousels: Array<{
    sectorId: string | number
    title: string
    href: string
    books: any[]
  }> = []

  try {
    const sectorsResponse = await payload.find({
      collection: 'settori',
      sort: 'ordineVisuale',
      where: {
        ordineVisuale: {
          greater_than: 0,
        },
      },
      limit: 100,
      overrideAccess: true,
    })

    const activeSectors = (sectorsResponse.docs || []).filter(
      (s: any) => typeof s.ordineVisuale === 'number' && s.ordineVisuale > 0
    )

    // For each active sector, fetch up to 20 books sorted newest first
    for (const sector of activeSectors) {
      const sectorBooksResponse = await payload.find({
        collection: 'libri',
        depth: 2,
        limit: 20,
        sort: '-updatedAt',
        where: {
          settore: {
            equals: sector.id,
          },
        },
        overrideAccess: true,
      })

      const books = sectorBooksResponse.docs || []
      const title = sector.nomeVisualizzato || sector.nome
      const slug = sector.nome ? sector.nome.toLowerCase().replace(/\s+/g, '-') : ''

      dynamicSectorCarousels.push({
        sectorId: sector.id,
        title,
        href: `/settori/${slug}`,
        books,
      })
    }
  } catch (error) {
    console.error('Error fetching dynamic sector carousels:', error)
  }

  return (
    <>
      <section className="w-full bg-transparent pt-3 pb-0">
        {/* 60% width container on desktop */}
        <div className="w-full lg:w-[60%] mx-auto pl-4 pr-0 lg:px-4">
          {/* Section Header */}
          <div className="mb-3 text-center w-full">
            <span className="text-xs uppercase tracking-widest text-orange-600 font-sans font-bold">
              Testi universitari, scolastici, professionali e concorsi
            </span>
          </div>

          {/* 6 Tiles Grid */}
          <BachecaGrid />
        </div>
      </section>

      {/* General Novità in Vetrina Carousel */}
      <BookCarousel
        books={dbBooks}
        title="Novità in Vetrina"
        viewAllHref="/libri"
      />

      {/* Indicazioni sulle Consegne */}
      <section className="w-full bg-transparent py-4 text-zinc-800">
        <div className="w-full lg:w-[60%] mx-auto px-4 lg:px-4">
          <DeliveryCard isLink={true} showDiscoverMore={true} />
        </div>
      </section>

      {/* First 2 dynamic sector carousels */}
      {dynamicSectorCarousels.slice(0, 2).map((carousel) => (
        <BookCarousel
          key={carousel.sectorId}
          books={carousel.books}
          title={carousel.title}
          viewAllHref={carousel.href}
        />
      ))}

      {/* Info Card per Carta del Docente (inserita esattamente dopo il 2° carosello dinamico) */}
      <CartaDocenteCard />

      {/* Remaining dynamic sector carousels (from 3rd onwards) */}
      {dynamicSectorCarousels.slice(2).map((carousel) => (
        <BookCarousel
          key={carousel.sectorId}
          books={carousel.books}
          title={carousel.title}
          viewAllHref={carousel.href}
        />
      ))}
    </>
  )
}
