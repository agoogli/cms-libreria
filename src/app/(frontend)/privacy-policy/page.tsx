import React from 'react'
import Link from 'next/link'

export const metadata = {
  title: 'Privacy Policy - Libreria Nunnari & Sfameni',
  description: 'Informativa sulla privacy e sul trattamento dei dati personali.',
}

export default function PrivacyPolicyPage() {
  return (
    <div className="w-full lg:w-[60%] mx-auto px-4 pt-3 pb-2 flex flex-col gap-3">
      {/* Back button */}
      <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-orange-600 hover:text-orange-700 font-bold uppercase tracking-wider font-sans transition-colors self-start mb-2">
        &larr; Torna alla Home
      </Link>

      {/* Title */}
      <div className="text-left">
        <span className="text-xs uppercase tracking-widest text-orange-600 font-sans font-bold">
          Privacy Policy
        </span>
      </div>

      {/* Structured Paragraphs (text-xs) with margin resets */}
      <div className="flex flex-col gap-6 text-xs text-zinc-600 leading-relaxed font-sans opacity-95 [&_p]:my-0 mt-1">
        <section className="bg-white p-5 rounded-xl border border-zinc-200/80 shadow-sm">
          <h3 className="text-zinc-800 font-bold text-xs mb-2 uppercase tracking-wider text-orange-500/95">
            Trattamento dei Dati Personali
          </h3>
          <p>
            Questa pagina conterrà l'informativa estesa sulla privacy e la gestione del trattamento dei dati personali ai sensi del Regolamento UE 2016/679 (GDPR).
          </p>
        </section>
      </div>
    </div>
  )
}
