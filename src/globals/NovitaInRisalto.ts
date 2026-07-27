import { GlobalConfig } from 'payload'

export const NovitaInRisalto: GlobalConfig = {
  slug: 'novita-in-risalto',
  label: 'Novità in risalto',
  access: {
    read: () => true, // Publicly readable to populate the grid
    update: ({ req: { user } }) => !!user, // Only logged-in admin/editors can edit
  },
  fields: [
    {
      name: 'titolo',
      type: 'text',
      required: true,
      defaultValue: 'Novità',
      label: 'Titolo Card',
      admin: {        
        description: 'Titolo della card',
      },
    },
    {
      name: 'sottotitolo',
      type: 'text',
      required: true,
      defaultValue: 'Kit Lettura',
      label: 'Sottotitolo (Testo in neretto)',
      admin: {
        description: 'Massimo 18 caratteri',
      },
      validate: (value?: string | null) => {
        if (value && typeof value === 'string' && value.length > 18) {
          return 'Il sottotitolo non può superare 18 caratteri'
        }
        return true
      },
    },
    {
      name: 'immagini',
      type: 'array',
      label: 'Copertine (Fino a 5 immagini)',
      labels: {
        singular: 'Immagine',
        plural: 'Immagini',
      },
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
