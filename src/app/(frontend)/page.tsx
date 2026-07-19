import React from 'react'
import Link from 'next/link'
import { getPayload } from 'payload'
import { headers as getHeaders } from 'next/headers'
import config from '@/payload.config'

import { BookCarousel } from '@/components/BookCarousel'
import { BachecaGrid } from '@/components/BachecaGrid'
import { CATEGORIES } from '@/lib/categories'
import { DeliveryCard } from '@/components/DeliveryCard'

export const metadata = {
  title: 'Libreria Nunnari & Sfameni',
  description: 'Libreria Nunnari & Sfameni. A Messina dal 1932. Testi universitari scolastici professionali e concorsi',
}

// Helper function to query books by sector name using Payload Local API
async function getBooksBySector(payload: any, sectorName: string) {
  try {
    const sectorResponse = await payload.find({
      collection: 'settori',
      where: {
        nome: {
          equals: sectorName,
        },
      },
      limit: 1,
    })

    const sectorId = sectorResponse.docs[0]?.id

    if (!sectorId) {
      return []
    }

    const booksResponse = await payload.find({
      collection: 'libri',
      depth: 2,
      limit: 20, // Max 20 books per carousel
      sort: '-createdAt', // Sort from newest to oldest
      where: {
        settore: {
          equals: sectorId,
        },
      },
      overrideAccess: true,
    })

    return booksResponse.docs || []
  } catch (error) {
    console.error(`Error fetching books for sector ${sectorName}:`, error)
    return []
  }
}

export default async function HomePage() {
  const headers = await getHeaders()

  // Initialize Payload Local API for ultra-efficient server-side direct database queries (no HTTP requests)
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  // 1. Fetch general newest books (overall newest, limit to 100)
  let dbBooks: any[] = []
  try {
    const response = await payload.find({
      collection: 'libri',
      depth: 2,
      limit: 100, // Limit general carousel to 100 books
      sort: '-createdAt',
      overrideAccess: true,
    })
    dbBooks = response.docs || []
  } catch (error) {
    console.error('Error fetching books from Payload:', error)
  }

  const displayBooks = dbBooks

  // 2. Fetch specific sector carousels (max 20 books, sorted newest first)
  const concorsiBooks = await getBooksBySector(payload, CATEGORIES.CONCORSI)
  const giuridicaBooks = await getBooksBySector(payload, CATEGORIES.GIURIDICA)
  const umanisticaBooks = await getBooksBySector(payload, CATEGORIES.UMANISTICA)

  return (
    <>
      <section className="w-full bg-transparent pt-3 pb-0">
        {/* 60% width container on desktop, aligned left on mobile (pl-4 pr-0), normal on desktop (lg:px-4) */}
        <div className="w-full lg:w-[60%] mx-auto pl-4 pr-0 lg:px-4">
          {/* Section Header centered horizontally */}
          <div className="mb-3 text-center w-full">
            <span className="text-xs uppercase tracking-widest text-orange-600 font-sans font-bold">
              Testi universitari, scolastici, professionali e concorsi
            </span>
          </div>

          {/* 6 Tiles Grid wrapped in Carousel on mobile */}
          <BachecaGrid />
        </div>
      </section>

      {/* 5. Sector Carousels */}
      {/* Carousel 1: Novità in Vetrina (All categories, limit 100) */}
      <BookCarousel
        books={displayBooks}
        title="Novità in Vetrina"
        viewAllHref="/libri"
      />

      {/* Indicazioni sulle Consegne */}
      <section className="w-full bg-transparent py-4 text-zinc-800">
        <div className="w-full lg:w-[60%] mx-auto px-4 lg:px-4">
          <DeliveryCard isLink={true} showDiscoverMore={true} />
        </div>
      </section>

      {/* Carousel 2: Concorsi (Filtered by Concorsi sector, ordered newest to oldest, max 20) */}
      <BookCarousel
        books={concorsiBooks}
        title="Concorsi"
        viewAllHref="/settori/concorsi"
      />

      {/* Carousel 3: Giuridica (Filtered by Giuridica sector, ordered newest to oldest, max 20) */}
      <BookCarousel
        books={giuridicaBooks}
        title="Diritto e Codici"
        viewAllHref="/settori/giuridica"
      />

      {/* Carousel 4: Umanistica (Filtered by Umanistica sector, ordered newest to oldest, max 20) */}
      <BookCarousel
        books={umanisticaBooks}
        title="Umanistica"
        viewAllHref="/settori/umanistica"
      />
    </>
  )
}
