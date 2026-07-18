import React from 'react'
import { PageWrapper } from '@/components/PageWrapper'

export const metadata = {
  title: 'Privacy Policy - Libreria Nunnari & Sfameni',
  description: 'Informativa sulla privacy e sul trattamento dei dati personali ai sensi del GDPR.',
}

export default function PrivacyPolicyPage() {
  return (
    <PageWrapper title="Privacy Policy">
      <div className="w-full bg-white p-6 sm:p-8 rounded-xl border border-zinc-200/80 shadow-sm flex flex-col gap-6 font-sans text-xs sm:text-sm text-zinc-650 leading-relaxed">

        {/* Intro */}
        <section className="border-b border-zinc-100 pb-4">
          <p className="font-medium text-zinc-800">
            Informativa sul trattamento dei dati personali ai sensi del Regolamento UE 2016/679 ("GDPR") e del D.Lgs. 196/2003 come modificato dal D.Lgs. 101/2018.
          </p>
          <p className="mt-2">
            La presente informativa descrive le modalità di raccolta, conservazione e utilizzo dei dati personali degli utenti del sito web della <strong>Libreria Nunnari & Sfameni s.a.s.</strong> (di seguito "Sito"), con particolare attenzione alle informazioni fornite volontariamente in fase di registrazione per la creazione dell'account dell'app "Lybro" per il tracking ordini.
          </p>
        </section>

        {/* 1. Titolare del Trattamento */}
        <section className="flex flex-col gap-2">
          <h3 className="font-bold text-zinc-900 border-b border-zinc-100 pb-1 text-sm uppercase tracking-wider text-orange-600">
            1. Titolare del Trattamento
          </h3>
          <p>
            Il Titolare del trattamento è la <strong>Libreria Nunnari & Sfameni s.a.s.</strong>, con sede legale in Via Tommaso Cannizzaro 112, 98122 Messina (ME), Codice Fiscale e Partita IVA 03027400831.
          </p>
          <p>
            Per qualsiasi chiarimento, richiesta o esercizio dei diritti previsti dal GDPR, l'utente può contattare il Titolare al seguente indirizzo e-mail:{' '}
            <a href="mailto:librerianunnari@gmail.com" className="text-orange-500 hover:underline font-bold">
              librerianunnari@gmail.com
            </a>.
          </p>
        </section>

        {/* 2. Dati Oggetto di Trattamento */}
        <section className="flex flex-col gap-2">
          <h3 className="font-bold text-zinc-900 border-b border-zinc-100 pb-1 text-sm uppercase tracking-wider text-orange-600">
            2. Tipologia di Dati Raccolti
          </h3>
          <p>
            Il Titolare raccoglie ed elabora le seguenti categorie di dati:
          </p>
          <ul className="list-disc pl-5 flex flex-col gap-1.5 mt-1">
            <li>
              <strong>Dati forniti volontariamente dall'utente (Modulo di Registrazione/Accedi):</strong> Nome e Cognome dello studente, numero di telefono Cellulare (obbligatori per la creazione del profilo utente). Opzionalmente: indirizzo E-mail, nome dell'istituto scolastico (Scuola), Classe e Sezione frequentata.
            </li>
            <li>
              <strong>Dati di navigazione:</strong> I sistemi informatici preposti al funzionamento del Sito acquisiscono alcuni dati la cui trasmissione è implicita nell'uso dei protocolli di comunicazione di Internet (ad es. indirizzi IP, orario della richiesta, parametri relativi al sistema operativo dell'utente). Questi dati vengono utilizzati al solo fine di garantire la sicurezza e controllare il corretto funzionamento del Sito.
            </li>
          </ul>
        </section>

        {/* 3. Finalità del Trattamento */}
        <section className="flex flex-col gap-2">
          <h3 className="font-bold text-zinc-900 border-b border-zinc-100 pb-1 text-sm uppercase tracking-wider text-orange-600">
            3. Finalità del Trattamento e Base Giuridica
          </h3>
          <p>
            I dati personali raccolti sono trattati per le seguenti finalità:
          </p>
          <ol className="list-decimal pl-5 flex flex-col gap-2 mt-1">
            <li>
              <strong>Gestione della prenotazione dei testi e dell'account utente:</strong> Permettere la registrazione al servizio, la creazione del profilo dell'utente e il successivo utilizzo dell'applicazione <em>LybroApp</em> per monitorare lo stato di avanzamento delle prenotazioni dei libri scolastici o universitari.
              <br />
              <span className="text-zinc-500 text-[11px] font-medium">
                * Base giuridica: Esecuzione di misure precontrattuali e contrattuali (Art. 6.1.b GDPR).
              </span>
            </li>
            <li>
              <strong>Comunicazioni di servizio e tracciamento:</strong> Inviare notifiche transazionali, messaggi relativi alla disponibilità dei libri per il ritiro o chiarimenti sull'ordine tramite messaggistica istantanea WhatsApp, chiamate telefoniche o SMS.
              <br />
              <span className="text-zinc-500 text-[11px] font-medium">
                * Base giuridica: Consenso espresso dell'interessato (Art. 6.1.a GDPR) fornito in fase di spunta del modulo.
              </span>
            </li>
          </ol>
        </section>

        {/* 4. Modalità di Trattamento e Sicurezza */}
        <section className="flex flex-col gap-2">
          <h3 className="font-bold text-zinc-900 border-b border-zinc-100 pb-1 text-sm uppercase tracking-wider text-orange-600">
            4. Modalità del Trattamento e Conservazione dei Dati
          </h3>
          <p>
            Il trattamento dei dati è eseguito con modalità informatiche e telematiche, attraverso l'adozione di idonee misure di sicurezza tecniche e organizzative mirate a prevenire la perdita dei dati, usi illeciti, accessi non autorizzati o diffusioni non consentite.
          </p>
          <p>
            I dati personali saranno conservati per il tempo strettamente necessario a completare la gestione degli ordini e delle prenotazioni dell'anno scolastico di riferimento e, successivamente, per i termini previsti dalla legge (generalmente 10 anni per obblighi fiscali e amministrativi).
          </p>
        </section>

        {/* 5. Comunicazione e Destinatari */}
        <section className="flex flex-col gap-2">
          <h3 className="font-bold text-zinc-900 border-b border-zinc-100 pb-1 text-sm uppercase tracking-wider text-orange-600">
            5. Comunicazione dei Dati a Terzi
          </h3>
          <p>
            I dati personali degli utenti non saranno venduti, ceduti o scambiati con terze parti per scopi commerciali o di marketing.
          </p>
          <p>
            Potranno essere comunicati esclusivamente a soggetti terzi autorizzati di cui il Titolare si avvale per lo svolgimento delle proprie attività (es. fornitori di servizi IT, hosting provider del database del back office) nominati Responsabili esterni del Trattamento, nonché ad autorità giudiziarie o organi di controllo in forza di obblighi legislativi.
          </p>
        </section>

        {/* 6. Diritti dell'Interessato */}
        <section className="flex flex-col gap-2">
          <h3 className="font-bold text-zinc-900 border-b border-zinc-100 pb-1 text-sm uppercase tracking-wider text-orange-600">
            6. Diritti dell'Interessato
          </h3>
          <p>
            In conformità agli articoli 15-22 del GDPR, l'utente può esercitare in qualsiasi momento i seguenti diritti:
          </p>
          <ul className="list-disc pl-5 flex flex-col gap-1.5 mt-1">
            <li><strong>Accesso:</strong> Ricevere conferma che sia o meno in corso un trattamento di dati che lo riguardano e ottenerne copia.</li>
            <li><strong>Rettifica:</strong> Ottenere la correzione di dati inesatti o l'integrazione di quelli incompleti.</li>
            <li><strong>Cancellazione (Diritto all'Oblio):</strong> Richiedere la rimozione definitiva dei propri dati qualora non siano più necessari per le finalità dichiarate.</li>
            <li><strong>Limitazione:</strong> Ottenere la sospensione del trattamento in presenza di particolari casistiche.</li>
            <li><strong>Opposizione:</strong> Opporsi in qualsiasi momento al trattamento per motivi legittimi connessi alla sua situazione particolare.</li>
            <li><strong>Portabilità:</strong> Richiedere il trasferimento dei propri dati in formato strutturato a sé o ad altro titolare.</li>
          </ul>
          <p className="mt-1">
            Le richieste vanno inoltrate via e-mail all'indirizzo del Titolare:{' '}
            <a href="mailto:librerianunnari@gmail.com" className="text-orange-500 hover:underline font-bold">
              librerianunnari@gmail.com
            </a>.
          </p>
        </section>

        {/* 7. Cookie Policy */}
        <section className="flex flex-col gap-2 border-t border-zinc-150 pt-5 mt-2">
          <h3 className="font-bold text-zinc-900 border-b border-zinc-100 pb-1 text-sm uppercase tracking-wider text-orange-600">
            7. Informativa sui Cookie (Cookie Policy)
          </h3>
          <p>
            Questo Sito utilizza esclusivamente <strong>cookie tecnici e di sessione</strong>.
          </p>
          <p>
            I cookie tecnici sono piccoli file di testo temporanei installati nel browser dell'utente al solo scopo di rendere fruibile la navigazione (ad esempio per mantenere l'autenticazione all'interno del pannello di amministrazione e del back office).
          </p>
          <p>
            <strong>Esclusione di cookie di terze parti e profilazione:</strong> Il Sito non installa in alcun modo cookie di profilazione pubblicitaria, di tracciamento o di analisi statistica di terze parti (come Google Analytics o Facebook Pixel).
          </p>
          <p>
            Ai sensi del Provvedimento del Garante per la protezione dei dati personali dell'8 maggio 2014 ("Individuazione delle modalità semplificate per l'informativa e l'acquisizione del consenso per l'uso dei cookie"), per l'utilizzo di soli cookie tecnici non è richiesto il consenso preventivo degli utenti tramite banner di sblocco, ma è sufficiente fornirne informazione all'interno della presente informativa.
          </p>
        </section>

      </div>
    </PageWrapper>
  )
}
