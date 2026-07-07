import React from 'react'
import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { BookCard } from '@/components/BookCard'
import { PageWrapper } from '@/components/PageWrapper'

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
    <PageWrapper title={`Settore: ${sectorName}`}>
      {books.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {books.map((book) => (
            <Link key={book.id} href={`/libri/${book.id}`} className="block h-full">
              <BookCard book={book} />
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-sm text-zinc-500 font-sans py-8 text-center bg-white border border-zinc-200/80 rounded-xl">
          Nessun libro disponibile in questo settore al momento.
        </p>
      )}
    </PageWrapper>
  )
}
