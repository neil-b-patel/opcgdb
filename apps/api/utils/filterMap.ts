import { type OPTCGCardList } from '@optcgdb/data';

import { type QueryFilter } from '../types.js';

const filterMap = {
  number: (cards: OPTCGCardList, t: QueryFilter['number']): OPTCGCardList => {
    return cards.filter(({ number }) => number === t);
  },
  set: (cards: OPTCGCardList, t: QueryFilter['set']): OPTCGCardList => {
    return cards.filter(({ set }) => set === t);
  },
  rarity: (cards: OPTCGCardList, t: QueryFilter['rarity']): OPTCGCardList => {
    return cards.filter(({ rarity }) => rarity === t);
  },
  color: (cards: OPTCGCardList, t: QueryFilter['color']): OPTCGCardList => {
    return cards.filter(({ color }) => color.includes(t));
  },
  category: (cards: OPTCGCardList, t: QueryFilter['category']): OPTCGCardList => {
    return cards.filter(({ category }) => category === t);
  },
  life: (cards: OPTCGCardList, t: QueryFilter['life']): OPTCGCardList => {
    return cards.filter(({ life }) => life === t);
  },
  attribute: (cards: OPTCGCardList, t: QueryFilter['attribute']): OPTCGCardList => {
    return cards.filter(({ attribute }) => attribute === t);
  },
  power: (cards: OPTCGCardList, t: QueryFilter['power']): OPTCGCardList => {
    return cards.filter(({ power }) => power === t);
  },
  cost: (cards: OPTCGCardList, t: QueryFilter['cost']): OPTCGCardList => {
    return cards.filter(({ cost }) => cost === t);
  },
  type: (cards: OPTCGCardList, t: QueryFilter['type']): OPTCGCardList => {
    return cards.filter(({ type }) => type.includes(t));
  },
  name: (cards: OPTCGCardList, t: QueryFilter['name']): OPTCGCardList => {
    return cards.filter(({ name }) => name === t);
  },
  counter: (cards: OPTCGCardList, t: QueryFilter['counter']): OPTCGCardList => {
    return cards.filter(({ counter }) => t === !!counter);
  },
  trigger: (cards: OPTCGCardList, t: QueryFilter['trigger']): OPTCGCardList => {
    return cards.filter(({ trigger }) => t === !!trigger);
  },
};

export default filterMap;
