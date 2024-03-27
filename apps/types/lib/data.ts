import { z } from 'zod';

import { ZodRecordWithEnum } from '../utils/ZodRecordWithEnum.js';

export const OPLangSchema = z.enum(['en', 'jp']);
export type OPLang = z.infer<typeof OPLangSchema>;

export const OPSetSchema = z.object({
  id: z.string(),
  name: z.string(),
  siteId: z.array(z.string()),
  lang: OPLangSchema,
});
export type OPSet = z.infer<typeof OPSetSchema>;

export const OPSetListSchema = z.array(OPSetSchema);
export type OPSetList = z.infer<typeof OPSetListSchema>;

export const OPCardRaritySchema = z.enum(['L', 'C', 'UC', 'R', 'SR', 'SEC', 'SP', 'TR']);
export type OPCardRarity = z.infer<typeof OPCardRaritySchema>;

export const OPCardColorSchema = z.enum(['Red', 'Blue', 'Yellow', 'Green', 'Black', 'Purple']);
export type OPCardColor = z.infer<typeof OPCardColorSchema>;

export const OPCardCategorySchema = z.enum(['CHARACTER', 'LEADER', 'EVENT', 'STAGE']);
export type OPCardCategory = z.infer<typeof OPCardCategorySchema>;

export const OPCardSchema = z.object({
  id: z.string(),
  lang: z.string(),
  number: z.string(),
  set: z.string(),
  rarity: z.string(),
  color: z.array(z.string()),
  category: z.string(),
  type: z.array(z.string()),
  searchType: z.array(z.string()),
  name: z.string(),
  searchName: z.string(),
  cost: z.number().optional(),
  life: z.number().optional(),
  attribute: z.string().optional(),
  effect: z.string().optional(),
  power: z.number().optional(),
  counter: z.number().optional(),
  trigger: z.string().optional(),
});
export type OPCard = z.infer<typeof OPCardSchema>;

export const OPCardListSchema = z.array(OPCardSchema);
export type OPCardList = z.infer<typeof OPCardListSchema>;

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
  cards: OPCardListSchema,
  sets: OPSetListSchema,
});
export type OPCGDB = z.infer<typeof OPCGDBSchema>;
