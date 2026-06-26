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

export const metadata = {
  title: 'Libreria Antigravità | Homepage',
  description: 'Benvenuti nella Libreria Antigravità. Scopri la nostra selezione curata di libri, novità editoriali ed eventi culturali.',
}

export default async function HomePage() {
  const headers = await getHeaders()
  
  // Initialize Payload Local API for ultra-efficient server-side direct database queries (no HTTP requests)
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  
  let dbBooks: any[] = []
  try {
    const response = await payload.find({
      collection: 'libri',
      depth: 2,
      limit: 24,
      overrideAccess: true,
    })
    dbBooks = response.docs || []
  } catch (error) {
    console.error('Error fetching books from Payload:', error)
  }

  // Combine database books with mock books for testing
  // If the DB has books, we prepend them to the mock books so they are shown first.
  // This ensures there are always at least 12 books to test the carousel scrolling (6 by 6)
  const displayBooks = dbBooks.length > 0 
    ? [...dbBooks, ...mockBooks.filter(mb => !dbBooks.some(db => db.titolo === mb.titolo))]
    : mockBooks

  return (
    <div className="min-h-screen bg-[#f2f2f2] text-zinc-900 flex flex-col font-sans antialiased selection:bg-orange-500 selection:text-white">
      {/* 1. Top Bar (100% width, anthracite #363537 background, centered contacts) */}
      <TopBar />

      {/* 2. Header (Logo + 6 Navigation links, 60% width on desktop, 30% height reduction) */}
      <Header />

      {/* 3. Gradient Divider (100% width, orange to yellow gradient) */}
      <GradientDivider />

      {/* 4. Proposta di Valore / Hero Section (60% width on desktop, light theme) */}
      <main className="flex-grow flex flex-col">
        <section className="w-full bg-transparent py-12 sm:py-16">
          {/* 60% width container on desktop */}
          <div className="w-full lg:w-[60%] mx-auto px-4">
            {/* Section Header */}
            <div className="mb-8 text-left">
              <span className="text-xs uppercase tracking-widest text-orange-600 font-sans font-bold">
                Servizi &amp; Novità
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-zinc-900 mt-1">
                Bacheca Annunci
              </h2>
            </div>

            {/* 4 Tiles Grid with entrance animations and hover fade-in/fade-out effects */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Tile 1: Libri scolastici nuovi e usati (Orange Gradient) */}
              <div className="group relative flex flex-col justify-between h-48 bg-gradient-to-br from-orange-500 to-amber-500 text-white rounded-xl p-6 shadow-md border border-orange-400/20 transition-all duration-500 hover:scale-[1.02] hover:shadow-lg hover:-translate-y-1 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="absolute -top-12 -right-12 w-24 h-24 bg-white/10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500" />
                <div className="text-xs uppercase tracking-widest text-orange-100 font-sans font-semibold">Scuola</div>
                <h3 className="font-sans text-base sm:text-lg font-bold leading-snug mt-2">
                  Libri scolastici nuovi e usati
                </h3>
                <p className="text-[11px] text-orange-50 mt-auto leading-normal opacity-90 font-sans">
                  Servizio prenotazioni attivo per medie e superiori.
                </p>
              </div>

              {/* Tile 2: Image background (Bestseller) */}
              <div className="group relative flex flex-col justify-between h-48 rounded-xl overflow-hidden shadow-md border border-zinc-200/60 transition-all duration-500 hover:scale-[1.02] hover:shadow-lg hover:-translate-y-1 animate-in fade-in slide-in-from-bottom-4 duration-500 [animation-delay:100ms]">
                <Image
                  src="https://picsum.photos/id/1018/600/400"
                  alt="Bestseller"
                  fill
                  sizes="(max-width: 768px) 50vw, 15vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/45 group-hover:bg-black/35 transition-colors duration-500" />
                <div className="relative z-10 p-6 h-full flex flex-col justify-between text-white">
                  <div className="text-xs uppercase tracking-widest text-zinc-300 font-sans font-semibold">Consigliati</div>
                  <h3 className="font-sans text-base sm:text-lg font-bold leading-snug mt-2">
                    Le nostre novità editoriali
                  </h3>
                  <p className="text-[11px] text-zinc-200 mt-auto leading-normal opacity-90 font-sans">
                    Esplora le ultime uscite scelte per te.
                  </p>
                </div>
              </div>

              {/* Tile 3: Eventi & Incontri (Dark Anthracite) */}
              <div className="group relative flex flex-col justify-between h-48 bg-[#363537] text-white rounded-xl p-6 shadow-md border border-zinc-700/50 transition-all duration-500 hover:scale-[1.02] hover:shadow-lg hover:-translate-y-1 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500 [animation-delay:200ms]">
                <div className="absolute -top-12 -right-12 w-24 h-24 bg-orange-500/5 rounded-full blur-xl group-hover:bg-orange-500/10 transition-colors duration-500" />
                <div className="text-xs uppercase tracking-widest text-orange-400 font-sans font-semibold">Cultura</div>
                <h3 className="font-sans text-base sm:text-lg font-bold leading-snug mt-2">
                  Incontri &amp; Presentazioni
                </h3>
                <p className="text-[11px] text-zinc-300 mt-auto leading-normal opacity-90 font-sans">
                  Ogni venerdì club del libro e presentazioni con gli autori.
                </p>
              </div>

              {/* Tile 4: Spedizioni Veloci (Warm Cream/Sand) */}
              <div className="group relative flex flex-col justify-between h-48 bg-amber-50/80 text-zinc-800 rounded-xl p-6 shadow-md border border-amber-200/60 transition-all duration-500 hover:scale-[1.02] hover:shadow-lg hover:-translate-y-1 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500 [animation-delay:300ms]">
                <div className="absolute -top-12 -right-12 w-24 h-24 bg-amber-200/20 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500" />
                <div className="text-xs uppercase tracking-widest text-amber-600 font-sans font-semibold">Servizi</div>
                <h3 className="font-sans text-base sm:text-lg font-bold leading-snug mt-2 text-zinc-900">
                  Consegna a domicilio
                </h3>
                <p className="text-[11px] text-zinc-600 mt-auto leading-normal opacity-90 font-sans">
                  Spedizioni Express in 24h e consegne gratuite in città.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Book Carousel Section (60% width on desktop, 6 books per page desktop) */}
        <BookCarousel books={displayBooks} />
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
