import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { headers } from 'next/headers'

// In-memory rate limiting store
// Tracks requests by IP address
const rateLimits = new Map<string, { count: number; windowStart: number }>()

export const POST = async (request: Request) => {
  try {
    const headerList = await headers()
    
    // Get client IP address
    const ip = headerList.get('x-forwarded-for')?.split(',')[0] || headerList.get('x-real-ip') || '127.0.0.1'

    // Rate-limiting check: max 5 attempts every 20 minutes
    const now = Date.now()
    const windowMs = 20 * 60 * 1000 // 20 minutes
    const maxAttempts = 5

    const limitRecord = rateLimits.get(ip)
    if (!limitRecord) {
      rateLimits.set(ip, { count: 1, windowStart: now })
    } else {
      if (now - limitRecord.windowStart > windowMs) {
        // Reset window
        rateLimits.set(ip, { count: 1, windowStart: now })
      } else {
        if (limitRecord.count >= maxAttempts) {
          return Response.json(
            { errors: [{ message: 'Troppi tentativi di registrazione. Riprova tra 20 minuti.' }] },
            { status: 429 }
          )
        }
        limitRecord.count += 1
      }
    }

    // Parse request body
    const body = await request.json().catch(() => ({}))
    const { nome, cognome, cellulare, email, scuola, classe, sezione, subject, turnstileToken } = body

    // 1. Honeypot check: if the hidden input field 'subject' is filled, discard the spam request silently
    if (subject) {
      console.warn(`Spam bot detected using honeypot (IP: ${ip})`)
      // Return a fake success response to trick the bot
      return Response.json({ success: true })
    }

    // 2. Cloudflare Turnstile verification (optional/conditional)
    // To enable, the administrator must define TURNSTILE_SECRET_KEY in their environment variables (.env)
    if (process.env.TURNSTILE_SECRET_KEY) {
      if (!turnstileToken) {
        return Response.json(
          { errors: [{ message: 'Verifica di sicurezza Turnstile mancante.' }] },
          { status: 400 }
        )
      }

      const verifyRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `secret=${process.env.TURNSTILE_SECRET_KEY}&response=${turnstileToken}`
      })

      const verifyData = await verifyRes.json()
      if (!verifyData.success) {
        return Response.json(
          { errors: [{ message: 'Verifica Turnstile non superata. Riprova.' }] },
          { status: 400 }
        )
      }
    }

    // 3. Strict server-side data validation
    if (!nome || typeof nome !== 'string' || nome.trim().length === 0 || nome.length > 100) {
      return Response.json({ errors: [{ message: 'Nome non valido (massimo 100 caratteri).' }] }, { status: 400 })
    }
    if (!cognome || typeof cognome !== 'string' || cognome.trim().length === 0 || cognome.length > 100) {
      return Response.json({ errors: [{ message: 'Cognome non valido (massimo 100 caratteri).' }] }, { status: 400 })
    }
    
    // Validate cellulare format: digits, spaces, dashes, parentheses and optional leading plus sign
    const phoneRegex = /^\+?[0-9\s\-()]{6,20}$/
    if (!cellulare || typeof cellulare !== 'string' || !phoneRegex.test(cellulare) || cellulare.length > 20) {
      return Response.json(
        { errors: [{ message: 'Numero di cellulare non valido (formato errato o oltre 20 cifre).' }] },
        { status: 400 }
      )
    }

    // Optional field validation
    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (typeof email !== 'string' || !emailRegex.test(email) || email.length > 150) {
        return Response.json({ errors: [{ message: 'Indirizzo email non valido (massimo 150 caratteri).' }] }, { status: 400 })
      }
    }

    if (scuola && (typeof scuola !== 'string' || scuola.length > 150)) {
      return Response.json({ errors: [{ message: 'Nome della scuola non valido (massimo 150 caratteri).' }] }, { status: 400 })
    }

    if (classe !== undefined && classe !== null) {
      const classNum = Number(classe)
      if (isNaN(classNum) || classNum < 1 || classNum > 5) {
        return Response.json({ errors: [{ message: 'Classe non valida (deve essere un numero da 1 a 5).' }] }, { status: 400 })
      }
    }

    if (sezione && (typeof sezione !== 'string' || sezione.length > 10)) {
      return Response.json({ errors: [{ message: 'Sezione non valida (massimo 10 caratteri).' }] }, { status: 400 })
    }

    // Initialize Payload
    const payload = await getPayload({
      config: configPromise,
    })

    // 4. Create the record in the database securely bypassing API constraints
    await payload.create({
      collection: 'utenti-registrati',
      data: {
        nome: nome.trim(),
        cognome: cognome.trim(),
        cellulare: cellulare.trim(),
        email: email ? email.trim() : undefined,
        scuola: scuola ? scuola.trim() : undefined,
        classe: classe ? Number(classe) : undefined,
        sezione: sezione ? sezione.trim() : undefined,
      },
      overrideAccess: true, // Crucial: bypasses collection 'create: false' access controls on server-side
    })

    return Response.json({ success: true })
  } catch (error: any) {
    console.error('Error during registration endpoint processing:', error)
    return Response.json(
      { errors: [{ message: error.message || 'Si è verificato un errore sul server.' }] },
      { status: 500 }
    )
  }
}
