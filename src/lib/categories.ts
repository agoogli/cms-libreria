export const CATEGORIES = {
  CONCORSI: 'Concorsi',
  GIURIDICA: 'Giuridica',
  UMANISTICA: 'Umanistica',
} as const;

export type CategoryKey = keyof typeof CATEGORIES;
export type CategoryValue = typeof CATEGORIES[CategoryKey];
