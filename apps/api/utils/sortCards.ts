import type { ApiOrder, ApiSort, OPCardList } from '@opcgdb/types';

const sortCards = (cards: OPCardList, sort: ApiSort, order: ApiOrder): OPCardList => {
  return cards.slice().sort((a, b) => {
    let result = 0;
    if (sort === 'name') {
      result = a.name.localeCompare(b.name);
    } else if (sort === 'set') {
      result = a.set.localeCompare(b.set);
    } else if (sort === 'category') {
      result = a.category.localeCompare(b.category);
    } else if (sort === 'rarity') {
      result = a.rarity.localeCompare(b.rarity);
    } else if (sort === 'cost') {
      if (a.cost && b.cost) {
        result = a.cost - b.cost;
      } else if (a.cost) {
        result = -1;
      } else if (b.cost) {
        result = 1;
      }
    } else if (sort === 'power') {
      if (a.power && b.power) {
        result = a.power - b.power;
      } else if (a.power) {
        result = -1;
      } else if (b.power) {
        result = 1;
      }
    }
    return order === 'desc' ? -result : result;
  });
};

export default sortCards;
