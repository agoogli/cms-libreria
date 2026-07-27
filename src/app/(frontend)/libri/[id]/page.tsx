import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { getPayload } from 'payload'
import config from '@/payload.config'

interface PageProps {
  params: Promise<{
    id: string
  }>
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params
  let book: any = null

  try {
    const payload = await getPayload({ config })
    book = await payload.findByID({
      collection: 'libri',
      id: id,
      depth: 1,
      overrideAccess: true,
    })
  } catch (error) {
    console.error('Error fetching book metadata:', error)
  }

  return {
    title: book ? `${book.titolo} - Libreria Nunnari & Sfameni` : 'Dettaglio Libro',
    description: book ? `Dettagli del libro "${book.titolo}" di ${book.autore || 'Autore Sconosciuto'}` : 'Dettaglio del libro selezionato.',
  }
}

export default async function BookDetailPage({ params }: PageProps) {
  const { id } = await params
  let book: any = null

  try {
    const payload = await getPayload({ config })
    book = await payload.findByID({
      collection: 'libri',
      id: id,
      depth: 2,
      overrideAccess: true,
    })
  } catch (error) {
    console.error('Error fetching book details:', error)
  }

  if (!book) {
    return (
      <div className="w-full lg:w-[60%] mx-auto px-4 pt-3 pb-2 flex flex-col gap-3">
        <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-orange-600 hover:text-orange-700 font-bold uppercase tracking-wider font-sans transition-colors self-start mb-2">
          &larr; Torna alla Home
        </Link>
        <p className="text-sm text-zinc-500 font-sans py-8 text-center bg-white border border-zinc-200/80 rounded-xl">
          Libro non trovato o id non valido.
        </p>
      </div>
    )
  }

  // Formatting cover image
  let imageUrl = ''
  let imageAlt = book.titolo

  if (book.imgCopertina && typeof book.imgCopertina === 'object') {
    imageUrl = (book.imgCopertina as any).url || ''
    imageAlt = (book.imgCopertina as any).alt || book.titolo
  } else if (typeof book.imgCopertina === 'string') {
    imageUrl = book.imgCopertina
  }

  // Pricing formatting
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

  // Sector name formatting
  const sectorName = book.settore && typeof book.settore === 'object'
    ? (book.settore as any).nome
    : 'Novità'

  // Editore name resolution (whether editore is a populated relationship object or a legacy string)
  let editoreName: string | null = null
  if (book.editore) {
    if (typeof book.editore === 'object' && book.editore.nome) {
      editoreName = book.editore.nome
    } else if (typeof book.editore === 'string') {
      editoreName = book.editore
    }
  }

  return (
    <div className="w-full lg:w-[60%] mx-auto px-4 pt-3 pb-2 flex flex-col gap-3">
      {/* Back button */}
      <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-orange-600 hover:text-orange-700 font-bold uppercase tracking-wider font-sans transition-colors self-start mb-2">
        &larr; Torna alla Home
      </Link>

      {/* Book details card */}
      <div className="flex flex-col md:flex-row gap-8 bg-white border border-zinc-200/80 rounded-xl p-6 shadow-md mt-1">
        {/* Cover Column */}
        <div className="w-full md:w-1/3 flex flex-col items-center justify-center">
          <div className="relative aspect-[3/4] w-full max-w-[200px] md:max-w-[270px] bg-transparent select-none flex items-center justify-center filter drop-shadow-[0_8px_18px_rgba(0,0,0,0.16)]">
            {formattedDiscountPrice && (
              <div className="absolute -top-1 -right-1 bg-orange-600 text-white text-[10px] font-bold w-6 h-6 rounded-full flex items-center justify-center z-20 font-sans shadow-sm animate-pulse">
                %
              </div>
            )}
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={imageAlt}
                fill
                sizes="(max-width: 768px) 200px, 300px"
                className="object-contain object-center rounded-[2px]"
                priority
              />
            ) : (
              <div className="absolute inset-0 rounded-[2px] overflow-hidden bg-gradient-to-br from-zinc-800 via-zinc-900 to-black flex flex-col justify-between p-4 text-center border-l-4 border-orange-500 shadow-sm">
                <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-sans mt-1">
                  {book.autore || 'Autore Sconosciuto'}
                </span>
                <span className="font-sans text-xs text-zinc-200 font-semibold line-clamp-3">
                  {book.titolo}
                </span>
                <span className="text-[8px] uppercase tracking-widest text-orange-500/80 font-sans mb-1">
                  Libreria Nunnari
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Info Column */}
        <div className="w-full md:w-2/3 flex flex-col justify-between">
          <div>
            <div className="text-xs uppercase tracking-widest text-orange-500 font-sans font-semibold">
              {sectorName}
            </div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-zinc-900 mt-1 leading-snug">
              {book.titolo}
            </h2>
            {book.autore && (
              <p className="text-sm font-sans text-zinc-700 mt-1.5 font-medium">
                di <span className="text-zinc-900">{book.autore}</span>
              </p>
            )}
            {editoreName && (
              <p className="text-xs font-sans text-zinc-500 mt-0.5">
                Editore: <span className="font-semibold text-zinc-700">{editoreName}</span>
              </p>
            )}

            {/* Pricing */}
            <div className="flex items-baseline gap-2.5 mt-4">
              {formattedDiscountPrice ? (
                <>
                  <span className="text-lg font-bold text-orange-600">{formattedDiscountPrice}</span>
                  <span className="text-xs text-zinc-400 line-through">{formattedPrice}</span>
                </>
              ) : (
                <span className="text-lg font-bold text-orange-600">{formattedPrice}</span>
              )}
            </div>

            {/* Additional details */}
            <div className="mt-5 pt-4 border-t border-zinc-100 grid grid-cols-2 gap-4 text-xs">
              {book.ean && (
                <div>
                  <span className="text-zinc-400 block font-sans">Codice EAN:</span>
                  <span className="text-zinc-700 font-bold font-mono">{book.ean}</span>
                </div>
              )}
              {book.annoPubblicazione && (
                <div>
                  <span className="text-zinc-400 block font-sans">Anno Edizione:</span>
                  <span className="text-zinc-700 font-semibold">{book.annoPubblicazione}</span>
                </div>
              )}
            </div>

            {/* Description */}
            <div className="mt-5 pt-4 border-t border-zinc-100">
              <span className="text-xs text-zinc-400 block font-sans mb-1.5">Descrizione:</span>
              <p className="text-xs text-zinc-600 leading-relaxed font-sans whitespace-pre-wrap">
                {book.descrizione || "Nessuna descrizione dettagliata disponibile per questo testo al momento. Per informazioni sulla disponibilità o per riservare una copia, puoi contattarci direttamente cliccando sui pulsanti sottostanti."}
              </p>
            </div>
          </div>

          {/* Call to Actions */}
          <div className="mt-6 flex flex-wrap gap-2.5">
            <a
              href="tel:+39090710469"
              className="inline-flex items-center justify-center text-[10px] font-bold uppercase tracking-wider bg-orange-600 text-white px-3.5 py-2 rounded-lg shadow-sm hover:bg-orange-700 transition-colors font-sans"
            >
              Chiama per info
            </a>
            <a
              href="https://wa.me/393276687839"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center text-[10px] font-bold uppercase tracking-wider bg-green-600 text-white px-3.5 py-2 rounded-lg shadow-sm hover:bg-green-700 transition-colors font-sans"
            >
              Chiedi su WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
