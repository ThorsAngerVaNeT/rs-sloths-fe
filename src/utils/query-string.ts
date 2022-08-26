import type { WhereField, WhereFieldFilter } from '@/common/types';

export const getFieldContainsFilter = (field: string, value: string): WhereField => ({
  [field]: {
    contains: value,
    mode: 'insensitive',
  },
});

export const getFieldEqualFilter = (field: string, value: string): WhereField => ({
  [field]: {
    equals: value,
  },
});

export const getANDFields = (fields: (WhereFieldFilter | null)[]): string => {
  const r = fields.filter((el) => el !== null);

  if (r.length !== 0) return JSON.stringify({ AND: r });
  return '';
};
