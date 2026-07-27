import React from 'react'
import Image from 'next/image'

export interface BookCardProps {
  book: {
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
}

export function BookCard({ book }: BookCardProps) {
  // Resolve editore name whether editore is a populated object or a raw string
  let editoreNome: string | null = null
  if (book.editore) {
    if (typeof book.editore === 'object' && book.editore.nome) {
      editoreNome = book.editore.nome
    } else if (typeof book.editore === 'string') {
      editoreNome = book.editore
    }
  }

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

  const formattedDiscountPrice = book.prezzoScontato !== undefined && book.prezzoScontato !== null
    ? new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'EUR',
    }).format(book.prezzoScontato)
    : null

  return (
    <div
      title={book.titolo}
      className="group cursor-pointer flex flex-col h-full select-none bg-white p-4 rounded-lg border border-zinc-200/80 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 ease-out font-sans"
    >
      {/* Book Cover Container - transparent wrapper with soft natural drop shadow */}
      <div className="px-5 py-2.5">
        <div className="relative aspect-[3/4] w-full bg-transparent flex items-center justify-center filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.12)] group-hover:drop-shadow-[0_8px_12px_rgba(0,0,0,0.18)] transition-all duration-300">
          {formattedDiscountPrice && (
            <div className="absolute -top-1 -right-1 bg-orange-600 text-white text-[10px] font-bold w-6 h-6 rounded-full flex items-center justify-center z-20 font-sans shadow-sm">
              %
            </div>
          )}
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={imageAlt}
              fill
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 25vw, 10vw"
              className="object-contain object-center group-hover:scale-105 transition-transform duration-500 ease-out rounded-[2px]"
              priority={false}
              draggable={false}
            />
          ) : (
            /* Fallback Cover: Elegant gradient with initials for books without images */
            <div className="absolute inset-0 rounded-[2px] overflow-hidden bg-gradient-to-br from-zinc-800 via-zinc-900 to-black flex flex-col justify-between p-2.5 text-center border-l-4 border-orange-500 shadow-sm">
              <div className="text-[9px] uppercase tracking-widest text-zinc-500 font-sans mt-1">
                {book.autore || 'Autore Sconosciuto'}
              </div>
              <div className="font-sans text-xs sm:text-sm text-zinc-200 font-semibold line-clamp-3 my-auto px-1">
                {book.titolo}
              </div>
              <div className="text-[8px] uppercase tracking-widest text-orange-500/80 font-sans mb-1">
                Nunnari
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Book Details (Inter font, increased horizontal padding, compacted vertical spacing) */}
      <div className="mt-2.5 flex flex-col flex-grow px-1">
        <h3 className="font-sans text-xs sm:text-sm font-bold text-zinc-900 line-clamp-3 group-hover:text-orange-600 transition-colors duration-200 leading-tight">
          {book.titolo}
        </h3>
        <p className="text-[11px] sm:text-xs text-zinc-500 mt-0.5 line-clamp-2 font-sans font-normal">
          {book.autore || 'Autori vari'}
          {editoreNome ? ` - ${editoreNome}` : ''}
        </p>
        <div className="mt-auto flex items-center justify-between border-t border-zinc-100/80 pt-1.5">
          {formattedDiscountPrice ? (
            <div className="flex items-center justify-between w-full">
              <span className="text-xs sm:text-sm font-bold text-orange-600 font-sans">
                {formattedDiscountPrice}
              </span>
              <span className="text-xs sm:text-sm text-zinc-400 line-through font-sans">
                {formattedPrice}
              </span>
            </div>
          ) : (
            <span className="text-xs sm:text-sm font-bold text-orange-600 font-sans">
              {formattedPrice}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
