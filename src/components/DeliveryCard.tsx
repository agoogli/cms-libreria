import React from 'react'
import Link from 'next/link'

export function DeliveryCard({ 
  isLink = false, 
  showDiscoverMore = false 
}: { 
  isLink?: boolean
  showDiscoverMore?: boolean
}) {
  const CardContent = (
    <>
      <div className="p-5 md:p-6 flex flex-col md:flex-row md:items-stretch gap-0 divide-y md:divide-y-0 md:divide-x divide-zinc-200">
        {/* Box 1: Consegne Messina */}
        <div className="flex-1 flex gap-3.5 items-start pb-6 md:pb-0 md:pr-6">
          <div className="w-10 h-10 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center shrink-0 mt-0.5">
            <svg className="w-5 h-5 fill-currentColor" viewBox="0 0 24 24">
              <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm12 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm2-5.5h-3V9h2.58l2.42 2.75V13z" />
            </svg>
          </div>
          <div className="flex flex-col text-left">
            <h4 className="text-xs uppercase tracking-wider text-zinc-400 font-bold font-sans">
              Consegne a Domicilio (Messina)
            </h4>
            <p className="text-xs sm:text-sm font-semibold text-zinc-800 mt-1 font-sans">
              Ambito comunale (da Giampilieri a Torre Faro)
            </p>
            <p className="text-xs text-zinc-500 mt-1 font-sans leading-relaxed">
              Tariffa: <strong className="text-orange-600 font-semibold">5 €</strong> tramite corriere <strong className="text-zinc-700 font-medium">Ermete Express</strong>. Consegna in 24/48 ore se disponibile in sede.
            </p>
          </div>
        </div>

        {/* Box 2: Consegne Fuori Messina */}
        <div className="flex-1 flex gap-3.5 items-start pt-6 md:pt-0 md:pl-6">
          <div className="w-10 h-10 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center shrink-0 mt-0.5">
            <svg className="w-5 h-5 fill-currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
            </svg>
          </div>
          <div className="flex flex-col text-left">
            <h4 className="text-xs uppercase tracking-wider text-zinc-400 font-bold font-sans">
              Spedizioni Nazionali
            </h4>
            <p className="text-xs sm:text-sm font-semibold text-zinc-800 mt-1 font-sans">
              Consegne fuori Messina
            </p>
            <p className="text-xs text-zinc-500 mt-1 font-sans leading-relaxed">
              Tariffa: <strong className="text-orange-600 font-semibold">8 €</strong> tramite corriere espresso <strong className="text-zinc-700 font-medium">SDA</strong>. Consegna in 24/48 ore se disponibile in sede.
            </p>
          </div>
        </div>
      </div>

      {/* Note su Disponibilità inside the card footer */}
      <div className="bg-orange-50/40 border-t border-orange-100/80 px-5 md:px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-left">
        <div className="flex gap-3.5 items-center">
          <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
            <svg className="w-5 h-5 fill-currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
            </svg>
          </div>
          <p className="text-xs text-orange-900 font-sans font-medium">
            Per i volumi non disponibili in sede sarete avvisati sui tempi di arrivo.
          </p>
        </div>
        {showDiscoverMore && (
          <span 
            className="text-xs font-bold text-orange-500 hover:text-orange-600 transition-colors uppercase tracking-wider flex items-center gap-1 whitespace-nowrap shrink-0 sm:ml-auto font-sans"
          >
            Scopri di più &gt;
          </span>
        )}
      </div>
    </>
  )

  if (isLink) {
    return (
      <Link
        href="/spedizioni-pagamenti"
        className="group block bg-white rounded-xl border border-zinc-200/80 shadow-sm overflow-hidden flex flex-col hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
      >
        {CardContent}
      </Link>
    )
  }

  return (
    <div className="bg-white rounded-xl border border-zinc-200/80 shadow-sm overflow-hidden flex flex-col">
      {CardContent}
    </div>
  )
}
