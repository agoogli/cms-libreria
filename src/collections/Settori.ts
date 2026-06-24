import type { CollectionConfig } from 'payload'

export const Settori: CollectionConfig = {
  slug: 'settori',
  labels: {
    singular: 'Settore',
    plural: 'Settori',
  },
  admin: {
    useAsTitle: 'nome',
    defaultColumns: ['nome'],
  },
  access: {
    read: () => true,
  },
  typescript: {
    interface: 'Settore',
  },
  fields: [
    {
      name: 'nome',
      type: 'text',
      required: true,
      unique: true,
    },
  ],
}
