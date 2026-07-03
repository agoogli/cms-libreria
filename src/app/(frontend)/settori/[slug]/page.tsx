import React from 'react'
import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { BookCard } from '@/components/BookCard'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const sectorName = slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
  return {
    title: `${sectorName} - Libreria Nunnari & Sfameni`,
    description: `Libri e testi del settore ${sectorName} a Messina.`,
  }
}

export default async function SectorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  
  const payload = await getPayload({ config })
  
  // 1. Fetch sectors list to find the matching sector by slug
  const sectorsResponse = await payload.find({
    collection: 'settori',
    limit: 100,
    overrideAccess: true,
  })
  
  const sector = sectorsResponse.docs.find(
    (s: any) => s.nome.toLowerCase().replace(/\s+/g, '-') === slug
  )
  
  let books: any[] = []
  let sectorName = slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
  
  if (sector) {
    sectorName = sector.nome
    // 2. Fetch all books in this sector
    const booksResponse = await payload.find({
      collection: 'libri',
      depth: 2,
      limit: 100,
      sort: '-createdAt',
      where: {
        settore: {
          equals: sector.id,
        },
      },
      overrideAccess: true,
    })
    books = booksResponse.docs || []
  }

  return (
    <div className="w-full lg:w-[60%] mx-auto px-4 pt-3 pb-2 flex flex-col gap-3">
      {/* Title */}
      <div className="text-left">
        <span className="text-xs uppercase tracking-widest text-orange-600 font-sans font-bold">
          Settore: {sectorName}
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
            Nessun libro disponibile in questo settore al momento.
          </p>
        )}
      </div>
    </div>
  )
}
