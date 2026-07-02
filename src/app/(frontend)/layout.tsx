import React from 'react'
import { Inter } from 'next/font/google'
import './styles.css'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { TopBar } from '@/components/TopBar'
import { Header } from '@/components/Header'
import { GradientDivider } from '@/components/GradientDivider'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata = {
  description: 'Libreria Antigravità - Libri scolastici, universitari, concorsi e professionali a Messina',
  title: 'Libreria Antigravità',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  // Fetch sectors (settori) list from Payload server-side
  let settori: any[] = []
  try {
    const payload = await getPayload({ config })
    const response = await payload.find({
      collection: 'settori',
      limit: 100,
      sort: 'nome',
      overrideAccess: true,
    })
    settori = response.docs || []
  } catch (error) {
    console.error('Error fetching sectors in layout:', error)
  }

  const mappedSettori = settori.map((s) => ({
    id: s.id,
    nome: s.nome,
  }))

  return (
    <html lang="it" className={inter.variable}>
      <body className="font-sans antialiased bg-[#f2f2f2] text-zinc-900 selection:bg-orange-500 selection:text-white">
        <div className="min-h-screen flex flex-col">
          {/* 1. Top Bar */}
          <TopBar />

          {/* 2. Header */}
          <Header settori={mappedSettori} />

          {/* 3. Gradient Divider */}
          <GradientDivider />

          {/* 4. Main Body Content area */}
          <main className="flex-grow flex flex-col gap-4 pb-12">
            {children}
          </main>

          {/* 5. Footer */}
          <footer className="w-full bg-[#363537] border-t border-zinc-800 py-8 text-zinc-400 text-xs">
            <div className="w-full lg:w-[60%] mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4">
              <p>© {new Date().getFullYear()} Libreria Nunnari e Sfameni snc. Tutti i diritti riservati.</p>
              <p>Partita IVA: 03027400831 - Via T.Cannizzaro 112 98122 Messina (ME)</p>
              <div className="flex gap-6">
                <a href="#" className="hover:text-zinc-200 transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-zinc-200 transition-colors">Termini e Condizioni</a>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}
