import { cards, type OPTCGLanguage } from '@optcgdb/data';

import { type ApiResponse } from '../types.js';

const getCardById = (id: string, lang: OPTCGLanguage): ApiResponse => {
  const card = cards[lang].find((card) => card.id === id);
  return {
    status: 200,
    data: card,
  };
};

export default getCardById;
