import { FeValidSearchFilterSchema } from '@opcgdb/types';
import type { FeQueryFilterKey, FeQueryParams, FeValidatedQueryMap } from '@opcgdb/types';

import { filterNameMap } from './filterMaps';

export const buildFilterMap = (_filters: FeValidatedQueryMap) => {
  const filters = _filters.valid;

  return Object.entries(filters).reduce(
    (acc: FeValidatedQueryMap, [_key, value]) => {
      const validFiltersKeys = Object.keys(filterNameMap);
      if (validFiltersKeys.includes(_key)) {
        const key = _key as keyof typeof filterNameMap;
        const filterKey: FeQueryFilterKey = filterNameMap[key];
        acc.valid[filterKey] = value;
      }
      return acc;
    },
    { valid: {}, invalid: _filters.invalid }
  );
};

export const validateQueryParams = (params: FeQueryParams): FeValidatedQueryMap => {
  return Object.entries(params).reduce(
    (acc: FeValidatedQueryMap, [key, value]) => {
      try {
        const _key = FeValidSearchFilterSchema.parse(key);
        acc.valid[_key] = value;
      } catch {
        acc.invalid[key] = value;
      }
      return acc;
    },
    { valid: {}, invalid: {} }
  );
};

const tokenizeString = (inputStr: string): string[] => {
  const tokens: string[] = [];
  let currentToken = '';
  let inQuotes = false;

  for (const char of inputStr) {
    if (char === ' ' && !inQuotes) {
      if (currentToken) {
        tokens.push(currentToken);
        currentToken = '';
      }
    } else if (char === '"') {
      inQuotes = !inQuotes;
      if (!inQuotes && currentToken[currentToken.length - 1] === ':') {
        currentToken += char;
      }
    } else if (char === ':' && !inQuotes) {
      currentToken += char;
    } else {
      currentToken += char;
    }
  }

  if (currentToken) {
    tokens.push(currentToken);
  }

  return tokens.map((token) => token.replace(/^"(.*)"$/, '$1'));
};

export const parseSearchQuery = (query: string) => {
  const lcParams = query.toLowerCase();
  const params = tokenizeString(lcParams);
  return buildFilterMap(
    validateQueryParams(
      params.reduce((acc: FeQueryParams, param) => {
        if (param.includes(':')) {
          const [key, value] = param.split(':');
          acc[key] = value;
        } else {
          if (acc.name) {
            acc.name = `${acc.name},${param}`;
          } else {
            acc.name = param;
          }
        }
        return acc;
      }, {})
    )
  );
};
