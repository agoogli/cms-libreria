import { GlobalConfig } from 'payload'

export const OffertaSpeciale: GlobalConfig = {
  slug: 'offerta-speciale',
  label: 'Offerta Speciale',
  access: {
    read: () => true, // Publicly readable to populate the grid
    update: ({ req: { user } }) => !!user, // Only logged-in admin/editors can edit
  },
  fields: [
    {
      name: 'titolo',
      type: 'text',
      required: true,
      defaultValue: 'Offerta Speciale',
      label: 'Titolo Card',
    },
    {
      name: 'sottotitolo',
      type: 'text',
      required: true,
      defaultValue: 'Kit Lettura Estiva',
      label: 'Sottotitolo (Testo in neretto)',
    },
    {
      name: 'immagini',
      type: 'array',
      label: 'Copertine (Fino a 5 immagini)',
      maxRows: 5,
      fields: [
        {
          name: 'immagine',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Immagine Copertina',
        },
      ],
    },
  ],
}
