import type { CollectionConfig } from 'payload'

export const Editori: CollectionConfig = {
  slug: 'editori',
  labels: {
    singular: 'Editore',
    plural: 'Editori',
  },
  admin: {
    useAsTitle: 'nome',
    defaultColumns: ['nome'],
  },
  access: {
    read: () => true,
  },
  typescript: {
    interface: 'Editore',
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
