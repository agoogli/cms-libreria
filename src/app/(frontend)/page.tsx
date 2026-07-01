import React from 'react'
import { getPayload } from 'payload'
import { headers as getHeaders } from 'next/headers'
import config from '@/payload.config'
import Image from 'next/image'

import { TopBar } from '@/components/TopBar'
import { Header } from '@/components/Header'
import { GradientDivider } from '@/components/GradientDivider'
import { BookCarousel } from '@/components/BookCarousel'
import { mockBooks } from '@/components/mockBooks'
import { Button } from '@/components/ui/button'
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

  // 1. Fetch general newest books (overall newest)
  let dbBooks: any[] = []
  try {
    const response = await payload.find({
      collection: 'libri',
      depth: 2,
      limit: 24,
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
    <div className="min-h-screen bg-[#f2f2f2] text-zinc-900 flex flex-col font-sans antialiased selection:bg-orange-500 selection:text-white">
      {/* 1. Top Bar (100% width, anthracite #363537 background, centered contacts) */}
      <TopBar />

      {/* 2. Header (Logo + 6 Navigation links, 60% width on desktop, 30% height reduction) */}
      <Header />

      {/* 3. Gradient Divider (100% width, orange to yellow gradient) */}
      <GradientDivider />

      {/* 4. Proposta di Valore / Hero Section (60% width on desktop, light theme) */}
      <main className="flex-grow flex flex-col gap-4 pb-12">
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
        {/* Carousel 1: Novità in Vetrina (All categories) */}
        <BookCarousel
          books={displayBooks}
          title="Novità in Vetrina"
          subtitle="Tutti i settori"
        />

        {/* Carousel 2: Concorsi (Filtered by Concorsi sector, ordered newest to oldest, max 20) */}
        <BookCarousel
          books={concorsiBooks}
          title="Concorsi"
          subtitle="Settore Concorsi e Abilitazioni"
        />

        {/* Carousel 3: Giuridica (Filtered by Giuridica sector, ordered newest to oldest, max 20) */}
        <BookCarousel
          books={giuridicaBooks}
          title="Diritto e Codici"
          subtitle="Settore Diritto e Codici"
        />

        {/* Carousel 4: Umanistica (Filtered by Umanistica sector, ordered newest to oldest, max 20) */}
        <BookCarousel
          books={umanisticaBooks}
          title="Umanistica"
          subtitle="Settore Storia, Filosofia e Letteratura"
        />
      </main>

      {/* Footer (Anthracite #363537 background, 60% width container on desktop) */}
      <footer className="w-full bg-[#363537] border-t border-zinc-800 py-8 text-zinc-400 text-xs">
        <div className="w-full lg:w-[60%] mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} Libreria Antigravità. Tutti i diritti riservati.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-zinc-200 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-zinc-200 transition-colors">Termini e Condizioni</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
