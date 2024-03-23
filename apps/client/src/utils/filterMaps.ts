import type { OPCardCategory, OPCardColor, OPCardRarity } from '@opcgdb/data';

import type { QueryFilterKey, ValidSearchFilter } from '~/types';

export const filterNameMap: Record<ValidSearchFilter, QueryFilterKey> = {
  num: 'number',
  number: 'number',
  s: 'set',
  set: 'set',
  r: 'rarity',
  rarity: 'rarity',
  c: 'color',
  color: 'color',
  cat: 'category',
  category: 'category',
  l: 'life',
  life: 'life',
  a: 'attribute',
  attribute: 'attribute',
  p: 'power',
  power: 'power',
  co: 'cost',
  cost: 'cost',
  t: 'type',
  type: 'type',
  n: 'name',
  name: 'name',
  count: 'counter',
  counter: 'counter',
  trig: 'trigger',
  trigger: 'trigger',
};

export const colorMap: Record<string, OPCardColor> = {
  r: 'Red',
  red: 'Red',
  u: 'Blue',
  blue: 'Blue',
  g: 'Green',
  green: 'Green',
  y: 'Yellow',
  yellow: 'Yellow',
  p: 'Purple',
  purple: 'Purple',
  b: 'Black',
  black: 'Black',
};

export const rarityMap: Record<string, OPCardRarity> = {
  c: 'C',
  common: 'C',
  uc: 'UC',
  uncommon: 'UC',
  r: 'R',
  rare: 'R',
  sr: 'SR',
  srare: 'SR',
  superrare: 'SR',
  sp: 'SP',
  special: 'SP',
  l: 'L',
  leader: 'L',
};

export const categoryMap: Record<string, OPCardCategory> = {
  c: 'CHARACTER',
  character: 'CHARACTER',
  l: 'LEADER',
  leader: 'LEADER',
  e: 'EVENT',
  event: 'EVENT',
  s: 'STAGE',
  stage: 'STAGE',
};
