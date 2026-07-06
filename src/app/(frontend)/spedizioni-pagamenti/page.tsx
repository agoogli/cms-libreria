import React from 'react'
import Link from 'next/link'

export const metadata = {
  title: 'Spedizioni e Pagamenti - Libreria Nunnari & Sfameni',
  description: 'Informazioni dettagliate su metodi di pagamento accettati, consegne a domicilio a Messina e spedizioni nazionali.',
}

export default function SpedizioniPagamentiPage() {
  return (
    <div className="w-full lg:w-[60%] mx-auto px-4 py-8 flex flex-col gap-8 font-sans text-zinc-800">
      {/* Page Header */}
      <div className="text-center sm:text-left border-b border-zinc-200 pb-4">
        <span className="text-xs uppercase tracking-widest text-orange-600 font-bold">
          Guida al Servizio
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-zinc-900 mt-1">
          Spedizioni e Pagamenti
        </h1>
        <p className="text-sm text-zinc-500 mt-2 max-w-2xl">
          Tutti i dettagli su come spediamo i tuoi libri e quali metodi di pagamento accettiamo alla Libreria Nunnari & Sfameni.
        </p>
      </div>

      {/* Spedizioni & Consegne Section */}
      <div className="bg-white p-6 rounded-xl border border-zinc-200/80 shadow-sm flex flex-col gap-6">
        <div className="flex items-center gap-3 border-b border-zinc-150 pb-3">
          <div className="w-10 h-10 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
            <svg className="w-5 h-5 fill-currentColor" viewBox="0 0 24 24">
              <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4z" />
            </svg>
          </div>
          <h2 className="text-lg font-bold text-zinc-900">
            1. Metodi di Consegna e Spedizione
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-zinc-100 p-4 rounded-lg bg-zinc-50/50">
            <h3 className="text-sm font-bold text-zinc-800 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-orange-500" />
              Consegne a Messina (Domicilio)
            </h3>
            <p className="text-xs text-zinc-500 mt-1.5 leading-relaxed">
              Effettuiamo consegne su tutto il territorio comunale di Messina, da Giampilieri fino a Torre Faro.
            </p>
            <ul className="text-xs text-zinc-600 mt-3 flex flex-col gap-2 font-medium">
              <li>• Costo: <strong className="text-orange-600">5,00 €</strong></li>
              <li>• Corriere: <strong>Ermete Express</strong></li>
              <li>• Tempi: Consegna in <strong>24/48 ore</strong> lavorative (per libri disponibili in sede)</li>
            </ul>
          </div>

          <div className="border border-zinc-100 p-4 rounded-lg bg-zinc-50/50">
            <h3 className="text-sm font-bold text-zinc-800 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-orange-500" />
              Spedizioni Nazionali (Fuori Messina)
            </h3>
            <p className="text-xs text-zinc-500 mt-1.5 leading-relaxed">
              Spediamo in tutta Italia tramite corriere espresso affidabile e tracciato.
            </p>
            <ul className="text-xs text-zinc-600 mt-3 flex flex-col gap-2 font-medium">
              <li>• Costo: <strong className="text-orange-600">8,00 €</strong></li>
              <li>• Corriere: <strong>SDA Express</strong></li>
              <li>• Tempi: Consegna in <strong>24/48 ore</strong> lavorative (per libri disponibili in sede)</li>
            </ul>
          </div>
        </div>

        {/* Note Availability */}
        <div className="bg-orange-50/60 rounded-lg border border-orange-100/80 p-4 flex items-start gap-3">
          <div className="w-5 h-5 rounded-full bg-orange-100 flex items-center justify-center shrink-0 mt-0.5">
            <svg className="w-3.5 h-3.5 text-orange-600 fill-currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
            </svg>
          </div>
          <div>
            <h4 className="text-xs font-bold text-orange-950">Nota sui volumi non immediatamente disponibili</h4>
            <p className="text-xs text-orange-900 mt-0.5 leading-relaxed font-medium">
              Qualora uno o più testi prenotati non fossero presenti nei nostri magazzini o in sede, provvederemo a inoltrare l&apos;ordine all&apos;editore e a tenerti costantemente informato via e-mail o WhatsApp sui tempi esatti di arrivo in libreria e successiva spedizione.
            </p>
          </div>
        </div>
      </div>

      {/* Pagamenti Section */}
      <div className="bg-white p-6 rounded-xl border border-zinc-200/80 shadow-sm flex flex-col gap-6">
        <div className="flex items-center gap-3 border-b border-zinc-150 pb-3">
          <div className="w-10 h-10 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
            <svg className="w-5 h-5 fill-currentColor" viewBox="0 0 24 24">
              <path d="M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
            </svg>
          </div>
          <h2 className="text-lg font-bold text-zinc-900">
            2. Modalità di Pagamento Accettate
          </h2>
        </div>

        <p className="text-xs text-zinc-500 leading-relaxed -mt-3">
          Offriamo diverse soluzioni di pagamento flessibili sia online che di persona per agevolare l&apos;acquisto di libri scolastici e testi di studio.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card docente e giovani */}
          <div className="flex gap-3">
            <div className="w-6 h-6 rounded-full bg-zinc-100 flex items-center justify-center shrink-0 mt-0.5 text-orange-600 text-xs font-bold font-mono">
              01
            </div>
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-zinc-800">Bonus Cultura e Carte Statali</h3>
              <p className="text-xs text-zinc-500 mt-1 leading-relaxed">
                Spendi i tuoi buoni statali per l&apos;acquisto di libri di lettura e di testo:
              </p>
              <ul className="text-xs text-zinc-600 mt-1.5 list-disc pl-4 flex flex-col gap-1">
                <li>Carta della Cultura Giovani</li>
                <li>Carta del Merito</li>
                <li>Carta del Docente</li>
              </ul>
            </div>
          </div>

          {/* Bonifico */}
          <div className="flex gap-3">
            <div className="w-6 h-6 rounded-full bg-zinc-100 flex items-center justify-center shrink-0 mt-0.5 text-orange-600 text-xs font-bold font-mono">
              02
            </div>
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-zinc-800">Bonifico Bancario Anticipato</h3>
              <p className="text-xs text-zinc-500 mt-1 leading-relaxed">
                Puoi pagare tramite bonifico bancario. Riceverai le coordinate bancarie IBAN via e-mail al completamento della prenotazione o dell&apos;ordine. La spedizione partirà al momento dell&apos;accredito effettivo.
              </p>
            </div>
          </div>

          {/* PayPal */}
          <div className="flex gap-3">
            <div className="w-6 h-6 rounded-full bg-zinc-100 flex items-center justify-center shrink-0 mt-0.5 text-orange-600 text-xs font-bold font-mono">
              03
            </div>
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-zinc-800">PayPal / Carte di Credito</h3>
              <p className="text-xs text-zinc-500 mt-1 leading-relaxed">
                Accettiamo i pagamenti più sicuri online tramite PayPal e le principali carte di credito o prepagate (Visa, Mastercard, Postepay).
              </p>
            </div>
          </div>

          {/* In negozio */}
          <div className="flex gap-3">
            <div className="w-6 h-6 rounded-full bg-zinc-100 flex items-center justify-center shrink-0 mt-0.5 text-orange-600 text-xs font-bold font-mono">
              04
            </div>
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-zinc-800">Ritiro e Pagamento in Libreria</h3>
              <p className="text-xs text-zinc-500 mt-1 leading-relaxed">
                Se decidi di ritirare i tuoi volumi direttamente in negozio, puoi pagare al momento del ritiro in contanti, bancomat o carta di credito tramite il nostro terminale POS.
              </p>
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
