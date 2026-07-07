import React from 'react'
import { PageWrapper } from '@/components/PageWrapper'

export const metadata = {
  title: 'Privacy Policy - Libreria Nunnari & Sfameni',
  description: 'Informativa sulla privacy e sul trattamento dei dati personali.',
}

export default function PrivacyPolicyPage() {
  return (
    <PageWrapper title="Privacy Policy">
      <section className="bg-white p-5 rounded-xl border border-zinc-200/80 shadow-sm">
        <h3 className="text-zinc-800 font-bold text-xs mb-2 uppercase tracking-wider text-orange-500/95">
          Trattamento dei Dati Personali
        </h3>
        <p className="text-xs text-zinc-600 leading-relaxed font-sans">
          Questa pagina conterrà l'informativa estesa sulla privacy e la gestione del trattamento dei dati personali ai sensi del Regolamento UE 2016/679 (GDPR).
        </p>
      </section>
    </PageWrapper>
  )
}
