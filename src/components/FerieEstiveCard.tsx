import React from 'react'

export function FerieEstiveCard() {
  return (
    <section className="w-full bg-transparent py-4 text-zinc-800">
      <div className="w-full max-w-[1152px] mx-auto px-4">
        <div className="bg-white rounded-xl border border-zinc-200/80 shadow-sm overflow-hidden flex flex-col">
          <div className="p-5 md:p-6 flex flex-col md:flex-row md:items-stretch gap-0 divide-y md:divide-y-0 md:divide-x divide-zinc-200">
            {/* Box 1: Orari Ridotti (10, 11, 12 e 20, 21 Agosto) */}
            <div className="flex-1 flex gap-3.5 items-start pb-6 md:pb-0 md:pr-6">
              <div className="w-10 h-10 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center shrink-0 mt-0.5">
                {/* Beach Umbrella SVG Icon */}
                <svg className="w-5 h-5 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M12 2A10 10 0 0 0 2 12h9v8a2 2 0 0 0 4 0v-8h9A10 10 0 0 0 12 2zm7.93 8H16.8a10.05 10.05 0 0 0-3.8-5.74A8.03 8.03 0 0 1 19.93 10zM12 4.14a8.04 8.04 0 0 1 2.86 5.86h-5.72A8.04 8.04 0 0 1 12 4.14zM4.07 10a8.03 8.03 0 0 1 6.93-5.74A10.05 10.05 0 0 0 7.2 10H4.07z" />
                </svg>
              </div>
              <div className="flex flex-col text-left">
                <h4 className="text-xs uppercase tracking-wider text-zinc-400 font-bold font-sans">
                  Avviso Ferie Estive
                </h4>
                <p className="text-xs sm:text-sm font-semibold text-zinc-800 mt-1 font-sans">
                  Giorni 10, 11, 12 e 20, 21 agosto
                </p>
                <p className="text-xs text-zinc-500 mt-1 font-sans leading-relaxed">
                  In queste date la libreria sarà aperta esclusivamente al mattino con orario <strong className="text-orange-600 font-semibold">9:00 - 13:00</strong>.
                </p>
              </div>
            </div>

            {/* Box 2: Chiusura & Riapertura */}
            <div className="flex-1 flex gap-3.5 items-start pt-6 md:pt-0 md:pl-6">
              <div className="w-10 h-10 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center shrink-0 mt-0.5">
                {/* Sun & Beach Umbrella SVG Icon */}
                <svg className="w-5 h-5 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0s-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0s-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41l-1.06-1.06zm1.06-10.96c.39-.39.39-1.03 0-1.41s-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36c.39-.39.39-1.03 0-1.41s-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z" />
                </svg>
              </div>
              <div className="flex flex-col text-left">
                <h4 className="text-xs uppercase tracking-wider text-zinc-400 font-bold font-sans">
                  Chiusura Estiva & Riapertura
                </h4>
                <p className="text-xs sm:text-sm font-semibold text-zinc-800 mt-1 font-sans">
                  Dal 13 agosto chiusura • Riapertura 20 agosto
                </p>
                <p className="text-xs text-zinc-500 mt-1 font-sans leading-relaxed">
                  Riapertura regolare il giorno <strong className="text-orange-600 font-semibold">24 agosto</strong>.
                </p>
              </div>
            </div>
          </div>

          {/* Footer Bar */}
          <div className="bg-orange-50/40 border-t border-orange-100/80 px-5 md:px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-left">
            <div className="flex gap-3.5 items-center">
              <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
                {/* Umbrella Icon */}
                <svg className="w-5 h-5 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M12 2A10 10 0 0 0 2 12h9v8a2 2 0 0 0 4 0v-8h9A10 10 0 0 0 12 2zm7.93 8H16.8a10.05 10.05 0 0 0-3.8-5.74A8.03 8.03 0 0 1 19.93 10zM12 4.14a8.04 8.04 0 0 1 2.86 5.86h-5.72A8.04 8.04 0 0 1 12 4.14zM4.07 10a8.03 8.03 0 0 1 6.93-5.74A10.05 10.05 0 0 0 7.2 10H4.07z" />
                </svg>
              </div>
              <p className="text-xs text-orange-900 font-sans font-medium">
                Buone Vacanze! Vi aspettiamo il 24 agosto con il consueto orario per preparare insieme l&apos;anno scolastico e universitario.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
