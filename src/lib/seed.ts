import { getPayload } from 'payload'
import config from '@/payload.config'

export async function seedDatabase(payload: any) {
  // Check if books already exist in the database
  const existingBooks = await payload.find({
    collection: 'libri',
    limit: 1,
  })

  if (existingBooks.totalDocs > 0) {
    return
  }

  // Create Sectors if they don't exist
  const sectorsToCreate = ['Concorsi', 'Giuridica', 'Umanistica']
  const sectorMap: Record<string, any> = {}

  for (const name of sectorsToCreate) {
    const existing = await payload.find({
      collection: 'settori',
      where: {
        nome: {
          equals: name,
        },
      },
    })

    if (existing.docs.length > 0) {
      sectorMap[name] = existing.docs[0]
    } else {
      const created = await payload.create({
        collection: 'settori',
        data: {
          nome: name,
        },
      })
      sectorMap[name] = created
    }
  }

  // Mock books data for Concorsi, Giuridica, Umanistica
  const concorsiBooks = [
    { titolo: "Concorso Agenzia delle Entrate - Teoria e Test", autore: "Luigi Rossi", editore: "Simone", anno: 2025 },
    { titolo: "Manuale Concorso INPS - 500 Consulenti", autore: "Maria Bianchi", editore: "Edizioni Simone", anno: 2026 },
    { titolo: "Istruttore Direttivo Amministrativo negli Enti Locali", autore: "Giovanni Verdi", editore: "Maggioli", anno: 2025 },
    { titolo: "Collaboratore Professionale Sanitario - Infermiere", autore: "Anna Neri", editore: "Alpha Test", anno: 2025 },
    { titolo: "Concorso DSGA - Direttore dei Servizi Generali ed Amministrativi", autore: "Roberto Bruno", editore: "Simone", anno: 2025 },
    { titolo: "Quiz Commentati per Concorsi Comunali", autore: "Carlo Gallo", editore: "Maggioli", anno: 2026 },
    { titolo: "Concorso Ministero della Giustizia - 800 Assistenti", autore: "Elena Ferrari", editore: "Edizioni Simone", anno: 2025 },
    { titolo: "La Prova Attitudinale per i Concorsi Pubblici", autore: "Francesco Russo", editore: "Alpha Test", anno: 2025 },
    { titolo: "Collaboratore Amministrativo USL", autore: "Sofia Costa", editore: "Simone", anno: 2024 },
    { titolo: "Manuale di Logica per tutti i Concorsi", autore: "Davide Ricci", editore: "Maggioli", anno: 2026 }
  ]

  const giuridicaBooks = [
    { titolo: "Codice Civile Esplicato - Edizione 2026", autore: "Vincenzo Franceschelli", editore: "Simone", anno: 2026 },
    { titolo: "Diritto Penale - Parte Generale", autore: "Giovanni Fiandaca", editore: "Zanichelli", anno: 2025 },
    { titolo: "Istituzioni di Diritto Privato", autore: "Andrea Torrente", editore: "Giuffrè", anno: 2025 },
    { titolo: "Manuale di Diritto Amministrativo", autore: "Elio Casetta", editore: "Giuffrè", anno: 2025 },
    { titolo: "Codice di Procedura Civile Esplicato", autore: "Federico del Giudice", editore: "Simone", anno: 2026 },
    { titolo: "Lineamenti di Diritto Costituzionale", autore: "Temistocle Martines", editore: "Giuffrè", anno: 2025 },
    { titolo: "Diritto Commerciale", autore: "Gian Franco Campobasso", editore: "UTET", anno: 2024 },
    { titolo: "Codice di Procedura Penale per l'Udienza", autore: "Paolo Tonini", editore: "Giuffrè", anno: 2026 },
    { titolo: "Compendio di Diritto del Lavoro", autore: "Adalberto Perulli", editore: "Zanichelli", anno: 2025 },
    { titolo: "Istituzioni di Diritto dell'Unione Europea", autore: "Giuseppe Tesauro", editore: "Editoriale Scientifica", anno: 2024 }
  ]

  const umanisticaBooks = [
    { titolo: "Storia Contemporanea - Dal XIX al XXI Secolo", autore: "Giovanni Sabbatucci", editore: "Laterza", anno: 2025 },
    { titolo: "Introduzione alla Storia della Filosofia", autore: "Nicola Abbagnano", editore: "UTET", anno: 2024 },
    { titolo: "Antropologia Culturale - Prospettive e Teorie", autore: "Fabio Dei", editore: "Il Mulino", anno: 2025 },
    { titolo: "L'Arte Contemporanea - Correnti e Protagonisti", autore: "Francesco Poli", editore: "Laterza", anno: 2025 },
    { titolo: "Manuale di Linguistica Italiana", autore: "Massimo Palermo", editore: "Il Mulino", anno: 2024 },
    { titolo: "Sociologia dei Processi Culturali", autore: "Loredana Sciolla", editore: "Il Mulino", anno: 2025 },
    { titolo: "Storia della Letteratura Italiana - Le Origini", autore: "Giulio Ferroni", editore: "Mondadori", anno: 2025 },
    { titolo: "Introduzione alla Psicologia Generale", autore: "Paolo Legrenzi", editore: "Il Mulino", anno: 2025 },
    { titolo: "Archeologia Classica - Teorie e Metodi", autore: "Ranuccio Bianchi Bandinelli", editore: "Laterza", anno: 2024 },
    { titolo: "Geografia Umana - Culture, Società, Territori", autore: "Jerome D. Fellmann", editore: "McGraw-Hill", anno: 2025 }
  ]

  const createBooksForSector = async (books: any[], sectorName: string) => {
    const sector = sectorMap[sectorName]
    for (let i = 0; i < books.length; i++) {
      const b = books[i]
      // Random price between 15.00 and 80.00
      const prezzo = Math.round((15 + Math.random() * 65) * 100) / 100
      
      // 40% chance of being on sale, price discounted by 15% to 30%
      let prezzoScontato: number | undefined = undefined
      if (Math.random() < 0.4) {
        const discountPercent = 0.15 + Math.random() * 0.15
        prezzoScontato = Math.round(prezzo * (1 - discountPercent) * 100) / 100
      }

      await payload.create({
        collection: 'libri',
        data: {
          titolo: b.titolo,
          autore: b.autore,
          prezzo: prezzo,
          prezzoScontato: prezzoScontato,
          editore: b.editore,
          annoPubblicazione: b.anno,
          settore: sector.id,
          descrizione: `Questa è una descrizione di prova del libro "${b.titolo}" edito da ${b.editore} nell'anno ${b.anno}. Un testo fondamentale per lo studio della materia.`
        }
      })
    }
  }

  await createBooksForSector(concorsiBooks, 'Concorsi')
  await createBooksForSector(giuridicaBooks, 'Giuridica')
  await createBooksForSector(umanisticaBooks, 'Umanistica')
}
