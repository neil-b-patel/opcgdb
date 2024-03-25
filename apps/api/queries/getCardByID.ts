import type { ApiResponse, OPCardList } from '@opcgdb/types';

const getCardById = (id: string, cards: OPCardList): ApiResponse => {
  const card = cards.find((card) => card.id === id);
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
