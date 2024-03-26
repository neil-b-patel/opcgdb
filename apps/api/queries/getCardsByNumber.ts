import type {
  ApiOrder,
  ApiSort,
  OPCard,
  OPCardList,
  PaginatedApiResponse,
  PaginatedCardData,
} from '@opcgdb/types';

import paginate from '../utils/paginate.js';
import sortCards from '../utils/sortCards.js';

const getCardsByNumber = (
  number: string,
  cards: OPCardList,
  pageSize: number,
  pageNumber: number,
  sort: ApiSort = 'name',
  order: ApiOrder = 'asc'
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
      cards: sortCards(items, sort, order) satisfies OPCardList,
    },
  };
};

export default getCardsByNumber;
