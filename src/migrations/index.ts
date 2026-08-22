import * as migration_20260719_110413_prima_migrazione from './20260719_110413_prima_migrazione'
import * as migration_20260728_140000_update_schema from './20260728_140000_update_schema'
import * as migration_20260822_110000_add_editori_to_locked_documents from './20260822_110000_add_editori_to_locked_documents'

export const migrations = [
  {
    up: migration_20260719_110413_prima_migrazione.up,
    down: migration_20260719_110413_prima_migrazione.down,
    name: '20260719_110413_prima_migrazione',
  },
  {
    up: migration_20260728_140000_update_schema.up,
    down: migration_20260728_140000_update_schema.down,
    name: '20260728_140000_update_schema',
  },
  {
    up: migration_20260822_110000_add_editori_to_locked_documents.up,
    down: migration_20260822_110000_add_editori_to_locked_documents.down,
    name: '20260822_110000_add_editori_to_locked_documents',
  },
]
