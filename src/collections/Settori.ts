import type { CollectionConfig } from 'payload'

export const Settori: CollectionConfig = {
  slug: 'settori',
  labels: {
    singular: 'Settore',
    plural: 'Settori',
  },
  admin: {
    useAsTitle: 'nomeVisualizzato',
    defaultColumns: ['nomeVisualizzato', 'nome', 'ordineVisuale'],
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
      label: 'Nome Interno / Codice',
    },
    {
      name: 'nomeVisualizzato',
      type: 'text',
      required: true,
      defaultValue: 'Nome settore',
      label: 'Nome Visualizzato',
      maxLength: 25,
      admin: {
        placeholder: 'Nome settore',
        description: 'Massimo 25 caratteri',
      },
      validate: (value?: string | null) => {
        if (value && typeof value === 'string' && value.length > 25) {
          return 'Il nome visualizzato non può superare 25 caratteri'
        }
        return true
      },
    },
    {
      name: 'ordineVisuale',
      type: 'number',
      required: false,
      label: 'Ordine Visuale in Homepage',
      min: 1,
      admin: {
        placeholder: '1',
        description: 'Numero intero > 0. Determina l\'ordine di apparizione del carosello in homepage. Se non valorizzato, il carosello non apparirà.',
      },
      validate: (value?: number | null) => {
        if (value !== undefined && value !== null && (value <= 0 || !Number.isInteger(value))) {
          return 'L\'ordine visuale deve essere un numero intero maggiore di 0'
        }
        return true
      },
    },
  ],
}
