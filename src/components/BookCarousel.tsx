'use client'

import React from 'react'
import Link from 'next/link'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './ui/carousel'
import { BookCard } from './BookCard'

interface Book {
  id: number | string
  titolo: string
  autore?: string | null
  editore?: { nome?: string | null } | string | null
  prezzo: number
  prezzoScontato?: number | null
  imgCopertina?: {
    url?: string | null
    alt?: string | null
  } | number | null
}

interface BookCarouselProps {
  books: Book[]
  title: string
  viewAllHref?: string
}

export function BookCarousel({ books, title, viewAllHref = '#' }: BookCarouselProps) {
  // If there are no books, we show a message
  if (!books || books.length === 0) {
    return (
      <div className="w-full lg:w-[60%] mx-auto px-4 py-16 text-center text-zinc-500">
        Nessun libro disponibile nel settore {title} al momento.
      </div>
    )
  }

  return (
    <section className="w-full bg-transparent pt-3 pb-0 text-zinc-900">
      {/* 60% width container on desktop, aligned left on mobile (pl-4 pr-0), normal on desktop (lg:px-4) */}
      <div className="w-full lg:w-[60%] mx-auto pl-4 pr-0 lg:px-4">
        {/* Section Header (needs standard right margin on mobile, so we add pr-4) */}
        <div className="flex justify-between items-center mb-3 pr-4 lg:pr-0">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#363537] font-sans font-bold">
              {title}
            </span>
          </div>
          <div>
            <Link
              href={viewAllHref}
              className="text-xs font-bold uppercase tracking-wider !text-orange-600 hover:!text-orange-700 transition-colors font-sans"
            >
              Vedi tutti &gt;
            </Link>
          </div>
        </div>

        {/* Carousel Wrapper */}
        <div className="relative">
          <Carousel
            opts={{
              align: 'start',
              slidesToScroll: 1, // Default for mobile (width < 640px)
              skipSnaps: false,  // Prevents skipping slides on fast swipes
              breakpoints: {
                '(min-width: 640px)': { slidesToScroll: 2, skipSnaps: false },  // Tablet
                '(min-width: 1024px)': { slidesToScroll: 4, skipSnaps: false }, // Small Desktop
                '(min-width: 1280px)': { slidesToScroll: 6, skipSnaps: false }, // Large Desktop
              },
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 sm:-ml-3 touch-pan-y select-none">
              {books.map((book, index) => (
                <CarouselItem
                  key={`${book.id || index}-${index}`}
                  className="pl-2 sm:pl-3 basis-2/3 sm:basis-1/2 md:basis-1/4 lg:basis-1/6 select-none"
                >
                  <Link href={`/libri/${book.id}`} className="block h-full pb-2">
                    <BookCard book={book} />
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Navigation Arrows positioned on the sides, hidden on mobile/tablet (screens < 1024px) and shown on desktop */}
            <CarouselPrevious className="hidden lg:inline-flex absolute -left-4 sm:-left-12 lg:-left-16 bg-white border-zinc-200 text-zinc-700 hover:bg-orange-500 hover:text-white hover:border-orange-500 shadow-md transition-all duration-200 w-10 h-10 sm:w-12 sm:h-12" />
            <CarouselNext className="hidden lg:inline-flex absolute -right-4 sm:-right-12 lg:-right-16 bg-white border-zinc-200 text-zinc-700 hover:bg-orange-500 hover:text-white hover:border-orange-500 shadow-md transition-all duration-200 w-10 h-10 sm:w-12 sm:h-12" />
          </Carousel>
        </div>
      </div>
    </section>
  )
}
