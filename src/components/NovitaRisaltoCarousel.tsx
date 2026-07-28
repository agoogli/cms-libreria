'use client'

import React from 'react'
import Image from 'next/image'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './ui/carousel'

interface NovitaRisaltoCarouselProps {
  images: Array<{
    url?: string | null
    alt?: string | null
  }>
}

export function NovitaRisaltoCarousel({ images }: NovitaRisaltoCarouselProps) {
  if (!images || images.length === 0) {
    return (
      <div className="w-full text-center py-12 text-zinc-500 font-sans text-sm bg-zinc-50 border border-zinc-200/60 rounded-lg">
        Nessuna immagine in risalto caricata al momento nel backoffice.
      </div>
    )
  }

  return (
    <div className="relative w-full max-w-2xl mx-auto px-8 sm:px-12 py-4">
      <Carousel
        opts={{
          align: 'center',
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 sm:-ml-4">
          {images.map((img, idx) => {
            const url = img?.url
            const alt = img?.alt || `Immagine in risalto ${idx + 1}`

            if (!url) return null

            return (
              <CarouselItem key={idx} className="pl-2 sm:pl-4 basis-full">
                <div className="flex flex-col items-center justify-center p-2">
                  <div className="relative aspect-[3/4] w-full max-w-[280px] sm:max-w-[340px] bg-transparent flex items-center justify-center filter drop-shadow-[0_8px_20px_rgba(0,0,0,0.18)]">
                    <Image
                      src={url}
                      alt={alt}
                      fill
                      sizes="(max-width: 768px) 280px, 340px"
                      className="object-contain object-center rounded-[2px]"
                      priority={idx === 0}
                    />
                  </div>
                </div>
              </CarouselItem>
            )
          })}
        </CarouselContent>

        <CarouselPrevious className="left-0 bg-white border-zinc-200 text-zinc-700 hover:bg-orange-500 hover:text-white hover:border-orange-500 shadow-md transition-colors w-10 h-10" />
        <CarouselNext className="right-0 bg-white border-zinc-200 text-zinc-700 hover:bg-orange-500 hover:text-white hover:border-orange-500 shadow-md transition-colors w-10 h-10" />
      </Carousel>
    </div>
  )
}
