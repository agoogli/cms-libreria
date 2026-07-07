'use client'

import React, { useState } from 'react'
import { PageWrapper } from '@/components/PageWrapper'

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
  const [privacyAccepted, setPrivacyAccepted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

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
      const response = await fetch('/api/utenti-registrati', {
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
        <div className="bg-white rounded-xl border border-zinc-200/80 shadow-sm p-6 max-w-xl mr-auto w-full text-xs text-zinc-700 font-sans leading-relaxed">
          <div className="flex items-center gap-3 mb-4 text-green-600">
            <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center shrink-0">
              <svg className="w-5 h-5 fill-none stroke-currentColor stroke-2" viewBox="0 0 24 24">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <span className="font-bold text-sm text-zinc-800">Registrazione Completata</span>
          </div>
          <p className="font-medium text-zinc-650">
            Grazie per esserti registrato, verrai ricontattato su whatsapp per confermare l'apertura del tuo profilo utente.
          </p>
        </div>
      </PageWrapper>
    )
  }

  return (
    <PageWrapper title="Accedi / Registrazione">
      <div className="bg-white rounded-xl border border-zinc-200/80 shadow-sm p-6 max-w-xl mr-auto w-full">
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
          <p className="font-medium text-zinc-550">
            Oppure <b>registrati</b> per creare un account accessibile dalla nostra app
          </p>
        </div>

        {status === 'error' && (
          <div className="mb-5 p-4 bg-red-50 border border-red-200/85 rounded-lg text-red-800 text-xs font-sans">
            <p className="font-bold">Attenzione:</p>
            <p className="mt-1">{errorMessage}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-xs">
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
              className="mt-0.5 w-3.5 h-3.5 text-orange-600 border-zinc-300 rounded focus:ring-orange-500 focus:ring-2 accent-orange-600 cursor-pointer"
              required
            />
            <label htmlFor="privacy" className="font-medium text-zinc-600 font-sans select-none cursor-pointer leading-normal">
              Ho letto e accetto l'informativa sulla privacy
            </label>
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
    </PageWrapper>
  )
}
