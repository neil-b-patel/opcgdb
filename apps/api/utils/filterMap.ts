import { type OPCardList } from '@opcgdb/data';

import { type QueryFilter } from '../types.js';

const filterMap = {
  number: (cards: OPCardList, t: QueryFilter['number']): OPCardList => {
    return cards.filter(({ number }) => number === t);
  },
  set: (cards: OPCardList, t: QueryFilter['set']): OPCardList => {
    return cards.filter(({ set }) => set === t);
  },
  rarity: (cards: OPCardList, t: QueryFilter['rarity']): OPCardList => {
    return cards.filter(({ rarity }) => rarity === t);
  },
  color: (cards: OPCardList, t: QueryFilter['color']): OPCardList => {
    return cards.filter(({ color }) => color.includes(t as string));
  },
  category: (cards: OPCardList, t: QueryFilter['category']): OPCardList => {
    return cards.filter(({ category }) => category === t);
  },
  life: (cards: OPCardList, t: QueryFilter['life']): OPCardList => {
    return cards.filter(({ life }) => life === t);
  },
  attribute: (cards: OPCardList, t: QueryFilter['attribute']): OPCardList => {
    return cards.filter(({ attribute }) => attribute === t);
  },
  power: (cards: OPCardList, t: QueryFilter['power']): OPCardList => {
    return cards.filter(({ power }) => power === t);
  },
  cost: (cards: OPCardList, t: QueryFilter['cost']): OPCardList => {
    return cards.filter(({ cost }) => cost === t);
  },
  type: (cards: OPCardList, t: QueryFilter['type']): OPCardList => {
    return cards.filter(({ type }) => type.includes(t as string));
  },
  name: (cards: OPCardList, t: QueryFilter['name']): OPCardList => {
    return cards.filter(({ name }) => name === t);
  },
  counter: (cards: OPCardList, t: QueryFilter['counter']): OPCardList => {
    return cards.filter(({ counter }) => t === !!counter);
  },
  trigger: (cards: OPCardList, t: QueryFilter['trigger']): OPCardList => {
    return cards.filter(({ trigger }) => t === !!trigger);
  },
};

export default filterMap;
