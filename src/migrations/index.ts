import * as migration_20260719_110413_prima_migrazione from './20260719_110413_prima_migrazione'
import * as migration_20260728_140000_update_schema from './20260728_140000_update_schema'

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
]
