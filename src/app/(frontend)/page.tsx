import React from 'react'
import { getPayload } from 'payload'
import { headers as getHeaders } from 'next/headers'
import config from '@/payload.config'

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
    <div className="min-h-screen bg-black text-white flex flex-col font-sans antialiased selection:bg-orange-500 selection:text-white">
      {/* 1. Top Bar (100% width, anthracite background, centered contacts) */}
      <TopBar />

      {/* 2. Header (Logo + 6 Navigation links, 80% width on desktop) */}
      <Header />

      {/* 3. Gradient Divider (100% width, orange to yellow gradient) */}
      <GradientDivider />

      {/* 4. Proposta di Valore / Hero Section (80% width on desktop, elegant typography) */}
      <main className="flex-grow flex flex-col">
        <section className="w-full bg-black py-16 sm:py-24">
          <div className="w-full lg:w-[80%] mx-auto px-4 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-12">
            <div className="max-w-2xl">
              <span className="text-xs uppercase tracking-[0.2em] text-orange-500 font-sans font-bold">
                Spazio Culturale &amp; Letterario
              </span>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight mt-3 mb-6 leading-tight">
                Un universo di storie, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-200">
                  senza gravità.
                </span>
              </h1>
              <p className="text-base sm:text-lg text-zinc-400 font-normal leading-relaxed max-w-xl">
                Benvenuti nella Libreria Antigravità. Esplora la nostra selezione curata di novità letterarie, classici senza tempo e settori specializzati. Un luogo dove le idee volano libere.
              </p>
              
              {/* Call to Actions */}
              <div className="mt-8 flex flex-wrap justify-center sm:justify-start gap-4">
                <Button className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold px-6 py-5 rounded-md shadow-lg shadow-orange-500/20 transition-all duration-200">
                  Esplora il Catalogo
                </Button>
                <Button variant="outline" className="border-zinc-700 hover:border-zinc-500 text-zinc-300 hover:text-white bg-transparent px-6 py-5 rounded-md transition-all duration-200">
                  La Nostra Storia
                </Button>
              </div>
            </div>

            {/* Decorative Book Stack graphic / visual placeholder */}
            <div className="hidden lg:block w-72 h-80 relative bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-2xl border border-zinc-800 shadow-2xl p-6 overflow-hidden group select-none">
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl group-hover:bg-orange-500/20 transition-colors duration-500" />
              <div className="h-full flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-mono text-orange-500 uppercase tracking-wider">
                    Consiglio del libraio
                  </span>
                  <span className="text-xs text-zinc-500">N° 42</span>
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-zinc-100 mt-2 group-hover:text-orange-400 transition-colors duration-200">
                    La fisica delle storie che cambiano la vita.
                  </h3>
                  <p className="text-xs text-zinc-400 mt-2 font-sans line-clamp-2">
                    Una lettura coinvolgente che ridefinisce il concetto di gravità intellettuale.
                  </p>
                </div>
                <div className="border-t border-zinc-800 pt-4 flex justify-between items-center text-xs text-zinc-400">
                  <span>Copertina Rigida</span>
                  <span className="font-mono text-orange-400 font-bold">18,00 €</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Book Carousel Section (80% width on desktop, 6 books per page desktop) */}
        <BookCarousel books={displayBooks} />
      </main>

      {/* Footer */}
      <footer className="w-full bg-zinc-950 border-t border-zinc-900 py-8 text-center text-xs text-zinc-500">
        <div className="w-full lg:w-[80%] mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} Libreria Antigravità. Tutti i diritti riservati.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-zinc-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-zinc-300 transition-colors">Termini e Condizioni</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
