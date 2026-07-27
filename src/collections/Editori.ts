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
      hooks: {
        beforeChange: [
          ({ value }) => {
            if (typeof value === 'string' && value.trim().length > 0) {
              const trimmed = value.trim()
              return trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase()
            }
            return value
          },
        ],
      },
    },
  ],
}
