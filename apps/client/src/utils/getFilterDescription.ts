import type { ApiQueryFilter } from '@opcgdb/types';

export const getFilterDescription = (filterMap: ApiQueryFilter) => {
  const filterKeys = Object.keys(filterMap) as (keyof ApiQueryFilter)[];
  const filterDescription = filterKeys
    .map((filterType: keyof ApiQueryFilter) => {
      const currFilter = filterMap[filterType];
      switch (filterType) {
        case 'number':
          return `Number is ${currFilter}`;
        case 'set':
          return `Set is ${currFilter}`;
        case 'rarity':
          return `Rarity is ${currFilter}`;
        case 'color':
          return `Color includes ${(currFilter as string)?.split(',').join(' or Color includes ')}`;
        case 'category':
          return `Category is ${currFilter}`;
        case 'life':
          return `Life is ${currFilter}`;
        case 'attribute':
          return `Attribute is ${currFilter}`;
        case 'power':
          return `Power is ${currFilter}`;
        case 'cost':
          return `Cost is ${currFilter}`;
        case 'type':
          return `Type is ${currFilter}`;
        case 'name':
          return `Name: includes ${(currFilter as string)
            ?.split(',')
            .map((n) => `"${n}"`)
            .join(' or Name includes ')}`;
        case 'counter':
          return currFilter ? 'has Counter' : 'does not have Counter';
        case 'trigger':
          return currFilter ? 'has Trigger' : 'does not have Trigger';

        default:
          return '';
      }
    })
    .filter((filter) => filter !== '')
    .join(' and ');

  return `where ${filterDescription}`;
};
