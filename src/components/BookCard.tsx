import React from 'react'
import Image from 'next/image'
import { Card, CardContent } from './ui/card'

export interface BookCardProps {
  book: {
    id: number | string
    titolo: string
    autore?: string | null
    prezzo: number
    imgCopertina?: {
      url?: string | null
      alt?: string | null
    } | number | null
  }
}

export function BookCard({ book }: BookCardProps) {
  // Resolve image url and alt text from Payload Media object or mock object
  let imageUrl: string | null = null
  let imageAlt = book.titolo

  if (book.imgCopertina && typeof book.imgCopertina === 'object') {
    imageUrl = book.imgCopertina.url || null
    imageAlt = book.imgCopertina.alt || book.titolo
  }

  // Format the price in Italian Euros format (e.g., 18,90 €)
  const formattedPrice = new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency: 'EUR',
  }).format(book.prezzo)

  return (
    <div className="group cursor-pointer flex flex-col h-full select-none">
      {/* Book Cover Container with 3D shadow and scale effects */}
      <div className="relative aspect-[3/4] w-full rounded-md overflow-hidden bg-zinc-900 shadow-md group-hover:shadow-xl group-hover:-translate-y-1.5 transition-all duration-300 ease-out border border-zinc-800">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 15vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            priority={false}
          />
        ) : (
          /* Fallback Cover: Elegant gradient with initials for books without images */
          <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 via-zinc-900 to-black flex flex-col justify-between p-4 text-center border-l-4 border-orange-500">
            <div className="text-[10px] uppercase tracking-widest text-zinc-500 font-sans mt-2">
              {book.autore || 'Autore Sconosciuto'}
            </div>
            <div className="font-serif text-sm sm:text-base text-zinc-200 line-clamp-3 my-auto px-2">
              {book.titolo}
            </div>
            <div className="text-[9px] uppercase tracking-widest text-orange-500/80 font-serif mb-2">
              Antigravità
            </div>
          </div>
        )}
        
        {/* Decorative Overlay for realistic book spine reflection */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-white/10 via-transparent to-black/10" />
      </div>

      {/* Book Details */}
      <div className="mt-4 flex flex-col flex-grow">
        <h3 className="font-serif text-sm sm:text-base font-bold text-zinc-100 line-clamp-2 group-hover:text-orange-400 transition-colors duration-200 leading-tight">
          {book.titolo}
        </h3>
        <p className="text-xs text-zinc-400 mt-1 line-clamp-1 font-sans font-normal">
          {book.autore || 'Autore non specificato'}
        </p>
        <div className="mt-auto pt-2 flex items-center justify-between">
          <span className="text-sm font-semibold text-orange-400 font-mono">
            {formattedPrice}
          </span>
          <span className="text-[10px] uppercase tracking-wider text-zinc-500 group-hover:text-zinc-300 transition-colors duration-200">
            Dettagli →
          </span>
        </div>
      </div>
    </div>
  )
}
