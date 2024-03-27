import type { ApiResponse, OPCardList, OPLang } from '@opcgdb/types';

const getCardById = (id: string, cards: OPCardList, lang: OPLang): ApiResponse => {
  const card = cards.find((card) => card.id === id && card.lang === lang);

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
