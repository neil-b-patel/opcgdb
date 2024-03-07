export type OPTCGLanguage = "en" | "jp";

export type OPTCGSet = {
  id: string;
  name: string;
};

export type OPTCGCard = {
  // Required data
  id: string;
  number: string;
  set: string;
  rarity: string;
  color: string;
  type: string;
  category: string;
  cost: string;
  name: string;
  // Optional data
  attribute?: string;
  effect?: string;
  power?: string;
  counter?: string;
  trigger?: string;
};

export type OPTCGCardList = OPTCGCard[];

export type OPTCGCardMap = Record<OPTCGLanguage, OPTCGCardList>;
