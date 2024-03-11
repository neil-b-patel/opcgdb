import type { Request, Response } from 'express';
import { z } from 'zod';

const OPTCGLanguageSchema = z.enum(['en', 'jp']).optional();

export const QueryFilterSchema = z.object({
  number: z.string().optional(),
  set: z.string().optional(),
  rarity: z.enum(['C', 'UC', 'R', 'SR', 'L']).optional(),
  color: z.enum(['Red', 'Yellow', 'Purple', 'Blue', 'Green', 'Black']).optional(),
  category: z.enum(['CHARACTER', 'LEADER', 'EVENT', 'STAGE']).optional(),
  life: z.string().optional(),
  attribute: z.string().optional(),
  power: z.string().optional(),
  cost: z.string().optional(),
  type: z.string().optional(),
  name: z.string().optional(),
  counter: z.boolean().optional(),
  trigger: z.boolean().optional(),
});

export type QueryFilter = z.infer<typeof QueryFilterSchema>;

export type ApiResponse = {
  status: number;
  data?: any;
  error?: string;
};

export const SetByIdParamsSchema = z
  .object({
    id: z.string(),
  })
  .partial();

export const CardByIdParamsSchema = z
  .object({
    id: z.string(),
  })
  .partial();

export const CardsByIdQuerySchema = z
  .object({
    lang: OPTCGLanguageSchema,
  })
  .partial();

export const CardsByNumberParamsSchema = z
  .object({
    lang: OPTCGLanguageSchema,
  })
  .partial();

export const CardsByNumberQuerySchema = z
  .object({
    number: z.string(),
  })
  .partial();

export const SearchCardQuerySchema = z
  .object({
    ...QueryFilterSchema.shape,
    trigger: z.enum(['0', '1']),
    counter: z.enum(['0', '1']),
    lang: OPTCGLanguageSchema,
  })
  .partial();

export type RouteMap = {
  path: string;
  handler: (req: Request, res: Response) => void;
}[];
