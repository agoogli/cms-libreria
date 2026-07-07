import React from 'react'
import { PageWrapper } from '@/components/PageWrapper'

export const metadata = {
  title: 'Termini e Condizioni - Libreria Nunnari & Sfameni',
  description: 'Termini d\'uso del sito web e condizioni generali di vendita.',
}

export default function TerminiCondizioniPage() {
  return (
    <PageWrapper title="Termini e Condizioni">
      <section className="bg-white p-5 rounded-xl border border-zinc-200/80 shadow-sm">
        <h3 className="text-zinc-800 font-bold text-xs mb-2 uppercase tracking-wider text-orange-500/95">
          Termini d'uso e Vendita
        </h3>
        <p className="text-xs text-zinc-600 leading-relaxed font-sans">
          Questa pagina conterrà i termini e le condizioni d'uso del sito web, nonché le condizioni generali di vendita per l'acquisto e la prenotazione di libri scolastici, universitari e professionali.
        </p>
      </section>
    </PageWrapper>
  )
}
