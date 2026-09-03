export interface UserRegistrationNotificationData {
  nome: string
  cognome: string
  cellulare: string
  email?: string | null
  scuola?: string | null
  classe?: number | string | null
  sezione?: string | null
}

/**
 * Invia un'email di notifica dell'avvenuta registrazione tramite l'API REST di Resend.
 * Non richiede librerie esterne e funziona nativamente sia in locale che nei container Docker/Podman.
 */
export async function sendRegistrationNotificationEmail(data: UserRegistrationNotificationData) {
  const apiKey = process.env.RESEND_API_KEY
  const toEmail = process.env.NOTIFICATION_EMAIL_TO
  const fromEmail = process.env.NOTIFICATION_EMAIL_FROM || 'Libreria Nunnari <onboarding@resend.dev>'

  if (!apiKey) {
    console.warn('[Notifiche Email] RESEND_API_KEY non configurata nel file .env. Notifica saltata.')
    return { success: false, reason: 'missing_api_key' }
  }

  if (!toEmail) {
    console.warn('[Notifiche Email] NOTIFICATION_EMAIL_TO non configurata nel file .env. Notifica saltata.')
    return { success: false, reason: 'missing_recipient' }
  }

  const nowFormatted = new Date().toLocaleString('it-IT', {
    timeZone: 'Europe/Rome',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })

  const subject = `Nuova Registrazione: ${data.nome} ${data.cognome}`

  const htmlContent = `
<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; color: #1e293b; margin: 0; padding: 24px; }
    .card { background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; max-width: 580px; margin: 0 auto; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); }
    .header { background-color: #ea580c; color: #ffffff; padding: 20px 24px; text-align: left; }
    .header h1 { margin: 0; font-size: 20px; font-weight: 700; letter-spacing: -0.02em; }
    .header p { margin: 4px 0 0 0; font-size: 13px; opacity: 0.9; }
    .body { padding: 24px; }
    .intro { font-size: 14px; margin-bottom: 20px; color: #475569; }
    .table { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
    .table tr { border-bottom: 1px solid #f1f5f9; }
    .table td { padding: 10px 0; font-size: 14px; vertical-align: top; }
    .label { color: #64748b; font-weight: 600; width: 35%; }
    .value { color: #0f172a; font-weight: 500; }
    .footer { background-color: #f8fafc; border-top: 1px solid #e2e8f0; padding: 16px 24px; text-align: center; font-size: 12px; color: #94a3b8; }
    .badge { display: inline-block; background-color: #ffedd5; color: #9a3412; font-size: 12px; font-weight: 600; padding: 2px 8px; border-radius: 6px; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <h1>Libreria Nunnari & Sfameni</h1>
      <p>Notifica di Nuova Registrazione Utente</p>
    </div>
    <div class="body">
      <p class="intro">È appena stata ricevuta una nuova richiesta di registrazione sul sito web. Ecco il riepilogo dei dati inviati:</p>
      <table class="table">
        <tr>
          <td class="label">Nome completo</td>
          <td class="value"><strong>${data.nome} ${data.cognome}</strong></td>
        </tr>
        <tr>
          <td class="label">Numero Cellulare</td>
          <td class="value"><a href="tel:${data.cellulare}" style="color: #ea580c; text-decoration: none; font-weight: 600;">${data.cellulare}</a></td>
        </tr>
        <tr>
          <td class="label">Indirizzo Email</td>
          <td class="value">${data.email ? `<a href="mailto:${data.email}" style="color: #2563eb; text-decoration: none;">${data.email}</a>` : '<em style="color: #94a3b8;">Non specificata</em>'}</td>
        </tr>
        <tr>
          <td class="label">Scuola / Istituto</td>
          <td class="value">${data.scuola ? data.scuola : '<em style="color: #94a3b8;">Non specificata</em>'}</td>
        </tr>
        <tr>
          <td class="label">Classe e Sezione</td>
          <td class="value">
            ${data.classe || data.sezione 
              ? `<span class="badge">${data.classe ? `Classe ${data.classe}ª` : ''} ${data.sezione ? `Sez. ${data.sezione}` : ''}</span>` 
              : '<em style="color: #94a3b8;">Non specificate</em>'}
          </td>
        </tr>
        <tr>
          <td class="label">Data ricezione</td>
          <td class="value" style="color: #64748b; font-size: 13px;">${nowFormatted}</td>
        </tr>
      </table>
    </div>
    <div class="footer">
      Messaggio generato automaticamente dal portale di gestione Libreria Nunnari & Sfameni
    </div>
  </div>
</body>
</html>
  `.trim()

  const textContent = `
Nuova Registrazione Ricevuta - Libreria Nunnari & Sfameni
------------------------------------------------------
Nome: ${data.nome} ${data.cognome}
Cellulare: ${data.cellulare}
Email: ${data.email || 'Non specificata'}
Scuola: ${data.scuola || 'Non specificata'}
Classe: ${data.classe || '-'} ${data.sezione ? `Sez. ${data.sezione}` : ''}
Data: ${nowFormatted}
------------------------------------------------------
Messaggio generato automaticamente.
  `.trim()

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        subject: subject,
        html: htmlContent,
        text: textContent,
      }),
    })

    const result = await response.json()

    if (!response.ok) {
      console.error('[Notifiche Email Resend] Errore risposta API:', result)
      return { success: false, error: result }
    }

    console.log(`[Notifiche Email Resend] Email inviata con successo a ${toEmail} (ID: ${result.id})`)
    return { success: true, id: result.id }
  } catch (error: any) {
    console.error('[Notifiche Email Resend] Errore di rete durante la chiamata API:', error)
    return { success: false, error: error.message || error }
  }
}
