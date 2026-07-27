'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from './ui/carousel'

// Slideshow images from public assets folder
const slideshowImages = [
  '/assets/foto-libreria/1.jpg',
  '/assets/foto-libreria/2.jpg',
  '/assets/foto-libreria/3.jpg',
  '/assets/foto-libreria/4.jpg',
  '/assets/foto-libreria/5.jpg',
]

export function BachecaGrid() {
  const [animatedCard, setAnimatedCard] = useState<number | null>(null)
  const [currentSlide, setCurrentSlide] = useState(0)
  const lastAnimatedRef = React.useRef<number | null>(null)

  // State to read OffertaSpeciale global contents client-side
  const [offerta, setOfferta] = useState<{
    titolo: string
    sottotitolo: string
    immagini: string[]
  }>({
    titolo: 'Novità',
    sottotitolo: 'Kit Lettura',
    immagini: [
      '/assets/libro.png',
      '/assets/foto-libreria/1.jpg',
      '/assets/foto-libreria/2.jpg',
      '/assets/foto-libreria/3.jpg',
      '/assets/foto-libreria/4.jpg',
    ],
  })

  const [coverIndex, setCoverIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  // Fetch novita-in-risalto global client-side
  useEffect(() => {
    fetch('/api/globals/novita-in-risalto')
      .then((res) => res.json())
      .then((data) => {
        if (data && (data.titolo || data.sottotitolo || (data.immagini && data.immagini.length > 0))) {
          const titolo = data.titolo || 'Novità'
          const sottotitolo = data.sottotitolo || 'Kit Lettura'
          const immagini =
            data.immagini && data.immagini.length > 0
              ? data.immagini.map((item: any) => item.immagine?.url).filter(Boolean)
              : []

          setOfferta({
            titolo,
            sottotitolo,
            immagini:
              immagini.length > 0
                ? immagini
                : [
                  '/assets/libro.png',
                  '/assets/foto-libreria/1.jpg',
                  '/assets/foto-libreria/2.jpg',
                  '/assets/foto-libreria/3.jpg',
                  '/assets/foto-libreria/4.jpg',
                ],
          })
        }
      })
      .catch((err) => {
        console.error('Failed to fetch offerta speciale global:', err)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  // Timer to auto-scroll covers if they exceed 3
  useEffect(() => {
    const totalCovers = offerta.immagini.length
    if (totalCovers > 3) {
      const interval = setInterval(() => {
        setCoverIndex((prev) => {
          const maxIndex = totalCovers - 3
          return prev >= maxIndex ? 0 : prev + 1
        })
      }, 3000)
      return () => clearInterval(interval)
    } else {
      setCoverIndex(0)
    }
  }, [offerta.immagini])

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

  // Timer for the Negozio slideshow (transitions every 3 seconds)
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
        .scrollbar-none::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-none {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .offerta-carousel-track {
          transform: translateX(var(--mobile-translate, 0px));
        }
        @media (min-width: 768px) {
          .offerta-carousel-track {
            transform: translateX(var(--desktop-translate, 0px));
          }
        }
        .bacheca-grid-container-parent [data-slot="carousel-content"] {
          padding: 6px 6px 12px 6px;
          margin: -6px -6px -12px -6px;
        }
      `}</style>

      {/* Carousel wrapper with a parent class to prevent card border clipping */}
      <div className="bacheca-grid-container-parent w-full">
        <Carousel
          opts={{
            align: 'start',
            slidesToScroll: 1,
            skipSnaps: false,
            breakpoints: {
              '(min-width: 768px)': { active: false }, // Deactivate Carousel on tablet/desktop
            },
          }}
          className="w-full"
        >
          <CarouselContent className="bacheca-grid-container -ml-2 sm:-ml-3 touch-pan-y select-none md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-3 md:ml-0 md:overflow-visible">

            {/* Column 1: Row 1 = Card 1 (Scuola), Row 2 = Card 4 (LybroApp) */}
            <CarouselItem className="pl-2 sm:pl-3 basis-[80%] select-none flex flex-col gap-2 md:pl-0 md:basis-auto md:w-auto md:gap-3">
              
              {/* Row 1, Col 1 (Card 1): "Scuola" (Libri scolastici nuovi e usati - Orange Gradient) */}
              <div
                className={`group relative flex flex-col justify-between h-52 bg-gradient-to-br from-orange-500 to-amber-500 text-white rounded-xl p-6 shadow-md border border-orange-400/20 transition-all duration-500 hover:scale-[1.02] hover:shadow-lg hover:-translate-y-1 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500 ${animatedCard === 0 ? 'animate-bacheca-card' : ''
                  }`}
              >
                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div className="flex justify-between items-start w-full">
                    <div className="min-w-0 flex-1">
                      <div className="text-xs uppercase tracking-widest text-white font-sans font-semibold">
                        Scuola
                      </div>
                      <h3 className="font-sans text-sm sm:text-base font-bold leading-snug text-white mt-1 pr-6" title="Libri scolastici nuovi e usati">
                        Libri scolastici nuovi e usati
                      </h3>
                    </div>
                    <div className="relative w-8 h-8 select-none shrink-0 ml-2">
                      <Image
                        src="/assets/libro.png"
                        alt="Icona Libro"
                        fill
                        sizes="32px"
                        className="object-contain"
                      />
                    </div>
                  </div>

                  <div className="w-full mt-auto pt-2 border-t border-white/20">
                    <p className="text-xs text-orange-50 leading-normal font-sans font-medium">
                      Prenota oggi i tuoi libri per le scuole elementari, medie e superiori ed evita le code a settembre.
                    </p>
                  </div>
                </div>
              </div>

              {/* Row 2, Col 1 (Card 4): "LybroApp" (Scaricala subito - Cream/Amber) */}
              <div
                className={`group relative flex flex-col justify-between h-52 bg-amber-50/80 text-zinc-800 rounded-xl p-6 shadow-md border border-amber-200/60 transition-all duration-500 hover:scale-[1.02] hover:shadow-lg hover:-translate-y-1 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500 [animation-delay:150ms] ${animatedCard === 3 ? 'animate-bacheca-card' : ''
                  }`}
              >
                <div className="absolute -top-12 -right-12 w-24 h-24 bg-orange-500/5 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500" />

                {/* Header Title & Top-Right Logo */}
                <div className="flex justify-between items-start w-full">
                  <div className="min-w-0 flex-1">
                    <div className="text-xs uppercase tracking-widest text-orange-500 font-sans font-semibold mt-1">
                      LybroApp
                    </div>
                    <h3 className="font-sans text-sm sm:text-base font-bold leading-snug text-orange-500 mt-1" title="Scaricala subito">
                      Scaricala subito
                    </h3>
                  </div>
                  <div className="relative w-8 h-8 select-none shrink-0 ml-2">
                    <Image
                      src="/assets/lybro-app.jpg"
                      alt="Icona Lybro"
                      fill
                      sizes="32px"
                      className="object-contain rounded-md"
                    />
                  </div>
                </div>

                {/* Description & Link */}
                <div className="flex-grow flex items-center my-2">
                  <p className="text-xs text-zinc-600 leading-normal font-sans">
                    Da oggi puoi seguire lo stato dei tuoi ordini con la nostra applicazione per Android e Apple con LybroApp.{' '}
                    <Link
                      href="/lybro-app"
                      className="inline-flex items-center gap-1 text-xs font-bold text-orange-500 hover:text-orange-600 transition-colors font-sans cursor-pointer whitespace-nowrap"
                    >
                      Vai a Lybro &gt;
                    </Link>
                  </p>
                </div>
              </div>

            </CarouselItem>

            {/* Column 2: Row 1 = Card 2 (Slideshow Negozio), Row 2 = Card 5 (Offerta Speciale) */}
            <CarouselItem className="pl-2 sm:pl-3 basis-[80%] select-none flex flex-col gap-2 md:pl-0 md:basis-auto md:w-auto md:gap-3">
              
              {/* Row 1, Col 2 (Card 2): Carosello immagini negozio ("A Messina dal 1932") */}
              <Link
                href="/la-libreria"
                className={`group relative flex flex-col justify-between h-52 bg-[#363537] rounded-xl overflow-hidden shadow-md border border-zinc-700/60 transition-all duration-500 hover:scale-[1.02] hover:shadow-lg hover:-translate-y-1 animate-in fade-in slide-in-from-bottom-4 duration-500 [animation-delay:50ms] block cursor-pointer ${animatedCard === 1 ? 'animate-bacheca-card' : ''
                  }`}
              >
                {/* Automatic slideshow images from assets */}
                {slideshowImages.map((src, index) => (
                  <Image
                    key={src}
                    src={src}
                    alt={`Libreria Slide ${index + 1}`}
                    fill
                    sizes="(max-width: 768px) 50vw, 30vw"
                    className={`object-contain transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100 z-0' : 'opacity-0'
                      }`}
                  />
                ))}
                {/* Bottom gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />

                {/* Dots Indicator */}
                <div className="absolute top-4 right-4 z-20 flex gap-1">
                  {slideshowImages.map((_, index) => (
                    <div
                      key={index}
                      className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${index === currentSlide ? 'bg-orange-500' : 'bg-white/40'
                        }`}
                    />
                  ))}
                </div>

                {/* Footer text */}
                <div className="relative z-20 p-5 h-full flex flex-col justify-end text-white">
                  <span className="text-xs uppercase tracking-widest text-center text-zinc-100 drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)] font-sans">
                    a Messina dal 1932
                  </span>
                </div>
              </Link>

              {/* Row 2, Col 2 (Card 5): Card Custom Offerta Speciale (Link to /offerta-speciale) */}
              <Link
                href="/novita-risalto"
                className={`group relative flex flex-col justify-between h-52 bg-amber-50/80 text-zinc-800 rounded-xl p-6 shadow-md border border-amber-200/60 transition-all duration-500 hover:scale-[1.02] hover:shadow-lg hover:-translate-y-1 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500 [animation-delay:200ms] block cursor-pointer ${animatedCard === 4 ? 'animate-bacheca-card' : ''
                  }`}
              >
                <div className="absolute -top-12 -right-12 w-24 h-24 bg-orange-500/5 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500" />

                {isLoading ? (
                  <div className="flex-grow flex items-center justify-center h-full w-full">
                    <div className="animate-spin rounded-full h-8 w-8 border-2 border-orange-500 border-t-transparent" />
                  </div>
                ) : (
                  <div className="relative z-10 min-w-0 flex flex-col h-full justify-between">
                    <div className="flex justify-between items-start w-full">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between pr-2">
                          <span className="text-xs uppercase tracking-widest text-orange-500 font-sans font-semibold">
                            {offerta.titolo}
                          </span>
                          <span className="text-xs font-bold text-orange-600 hover:text-orange-700 transition-colors font-sans">
                            Scopri &gt;
                          </span>
                        </div>
                        <h3 className="font-sans text-sm sm:text-base font-bold leading-snug text-orange-500 mt-1 pr-4" title={offerta.sottotitolo}>
                          {offerta.sottotitolo}
                        </h3>
                      </div>
                      <div className="w-8 h-8 select-none shrink-0 ml-2">
                        <img
                          src="/assets/offerta.png"
                          alt="Icona Offerta"
                          className="w-full h-full object-contain"
                        />
                      </div>
                    </div>

                    {/* Horizontal scrolling cover carousel */}
                    <div className="relative w-full overflow-hidden mt-auto py-1">
                      <div
                        className="flex gap-2.5 transition-transform duration-500 ease-in-out offerta-carousel-track"
                        style={
                          {
                            '--mobile-translate': `-${coverIndex * (72 + 10)}px`,
                            '--desktop-translate': `-${coverIndex * (72 + 10)}px`,
                          } as React.CSSProperties
                        }
                      >
                        {offerta.immagini.map((src, idx) => (
                          <div
                            key={idx}
                            className="relative h-24 aspect-[3/4] bg-transparent shrink-0 w-[72px] flex items-center justify-center filter drop-shadow-[0_3px_6px_rgba(0,0,0,0.14)]"
                          >
                            <Image
                              src={src}
                              alt={`Copertina ${idx + 1}`}
                              fill
                              sizes="72px"
                              className="object-contain object-center rounded-[2px]"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </Link>

            </CarouselItem>

            {/* Column 3: Row 1 = Card 3 (Bonus), Row 2 = Card 6 (Community) */}
            <CarouselItem className="pl-2 sm:pl-3 basis-[80%] select-none flex flex-col gap-2 md:pl-0 md:basis-auto md:w-auto md:gap-3">
              
              {/* Row 1, Col 3 (Card 3): "Bonus" (Carte cultura 2026 e carta docente - Azure) */}
              <div
                className={`group relative flex flex-col justify-between h-52 bg-[#007fff] text-white rounded-xl p-6 shadow-md border border-blue-400/20 transition-all duration-500 hover:scale-[1.02] hover:shadow-lg hover:-translate-y-1 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500 [animation-delay:100ms] ${animatedCard === 2 ? 'animate-bacheca-card' : ''
                  }`}
              >
                <Image
                  src="/assets/carte-cultura.png"
                  alt="Carte Cultura 2026"
                  fill
                  sizes="(max-width: 768px) 50vw, 30vw"
                  className="object-contain opacity-20 transition-opacity duration-500 z-0"
                />

                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div className="flex justify-between items-start w-full">
                    <div className="min-w-0 flex-1">
                      <div className="text-xs uppercase tracking-widest text-blue-100 font-sans font-semibold">
                        Bonus
                      </div>
                      <h3 className="font-sans text-sm sm:text-base font-bold leading-snug text-white mt-1 pr-4" title="Carte cultura 2026 e carta docente">
                        Carte cultura 2026 e carta docente
                      </h3>
                    </div>
                    <div className="relative w-8 h-8 select-none shrink-0 ml-2">
                      <Image
                        src="/assets/smartphone.png"
                        alt="Icona Bonus"
                        fill
                        sizes="32px"
                        className="object-contain"
                      />
                    </div>
                  </div>

                  <div className="w-full mt-auto pt-2 border-t border-white/20">
                    <p className="text-xs text-blue-50 leading-normal font-sans font-medium">
                      Carta della Cultura Giovani e Carta del Merito : spendi qui il tuo buono, fino a 500€ per l'acquisto di libri.{' '}
                      <Link
                        href="/carta-docente"
                        className="inline-flex items-center gap-1 text-xs font-bold text-white hover:text-blue-100 transition-colors font-sans cursor-pointer whitespace-nowrap"
                      >
                        Altre info &gt;
                      </Link>
                    </p>
                  </div>
                </div>
              </div>

              {/* Row 2, Col 3 (Card 6): "Community" (Seguici sui Social - Facebook & Instagram) */}
              <div
                className={`group relative flex flex-col justify-between h-52 bg-[#007fff] text-white rounded-xl p-6 shadow-md border border-blue-400/20 transition-all duration-500 hover:scale-[1.02] hover:shadow-lg hover:-translate-y-1 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500 [animation-delay:250ms] ${animatedCard === 5 ? 'animate-bacheca-card' : ''
                  }`}
              >
                <div className="absolute -top-12 -right-12 w-24 h-24 bg-white/10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500" />

                <div className="flex justify-between items-start w-full">
                  <div className="min-w-0 flex-1">
                    <div className="text-xs uppercase tracking-widest text-blue-100 font-sans font-semibold">
                      Community
                    </div>
                    <h3 className="font-sans text-sm sm:text-base font-bold leading-snug mt-1" title="Seguici sui Social">
                      Seguici sui Social
                    </h3>
                  </div>
                  <div className="relative w-8 h-8 select-none shrink-0 ml-2">
                    <Image
                      src="/assets/social.png"
                      alt="Icona Social"
                      fill
                      sizes="32px"
                      className="object-contain"
                    />
                  </div>
                </div>

                {/* Side-by-side Connection Badges centered horizontally at the bottom */}
                <div className="flex gap-2 sm:gap-3 mt-auto justify-center items-center w-full z-10 px-0.5 sm:px-1">
                  {/* Facebook Badge */}
                  <a
                    href="https://www.facebook.com/librerianunnari/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 max-w-[140px] sm:max-w-[150px] bg-white/10 backdrop-blur-sm rounded-xl p-2 sm:p-3 flex flex-col justify-between items-center text-center border border-white/15 h-[90px] sm:h-[100px] hover:bg-white/20 transition-colors z-10 block cursor-pointer"
                  >
                    <div className="flex items-center gap-1 sm:gap-1.5">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white fill-white" viewBox="0 0 24 24" style={{ fill: 'white' }}>
                        <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                      </svg>
                      <span className="text-[10px] sm:text-xs font-bold font-sans tracking-wide text-white">Facebook</span>
                    </div>
                    <span className="w-full text-[10px] sm:text-xs font-bold uppercase tracking-normal sm:tracking-wider bg-white text-[#007fff] py-1 sm:py-1.5 rounded shadow-sm transition-colors font-sans mt-1.5 sm:mt-2.5">
                      Mi Piace
                    </span>
                  </a>

                  {/* Instagram Badge */}
                  <a
                    href="https://www.instagram.com/librerianunnarisfameni/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 max-w-[140px] sm:max-w-[150px] bg-white/10 backdrop-blur-sm rounded-xl p-2 sm:p-3 flex flex-col justify-between items-center text-center border border-white/15 h-[90px] sm:h-[100px] hover:bg-white/20 transition-colors z-10 block cursor-pointer"
                  >
                    <div className="flex items-center gap-1 sm:gap-1.5">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white fill-white" viewBox="0 0 24 24" style={{ fill: 'white' }}>
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                      <span className="text-[10px] sm:text-xs font-bold font-sans tracking-wide text-white">Instagram</span>
                    </div>
                    <span className="w-full text-[10px] sm:text-xs font-bold uppercase tracking-normal sm:tracking-wider bg-white text-[#007fff] py-1 sm:py-1.5 rounded shadow-sm transition-colors font-sans mt-1.5 sm:mt-2.5">
                      Segui
                    </span>
                  </a>
                </div>
              </div>

            </CarouselItem>

          </CarouselContent>
        </Carousel>
      </div>
    </>
  )
}
