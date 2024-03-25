import type { OPCard, OPCardList, PaginatedApiResponse, PaginatedCardData } from '@opcgdb/types';

import paginate from '../utils/paginate.js';

const getCardsByNumber = (
  number: string,
  cards: OPCardList,
  pageSize: number,
  pageNumber: number
): PaginatedApiResponse<PaginatedCardData> => {
  const cardList = cards.filter((card: OPCard) => card.number === number);
  const totalCards = cardList.length;
  const { currentPage, totalPages, items = [] } = paginate(cardList, pageSize, pageNumber);
  return {
    status: 200,
    data: {
      totalCards,
      currentPage,
      totalPages,
      cards: items satisfies OPCardList,
    },
  };
};

export default getCardsByNumber;
