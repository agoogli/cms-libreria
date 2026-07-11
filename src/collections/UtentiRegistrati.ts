import type { CollectionConfig } from 'payload'

export const UtentiRegistrati: CollectionConfig = {
  slug: 'utenti-registrati',
  typescript: {
    interface: 'UtenteRegistrato',
  },
  labels: {
    singular: 'Utente Registrato',
    plural: 'Utenti Registrati',
  },
  admin: {
    useAsTitle: 'cognome',
    defaultColumns: ['cognome', 'nome', 'cellulare', 'email'],
  },
  access: {
    create: () => false, // Locked down REST API! Creation only allowed via secure custom API route with overrideAccess: true.
    read: ({ req: { user } }) => !!user, // Only logged-in admin users can read!
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  fields: [
    {
      name: 'nome',
      type: 'text',
      required: true,
    },
    {
      name: 'cognome',
      type: 'text',
      required: true,
    },
    {
      name: 'cellulare',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'text',
      required: false,
    },
    {
      name: 'scuola',
      type: 'text',
      required: false,
    },
    {
      name: 'classe',
      type: 'number',
      required: false,
    },
    {
      name: 'sezione',
      type: 'text',
      required: false,
    },
  ],
}
