import { cards, OPTCGCard, type OPTCGLanguage } from '@opcgdb/data';

import { type ApiResponse } from '../types.js';

const getCardsByNumber = (number: string, lang: OPTCGLanguage = 'en'): ApiResponse => {
  const cardList = cards[lang].filter((card: OPTCGCard) => card.number === number);
  return {
    status: 200,
    data: cardList || [],
  };
};

export default getCardsByNumber;
