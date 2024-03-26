import { z } from 'zod';

export const FeNumberFilterSchema = z.enum(['num', 'number']);
export type FeNumberFilter = z.infer<typeof FeNumberFilterSchema>;

export const FeSetFilterSchema = z.enum(['s', 'set']);
export type FeSetFilter = z.infer<typeof FeSetFilterSchema>;

export const FeRarityFilterSchema = z.enum(['r', 'rarity']);
export type FeRarityFilter = z.infer<typeof FeRarityFilterSchema>;

export const FeColorFilterSchema = z.enum(['c', 'color']);
export type FeColorFilter = z.infer<typeof FeColorFilterSchema>;

export const FeCategoryFilterSchema = z.enum(['cat', 'category']);
export type FeCategoryFilter = z.infer<typeof FeCategoryFilterSchema>;

export const FeLifeFilterSchema = z.enum(['l', 'life']);
export type FeLifeFilter = z.infer<typeof FeLifeFilterSchema>;

export const FeAttributeFilterSchema = z.enum(['a', 'attribute']);
export type FeAttributeFilter = z.infer<typeof FeAttributeFilterSchema>;

export const FePowerFilterSchema = z.enum(['p', 'power']);
export type FePowerFilter = z.infer<typeof FePowerFilterSchema>;

export const FeCostFilterSchema = z.enum(['co', 'cost']);
export type FeCostFilter = z.infer<typeof FeCostFilterSchema>;

export const FeTypeFilterSchema = z.enum(['t', 'type']);
export type FeTypeFilter = z.infer<typeof FeTypeFilterSchema>;

export const FeNameFilterSchema = z.enum(['n', 'name']);
export type FeNameFilter = z.infer<typeof FeNameFilterSchema>;

export const FeCounterFilterSchema = z.enum(['count', 'counter']);
export type FeCounterFilter = z.infer<typeof FeCounterFilterSchema>;

export const FeTriggerFilterSchema = z.enum(['trig', 'trigger']);
export type FeTriggerFilter = z.infer<typeof FeTriggerFilterSchema>;

export const FeValidSearchFilterSchema = z.union([
  FeNumberFilterSchema,
  FeSetFilterSchema,
  FeRarityFilterSchema,
  FeColorFilterSchema,
  FeCategoryFilterSchema,
  FeLifeFilterSchema,
  FeAttributeFilterSchema,
  FePowerFilterSchema,
  FeCostFilterSchema,
  FeTypeFilterSchema,
  FeNameFilterSchema,
  FeCounterFilterSchema,
  FeTriggerFilterSchema,
]);
export type FeValidSearchFilter = z.infer<typeof FeValidSearchFilterSchema>;

export const FeValidQueryParamsSchema = z.record(FeValidSearchFilterSchema, z.string());
export type FeValidQueryParams = z.infer<typeof FeValidQueryParamsSchema>;

export const FeQueryParamsSchema = z.record(z.string(), z.string());
export type FeQueryParams = z.infer<typeof FeQueryParamsSchema>;

export const FeQueryFilterKeySchema = z.enum([
  'number',
  'set',
  'rarity',
  'color',
  'category',
  'life',
  'attribute',
  'power',
  'cost',
  'type',
  'name',
  'counter',
  'trigger',
]);
export type FeQueryFilterKey = z.infer<typeof FeQueryFilterKeySchema>;

export const FeValidatedQueryMapSchema = z.object({
  valid: FeValidQueryParamsSchema,
  invalid: FeQueryParamsSchema,
});
export type FeValidatedQueryMap = z.infer<typeof FeValidatedQueryMapSchema>;

export const FeSearchResultsViewSchema = z.enum(['images', 'list', 'text-only']);
export type FeSearchResultsView = z.infer<typeof FeSearchResultsViewSchema>;
