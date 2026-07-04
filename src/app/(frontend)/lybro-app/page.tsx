import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

export const metadata = {
  title: 'Scarica LybroApp - Libreria Nunnari & Sfameni',
  description: 'Traccia i tuoi ordini di libri in tempo reale con LybroApp, disponibile per iOS e Android.',
}

export default function LybroAppPage() {
  return (
    <div className="w-full lg:w-[60%] mx-auto px-4 py-8 flex flex-col gap-8 font-sans">
      {/* Page Header */}
      <div className="text-center sm:text-left border-b border-zinc-200 pb-4">
        <span className="text-xs uppercase tracking-widest text-orange-600 font-bold">
          Applicazione Ufficiale
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-zinc-900 mt-1">
          LybroApp
        </h1>
        <p className="text-sm text-zinc-500 mt-2 max-w-2xl">
          Segui i tuoi ordini e le prenotazioni dei tuoi testi scolastici, universitari e professionali direttamente dal tuo smartphone.
        </p>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        {/* Left Column: Text Features */}
        <div className="md:col-span-7 flex flex-col gap-6">
          <div className="bg-white p-6 rounded-xl border border-zinc-200/80 shadow-sm flex flex-col gap-4">
            <h2 className="text-lg font-bold text-zinc-900 border-b border-zinc-100 pb-2">
              Perché scaricare LybroApp?
            </h2>
            
            <ul className="flex flex-col gap-4">
              <li className="flex gap-3">
                <div className="w-5 h-5 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                  ✓
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-semibold text-zinc-800">Stato Ordini in Tempo Reale</h3>
                  <p className="text-xs text-zinc-500 mt-0.5">Vedi all&apos;istante quali testi del tuo ordine sono arrivati, in arrivo o pronti in libreria.</p>
                </div>
              </li>
              
              <li className="flex gap-3">
                <div className="w-5 h-5 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                  ✓
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-semibold text-zinc-800">Notifiche Push Istantanee</h3>
                  <p className="text-xs text-zinc-500 mt-0.5">Ricevi una notifica sul telefono nel momento esatto in cui i tuoi libri sono pronti per il ritiro.</p>
                </div>
              </li>

              <li className="flex gap-3">
                <div className="w-5 h-5 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                  ✓
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-semibold text-zinc-800">Ritiro Rapido alla Cassa</h3>
                  <p className="text-xs text-zinc-500 mt-0.5">Mostra il codice a barre digitale presente nell&apos;app per saltare le code e ritirare i tuoi libri al volo.</p>
                </div>
              </li>

              <li className="flex gap-3">
                <div className="w-5 h-5 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                  ✓
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-semibold text-zinc-800">Prenotazione Libri Semplice</h3>
                  <p className="text-xs text-zinc-500 mt-0.5">Scansiona il codice a barre (EAN) sul retro del libro per ordinarne una copia in pochi secondi.</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Download Badges */}
          <div className="flex flex-wrap gap-4 items-center justify-center sm:justify-start">
            <a 
              href="#" 
              className="bg-black hover:bg-zinc-900 text-white rounded-lg px-4 py-2 flex items-center gap-3 transition-colors border border-zinc-800 shadow-sm w-44"
            >
              <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-.96.04-2.13.64-2.82 1.45-.6.7-1.13 1.84-.99 2.94.99.08 2.16-.52 2.82-1.33z"/>
              </svg>
              <div className="text-left">
                <p className="text-[9px] uppercase tracking-wider text-zinc-400 leading-none">Scarica su</p>
                <p className="text-sm font-semibold leading-tight mt-0.5">App Store</p>
              </div>
            </a>

            <a 
              href="#" 
              className="bg-black hover:bg-zinc-900 text-white rounded-lg px-4 py-2 flex items-center gap-3 transition-colors border border-zinc-800 shadow-sm w-44"
            >
              <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24">
                <path d="M5 3.14l11.66 11.66-2.61 2.61-9.9-9.9c.27-.63.59-1.29.85-2.37M20.25 11l-3.27-3.27-1.31 1.31 3.27 3.27c.28-.27.53-.54.76-.76.31-.31.55-.55.55-.55M3 5.25l9.9 9.9-2.61 2.61L3 10.5c0-.6.04-1.2.14-1.8.14-.6.37-1.2.61-1.8.27-.6.58-1.2.9-.9z"/>
              </svg>
              <div className="text-left">
                <p className="text-[9px] uppercase tracking-wider text-zinc-400 leading-none">Disponibile su</p>
                <p className="text-sm font-semibold leading-tight mt-0.5">Google Play</p>
              </div>
            </a>
          </div>
        </div>

        {/* Right Column: App Mockup/Graphic Placeholder */}
        <div className="md:col-span-5 flex justify-center">
          <div className="relative w-56 aspect-[9/19] bg-zinc-900 rounded-[36px] p-2.5 shadow-xl border-4 border-zinc-800">
            {/* Phone Screen Container */}
            <div className="relative w-full h-full bg-zinc-950 rounded-[28px] overflow-hidden flex flex-col justify-between p-4 text-white">
              {/* Speaker & Camera notch */}
              <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-20 h-4 bg-zinc-900 rounded-full z-20 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-zinc-800 mr-2" />
                <div className="w-8 h-1 bg-zinc-800 rounded-full" />
              </div>

              {/* Mock App Interface Content */}
              <div className="mt-6 flex flex-col gap-3 flex-grow">
                <div className="flex justify-between items-center border-b border-zinc-800 pb-2">
                  <span className="text-[10px] font-bold text-orange-500 uppercase tracking-widest font-sans">LybroApp</span>
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                </div>
                
                {/* Order Summary */}
                <div className="bg-zinc-900 p-3 rounded-lg border border-zinc-800 flex flex-col gap-1.5">
                  <div className="flex justify-between text-[8px] text-zinc-400">
                    <span>ORDINE #48291</span>
                    <span className="text-orange-500 font-bold">IN ELABORAZIONE</span>
                  </div>
                  <p className="text-[10px] font-bold font-sans">Kit Scolastico Medie 2026</p>
                  <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden mt-1">
                    <div className="bg-orange-500 h-full w-2/3" />
                  </div>
                  <span className="text-[8px] text-zinc-500 mt-0.5">4 libri su 6 già disponibili</span>
                </div>

                {/* Notifications Alert */}
                <div className="bg-zinc-900 p-3 rounded-lg border border-zinc-800 flex items-start gap-2">
                  <div className="w-4 h-4 rounded-full bg-orange-500 flex items-center justify-center text-[8px] font-bold text-white shrink-0 mt-0.5">
                    !
                  </div>
                  <div>
                    <h4 className="text-[9px] font-bold">Nuovo testo pronto!</h4>
                    <p className="text-[7px] text-zinc-400 leading-tight">Il libro &apos;Antropologia Culturale&apos; è ora disponibile per il ritiro.</p>
                  </div>
                </div>
              </div>

              {/* Digital Card Barcode */}
              <div className="bg-white text-zinc-900 p-3 rounded-lg flex flex-col items-center gap-1 mt-auto">
                <span className="text-[8px] font-bold tracking-widest uppercase font-sans">NUNNARI CLUB CARD</span>
                <div className="w-full h-8 bg-zinc-950 relative flex items-center justify-center rounded">
                  {/* barcode mock lines */}
                  <div className="w-full px-2 flex justify-between h-5 opacity-90">
                    <div className="w-1 bg-white h-full" />
                    <div className="w-0.5 bg-white h-full" />
                    <div className="w-1.5 bg-white h-full" />
                    <div className="w-0.5 bg-white h-full" />
                    <div className="w-1 bg-white h-full" />
                    <div className="w-2 bg-white h-full" />
                    <div className="w-0.5 bg-white h-full" />
                    <div className="w-1 bg-white h-full" />
                    <div className="w-1.5 bg-white h-full" />
                    <div className="w-0.5 bg-white h-full" />
                  </div>
                </div>
                <span className="text-[8px] text-zinc-400 tracking-widest font-mono">ID: 83921-93</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Home Link */}
      <div className="text-center pt-4 border-t border-zinc-200">
        <Link 
          href="/" 
          className="text-xs font-bold text-zinc-500 hover:text-orange-600 transition-colors uppercase tracking-wider"
        >
          &larr; Torna alla Homepage
        </Link>
      </div>
    </div>
  )
}
