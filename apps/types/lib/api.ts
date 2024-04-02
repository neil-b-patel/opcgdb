import { z } from 'zod';

import {
  OPCardCategorySchema,
  OPCardListSchema,
  OPCardRaritySchema,
  OPLangSchema,
} from './data.js';

export const ApiQueryFilterSchema = z.object({
  // single option
  lang: OPLangSchema.optional(),
  number: z.string().optional(),
  set: z.string().optional(),
  rarity: OPCardRaritySchema.optional(),
  category: OPCardCategorySchema.optional(),
  attribute: z.string().optional(),
  type: z.string().optional(),
  // multi option with inclusive operand
  name: z.string().optional(),
  color: z
    .string()
    .regex(/^(?:(?!.*\b(\w+)\b.*\b\1\b)(?:Red|Yellow|Purple|Blue|Green|Black)(?:,(?!$))?)+$/)
    .optional(),
  // with operand
  life: z.number().optional(),
  power: z.number().optional(),
  cost: z.number().optional(),
  counter: z.number().optional(),
  // booleans
  trigger: z.boolean().optional(),
});
export type ApiQueryFilter = z.infer<typeof ApiQueryFilterSchema>;

export const PaginatedCardDataSchema = z.object({
  totalCards: z.number(),
  currentPage: z.number(),
  totalPages: z.number(),
  cards: OPCardListSchema,
});
export type PaginatedCardData = z.infer<typeof PaginatedCardDataSchema>;

export type PaginatedApiResponse<T> = {
  status: number;
  data?: T;
  error?: string;
};

export const ApiResponseSchema = z.object({
  status: z.number(),
  data: z.unknown().optional(),
  error: z.string().optional(),
});
export type ApiResponse = z.infer<typeof ApiResponseSchema>;

export const ApiSetByIdParamsSchema = z
  .object({
    id: z.string(),
  })
  .partial();
export type ApiSetByIdParams = z.infer<typeof ApiSetByIdParamsSchema>;

export const ApiSetByIdQuerySchema = z
  .object({
    lang: OPLangSchema,
  })
  .partial();
export type ApiSetByIdQuery = z.infer<typeof ApiSetByIdQuerySchema>;

export const ApiCardByIdParamsSchema = z
  .object({
    id: z.string(),
  })
  .partial();
export type ApiCardByIdParams = z.infer<typeof ApiCardByIdParamsSchema>;

export const ApiCardsByIdQuerySchema = z
  .object({
    lang: OPLangSchema,
  })
  .partial();
export type ApiCardsByIdQuery = z.infer<typeof ApiCardsByIdQuerySchema>;

export const ApiCardsByNumberParamsSchema = z
  .object({
    lang: OPLangSchema,
    pageSize: z.number(),
    pageNumber: z.number(),
  })
  .partial();
export type ApiCardsByNumberParams = z.infer<typeof ApiCardsByNumberParamsSchema>;

export const ApiCardsByNumberQuerySchema = z
  .object({
    number: z.string(),
  })
  .partial();
export type ApiCardsByNumberQuery = z.infer<typeof ApiCardsByNumberQuerySchema>;

export const ApiSearchCardQuerySchema = z
  .object({
    ...ApiQueryFilterSchema.shape,
    trigger: z.enum(['0', '1']),
    counter: z.number(),
    lang: OPLangSchema,
    pageSize: z.number(),
    pageNumber: z.number(),
  })
  .partial();
export type ApiSearchCardQuery = z.infer<typeof ApiSearchCardQuerySchema>;

export const ApiSortSchema = z.enum([
  'name',
  'number',
  'set',
  'category',
  'rarity',
  'cost',
  'power',
]);
export type ApiSort = z.infer<typeof ApiSortSchema>;

export const ApiOrderSchema = z.enum(['asc', 'desc']);
export type ApiOrder = z.infer<typeof ApiOrderSchema>;
