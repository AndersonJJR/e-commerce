export type CategoriaProduto =
  | 'LIMPEZA'
  | 'ALIMENTOS'
  | 'BEBIDA'
  | 'SEM_CATEGORIA';

export const CATEGORIA_PRODUTO_VALUES = [
  'LIMPEZA',
  'ALIMENTOS',
  'BEBIDA',
  'SEM_CATEGORIA',
] as const;
