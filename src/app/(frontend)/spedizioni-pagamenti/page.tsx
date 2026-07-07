import React from 'react'
import { PageWrapper } from '@/components/PageWrapper'
import { DeliveryCard } from '@/components/DeliveryCard'
import Link from 'next/link'

export const metadata = {
  title: 'Spedizioni e Pagamenti - Libreria Nunnari & Sfameni',
  description: 'Tutte le informazioni su tariffe di spedizione, consegne a domicilio a Messina e metodi di pagamento per ordini a distanza.',
}

export default function SpedizioniPagamentiPage() {
  return (
    <PageWrapper title="Spedizioni e Pagamenti">
      {/* Reusable DeliveryCard (rendered statically, no link wrapping, no Discover More link) */}
      <DeliveryCard isLink={false} showDiscoverMore={false} />

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
              Pay-by-Link è il servizio di <strong>Nexi</strong> che trasforma il POS in uno strumento per incassare a distanza. Grazie a Pay-by-Link si possono accettare pagamenti ovunque sia il cliente, inviando un simple link tramite email o social e pagare in modo semplice, sicuro e immediato.
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
              <span className="text-zinc-400 block text-xs uppercase tracking-wider font-bold">Coordinate di accredito:</span>
              <span className="text-zinc-800 font-bold font-mono text-xs block mt-1 tracking-wide">IBAN: IT59-E010-3016-5000-0000-2237-670</span>
              <span className="text-zinc-600 font-semibold block mt-1 text-xs">Intestato a: <strong className="text-zinc-700">Libreria Nunnari e Sfameni</strong></span>
            </div>
          </div>
        </div>
      </section>

      {/* Contact info link */}
      <p className="text-xs text-zinc-550 font-sans mt-2">
        Per info e prenotazioni, ecco i{' '}
        <Link href="/contattaci" className="text-orange-500 hover:text-orange-600 font-bold transition-colors">
          nostri contatti &gt;
        </Link>
      </p>
    </PageWrapper>
  )
}
