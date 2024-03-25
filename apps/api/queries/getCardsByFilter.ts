import type {
  ApiQueryFilter,
  OPCardList,
  PaginatedApiResponse,
  PaginatedCardData,
} from '@opcgdb/types';
import { ApiQueryFilterSchema } from '@opcgdb/types';

import filterMap from '../utils/filterMap.js';
import paginate from '../utils/paginate.js';

const getCardsByFilters = (
  _filters: ApiQueryFilter,
  cards: OPCardList,
  pageSize: number,
  pageNumber: number
): PaginatedApiResponse<PaginatedCardData> => {
  try {
    // Validate filters, if it fails, it will throw an error to be caught by the caller
    const filters = ApiQueryFilterSchema.parse(_filters);
    const filterKeys = Object.keys(filters) as (keyof ApiQueryFilter)[];

    // Apply all the filters passed to the card list
    const cardList = filterKeys
      .filter((k: keyof ApiQueryFilter) => !!filters[k]) // only check filters that have a value
      .reduce((acc: OPCardList, filterType: keyof ApiQueryFilter) => {
        const currFilter = filters[filterType];
        const filterFn = filterMap[filterType] as (
          c: OPCardList,
          t: string | boolean | undefined
        ) => OPCardList;
        return filterFn(acc, currFilter);
      }, cards);

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
  } catch (error) {
    console.error(error);
    return {
      status: 400,
      error: 'Invalid filters. Make sure the filters object has valid keys and values.',
    };
  }
};

export default getCardsByFilters;
