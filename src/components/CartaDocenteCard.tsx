import React from 'react'
import Link from 'next/link'

export function CartaDocenteCard() {
  return (
    <section className="w-full bg-transparent py-4 text-zinc-800">
      <div className="w-full lg:w-[60%] mx-auto px-4 lg:px-4">
        <div className="bg-white rounded-xl border border-zinc-200/80 shadow-sm overflow-hidden flex flex-col">
          <div className="p-5 md:p-6 flex flex-col md:flex-row md:items-stretch gap-0 divide-y md:divide-y-0 md:divide-x divide-zinc-200">
            {/* Box 1: Carta del Docente -> links to /carta-docente */}
            <Link
              href="/carta-docente"
              className="flex-1 flex gap-3.5 items-start pb-6 md:pb-0 md:pr-6 group/box1 hover:opacity-90 transition-opacity cursor-pointer"
            >
              <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 group-hover/box1:bg-blue-100 flex items-center justify-center shrink-0 mt-0.5 transition-colors">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z" />
                </svg>
              </div>
              <div className="flex flex-col text-left">
                <h4 className="text-xs uppercase tracking-wider text-zinc-400 group-hover/box1:text-blue-600 font-bold font-sans transition-colors">
                  Carta del Docente
                </h4>
                <p className="text-xs sm:text-sm font-semibold text-zinc-800 group-hover/box1:text-blue-600 mt-1 font-sans transition-colors">
                  Porta da noi il tuo bonus
                </p>
                <p className="text-xs text-zinc-500 mt-1 font-sans leading-relaxed">
                  Affrettati a spendere il bonus rimanente nel tuo portafoglio elettronico: <b>la scadenza del 31 agosto 2026 è vicina</b>
                </p>
              </div>
            </Link>

            {/* Box 2: Carte Cultura 2026 -> links to /carte-cultura */}
            <Link
              href="/carte-cultura"
              className="flex-1 flex gap-3.5 items-start pt-6 md:pt-0 md:pl-6 group/box2 hover:opacity-90 transition-opacity cursor-pointer"
            >
              <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 group-hover/box2:bg-blue-100 flex items-center justify-center shrink-0 mt-0.5 transition-colors">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M21 5H3c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 12H3V9h18v8zm0-10H3V7h18v1z" />
                </svg>
              </div>
              <div className="flex flex-col text-left">
                <h4 className="text-xs uppercase tracking-wider text-zinc-400 group-hover/box2:text-blue-600 font-bold font-sans transition-colors">
                  Carta Cultura & Merito 2026
                </h4>
                <p className="text-xs sm:text-sm font-semibold text-zinc-800 group-hover/box2:text-blue-600 mt-1 font-sans transition-colors">
                  Spendi in libreria i tuoi buoni
                </p>
                <p className="text-xs text-zinc-500 mt-1 font-sans leading-relaxed">
                  Usa la tua Carta della Cultura Giovani e Carta del Merito per acquistare qualsiasi testo universitario o scolastico.
                </p>
              </div>
            </Link>
          </div>

          {/* Footer Bar with Scopri di più > link intact */}
          <Link
            href="/carta-docente"
            className="group/footer bg-blue-50/50 border-t border-blue-100/80 px-5 md:px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-left hover:bg-blue-50 transition-colors cursor-pointer"
          >
            <div className="flex gap-3.5 items-center">
              <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
                </svg>
              </div>
              <p className="text-xs text-blue-900 font-sans font-medium">
                Ti consigliamo di verificare il tuo portafoglio elettronico: le somme riferite all’anno scolastico 2024/2025 non saranno più recuperabili dopo il 31 agosto.
              </p>
            </div>
            <span className="text-xs font-bold text-orange-600 group-hover/footer:text-orange-700 transition-colors uppercase tracking-wider flex items-center gap-1 whitespace-nowrap shrink-0 sm:ml-auto font-sans">
              Scopri di più &gt;
            </span>
          </Link>
        </div>
      </div>
    </section>
  )
}
