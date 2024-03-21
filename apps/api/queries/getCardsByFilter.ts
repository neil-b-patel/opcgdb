import type { OPCardList } from '@opcgdb/data';

import { type ApiResponse, type QueryFilter, QueryFilterSchema } from '../types.js';
import filterMap from '../utils/filterMap.js';

const getCardsByFilters = (_filters: QueryFilter, cards: OPCardList): ApiResponse => {
  try {
    // Validate filters, if it fails, it will throw an error to be caught by the caller
    const filters = QueryFilterSchema.parse(_filters);
    const filterKeys = Object.keys(filters) as (keyof QueryFilter)[];

    // Apply all the filters passed to the card list
    const cardList = filterKeys
      .filter((k: keyof QueryFilter) => !!filters[k]) // only check filters that have a value
      .reduce((acc: OPCardList, filterType: keyof QueryFilter) => {
        const currFilter = filters[filterType];
        const filterFn = filterMap[filterType] as (
          c: OPCardList,
          t: string | boolean | undefined
        ) => OPCardList;
        return filterFn(acc, currFilter);
      }, cards);

    return {
      status: 200,
      data: cardList || [],
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
