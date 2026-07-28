import configPromise from '@payload-config'
import { getPayload } from 'payload'
import fs from 'fs'

export const POST = async (request: Request) => {
  try {
    // Security check: require header x-import-secret matching PAYLOAD_SECRET
    const secretHeader = request.headers.get('x-import-secret')
    const expectedSecret = process.env.PAYLOAD_SECRET

    if (expectedSecret && secretHeader !== expectedSecret) {
      return Response.json(
        { error: 'Non autorizzato: la chiave segreta nell\'header x-import-secret è errata o mancante.' },
        { status: 401 }
      )
    }

    let csvText = ''

    const contentType = request.headers.get('content-type') || ''

    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData()
      const file = formData.get('file') as File | null
      if (file) {
        csvText = await file.text()
      }
    } else if (contentType.includes('text/csv') || contentType.includes('text/plain')) {
      csvText = await request.text()
    } else {
      // Try JSON or fallback to reading /app/editori.csv from container filesystem
      const body = await request.json().catch(() => ({}))
      const targetPath = body.filePath || '/app/editori.csv'
      if (fs.existsSync(targetPath)) {
        csvText = fs.readFileSync(targetPath, 'utf-8')
      }
    }

    if (!csvText || csvText.trim().length === 0) {
      return Response.json(
        { error: 'Nessun contenuto CSV fornito e file /app/editori.csv non trovato sul server.' },
        { status: 400 }
      )
    }

    // Parse CSV lines
    const lines = csvText
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => line.length > 0)

    if (lines.length === 0) {
      return Response.json({ error: 'Il file CSV è vuoto.' }, { status: 400 })
    }

    const firstLine = lines[0].toLowerCase()
    const hasHeader = firstLine.includes('nome') || firstLine.includes('editore') || firstLine.includes('publisher')
    const rawNames = (hasHeader ? lines.slice(1) : lines)
      .map((line) => line.split(/[,;]/)[0].replace(/^["']|["']$/g, '').trim())
      .filter((nome) => nome.length > 0)

    const uniqueNomi = Array.from(new Set(rawNames))

    const payload = await getPayload({ config: configPromise })

    let successCount = 0
    let skippedCount = 0

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
        console.error(`Error importing publisher "${nome}":`, err)
      }
    }

    return Response.json({
      success: true,
      message: 'Importazione completata con successo!',
      totaliCsv: uniqueNomi.length,
      creati: successCount,
      saltati: skippedCount,
    })
  } catch (error: any) {
    console.error('Import editori API error:', error)
    return Response.json(
      { error: error.message || 'Errore interno durante l\'importazione.' },
      { status: 500 }
    )
  }
}
