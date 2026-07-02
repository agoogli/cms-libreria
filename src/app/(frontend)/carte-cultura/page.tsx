import React from 'react'

export const metadata = {
  title: 'Carte Cultura - Libreria Nunnari & Sfameni',
  description: 'Tutte le informazioni per spendere il tuo Bonus Carta Cultura Giovani e Carta del Merito.',
}

export default function CarteCulturaPage() {
  return (
    <div className="w-full lg:w-[60%] mx-auto px-4 py-8 flex flex-col gap-6">
      {/* Title */}
      <div className="w-full text-left">
        <span className="text-xs uppercase tracking-widest text-orange-600 font-sans font-bold">
          Carte Cultura 2026
        </span>
      </div>

      {/* Structured paragraphs matching home page card description size & color */}
      <div className="flex flex-col gap-6 text-[11px] text-zinc-600 leading-relaxed font-sans opacity-95">
        {/* Section 1 */}
        <section className="bg-white p-5 rounded-xl border border-zinc-200/80 shadow-sm">
          <h3 className="text-zinc-800 font-bold text-xs mb-2 uppercase tracking-wider text-orange-500/95">
            Carta Cultura Giovani e Carta del Merito
          </h3>
          <p className="mb-2">
            Le nuove agevolazioni ministeriali mettono a disposizione dei giovani due distinti buoni spesa cumulabili del valore di 500 euro ciascuno:
          </p>
          <ul className="list-disc pl-4 flex flex-col gap-1.5 text-zinc-500">
            <li>
              <strong>Carta della Cultura Giovani:</strong> Spetta ai ragazzi residenti in Italia appartenenti a famiglie con un indicatore ISEE non superiore a 35.000 euro. È richiedibile a partire dal 31 gennaio dell'anno successivo al compimento del 18° anno di età.
            </li>
            <li>
              <strong>Carta del Merito:</strong> Assegnata agli studenti che conseguono il diploma di maturità con il massimo dei voti (100/100 o 100/100 con lode) prima del compimento del 19° anno di età.
            </li>
          </ul>
        </section>

        {/* Section 2 */}
        <section className="bg-white p-5 rounded-xl border border-zinc-200/80 shadow-sm">
          <h3 className="text-zinc-800 font-bold text-xs mb-2 uppercase tracking-wider text-orange-500/95">
            Cosa puoi acquistare presso di noi
          </h3>
          <p className="mb-2">
            Presso la nostra libreria puoi utilizzare entrambi i bonus per acquistare:
          </p>
          <ul className="list-disc pl-4 flex flex-col gap-1.5 text-zinc-500">
            <li>Libri di ogni genere, narrativa, saggistica e novità editoriali.</li>
            <li>Testi scolastici per scuole medie e superiori.</li>
            <li>Manuali universitari e testi professionali.</li>
            <li>E-book, audiolibri, CD musicali e dischi in vinile.</li>
          </ul>
          <p className="mt-2.5">
            I buoni sono strettamente personali, non sono trasferibili a terzi e possono essere utilizzati solo per l'acquisto delle categorie di beni consentite dalla normativa vigente.
          </p>
        </section>

        {/* Section 3 */}
        <section className="bg-white p-5 rounded-xl border border-zinc-200/80 shadow-sm">
          <h3 className="text-zinc-800 font-bold text-xs mb-2 uppercase tracking-wider text-orange-500/95">
            Requisiti e procedura di attivazione
          </h3>
          <p>
            Per attivare e generare i tuoi buoni cultura è necessario registrarsi sul portale ministeriale ufficiale <code>cartegiovani.cultura.gov.it</code>. La registrazione richiede l'accesso tramite SPID (Sistema Pubblico di Identità Digitale) o Carta d'Identità Elettronica (CIE).
          </p>
          <p className="mt-2">
            Le domande di registrazione possono essere inoltrate ogni anno a partire dal 31 gennaio fino alla scadenza del 30 giugno. Una volta completata la registrazione ed ottenuto il portafoglio digitale, i buoni spesa dovranno essere spesi obbligatoriamente entro il 31 dicembre dello stesso anno di attivazione.
          </p>
        </section>
      </div>
    </div>
  )
}
