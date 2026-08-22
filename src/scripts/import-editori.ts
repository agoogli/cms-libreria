import { getPayload } from 'payload'
import configPromise from '../payload.config'
import fs from 'fs'
import path from 'path'

/**
 * Script per l'importazione massiva di editori da un file CSV.
 * Uso:
 *   1. Metti il tuo file CSV (es. `editori.csv`) nella cartella principale del progetto
 *   2. Esegui lo script con: npx tsx src/scripts/import-editori.ts editori.csv
 */

async function importEditori() {
  try {
    await import('dotenv/config')
  } catch {
    // In produzione dentro il container le variabili d'ambiente (DATABASE_URL, ecc.)
    // sono già fornite direttamente da Podman/Docker nel process.env
  }
  const filePath = process.argv[2] || 'editori.csv'
  const absolutePath = path.resolve(process.cwd(), filePath)

  if (!fs.existsSync(absolutePath)) {
    console.error(`❌ Errore: File non trovato in ${absolutePath}`)
    console.log(`💡 Crea il file "${filePath}" nella radice del progetto o specifica il percorso.`)
    console.log(`Formato del CSV previsto (una colonna o intitolata "nome"):`)
    console.log(`nome\nMondadori\nSellerio\nZanichelli`)
    process.exit(1)
  }

  console.log(`📖 Lettura del file CSV: ${absolutePath}...`)
  const fileContent = fs.readFileSync(absolutePath, 'utf-8')

  // Parsing delle righe
  const lines = fileContent
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0)

  // Ignora la prima riga se contiene l'intestazione "nome" o "editore"
  const firstLine = lines[0].toLowerCase()
  const hasHeader = firstLine.includes('nome') || firstLine.includes('editore') || firstLine.includes('publisher')
  const editoriNomi = (hasHeader ? lines.slice(1) : lines)
    .map((line) => {
      // Se il CSV ha virgolette o separatori a virgola/punto e virgola
      const clean = line.split(/[,;]/)[0].replace(/^["']|["']$/g, '').trim()
      return clean
    })
    .filter((nome) => nome.length > 0)

  // Rimuovi duplicati dal CSV stesso
  const uniqueNomi = Array.from(new Set(editoriNomi))

  console.log(`🚀 Inizializzazione Payload CMS...`)
  const payload = await getPayload({ config: configPromise })

  console.log(`📦 Trovati ${uniqueNomi.length} editori unici. Inizio importazione...`)

  let successCount = 0
  let skippedCount = 0

  for (const nome of uniqueNomi) {
    try {
      // Controlla se l'editore esiste già
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
      console.log(`  ✓ Creato: ${nome}`)
    } catch (err: any) {
      console.error(`  ❌ Errore durante il salvataggio di "${nome}":`, err.message || err)
    }
  }

  console.log(`\n🎉 Importazione completata!`)
  console.log(`✅ Creati: ${successCount}`)
  console.log(`⏭️  Già presenti/Saltati: ${skippedCount}`)
  process.exit(0)
}

importEditori()
