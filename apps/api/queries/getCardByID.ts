import { cards, type OPTCGLanguage } from '@optcgdb/data';

import { type ApiResponse } from '../types.js';

const getCardById = (id: string, lang: OPTCGLanguage = 'en'): ApiResponse => {
  const card = cards[lang].find((card) => card.id === id);
  if (!card) {
    return {
      status: 404,
      data: { error: 'No card found for the given id' },
    };
  }
  return {
    status: 200,
    data: card,
  };
};

export default getCardById;
