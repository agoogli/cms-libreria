import React from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { PageWrapper } from '@/components/PageWrapper'
import { NovitaRisaltoCarousel } from '@/components/NovitaRisaltoCarousel'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Novità in Risalto - Libreria Nunnari & Sfameni',
  description: 'Scopri i volumi in risalto e le novità selezionate alla Libreria Nunnari & Sfameni.',
}

export default async function NovitaRisaltoPage() {
  let globalData: any = null

  try {
    const payloadConfig = await config
    const payload = await getPayload({ config: payloadConfig })

    globalData = await payload.findGlobal({
      slug: 'novita-in-risalto',
      depth: 2,
    })
  } catch (error) {
    console.error('Error fetching novita-in-risalto global:', error)
  }

  const titolo = globalData?.titolo || 'Novità in risalto'
  const sottotitolo = globalData?.sottotitolo || 'Kit Lettura Estiva'
  const immagini = (globalData?.immagini || [])
    .map((item: any) => item?.immagine)
    .filter(Boolean)

  return (
    <PageWrapper title={titolo}>
      <div className="w-full bg-white rounded-xl border border-zinc-200/80 p-6 shadow-md flex flex-col items-center gap-4">
        {sottotitolo && (
          <div className="text-center">
            <span className="text-xs uppercase tracking-widest font-sans font-bold text-orange-600">
              {sottotitolo}
            </span>
          </div>
        )}

        {/* Dedicated carousel showcasing max 5 images uploaded in Payload CMS backoffice */}
        <NovitaRisaltoCarousel images={immagini} />
      </div>
    </PageWrapper>
  )
}
