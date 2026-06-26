'use client'

import React from 'react'
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
  prezzo: number
  imgCopertina?: {
    url?: string | null
    alt?: string | null
  } | number | null
}

interface BookCarouselProps {
  books: Book[]
}

export function BookCarousel({ books }: BookCarouselProps) {
  // If there are no books, we show a message
  if (!books || books.length === 0) {
    return (
      <div className="w-full lg:w-[60%] mx-auto px-4 py-16 text-center text-zinc-500">
        Nessun libro disponibile al momento.
      </div>
    )
  }

  return (
    <section className="w-full bg-transparent py-12 text-zinc-900">
      {/* 60% width container on desktop */}
      <div className="w-full lg:w-[60%] mx-auto px-4">
        {/* Section Title */}
        <div className="flex justify-between items-end mb-6">
          <div>
            <span className="text-xs uppercase tracking-widest text-orange-600 font-sans font-bold">
              Ultime Uscite
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-zinc-900 mt-1">
              Novità in Vetrina
            </h2>
          </div>
          <div className="text-xs text-zinc-500 font-sans">
            Mostrati {Math.min(books.length, 6)} di {books.length} libri
          </div>
        </div>

        {/* Carousel Wrapper */}
        <div className="relative px-8 sm:px-0">
          <Carousel
            opts={{
              align: 'start',
              slidesToScroll: 6, // Advances by 6 items on desktop
              breakpoints: {
                '(max-width: 640px)': { slidesToScroll: 1 }, // 1 on mobile
                '(max-width: 1024px)': { slidesToScroll: 2 }, // 2 on tablet
                '(max-width: 1280px)': { slidesToScroll: 4 }, // 4 on small desktop
              },
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4 sm:-ml-6">
              {books.map((book) => (
                <CarouselItem
                  key={book.id}
                  className="pl-4 sm:pl-6 basis-full sm:basis-1/2 md:basis-1/4 lg:basis-1/6"
                >
                  <div className="h-full pb-2">
                    <BookCard book={book} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Navigation Arrows positioned on the sides */}
            <CarouselPrevious className="absolute -left-4 sm:-left-12 lg:-left-16 bg-white border-zinc-200 text-zinc-700 hover:bg-orange-500 hover:text-white hover:border-orange-500 shadow-md transition-all duration-200 w-10 h-10 sm:w-12 sm:h-12" />
            <CarouselNext className="absolute -right-4 sm:-right-12 lg:-right-16 bg-white border-zinc-200 text-zinc-700 hover:bg-orange-500 hover:text-white hover:border-orange-500 shadow-md transition-all duration-200 w-10 h-10 sm:w-12 sm:h-12" />
          </Carousel>
        </div>
      </div>
    </section>
  )
}
