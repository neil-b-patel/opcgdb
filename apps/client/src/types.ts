import { z } from 'zod';

export const NumberFilterSchema = z.enum(['num', 'number']);
export const SetFilterSchema = z.enum(['s', 'set']);
export const RarityFilterSchema = z.enum(['r', 'rarity']);
export const ColorFilterSchema = z.enum(['c', 'color']);
export const CategoryFilterSchema = z.enum(['cat', 'category']);
export const LifeFilterSchema = z.enum(['l', 'life']);
export const AttributeFilterSchema = z.enum(['a', 'attribute']);
export const PowerFilterSchema = z.enum(['p', 'power']);
export const CostFilterSchema = z.enum(['co', 'cost']);
export const TypeFilterSchema = z.enum(['t', 'type']);
export const NameFilterSchema = z.enum(['n', 'name']);
export const CounterFilterSchema = z.enum(['count', 'counter']);
export const TriggerFilterSchema = z.enum(['trig', 'trigger']);

export const ValidSearchFilterSchema = z.union([
  NumberFilterSchema,
  SetFilterSchema,
  RarityFilterSchema,
  ColorFilterSchema,
  CategoryFilterSchema,
  LifeFilterSchema,
  AttributeFilterSchema,
  PowerFilterSchema,
  CostFilterSchema,
  TypeFilterSchema,
  NameFilterSchema,
  CounterFilterSchema,
  TriggerFilterSchema,
]);

export type ValidSearchFilter = z.infer<typeof ValidSearchFilterSchema>;

export type ValidQueryParams = Record<ValidSearchFilter, string>;
export type QueryParams = Record<string, string>;
export type QueryFilterKey =
  | 'number'
  | 'set'
  | 'rarity'
  | 'color'
  | 'category'
  | 'life'
  | 'attribute'
  | 'power'
  | 'cost'
  | 'type'
  | 'name'
  | 'counter'
  | 'trigger';

export type ValidatedQueryMap = {
  valid: Partial<ValidQueryParams>;
  invalid: QueryParams;
};

export type SearchResultsView = 'images' | 'list' | 'text-only';
export type SearchResultsSort = 'name' | 'set' | 'category' | 'rarity' | 'cost' | 'power';
export type SearchResultsOrder = 'asc' | 'desc';
