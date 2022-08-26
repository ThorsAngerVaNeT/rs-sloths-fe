import type { WhereField, WhereFieldFilter } from '@/common/types';

export const getFieldContainsFilter = (field: string, value: string): WhereField => ({
  [field]: {
    contains: value,
    mode: 'insensitive',
  },
});

export const getFieldEqualFilter = (field: string, value: string): WhereField => ({
  [field]: value,
});

export const getORFields = (fields: WhereField[]): WhereFieldFilter | WhereField | null => {
  const arr = fields.filter((el) => el !== null);

  if (arr.length === 0) return null;
  if (arr.length === 1) return arr[0];
  return { OR: arr };
};

export const getANDFields = (fields: (WhereFieldFilter | WhereField | null)[]): string => {
  const arr = fields.filter((el) => el !== null);

  if (arr.length === 0) return '';
  if (arr.length === 1) return JSON.stringify(arr[0]);
  return JSON.stringify({ AND: arr });
};
