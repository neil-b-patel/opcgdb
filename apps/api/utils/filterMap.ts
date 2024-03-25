import type { ApiQueryFilter, OPCardList } from '@opcgdb/types';

const filterMap = {
  number: (cards: OPCardList, t: ApiQueryFilter['number']): OPCardList => {
    return cards.filter(({ number }) => number === t);
  },
  set: (cards: OPCardList, t: ApiQueryFilter['set']): OPCardList => {
    return cards.filter(({ set }) => set === t);
  },
  rarity: (cards: OPCardList, t: ApiQueryFilter['rarity']): OPCardList => {
    return cards.filter(({ rarity }) => rarity === t);
  },
  color: (cards: OPCardList, t: ApiQueryFilter['color']): OPCardList => {
    const colors = t!.split(',');
    return colors.reduce((acc: OPCardList, color) => {
      const filteredObjects = cards.filter((obj) => obj.color.includes(color));

      // Filter out objects with duplicate IDs
      const uniqueFilteredObjects = filteredObjects.filter(
        (obj, index, self) => index === self.findIndex((o) => o.id === obj.id)
      );

      return [...acc, ...uniqueFilteredObjects];
    }, []);
  },
  category: (cards: OPCardList, t: ApiQueryFilter['category']): OPCardList => {
    return cards.filter(({ category }) => category === t);
  },
  life: (cards: OPCardList, t: ApiQueryFilter['life']): OPCardList => {
    return cards.filter(({ life }) => life === t);
  },
  attribute: (cards: OPCardList, t: ApiQueryFilter['attribute']): OPCardList => {
    return cards.filter(({ attribute }) => attribute === t);
  },
  power: (cards: OPCardList, t: ApiQueryFilter['power']): OPCardList => {
    return cards.filter(({ power }) => power === t);
  },
  cost: (cards: OPCardList, t: ApiQueryFilter['cost']): OPCardList => {
    return cards.filter(({ cost }) => cost === t);
  },
  type: (cards: OPCardList, t: ApiQueryFilter['type']): OPCardList => {
    return cards.filter(({ type }) => type.map((a) => a.toLowerCase()).includes(t!.toLowerCase()));
  },
  name: (cards: OPCardList, t: ApiQueryFilter['name']): OPCardList => {
    let filteredCards = cards.slice(); // Make a shallow copy to avoid modifying the original array

    for (const n of t!.split(',')) {
      filteredCards = filteredCards.filter(({ name }) =>
        name.toLowerCase().includes(n.toLowerCase())
      );
    }

    return filteredCards;
  },
  counter: (cards: OPCardList, t: ApiQueryFilter['counter']): OPCardList => {
    return cards.filter(({ counter }) => t === !!counter);
  },
  trigger: (cards: OPCardList, t: ApiQueryFilter['trigger']): OPCardList => {
    return cards.filter(({ trigger }) => t === !!trigger);
  },
};

export default filterMap;
