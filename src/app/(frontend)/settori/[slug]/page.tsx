import React from 'react'

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
  const sectorName = slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())

  return (
    <div className="w-full lg:w-[60%] mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold font-sans text-[#363537] mb-4 uppercase tracking-wide">
        {sectorName}
      </h2>
      {/* Contenuto da riempire */}
    </div>
  )
}
