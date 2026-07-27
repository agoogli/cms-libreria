import React from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { BookCarousel } from '@/components/BookCarousel'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Novità in Risalto - Libreria Nunnari & Sfameni',
  description: 'Scopri i volumi in risalto e le ultime novità alla Libreria Nunnari & Sfameni.',
}

export default async function NovitaRisaltoPage() {
  let books: any[] = []

  try {
    const payloadConfig = await config
    const payload = await getPayload({ config: payloadConfig })

    // Fetch books from backend sorted by newest first
    const response = await payload.find({
      collection: 'libri',
      depth: 2,
      limit: 100,
      sort: '-updatedAt',
      overrideAccess: true,
    })

    books = response.docs || []
  } catch (error) {
    console.error('Error fetching books in Novità in Risalto page:', error)
  }

  return (
    <div className="w-full py-4 flex flex-col gap-6">
      {/* Novità in Risalto Carousel with exact same size & styling as homepage carousels */}
      <BookCarousel
        books={books}
        title="Novità in Risalto"
        viewAllHref="/libri"
      />
    </div>
  )
}
