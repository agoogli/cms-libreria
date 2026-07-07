import React from 'react'
import { PageWrapper } from '@/components/PageWrapper'

export const metadata = {
  title: 'Spedizioni e Pagamenti - Libreria Nunnari & Sfameni',
  description: 'Tutte le informazioni su tariffe di spedizione, consegne a domicilio a Messina e metodi di pagamento per ordini a distanza.',
}

export default function SpedizioniPagamentiPage() {
  return (
    <PageWrapper title="Spedizioni e Pagamenti">
      {/* Section 1: Spedizioni */}
      <section className="bg-white p-5 rounded-xl border border-zinc-200/80 shadow-sm flex flex-col gap-4">
        <h3 className="text-zinc-800 font-bold text-xs uppercase tracking-wider text-orange-500/95 border-b border-zinc-150 pb-2">
          Spedizioni e Consegne
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 divide-y md:divide-y-0 md:divide-x divide-zinc-200">
          {/* Box 1: Consegne Messina */}
          <div className="flex-1 flex gap-3.5 items-start">
            <div className="w-8 h-8 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center shrink-0 mt-0.5">
              <svg className="w-4.5 h-4.5 fill-currentColor" viewBox="0 0 24 24">
                <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm12 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm2-5.5h-3V9h2.58l2.42 2.75V13z" />
              </svg>
            </div>
            <div className="flex flex-col text-xs">
              <span className="font-bold text-zinc-800 uppercase tracking-wide">
                Consegne a Domicilio (Messina)
              </span>
              <span className="text-zinc-500 font-medium mt-0.5">
                Ambito comunale (da Giampilieri a Torre Faro)
              </span>
              <p className="text-zinc-650 mt-2 leading-relaxed">
                Tariffa: <strong className="text-orange-600 font-semibold">5 €</strong> tramite corriere <strong className="text-zinc-700 font-medium">Ermete Express</strong>. Consegna in 24/48 ore se disponibile in sede.
              </p>
            </div>
          </div>

          {/* Box 2: Consegne Fuori Messina */}
          <div className="flex-1 flex gap-3.5 items-start md:pl-6">
            <div className="w-8 h-8 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center shrink-0 mt-0.5">
              <svg className="w-4.5 h-4.5 fill-currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
              </svg>
            </div>
            <div className="flex flex-col text-xs">
              <span className="font-bold text-zinc-800 uppercase tracking-wide">
                Spedizioni Nazionali
              </span>
              <span className="text-zinc-500 font-medium mt-0.5">
                Consegne fuori Messina
              </span>
              <p className="text-zinc-650 mt-2 leading-relaxed">
                Tariffa: <strong className="text-orange-600 font-semibold">8 €</strong> tramite corriere espresso <strong className="text-zinc-700 font-medium">SDA</strong>. Consegna in 24/48 ore se disponibile in sede.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Pagamenti */}
      <section className="bg-white p-5 rounded-xl border border-zinc-200/80 shadow-sm flex flex-col gap-4 text-xs text-zinc-600 leading-relaxed font-sans opacity-95">
        <h3 className="text-zinc-800 font-bold text-xs uppercase tracking-wider text-orange-500/95 border-b border-zinc-150 pb-2">
          Metodi di Pagamento per Testi Spediti
        </h3>

        {/* Solution 1: Nexi */}
        <div className="flex gap-4 items-start pb-4 border-b border-zinc-100">
          <div className="w-8 h-8 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center shrink-0 mt-0.5">
            <svg className="w-4.5 h-4.5 fill-none stroke-currentColor stroke-2" viewBox="0 0 24 24">
              <rect x="2" y="5" width="20" height="14" rx="2" />
              <line x1="2" y1="10" x2="22" y2="10" />
            </svg>
          </div>
          <div>
            <h4 className="font-bold text-zinc-800 text-sm">1. Carta di credito tramite Pay-by-Link</h4>
            <p className="mt-1.5 text-zinc-500">
              Pay-by-Link è il servizio di <strong>Nexi</strong> che trasforma il POS in uno strumento per incassare a distanza. Grazie a Pay-by-Link si possono accettare pagamenti ovunque sia il cliente, inviando un semplice link tramite email o social e pagare in modo semplice, sicuro e immediato.
            </p>
          </div>
        </div>

        {/* Solution 2: Bank transfer */}
        <div className="flex gap-4 items-start pt-1">
          <div className="w-8 h-8 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center shrink-0 mt-0.5">
            <svg className="w-4.5 h-4.5 fill-none stroke-currentColor stroke-2" viewBox="0 0 24 24">
              <path d="M3 21h18M3 10h18M5 10v11M19 10v11M12 10v11M4 6l8-4 8 4" />
            </svg>
          </div>
          <div>
            <h4 className="font-bold text-zinc-800 text-sm">2. Bonifico bancario</h4>
            <p className="mt-1.5 text-zinc-500">
              Puoi pagare i tuoi ordini tramite bonifico bancario anticipato. I libri saranno spediti subito dopo la ricezione dell'accredito sul conto.
            </p>
            <div className="mt-3 p-3 bg-zinc-50 border border-zinc-200/60 rounded-lg font-sans">
              <span className="text-zinc-400 block text-[10px] uppercase tracking-wider font-bold">Coordinate di accredito:</span>
              <span className="text-zinc-800 font-bold font-mono text-xs block mt-1 tracking-wide">IBAN: IT59-E010-3016-5000-0000-2237-670</span>
              <span className="text-zinc-600 font-medium block mt-1 text-[11px]">Intestato a: <strong className="text-zinc-700">Libreria Nunnari e Sfameni</strong></span>
            </div>
          </div>
        </div>
      </section>

      {/* Note Box */}
      <div className="bg-orange-50/40 border border-orange-100/80 rounded-xl p-4 flex items-center gap-2.5">
        <div className="w-5 h-5 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
          <svg className="w-3.5 h-3.5 text-orange-600 fill-currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
          </svg>
        </div>
        <p className="text-xs text-orange-900 font-sans font-medium">
          Per i volumi non disponibili in sede sarete avvisati sui tempi di arrivo.
        </p>
      </div>
    </PageWrapper>
  )
}
