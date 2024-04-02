import type { ApiQueryFilter, FeValidatedQueryMap } from '@opcgdb/types';

export const getFilterMap = (queryMap: FeValidatedQueryMap) => {
  const filters = queryMap.valid;
  const colorCodes = Object.keys(colorMap);

  return Object.entries(filters).reduce((acc: ApiQueryFilter, [filterKey, value]) => {
    switch (filterKey) {
      case 'rarity':
        acc.rarity = rarityMap[value];
        break;
      case 'color':
        if (colorCodes.includes(value)) {
          acc.color = colorMap[value];
        } else {
          // if it's not a single color we assume it's a multicolor code
          acc.color = value
            .split('')
            .map((color) => colorMap[color])
            .join(',');
        }
        break;
      case 'category':
        acc.category = categoryMap[value];
        break;
      case 'trigger':
        acc.trigger = value === 'true' || value === '1';
        break;
      case 'counter':
      case 'cost':
      case 'life':
      case 'power':
        if (value !== undefined) {
          acc[filterKey] = parseInt(value, 10);
        }
        break;
      case 'lang':
        if (value === 'en' || value === 'jp') {
          acc.lang = value;
        }
        break;
      case 'number':
      case 'set':
      case 'attribute':
      case 'type':
      case 'name':
        acc[filterKey] = value;
        break;
    }

    return acc;
  }, {});
};
