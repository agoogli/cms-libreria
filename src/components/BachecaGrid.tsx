'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'

// Slideshow images for Card 5
const slideshowImages = [
  'https://picsum.photos/id/24/600/400',  // Bookstore interior
  'https://picsum.photos/id/119/600/400', // Book collection
  'https://picsum.photos/id/367/600/400'  // Reading corner
]

export function BachecaGrid() {
  const [animatedCard, setAnimatedCard] = useState<number | null>(null)
  const [currentSlide, setCurrentSlide] = useState(0)
  const lastAnimatedRef = React.useRef<number | null>(null)

  // Timer for the card bounce/glow animation (picks a random card, ensuring no consecutive duplicates)
  useEffect(() => {
    const interval = setInterval(() => {
      let nextIndex: number
      do {
        nextIndex = Math.floor(Math.random() * 6)
      } while (nextIndex === lastAnimatedRef.current)

      lastAnimatedRef.current = nextIndex
      setAnimatedCard(nextIndex)

      const timeout = setTimeout(() => {
        setAnimatedCard(null)
      }, 1500)

      return () => clearTimeout(timeout)
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  // Timer for the Card 5 slideshow (transitions every 3 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideshowImages.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      {/* Self-contained custom animation and font styles */}
      <style jsx global>{`
        @keyframes bacheca-card-bounce {
          0%, 100% {
            transform: translateY(0) scale(1);
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
          }
          50% {
            transform: translateY(-6px) scale(1.025);
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.15), 0 8px 10px -6px rgba(0, 0, 0, 0.15);
            border-color: rgba(249, 115, 22, 0.4);
          }
        }
        .animate-bacheca-card {
          animation: bacheca-card-bounce 1.5s ease-in-out;
          z-index: 20;
        }
        .bacheca-grid-container,
        .bacheca-grid-container * {
          font-family: var(--font-sans), 'Inter', sans-serif !important;
        }
      `}</style>

      {/* 2 rows of 3 cards on desktop (grid-cols-3), with matching margins (8px mobile, 12px tablet/desktop) */}
      <div className="bacheca-grid-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
        
        {/* Card 1: Libri scolastici nuovi e usati (Orange Gradient) */}
        <div
          className={`group relative flex flex-col justify-between h-52 bg-gradient-to-br from-orange-500 to-amber-500 text-white rounded-xl p-6 shadow-md border border-orange-400/20 transition-all duration-500 hover:scale-[1.02] hover:shadow-lg hover:-translate-y-1 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500 ${
            animatedCard === 0 ? 'animate-bacheca-card' : ''
          }`}
        >
          <div className="absolute -top-12 -right-12 w-24 h-24 bg-white/10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500" />
          <div className="text-xs uppercase tracking-widest text-orange-100 font-sans font-semibold">
            Scuola
          </div>
          <h3 className="font-sans text-base sm:text-lg font-bold leading-snug mt-2">
            Libri scolastici nuovi e usati
          </h3>
          <p className="text-[11px] text-orange-50 mt-auto leading-normal opacity-90 font-sans">
            Servizio prenotazioni attivo per medie e superiori. Portaci la tua lista scolastica.
          </p>
        </div>

        {/* Card 2: LybroApp (Indigo/Violet Gradient) */}
        <div
          className={`group relative flex flex-col justify-between h-52 bg-gradient-to-br from-violet-600 to-indigo-600 text-white rounded-xl p-6 shadow-md border border-violet-400/20 transition-all duration-500 hover:scale-[1.02] hover:shadow-lg hover:-translate-y-1 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500 [animation-delay:50ms] ${
            animatedCard === 1 ? 'animate-bacheca-card' : ''
          }`}
        >
          <div className="absolute top-4 right-4 w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center border border-white/20 group-hover:bg-white/20 transition-colors duration-300">
            {/* SVG Mock Mobile/App Icon */}
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <rect x="5" y="2" width="14" height="20" rx="2" strokeWidth="2" />
              <circle cx="12" cy="18" r="1" fill="currentColor" />
            </svg>
          </div>
          <div>
            <div className="text-xs uppercase tracking-widest text-violet-200 font-sans font-semibold">
              App &amp; Tech
            </div>
            <h3 className="font-sans text-base sm:text-lg font-bold leading-snug mt-2">
              LybroApp
            </h3>
            <p className="text-[11px] text-violet-100 mt-2 leading-normal opacity-90 font-sans max-w-[80%]">
              Gestisci le tue letture, prenota i libri e accumula punti sulla tua tessera fedeltà.
            </p>
          </div>
          <div className="mt-auto">
            <a
              href="#"
              className="inline-flex items-center text-[10px] font-bold uppercase tracking-wider bg-white text-indigo-700 px-3 py-1.5 rounded-md shadow-sm hover:bg-indigo-50 transition-colors"
            >
              Scarica l'App
            </a>
          </div>
        </div>

        {/* Card 3: Carta Cultura 2026 (Image Background with Footer Text) */}
        <div
          className={`group relative flex flex-col justify-between h-52 rounded-xl overflow-hidden shadow-md border border-zinc-200/60 transition-all duration-500 hover:scale-[1.02] hover:shadow-lg hover:-translate-y-1 animate-in fade-in slide-in-from-bottom-4 duration-500 [animation-delay:100ms] ${
            animatedCard === 2 ? 'animate-bacheca-card' : ''
          }`}
        >
          <Image
            src="https://picsum.photos/id/145/600/400"
            alt="Carta Cultura 2026"
            fill
            sizes="(max-width: 768px) 50vw, 30vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-black/60 group-hover:bg-black/50 transition-colors duration-500" />
          
          <div className="relative z-10 p-6 h-full flex flex-col justify-between text-white">
            <div>
              <div className="text-xs uppercase tracking-widest text-orange-400 font-sans font-semibold">
                Bonus Giovani
              </div>
              <h3 className="font-sans text-base sm:text-lg font-bold leading-snug mt-2">
                Carta Cultura 2026
              </h3>
            </div>
            
            {/* Footer Text section of the card */}
            <div className="w-full mt-auto pt-2 border-t border-white/20">
              <p className="text-[10px] text-zinc-200 leading-normal font-sans font-medium">
                Fino a 500€ per l'acquisto di libri. Attiva per tutti i nati nel 2007. Spendi qui il tuo buono.
              </p>
            </div>
          </div>
        </div>

        {/* Card 4: Social Connect (Facebook & Instagram with simulated feed) */}
        <div
          className={`group relative flex flex-col justify-between h-52 bg-[#363537] text-white rounded-xl p-6 shadow-md border border-zinc-700/50 transition-all duration-500 hover:scale-[1.02] hover:shadow-lg hover:-translate-y-1 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500 [animation-delay:150ms] ${
            animatedCard === 3 ? 'animate-bacheca-card' : ''
          }`}
        >
          <div className="flex justify-between items-start">
            <div>
              <div className="text-xs uppercase tracking-widest text-orange-400 font-sans font-semibold">
                Community
              </div>
              <h3 className="font-sans text-base sm:text-lg font-bold leading-snug mt-1">
                Seguici sui Social
              </h3>
            </div>
            <div className="flex gap-2">
              {/* FB Icon */}
              <a href="#" className="text-zinc-400 hover:text-white transition-colors">
                <svg className="w-5 h-5 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                </svg>
              </a>
              {/* IG Icon */}
              <a href="#" className="text-zinc-400 hover:text-white transition-colors">
                <svg className="w-5 h-5 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Social Post Preview */}
          <div className="bg-[#4a494b] rounded-lg p-3 my-2 border border-zinc-600/30">
            <p className="text-[10px] text-zinc-200 line-clamp-2 font-sans">
              ✨ Novità in arrivo! Questo venerdì ore 18:30 ospiteremo la presentazione del nuovo romanzo...
            </p>
            <div className="flex justify-between items-center mt-2 text-[9px] text-zinc-400">
              <span>Piace a 42 persone</span>
              <span>12 commenti</span>
            </div>
          </div>

          {/* Facebook Like Button mockup */}
          <div className="mt-auto">
            <button className="inline-flex items-center gap-1.5 text-[9px] font-bold bg-[#1877f2] hover:bg-[#166fe5] text-white px-3 py-1.5 rounded shadow-sm transition-colors">
              <svg className="w-3.5 h-3.5 fill-currentColor" viewBox="0 0 24 24">
                <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0c-1.935 0-3.698 1.014-4.742 2.54v-2.04h-4.902v16h4.902v-7.392c0-4.088 3.003-4.616 4.902-4.616v-4.492zm11.018 0h-4.903v6.388c0 2.248-.636 4.612-3.18 4.612-2.316 0-2.82-1.782-2.82-3.612v-7.388h-4.902v16h4.902v-7.388c0-1.83.504-3.612 2.82-3.612 2.544 0 3.18 2.364 3.18 4.612v6.388h4.903v-16z" />
              </svg>
              Diventa Fan
            </button>
          </div>
        </div>

        {/* Card 5: Slideshow (La Libreria) - Centered in the bottom row */}
        <div
          className={`group relative flex flex-col justify-between h-52 rounded-xl overflow-hidden shadow-md border border-zinc-200/60 transition-all duration-500 hover:scale-[1.02] hover:shadow-lg hover:-translate-y-1 animate-in fade-in slide-in-from-bottom-4 duration-500 [animation-delay:200ms] ${
            animatedCard === 4 ? 'animate-bacheca-card' : ''
          }`}
        >
          {/* Automatic slideshow images */}
          {slideshowImages.map((src, index) => (
            <Image
              key={src}
              src={src}
              alt={`Libreria Slide ${index + 1}`}
              fill
              sizes="(max-width: 768px) 50vw, 30vw"
              className={`object-cover transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100 z-0' : 'opacity-0'
              }`}
            />
          ))}
          <div className="absolute inset-0 bg-black/50 z-10" />

          {/* Dots Indicator */}
          <div className="absolute top-4 right-4 z-20 flex gap-1">
            {slideshowImages.map((_, index) => (
              <div
                key={index}
                className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                  index === currentSlide ? 'bg-orange-500' : 'bg-white/40'
                }`}
              />
            ))}
          </div>

          <div className="relative z-20 p-6 h-full flex flex-col justify-between text-white">
            <div className="text-xs uppercase tracking-widest text-zinc-300 font-sans font-semibold">
              La Libreria
            </div>
            <h3 className="font-sans text-base sm:text-lg font-bold leading-snug mt-2">
              I Nostri Spazi
            </h3>
            <p className="text-[11px] text-zinc-200 mt-auto leading-normal opacity-90 font-sans">
              Esplora i locali del nostro negozio in centro città, pensati per tutti i lettori.
            </p>
          </div>
        </div>

        {/* Card 6: Offerta Kit (Warm Cream / Promotion) */}
        <div
          className={`group relative flex flex-col justify-between h-52 bg-amber-50/80 text-zinc-800 rounded-xl p-6 shadow-md border border-amber-200/60 transition-all duration-500 hover:scale-[1.02] hover:shadow-lg hover:-translate-y-1 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500 [animation-delay:250ms] ${
            animatedCard === 5 ? 'animate-bacheca-card' : ''
          }`}
        >
          <div className="absolute -top-12 -right-12 w-24 h-24 bg-orange-500/5 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500" />
          
          <div>
            <span className="inline-block bg-orange-500 text-white text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full mb-1">
              Offerta Speciale
            </span>
            <h3 className="font-sans text-base sm:text-lg font-bold leading-snug text-zinc-900 mt-1">
              Kit Lettura Estiva
            </h3>
            <p className="text-[11px] text-zinc-600 mt-1 leading-normal opacity-90 font-sans">
              Acquista il best seller del mese e ricevi in omaggio la tazza letteraria esclusiva e la shopper della libreria.
            </p>
          </div>
          
          <div className="flex justify-between items-center mt-auto">
            <div>
              <span className="text-[10px] text-zinc-400 line-through">€45.90</span>
              <span className="text-sm font-bold text-orange-600 ml-1.5">€34.90</span>
            </div>
            <a
              href="#"
              className="inline-flex items-center text-[10px] font-bold uppercase tracking-wider bg-orange-600 text-white px-3 py-1.5 rounded-md shadow-sm hover:bg-orange-700 transition-colors"
            >
              Scopri il Kit
            </a>
          </div>
        </div>

      </div>
    </>
  )
}
