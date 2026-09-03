'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Check } from 'lucide-react'
import { PageWrapper } from '@/components/PageWrapper'

declare global {
  interface Window {
    turnstile?: {
      render: (container: string | HTMLElement, options: any) => string
      reset: (widgetId?: string) => void
      remove: (widgetId?: string) => void
    }
    onloadTurnstileCallback?: () => void
  }
}

export function AccediForm() {
  const [formData, setFormData] = useState({
    nome: '',
    cognome: '',
    cellulare: '',
    email: '',
    scuola: '',
    classe: '',
    sezione: '',
  })
  const [subject, setSubject] = useState('') // Honeypot state
  const [privacyAccepted, setPrivacyAccepted] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [turnstileToken, setTurnstileToken] = useState('')

  // Dynamically load Cloudflare Turnstile script and render the widget
  useEffect(() => {
    const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY
    if (!siteKey) return

    if (document.getElementById('cloudflare-turnstile-script')) {
      if (window.turnstile) {
        try {
          window.turnstile.render('#turnstile-widget', {
            sitekey: siteKey,
            callback: (token: string) => {
              setTurnstileToken(token)
            },
          })
        } catch (e) {
          console.error('Turnstile render error:', e)
        }
      }
      return
    }

    const script = document.createElement('script')
    script.id = 'cloudflare-turnstile-script'
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onloadTurnstileCallback'
    script.async = true
    script.defer = true

    window.onloadTurnstileCallback = () => {
      if (window.turnstile) {
        try {
          window.turnstile.render('#turnstile-widget', {
            sitekey: siteKey,
            callback: (token: string) => {
              setTurnstileToken(token)
            },
          })
        } catch (e) {
          console.error('Turnstile render error in onload:', e)
        }
      }
    }

    document.body.appendChild(script)

    return () => {
      delete window.onloadTurnstileCallback
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setStatus('idle')
    setErrorMessage('')

    if (!privacyAccepted) {
      setStatus('error')
      setErrorMessage("È necessario accettare l'informativa sulla privacy per procedere.")
      setLoading(false)
      return
    }

    try {
      const response = await fetch('/api/register-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome: formData.nome,
          cognome: formData.cognome,
          cellulare: formData.cellulare,
          email: formData.email || undefined,
          scuola: formData.scuola || undefined,
          classe: formData.classe ? parseInt(formData.classe, 10) : undefined,
          sezione: formData.sezione || undefined,
          subject, // Honeypot field
          turnstileToken,
        }),
      })

      if (!response.ok) {
        const resData = await response.json().catch(() => ({}))
        throw new Error(resData.errors?.[0]?.message || 'Errore durante la registrazione. Riprova.')
      }

      setStatus('success')
    } catch (err: any) {
      setStatus('error')
      setErrorMessage(err.message || 'Si è verificato un errore.')
      setLoading(false)
    }
  }

  // Render thank you page view directly replacing the form when success
  if (status === 'success') {
    return (
      <PageWrapper title="Accedi / Registrazione">
        <div className="bg-white rounded-xl border border-zinc-200/80 shadow-sm p-6 max-w-xl mr-auto w-full text-xs text-zinc-600 font-sans leading-relaxed">
          <div className="flex items-center gap-2.5 mb-3 text-emerald-800">
            <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 text-emerald-800">
              <Check className="w-3.5 h-3.5 stroke-[3]" />
            </div>
            <span className="font-bold text-xs text-zinc-800 font-sans">Registrazione avvenuta con successo</span>
          </div>
          <p className="font-medium text-zinc-600 text-xs leading-relaxed mb-4">
            Grazie per esserti registrato, verrai ricontattato su WhatsApp per confermare l'apertura della prenotazione.
          </p>
          <div className="pt-3 border-t border-zinc-100 flex items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs text-orange-600 hover:text-orange-700 font-bold uppercase tracking-wider font-sans transition-colors"
            >
              &larr; Torna alla Home
            </Link>
          </div>
        </div>
      </PageWrapper>
    )
  }

  return (
    <PageWrapper title="Accedi / Registrazione">
      <div className="bg-white rounded-xl border border-zinc-200/80 shadow-sm p-6 max-w-xl mr-auto w-full relative">
        {/* Info header instructions */}
        <div className="text-xs text-zinc-600 font-sans leading-relaxed mb-5 border-b border-zinc-100 pb-4">
          <p>
            Se hai già una prenotazione in corso,{' '}
            <a
              href="https://www.librionline.net/app/login.php"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-500 hover:text-orange-600 font-bold transition-colors"
            >
              accedi all'app
            </a>{' '}
            per visualizzare lo stato del tuo ordine.
          </p>
          <p className="mt-1 font-medium text-zinc-550">
            Oppure <b>registrati</b> per creare un account accessibile dalla nostra app. Verrai ricontattato su WhatsApp per confermare l'apertura della prenotazione.
          </p>
        </div>

        {status === 'error' && (
          <div className="mb-5 p-4 bg-red-50 border border-red-200/85 rounded-lg text-red-800 text-xs font-sans">
            <p className="font-bold">Attenzione:</p>
            <p className="mt-1">{errorMessage}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-xs">
          {/* Honeypot field (hidden from human users, targets bots) */}
          <div className="hidden absolute w-0 h-0 overflow-hidden" aria-hidden="true">
            <input
              type="text"
              name="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Nome */}
            <div className="flex flex-col gap-1">
              <label htmlFor="nome" className="font-bold text-zinc-700 font-sans">
                Nome <span className="text-orange-500">*</span>
              </label>
              <input
                type="text"
                id="nome"
                name="nome"
                required
                maxLength={50}
                value={formData.nome}
                onChange={handleChange}
                placeholder="Inserisci il nome dello studente"
                className="w-full p-2 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 font-sans text-zinc-800 bg-white"
              />
            </div>

            {/* Cognome */}
            <div className="flex flex-col gap-1">
              <label htmlFor="cognome" className="font-bold text-zinc-700 font-sans">
                Cognome <span className="text-orange-500">*</span>
              </label>
              <input
                type="text"
                id="cognome"
                name="cognome"
                required
                maxLength={50}
                value={formData.cognome}
                onChange={handleChange}
                placeholder="Inserisci cognome dello studente"
                className="w-full p-2 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 font-sans text-zinc-800 bg-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Cellulare */}
            <div className="flex flex-col gap-1">
              <label htmlFor="cellulare" className="font-bold text-zinc-700 font-sans">
                Cellulare <span className="text-orange-500">*</span>
              </label>
              <input
                type="tel"
                id="cellulare"
                name="cellulare"
                required
                value={formData.cellulare}
                onChange={handleChange}
                placeholder="Inserisci il cellulare"
                className="w-full p-2 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 font-sans text-zinc-800 bg-white"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="font-bold text-zinc-700 font-sans">
                E-mail
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Inserisci l'indirizzo email"
                className="w-full p-2 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 font-sans text-zinc-800 bg-white"
              />
            </div>
          </div>

          {/* Scuola */}
          <div className="flex flex-col gap-1">
            <label htmlFor="scuola" className="font-bold text-zinc-700 font-sans">
              Scuola
            </label>
            <input
              type="text"
              id="scuola"
              name="scuola"
              value={formData.scuola}
              onChange={handleChange}
              placeholder="Nome dell'istituto scolastico"
              className="w-full p-2 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 font-sans text-zinc-800 bg-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Classe */}
            <div className="flex flex-col gap-1">
              <label htmlFor="classe" className="font-bold text-zinc-700 font-sans">
                Classe
              </label>
              <select
                id="classe"
                name="classe"
                value={formData.classe}
                onChange={handleChange}
                className="w-full p-2 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 font-sans text-zinc-800 bg-white"
              >
                <option value="">Seleziona...</option>
                <option value="1">1ª</option>
                <option value="2">2ª</option>
                <option value="3">3ª</option>
                <option value="4">4ª</option>
                <option value="5">5ª</option>
              </select>
            </div>

            {/* Sezione */}
            <div className="flex flex-col gap-1">
              <label htmlFor="sezione" className="font-bold text-zinc-700 font-sans">
                Sezione
              </label>
              <input
                type="text"
                id="sezione"
                name="sezione"
                maxLength={15}
                value={formData.sezione}
                onChange={handleChange}
                placeholder="Es. A, B, C"
                className="w-full p-2 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 font-sans text-zinc-800 bg-white"
              />
            </div>
          </div>

          {/* Privacy Consent Checkbox */}
          <div className="flex items-start gap-2.5 mt-2">
            <input
              type="checkbox"
              id="privacy"
              name="privacy"
              checked={privacyAccepted}
              onChange={(e) => setPrivacyAccepted(e.target.checked)}
              className="mt-0.5 w-3.5 h-3.5 text-orange-600 border-zinc-300 rounded focus:ring-orange-500/20 focus:border-orange-500 font-sans text-zinc-800 bg-white cursor-pointer"
              required
            />
            <label htmlFor="privacy" className="font-medium text-zinc-600 font-sans select-none cursor-pointer leading-normal">
              Ho letto e accetto l'
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault()
                  setModalOpen(true)
                }}
                className="text-orange-500 hover:text-orange-600 font-bold underline ml-1 cursor-pointer bg-transparent border-0 p-0 inline"
              >
                informativa sulla privacy
              </button>
            </label>
          </div>

          {/* Cloudflare Turnstile Verification Widget */}
          <div className="mt-2">
            {process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ? (
              <div id="turnstile-widget" className="flex justify-center sm:justify-start"></div>
            ) : (
              <div className="text-amber-700 text-[10px] p-2.5 bg-amber-50/70 border border-amber-200 rounded-lg font-sans leading-normal">
                Attenzione: inserisci la chiave <code>NEXT_PUBLIC_TURNSTILE_SITE_KEY</code> nel file <code>.env</code> per attivare la verifica di sicurezza Turnstile nel form.
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 p-3 bg-orange-600 hover:bg-orange-700 text-white font-bold uppercase tracking-wider rounded-lg transition-colors font-sans disabled:bg-zinc-300 disabled:text-zinc-500 disabled:cursor-not-allowed cursor-pointer"
          >
            {loading ? 'Invio in corso...' : 'Registrati'}
          </button>
        </form>
      </div>

      {/* GDPR Compliant Privacy Policy Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-lg rounded-xl border border-zinc-200 shadow-xl flex flex-col max-h-[85vh]">
            {/* Modal Header */}
            <div className="px-5 py-4 border-b border-zinc-150 flex justify-between items-center bg-zinc-50/80 rounded-t-xl">
              <h3 className="font-bold text-xs uppercase tracking-wider text-orange-600 font-sans">
                Informativa sulla Privacy (GDPR)
              </h3>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="text-zinc-400 hover:text-zinc-600 text-lg font-bold font-sans cursor-pointer bg-transparent border-0 p-0"
              >
                &times;
              </button>
            </div>
            {/* Modal Content */}
            <div className="p-5 overflow-y-auto text-xs text-zinc-600 font-sans leading-relaxed flex flex-col gap-4">
              <p className="font-bold text-zinc-800">
                Informativa ai sensi del Regolamento UE 2016/679 ("GDPR")
              </p>
              <p>
                La presente informativa descrive le modalità di trattamento dei dati personali forniti dagli utenti in fase di registrazione attraverso il sito web della <strong>Libreria Nunnari & Sfameni s.a.s.</strong>.
              </p>
              <div>
                <h4 className="font-bold text-zinc-800 mb-1">1. Titolare del Trattamento</h4>
                <p>
                  Il Titolare del trattamento è: <strong>Libreria Nunnari & Sfameni s.a.s.</strong>, con sede legale in Via Tommaso Cannizzaro 112, 98122 Messina (ME), P.IVA 03027400831. Email di contatto: <a href="mailto:librerianunnari@gmail.com" className="text-orange-500 hover:underline">librerianunnari@gmail.com</a>.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-zinc-800 mb-1">2. Tipi di Dati Raccolti</h4>
                <p>
                  I dati raccolti includono obbligatoriamente Nome, Cognome e numero di Cellulare. Opzionalmente possono essere forniti Indirizzo E-mail, Istituto Scolastico, Classe e Sezione dello studente.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-zinc-800 mb-1">3. Finalità del Trattamento</h4>
                <p>
                  I dati vengono trattati esclusivamente per:
                </p>
                <ul className="list-disc pl-4 mt-1 flex flex-col gap-1">
                  <li>Creare l'account personale dell'utente per l'accesso ai nostri servizi.</li>
                  <li>Inviare aggiornamenti e comunicazioni relative allo stato di ordini, prenotazioni e arrivi di libri scolastici tramite WhatsApp, SMS o contatti telefonici.</li>
                  <li>Adempiere ad obblighi amministrativi, contabili e di legge.</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-zinc-800 mb-1">4. Base Giuridica del Trattamento</h4>
                <p>
                  Il trattamento si basa sull'esecuzione di misure precontrattuali o contrattuali (la prenotazione dei volumi scolastici e universitari) e sul consenso esplicito dell'interessato prestato tramite la spunta del checkbox.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-zinc-800 mb-1">5. Periodo di Conservazione dei Dati</h4>
                <p>
                  I dati personali saranno conservati per il tempo strettamente necessario a completare la gestione degli ordini e delle prenotazioni dell'anno scolastico in corso e, successivamente, per i termini previsti dalla legge (fino a 10 anni per obblighi fiscali).
                </p>
              </div>
              <div>
                <h4 className="font-bold text-zinc-800 mb-1">6. Diritti dell'Interessato</h4>
                <p>
                  In quanto interessato, hai il diritto in qualsiasi momento di richiedere l'accesso ai tuoi dati, la rettifica, la cancellazione, la limitazione del trattamento o di opporti allo stesso inviando una comunicazione all'indirizzo email <a href="mailto:librerianunnari@gmail.com" className="text-orange-500 hover:underline">librerianunnari@gmail.com</a>.
                </p>
              </div>
            </div>
            {/* Modal Footer */}
            <div className="px-5 py-3 border-t border-zinc-150 bg-zinc-50 flex justify-end rounded-b-xl">
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white font-bold uppercase tracking-wider rounded-lg transition-colors text-[10px] cursor-pointer"
              >
                Ho Capito
              </button>
            </div>
          </div>
        </div>
      )}
    </PageWrapper>
  )
}
