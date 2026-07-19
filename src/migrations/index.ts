import * as migration_20260719_110413_prima_migrazione from './20260719_110413_prima_migrazione';

export const migrations = [
  {
    up: migration_20260719_110413_prima_migrazione.up,
    down: migration_20260719_110413_prima_migrazione.down,
    name: '20260719_110413_prima_migrazione'
  },
];
