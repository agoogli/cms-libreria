import configPromise from '@/payload.config'
import { getPayload } from 'payload'

export const POST = async (request: Request) => {
  try {
    // Controllo di sicurezza: richiede l'header x-import-secret con il valore di PAYLOAD_SECRET
    const authHeader = request.headers.get('x-import-secret')
    const payloadSecret = process.env.PAYLOAD_SECRET

    if (!authHeader || (payloadSecret && authHeader !== payloadSecret)) {
      return Response.json(
        { error: 'Accesso non autorizzato. Intestazione "x-import-secret" non valida o mancante.' },
        { status: 401 }
      )
    }

    let csvText = ''
    const contentType = request.headers.get('content-type') || ''

    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData()
      const file = formData.get('file') as File | null
      if (!file) {
        return Response.json(
          { error: 'Nessun file caricato. Invia un file nel campo "file".' },
          { status: 400 }
        )
      }
      csvText = await file.text()
    } else {
      csvText = await request.text()
    }

    if (!csvText || csvText.trim().length === 0) {
      return Response.json(
        { error: 'Il contenuto del file CSV è vuoto.' },
        { status: 400 }
      )
    }

    // Parse CSV lines
    const lines = csvText
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => line.length > 0)

    if (lines.length === 0) {
      return Response.json(
        { error: 'Nessuna riga valida trovata nel CSV.' },
        { status: 400 }
      )
    }

    // Ignore header if present
    const firstLine = lines[0].toLowerCase()
    const hasHeader =
      firstLine.includes('nome') ||
      firstLine.includes('editore') ||
      firstLine.includes('publisher')

    const editoriNomi = (hasHeader ? lines.slice(1) : lines)
      .map((line) => {
        const clean = line.split(/[,;]/)[0].replace(/^["']|["']$/g, '').trim()
        return clean
      })
      .filter((nome) => nome.length > 0)

    const uniqueNomi = Array.from(new Set(editoriNomi))

    const payload = await getPayload({ config: configPromise })

    let successCount = 0
    let skippedCount = 0
    const errors: string[] = []

    for (const nome of uniqueNomi) {
      try {
        const existing = await payload.find({
          collection: 'editori',
          where: {
            nome: {
              equals: nome,
            },
          },
          limit: 1,
          overrideAccess: true,
        })

        if (existing.docs && existing.docs.length > 0) {
          skippedCount++
          continue
        }

        await payload.create({
          collection: 'editori',
          data: {
            nome,
          },
          overrideAccess: true,
        })
        successCount++
      } catch (err: any) {
        errors.push(`Errore per "${nome}": ${err.message || err}`)
      }
    }

    return Response.json({
      message: 'Importazione completata con successo',
      created: successCount,
      skipped: skippedCount,
      total: uniqueNomi.length,
      errors,
    })
  } catch (error: any) {
    console.error('Errore durante l\'importazione editori:', error)
    return Response.json(
      { error: error.message || 'Errore interno del server' },
      { status: 500 }
    )
  }
}
