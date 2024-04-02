import type { ApiResponse, OPCard, OPCardList, OPLang } from '@opcgdb/types';

const getCardById = (
  id: string,
  cards: OPCardList,
  lang: OPLang
): ApiResponse & { data?: OPCard } => {
  const card = cards.find((card) => card.id === id && card.lang === lang);

  if (!card) {
    return {
      status: 404,
      error: 'No card found for the given id',
    };
  }
  return {
    status: 200,
    data: card,
  };
};

export default getCardById;
