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
      result = parseInt(a.cost ? a.cost : '', 10) - parseInt(b.cost ? b.cost : '', 10);
    } else if (sort === 'power') {
      result = parseInt(a.power ? a.power : '', 10) - parseInt(b.power ? b.power : '', 10);
    }
    return order === 'desc' ? -result : result;
  });
};

export default sortCards;
