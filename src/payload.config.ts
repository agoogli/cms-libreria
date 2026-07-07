import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Utenti } from './collections/Utenti'
import { Media } from './collections/Media'
import { Settori } from './collections/Settori'
import { Libri } from './collections/Libri'
import { UtentiRegistrati } from './collections/UtentiRegistrati'
import { en } from '@payloadcms/translations/languages/en'
import { it } from '@payloadcms/translations/languages/it'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Utenti.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    components: {
      beforeNavLinks: [
        '@/components/BeforeNavCustomLink',
      ],
    },
  },
  i18n: {
    supportedLanguages: { en, it },
    fallbackLanguage: 'it',
  },
  collections: [Utenti, Media, Settori, Libri, UtentiRegistrati],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),
  sharp,
  plugins: [],
})
