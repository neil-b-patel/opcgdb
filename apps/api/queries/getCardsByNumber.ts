import type { ApiResponse, OPCard, OPCardList } from '@opcgdb/types';

import paginate from '../utils/paginate.js';

const getCardsByNumber = (
  number: string,
  cards: OPCardList,
  pageSize: number,
  pageNumber: number
): ApiResponse => {
  const cardList = cards.filter((card: OPCard) => card.number === number);
  const totalCards = cardList.length;
  const { currentPage, totalPages, items } = paginate(cardList, pageSize, pageNumber);
  return {
    status: 200,
    data: {
      totalCards,
      currentPage,
      totalPages,
      cards: items || [],
    },
  };
};

export default getCardsByNumber;
