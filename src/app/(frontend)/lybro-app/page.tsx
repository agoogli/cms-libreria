import React from 'react'
import Image from 'next/image'
import { PageWrapper } from '@/components/PageWrapper'

export const metadata = {
  title: 'Scarica LybroApp - Libreria Nunnari & Sfameni',
  description: 'Traccia i tuoi ordini di libri in tempo reale con LybroApp, disponibile per iOS e Android.',
}

export default function LybroAppPage() {
  return (
    <PageWrapper title="LybroApp">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center mt-1">
        {/* Left Column: Text Features */}
        <div className="md:col-span-7 flex flex-col gap-5">
          {/* Description above the card (User-modified copy preserved) */}
          <p className="text-sm text-zinc-500 mt-2 max-w-2xl">
            Segui i tuoi ordini e le prenotazioni dei tuoi testi scolastici, universitari e professionali direttamente dal tuo smartphone.
          </p>

          {/* Reusable card with checkmark bullet points aligned center */}
          <div className="bg-white p-5 rounded-xl border border-zinc-200/80 shadow-sm flex flex-col gap-3">
            {/* Card Header Title */}
            <h3 className="text-zinc-800 font-bold text-xs uppercase tracking-wider text-orange-500/95 border-b border-zinc-150 pb-2">
              Perché scaricare LybroApp?
            </h3>
            
            <ul className="flex flex-col gap-4">
              <li className="flex gap-3 items-center">
                <div className="w-5 h-5 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center shrink-0 text-xs font-bold font-sans">
                  ✓
                </div>
                <p className="text-xs sm:text-sm font-semibold text-zinc-800 leading-normal">
                  Segui lo stato dei tuoi ordini
                </p>
              </li>
              <li className="flex gap-3 items-center">
                <div className="w-5 h-5 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center shrink-0 text-xs font-bold font-sans">
                  ✓
                </div>
                <p className="text-xs sm:text-sm font-semibold text-zinc-800 leading-normal">
                  Verifica la disponibilità di testi usati dalla tua lista libri scolastica
                </p>
              </li>
            </ul>
          </div>

          {/* Download Badges with Official Links and Local SVG Image assets inside tight Orange Buttons */}
          <div className="flex flex-col gap-3 mt-2">
            <div className="flex flex-wrap gap-4 items-center justify-center sm:justify-start">
              {/* Google Play */}
              <a
                href="https://play.google.com/store/apps/details?id=it.lybro.appandroid&pcampaignid=web_share"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-orange-600 hover:bg-orange-700 text-white rounded-lg px-4 py-2.5 md:px-3 md:py-1.5 flex items-center gap-2.5 transition-all duration-300 border border-orange-500/35 shadow-sm hover:-translate-y-0.5 justify-center inline-flex w-auto shrink-0"
              >
                {/* Play Store SVG Asset - using standard img tag to prevent stretching */}
                <img
                  src="/assets/play-store.svg"
                  alt="Google Play Logo"
                  className="w-5.5 h-5.5 md:w-5 md:h-5 shrink-0 object-contain"
                />
                <div className="text-left font-sans leading-none flex flex-col gap-0.5">
                  <p className="text-[7.5px] md:text-[7px] uppercase tracking-wider text-orange-200">Disponibile su</p>
                  <p className="text-xs md:text-[11px] font-bold">Google Play</p>
                </div>
              </a>

              {/* App Store */}
              <a
                href="https://apps.apple.com/it/app/lybro-app/id880938755"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-orange-600 hover:bg-orange-700 text-white rounded-lg px-4 py-2.5 md:px-3 md:py-1.5 flex items-center gap-2.5 transition-all duration-300 border border-orange-500/35 shadow-sm hover:-translate-y-0.5 justify-center inline-flex w-auto shrink-0"
              >
                {/* App Store SVG Asset - using standard img tag to prevent stretching */}
                <img
                  src="/assets/app-store.svg"
                  alt="App Store Logo"
                  className="w-5.5 h-5.5 md:w-5 md:h-5 shrink-0 object-contain"
                />
                <div className="text-left font-sans leading-none flex flex-col gap-0.5">
                  <p className="text-[7.5px] md:text-[7px] uppercase tracking-wider text-orange-200">Scarica su</p>
                  <p className="text-xs md:text-[11px] font-bold">App Store</p>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Smartphone Mockup with Centered lybro-screen Image */}
        <div className="md:col-span-5 flex justify-center">
          <div className="relative w-60 aspect-[9/19] bg-zinc-900 rounded-[36px] p-2.5 shadow-xl border-4 border-zinc-800 shrink-0">
            {/* Speaker & Camera notch */}
            <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-20 h-4 bg-zinc-900 rounded-full z-20 flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-zinc-800 mr-2" />
              <div className="w-8 h-1 bg-zinc-800 rounded-full" />
            </div>

            {/* Phone Screen Container containing lybro-screen asset */}
            <div className="relative w-full h-full bg-zinc-950 rounded-[28px] overflow-hidden">
              <Image
                src="/assets/lybro-screen.png"
                alt="Schermata LybroApp"
                fill
                sizes="(max-width: 768px) 100vw, 300px"
                className="object-contain object-center"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}
