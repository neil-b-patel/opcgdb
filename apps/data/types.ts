export type OPTCGLanguage = 'en' | 'jp';

export type OPTCGSet = {
  id: string;
  name: string;
};

export type CardRarity = 'C' | 'UC' | 'R' | 'SR' | 'L';
export type CardColor = 'red' | 'blue' | 'yellow' | 'green' | 'black' | 'white';

export type OPTCGCard = {
  // Required data
  id: string;
  number: string;
  set: string;
  rarity: string;
  color: string[];
  category: string;
  type: string[];
  name: string;
  // Optional data
  cost?: string;
  life?: string;
  attribute?: string;
  effect?: string;
  power?: string;
  counter?: string;
  trigger?: string;
};

export type OPTCGCardList = OPTCGCard[];

export type OPTCGCardMap = Record<OPTCGLanguage, OPTCGCardList>;

export type OPTCGSeriesCorrections = Record<OPTCGLanguage, { from: string; to: string }[]>;
