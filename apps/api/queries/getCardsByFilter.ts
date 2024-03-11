import { cards, type OPTCGCardList, type OPTCGLanguage } from '@optcgdb/data';

import { type ApiResponse, type QueryFilter, QueryFilterSchema } from '../types.js';
import filterMap from '../utils/filterMap.js';

const getCardsByFilters = (_filters: QueryFilter, lang: OPTCGLanguage): ApiResponse => {
  try {
    // Validate filters, if it fails, it will throw an error to be caught by the caller
    const filters = QueryFilterSchema.parse(_filters);

    // Apply all the filters passed to the card list
    const cardList = Object.keys(filters).reduce(
      (acc: OPTCGCardList, filterType: keyof QueryFilter) => {
        const filterFn: (c: OPTCGCardList, t: QueryFilter[typeof filterType]) => OPTCGCardList =
          filterMap[filterType];
        return filterFn(acc, filters[filterType]);
      },
      cards[lang]
    );

    return {
      status: 200,
      data: cardList,
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
