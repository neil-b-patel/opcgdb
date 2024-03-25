import type { ApiResponse, OPCard, OPCardList } from '@opcgdb/types';

const getCardsByNumber = (number: string, cards: OPCardList): ApiResponse => {
  const cardList = cards.filter((card: OPCard) => card.number === number);
  return {
    status: 200,
    data: cardList || [],
  };
};

export default getCardsByNumber;
