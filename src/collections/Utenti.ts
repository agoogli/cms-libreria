import type { CollectionConfig } from 'payload'

export const Utenti: CollectionConfig = {
  slug: 'utenti',
  labels: {
    singular: 'Utente',
    plural: 'Utenti',
  },
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  typescript: {
    interface: 'Utente',
  },
  fields: [
    // Email added by default
    // Add more fields as needed
  ],
}
