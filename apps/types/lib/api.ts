import type { Request, Response } from 'express';
import { z } from 'zod';

import { OPLangSchema } from './data.js';

export const ApiQueryFilterSchema = z.object({
  // single option
  number: z.string().optional(),
  set: z.string().optional(),
  rarity: z.enum(['C', 'UC', 'R', 'SR', 'SP', 'L']).optional(),
  category: z.enum(['CHARACTER', 'LEADER', 'EVENT', 'STAGE']).optional(),
  attribute: z.string().optional(),
  type: z.string().optional(),
  // multi option with inclusive operand
  name: z.string().optional(),
  color: z
    .string()
    .regex(/^(?:(?!.*\b(\w+)\b.*\b\1\b)(?:Red|Yellow|Purple|Blue|Green|Black)(?:,(?!$))?)+$/)
    .optional(),
  // with operand
  life: z.string().optional(),
  power: z.string().optional(),
  cost: z.string().optional(),
  // booleans
  counter: z.boolean().optional(),
  trigger: z.boolean().optional(),
});
export type ApiQueryFilter = z.infer<typeof ApiQueryFilterSchema>;

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
    counter: z.enum(['0', '1']),
    lang: OPLangSchema,
  })
  .partial();
export type ApiSearchCardQuery = z.infer<typeof ApiSearchCardQuerySchema>;

// Express types
export type RouteMap = {
  path: string;
  handler: (req: Request, res: Response) => void;
}[];
