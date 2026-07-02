import React from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { BookCard } from '@/components/BookCard'

// Helper function to slugify text consistently
const slugify = (text: string) =>
  text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const sectorsResponse = await payload.find({
    collection: 'settori',
    limit: 100,
    overrideAccess: true,
  })
  
  const targetSector = sectorsResponse.docs.find(
    (sec) => slugify(sec.nome) === slug
  )
  
  const sectorName = targetSector
    ? targetSector.nome
    : slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())

  return {
    title: `${sectorName} - Libreria Nunnari & Sfameni`,
    description: `Libri e testi del settore ${sectorName} a Messina.`,
  }
}

export default async function SectorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  // Find the sector matching the slug
  const sectorsResponse = await payload.find({
    collection: 'settori',
    limit: 100,
    overrideAccess: true,
  })
  
  const targetSector = sectorsResponse.docs.find(
    (sec) => slugify(sec.nome) === slug
  )
  
  const sectorName = targetSector
    ? targetSector.nome
    : slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())

  let dbBooks: any[] = []
  if (targetSector) {
    // Fetch books associated with the sector, sorted by newest (createdAt) to oldest
    const response = await payload.find({
      collection: 'libri',
      where: {
        settore: {
          equals: targetSector.id,
        },
      },
      sort: '-createdAt',
      limit: 100,
      depth: 2,
      overrideAccess: true,
    })
    dbBooks = response.docs || []
  }

  return (
    <div className="w-full lg:w-[60%] mx-auto px-4 pt-3 pb-8">
      {/* Sector Header with standard padding and margins matching the home page title spacing */}
      <div className="mb-3 text-left">
        <span className="text-xs uppercase tracking-widest text-orange-600 font-sans font-bold">
          Settore
        </span>
        <h2 className="text-2xl font-bold font-sans text-[#363537] mt-1 uppercase tracking-wide">
          {sectorName}
        </h2>
      </div>

      {/* Grid of Books */}
      {dbBooks.length === 0 ? (
        <div className="w-full text-center py-12 text-zinc-500 font-sans text-xs">
          Nessun libro disponibile in questo settore al momento.
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6 mt-4">
          {dbBooks.map((book) => (
            <div key={book.id} className="h-full">
              <BookCard book={book} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
