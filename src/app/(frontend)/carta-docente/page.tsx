import React from 'react'

export const metadata = {
  title: 'Carta Docente - Libreria Nunnari & Sfameni',
  description: 'Informazioni utili su come spendere il bonus Carta del Docente nella nostra libreria.',
}

export default function CartaDocentePage() {
  return (
    <div className="w-full lg:w-[60%] mx-auto px-4 pt-3 pb-2 flex flex-col gap-3">
      {/* Title with exact pt-3 page padding */}
      <div className="text-left">
        <span className="text-xs uppercase tracking-widest text-orange-600 font-sans font-bold">
          Carta del Docente
        </span>
      </div>

      {/* Structured Paragraphs (text-xs) with margin resets */}
      <div className="flex flex-col gap-6 text-xs text-zinc-600 leading-relaxed font-sans opacity-95 [&_p]:my-0 mt-1">
        {/* Section 1 */}
        <section className="bg-white p-5 rounded-xl border border-zinc-200/80 shadow-sm">
          <h3 className="text-zinc-800 font-bold text-xs mb-2 uppercase tracking-wider text-orange-500/95">
            Cos'è la Carta del Docente e le novità 2026
          </h3>
          <p>
            Dal 9 marzo 2026 è nuovamente attiva la piattaforma ministeriale dedicata alla Carta del Docente per l’anno scolastico 2025/2026. Il valore del bonus per quest'anno è di 383 euro. La novità più significativa di questa edizione è l'estensione del beneficio oltre il solo personale di ruolo, ampliando notevolmente il numero di insegnanti che possono usufruirne.
          </p>
        </section>

        {/* Section 2 */}
        <section className="bg-white p-5 rounded-xl border border-zinc-200/80 shadow-sm">
          <h3 className="text-zinc-800 font-bold text-xs mb-2 uppercase tracking-wider text-orange-500/95">
            Chi può richiedere il Bonus
          </h3>
          <p className="mb-2">
            Per l'annualità 2025/2026, il bonus spetta alle seguenti categorie di personale scolastico:
          </p>
          <ul className="list-disc pl-4 flex flex-col gap-1.5 text-zinc-500">
            <li>Docenti assunti a tempo indeterminato (di ruolo).</li>
            <li>Docenti con contratto a tempo determinato fino al 31 agosto.</li>
            <li>Docenti con contratto a tempo determinato fino al 30 giugno.</li>
            <li>Personale educativo delle scuole pubbliche.</li>
          </ul>
          <p className="mt-2.5">
            Non rientrano attualmente nei beneficiari ordinari i membri del personale ATA e i supplenti con contratti brevi o saltuari, salvo diverse disposizioni ottenute per via giudiziaria.
          </p>
        </section>

        {/* Section 3 */}
        <section className="bg-white p-5 rounded-xl border border-zinc-200/80 shadow-sm">
          <h3 className="text-zinc-800 font-bold text-xs mb-2 uppercase tracking-wider text-orange-500/95">
            Fondi disponibili, Scadenze e Gestione del Credito
          </h3>
          <p>
            Il credito di 383 euro assegnato per l'anno scolastico corrente rimarrà utilizzabile fino al 31 agosto 2027. Per chi possiede ancora somme residue relative all'annualità precedente (2024/2025), ricordiamo che queste scadranno definitivamente il 31 agosto 2026. Si consiglia di verificare lo stato del proprio portafoglio elettronico sul sito ufficiale per organizzare al meglio le scadenze e pianificare gli acquisti.
          </p>
        </section>

        {/* Section 4 */}
        <section className="bg-white p-5 rounded-xl border border-zinc-200/80 shadow-sm">
          <h3 className="text-zinc-800 font-bold text-xs mb-2 uppercase tracking-wider text-orange-500/95">
            Come generare e utilizzare i Buoni spesa
          </h3>
          <p>
            L'accesso alla piattaforma ufficiale avviene autenticandosi tramite credenziali SPID (livello 2) o Carta d'Identità Elettronica (CIE). All'atto del primo accesso per l'anno scolastico in corso, è richiesto di accettare le condizioni di utilizzo aggiornate e verificare i propri dati di contatto.
          </p>
          <p className="mt-2">
            Dal pannello personale è possibile creare nuovi buoni specificandone l'importo desiderato e la categoria merceologica corretta. I voucher generati possono essere scaricati in formato PDF o mostrati in libreria tramite codice QR.
          </p>
        </section>
      </div>
    </div>
  )
}
