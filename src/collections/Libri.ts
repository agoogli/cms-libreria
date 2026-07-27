import type { CollectionConfig } from 'payload'

export const Libri: CollectionConfig = {
  slug: 'libri',
  labels: {
    singular: 'Libro',
    plural: 'Libri',
  },
  admin: {
    useAsTitle: 'titolo',
    defaultColumns: ['titolo', 'autore', 'prezzo', 'settore'],
  },
  access: {
    read: () => true,
  },
  typescript: {
    interface: 'Libro',
  },
  fields: [
    {
      name: 'titolo',
      type: 'text',
      required: true,
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
    {
      name: 'autore',
      type: 'text',
      hooks: {
        beforeChange: [
          ({ value }) => {
            if (typeof value === 'string' && value.trim().length > 0) {
              return value
                .trim()
                .toLowerCase()
                .split(/\s+/)
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ')
            }
            return value
          },
        ],
      },
    },
    {
      name: 'prezzo',
      type: 'number',
      required: true,
      min: 0,
      admin: {
        placeholder: '0.00',
      },
    },
    {
      name: 'prezzoScontato',
      type: 'number',
      min: 0,
      admin: {
        placeholder: '0.00',
      },
    },
    {
      name: 'editore',
      type: 'relationship',
      relationTo: 'editori',
      required: false,
    },
    {
      name: 'ean',
      type: 'text',
    },
    {
      name: 'settore',
      type: 'relationship',
      relationTo: 'settori',
    },
    {
      name: 'annoPubblicazione',
      type: 'number',
      min: 1901,
    },
    {
      name: 'imgCopertina',
      type: 'relationship',
      relationTo: 'media',
      admin: {
        components: {
          Field: '@/components/CoverImageDragDrop',
        },
      },
    },
    {
      name: 'descrizione',
      type: 'textarea',
    },
  ],
}
