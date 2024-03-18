import { cards, type OPTCGCardList, type OPTCGLanguage } from '@opcgdb/data';

import { type ApiResponse, type QueryFilter, QueryFilterSchema } from '../types.js';
import filterMap from '../utils/filterMap.js';

const getCardsByFilters = (_filters: QueryFilter, lang: OPTCGLanguage = 'en'): ApiResponse => {
  try {
    // Validate filters, if it fails, it will throw an error to be caught by the caller
    const filters = QueryFilterSchema.parse(_filters);
    const filterKeys = Object.keys(filters) as (keyof QueryFilter)[];

    // Apply all the filters passed to the card list
    const cardList = filterKeys
      .filter((k: keyof QueryFilter) => !!filters[k]) // only check filters that have a value
      .reduce((acc: OPTCGCardList, filterType: keyof QueryFilter) => {
        const currFilter = filters[filterType];
        const filterFn = filterMap[filterType] as (
          c: OPTCGCardList,
          t: string | boolean | undefined
        ) => OPTCGCardList;
        return filterFn(acc, currFilter);
      }, cards[lang]);

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
