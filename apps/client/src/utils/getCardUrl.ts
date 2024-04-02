import type { OPCard } from '@opcgdb/types';

export const getCardUrl = (card: OPCard) => {
  const print = card.id.split('_p')[1];
  const queryParam = print ? `?p=${print}` : '';
  const url = `/card/${card.lang}/${card.number.split('-').join('/')}/${card.name.toLowerCase().replace(/ /g, '-')}${queryParam}`;
  return url;
};
