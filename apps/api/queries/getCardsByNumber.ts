import { cards } from '@opcgdb/data';
import type { OPCard, OPLang } from '@opcgdb/data';

import { type ApiResponse } from '../types.js';

const getCardsByNumber = (number: string, lang: OPLang = 'en'): ApiResponse => {
  const cardList = cards[lang].filter((card: OPCard) => card.number === number);
  return {
    status: 200,
    data: cardList || [],
  };
};

export default getCardsByNumber;
