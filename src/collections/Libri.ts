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
    },
    {
      name: 'autore',
      type: 'text',
    },
    {
      name: 'ean',
      type: 'text',
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
      name: 'editore',
      type: 'text',
      required: true,
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
