import React from 'react'
import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { BookCard } from '@/components/BookCard'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Ultime Novità - Libreria Nunnari & Sfameni',
  description: 'Le ultime novità e gli ultimi libri caricati alla Libreria Nunnari & Sfameni.',
}

export default async function LibriPage() {
  let books: any[] = []
  
  try {
    const payload = await getPayload({ config })
    
    // Fetch all books sorted by newest first, max 100
    const booksResponse = await payload.find({
      collection: 'libri',
      depth: 2,
      limit: 100,
      sort: '-updatedAt',
      overrideAccess: true,
    })
    
    books = booksResponse.docs || []
  } catch (error) {
    console.error('Error fetching books in libri page:', error)
  }

  return (
    <div className="w-full max-w-[1152px] mx-auto px-4 pt-3 pb-2 flex flex-col gap-3">
      {/* Title */}
      <div className="text-left">
        <span className="text-xs uppercase tracking-widest text-orange-600 font-sans font-bold">
          Novità: Ultime Uscite (Max 100)
        </span>
      </div>

      {/* Grid wrapper */}
      <div className="mt-1 flex flex-col gap-4">
        {books.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {books.map((book) => (
              <Link key={book.id} href={`/libri/${book.id}`} className="block h-full">
                <BookCard book={book} />
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-sm text-zinc-500 font-sans py-8 text-center">
            Nessun libro disponibile al momento.
          </p>
        )}
      </div>
    </div>
  )
}
