import { z } from 'zod';

import { ZodRecordWithEnum } from '../utils/ZodRecordWithEnum.js';

export const OPLangSchema = z.enum(['en', 'jp']);
export type OPLang = z.infer<typeof OPLangSchema>;

export const OPSetSchema = z.object({
  id: z.string(),
  name: z.string(),
  siteId: z.array(z.string()),
});
export type OPSet = z.infer<typeof OPSetSchema>;

export const OPSetListSchema = z.array(OPSetSchema);
export type OPSetList = z.infer<typeof OPSetListSchema>;

export const OPSetMapSchema = ZodRecordWithEnum(OPLangSchema, OPSetListSchema);
export type OPSetMap = z.infer<typeof OPSetMapSchema>;

export const OPCardRaritySchema = z.enum(['C', 'UC', 'R', 'SR', 'SP', 'L']);
export type OPCardRarity = z.infer<typeof OPCardRaritySchema>;

export const OPCardColorSchema = z.enum(['Red', 'Blue', 'Yellow', 'Green', 'Black', 'Purple']);
export type OPCardColor = z.infer<typeof OPCardColorSchema>;

export const OPCardCategorySchema = z.enum(['CHARACTER', 'LEADER', 'EVENT', 'STAGE']);
export type OPCardCategory = z.infer<typeof OPCardCategorySchema>;

export const OPCardSchema = z.object({
  id: z.string(),
  number: z.string(),
  set: z.string(),
  rarity: z.string(),
  color: z.array(z.string()),
  category: z.string(),
  type: z.array(z.string()),
  name: z.string(),
  cost: z.string().optional(),
  life: z.string().optional(),
  attribute: z.string().optional(),
  effect: z.string().optional(),
  power: z.string().optional(),
  counter: z.string().optional(),
  trigger: z.string().optional(),
});
export type OPCard = z.infer<typeof OPCardSchema>;

export const OPCardListSchema = z.array(OPCardSchema);
export type OPCardList = z.infer<typeof OPCardListSchema>;

export const OPCardMapSchema = ZodRecordWithEnum(OPLangSchema, OPCardListSchema);
export type OPCardMap = z.infer<typeof OPCardMapSchema>;

export const OPSeriesCorrectionsSchema = ZodRecordWithEnum(
  OPLangSchema,
  z.array(
    z.object({
      from: z.string(),
      to: z.string(),
    })
  )
);
export type OPSeriesCorrections = z.infer<typeof OPSeriesCorrectionsSchema>;

export const OPCGDBSchema = z.object({
  cards: OPCardMapSchema,
  sets: OPSetMapSchema,
});
export type OPCGDB = z.infer<typeof OPCGDBSchema>;
