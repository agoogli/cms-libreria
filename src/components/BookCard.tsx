import React from 'react'
import Image from 'next/image'

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
    <div className="group cursor-pointer flex flex-col h-full select-none bg-white p-3 rounded-lg border border-zinc-200/80 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 ease-out">
      {/* Book Cover Container with 3D shadow and scale effects */}
      <div className="relative aspect-[3/4] w-full rounded-md overflow-hidden bg-zinc-100 shadow-sm border border-zinc-200/60">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 25vw, 10vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            priority={false}
          />
        ) : (
          /* Fallback Cover: Elegant gradient with initials for books without images */
          <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 via-zinc-900 to-black flex flex-col justify-between p-3 text-center border-l-4 border-orange-500">
            <div className="text-[9px] uppercase tracking-widest text-zinc-500 font-sans mt-1">
              {book.autore || 'Autore Sconosciuto'}
            </div>
            <div className="font-serif text-xs sm:text-sm text-zinc-200 line-clamp-3 my-auto px-1">
              {book.titolo}
            </div>
            <div className="text-[8px] uppercase tracking-widest text-orange-500/80 font-serif mb-1">
              Antigravità
            </div>
          </div>
        )}
        
        {/* Decorative Overlay for realistic book spine reflection */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-white/10 via-transparent to-black/10" />
      </div>

      {/* Book Details */}
      <div className="mt-3 flex flex-col flex-grow">
        <h3 className="font-serif text-xs sm:text-sm font-bold text-zinc-900 line-clamp-2 group-hover:text-orange-600 transition-colors duration-200 leading-tight">
          {book.titolo}
        </h3>
        <p className="text-[11px] text-zinc-500 mt-1 line-clamp-1 font-sans font-normal">
          {book.autore || 'Autore non specificato'}
        </p>
        <div className="mt-auto pt-2 flex items-center justify-between">
          <span className="text-xs sm:text-sm font-semibold text-orange-600 font-mono">
            {formattedPrice}
          </span>
          <span className="text-[9px] uppercase tracking-wider text-zinc-400 group-hover:text-zinc-600 transition-colors duration-200">
            Dettagli →
          </span>
        </div>
      </div>
    </div>
  )
}
