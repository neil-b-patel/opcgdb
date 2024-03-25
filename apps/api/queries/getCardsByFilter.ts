import type { ApiQueryFilter, ApiResponse, OPCardList } from '@opcgdb/types';
import { ApiQueryFilterSchema } from '@opcgdb/types';

import filterMap from '../utils/filterMap.js';

const getCardsByFilters = (_filters: ApiQueryFilter, cards: OPCardList): ApiResponse => {
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
