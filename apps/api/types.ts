import { z } from 'zod';

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
