import React from 'react'
import { getPayload } from 'payload'
import { headers as getHeaders } from 'next/headers'
import config from '@/payload.config'

import { BookCarousel } from '@/components/BookCarousel'
import { mockBooks } from '@/components/mockBooks'
import { BachecaGrid } from '@/components/BachecaGrid'
import { CATEGORIES } from '@/lib/categories'
import { seedDatabase } from '@/lib/seed'

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

  // Seed mock database if empty
  await seedDatabase(payload)

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

  // Combine database books with mock books for general carousel fallback
  const displayBooks = dbBooks.length > 0
    ? [...dbBooks, ...mockBooks.filter(mb => !dbBooks.some(db => db.titolo === mb.titolo))]
    : mockBooks

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
          <div className="bg-white rounded-xl border border-zinc-200/80 shadow-sm overflow-hidden flex flex-col">
            <div className="p-5 md:p-6 flex flex-col md:flex-row md:items-stretch gap-0 divide-y md:divide-y-0 md:divide-x divide-zinc-200">
              {/* Box 1: Consegne Messina */}
              <div className="flex-1 flex gap-3.5 items-start pb-6 md:pb-0 md:pr-6">
                <div className="w-10 h-10 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center shrink-0 mt-0.5">
                  <svg className="w-5 h-5 fill-currentColor" viewBox="0 0 24 24">
                    <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm12 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm2-5.5h-3V9h2.58l2.42 2.75V13z" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <h4 className="text-xs uppercase tracking-wider text-zinc-400 font-bold font-sans">
                    Consegne a Domicilio (Messina)
                  </h4>
                  <p className="text-xs sm:text-sm font-semibold text-zinc-800 mt-1 font-sans">
                    Ambito comunale (da Giampilieri a Torre Faro)
                  </p>
                  <p className="text-xs text-zinc-500 mt-1 font-sans leading-relaxed">
                    Tariffa: <strong className="text-orange-600 font-semibold">5 €</strong> tramite corriere <strong className="text-zinc-700 font-medium">Ermete Express</strong>. Consegna in 24/48 ore se disponibile in sede.
                  </p>
                </div>
              </div>

              {/* Box 2: Consegne Fuori Messina */}
              <div className="flex-1 flex gap-3.5 items-start pt-6 md:pt-0 md:pl-6">
                <div className="w-10 h-10 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center shrink-0 mt-0.5">
                  <svg className="w-5 h-5 fill-currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <h4 className="text-xs uppercase tracking-wider text-zinc-400 font-bold font-sans">
                    Spedizioni Nazionali
                  </h4>
                  <p className="text-xs sm:text-sm font-semibold text-zinc-800 mt-1 font-sans">
                    Consegne fuori Messina
                  </p>
                  <p className="text-xs text-zinc-500 mt-1 font-sans leading-relaxed">
                    Tariffa: <strong className="text-orange-600 font-semibold">8 €</strong> tramite corriere espresso <strong className="text-zinc-700 font-medium">SDA</strong>. Consegna in 24/48 ore se disponibile in sede.
                  </p>
                </div>
              </div>
            </div>

            {/* Note su Disponibilità inside the card footer */}
            <div className="bg-orange-50/40 border-t border-orange-100/80 p-4 flex items-center gap-2.5">
              <div className="w-5 h-5 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
                <svg className="w-3.5 h-3.5 text-orange-600 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
                </svg>
              </div>
              <p className="text-xs text-orange-900 font-sans font-medium">
                Per i volumi non disponibili in sede sarete avvisati sui tempi di arrivo.
              </p>
            </div>
          </div>
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
