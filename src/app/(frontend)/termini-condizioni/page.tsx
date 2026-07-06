import React from 'react'
import Link from 'next/link'

export const metadata = {
  title: 'Termini e Condizioni - Libreria Nunnari & Sfameni',
  description: 'Termini d\'uso del sito web e condizioni generali di vendita.',
}

export default function TerminiCondizioniPage() {
  return (
    <div className="w-full lg:w-[60%] mx-auto px-4 pt-3 pb-2 flex flex-col gap-3">
      {/* Back button */}
      <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-orange-600 hover:text-orange-700 font-bold uppercase tracking-wider font-sans transition-colors self-start mb-2">
        &larr; Torna alla Home
      </Link>

      {/* Title */}
      <div className="text-left">
        <span className="text-xs uppercase tracking-widest text-orange-600 font-sans font-bold">
          Termini e Condizioni
        </span>
      </div>

      {/* Structured Paragraphs (text-xs) with margin resets */}
      <div className="flex flex-col gap-6 text-xs text-zinc-600 leading-relaxed font-sans opacity-95 [&_p]:my-0 mt-1">
        <section className="bg-white p-5 rounded-xl border border-zinc-200/80 shadow-sm">
          <h3 className="text-zinc-800 font-bold text-xs mb-2 uppercase tracking-wider text-orange-500/95">
            Termini d'uso e Vendita
          </h3>
          <p>
            Questa pagina conterrà i termini e le condizioni d'uso del sito web, nonché le condizioni generali di vendita per l'acquisto e la prenotazione di libri scolastici, universitari e professionali.
          </p>
        </section>
      </div>
    </div>
  )
}
