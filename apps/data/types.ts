export type OPLang = 'en' | 'jp';

export type OPSet = {
  id: string;
  name: string;
  siteId: string[];
};

export type OPSetList = OPSet[];

export type OPSetMap = Record<OPLang, OPSetList>;

export type OPCardRarity = 'C' | 'UC' | 'R' | 'SR' | 'L';
export type OPCardColor = 'red' | 'blue' | 'yellow' | 'green' | 'black' | 'white';

export type OPCard = {
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

export type OPCardList = OPCard[];

export type OPCardMap = Record<OPLang, OPCardList>;

export type OPSeriesCorrections = Record<OPLang, { from: string; to: string }[]>;

export type OPCGDB = {
  cards: OPCardMap;
  sets: OPSetMap;
};
