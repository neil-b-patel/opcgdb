import { filterNameMap } from './filterMaps';
import type {
  QueryFilterKey,
  QueryParams,
  ValidatedQueryMap,
  ValidSearchFilterSchema,
} from '~/types';

export const buildFilterMap = (_filters: ValidatedQueryMap) => {
  const filters = _filters.valid;

  return Object.entries(filters).reduce(
    (acc: ValidatedQueryMap, [_key, value]) => {
      const validFiltersKeys = Object.keys(filterNameMap);
      if (validFiltersKeys.includes(_key)) {
        const key = _key as keyof typeof filterNameMap;
        const filterKey: QueryFilterKey = filterNameMap[key];
        acc.valid[filterKey] = value;
      }
      return acc;
    },
    { valid: {}, invalid: _filters.invalid }
  );
};

export const validateQueryParams = (params: QueryParams): ValidatedQueryMap => {
  return Object.entries(params).reduce(
    (acc: ValidatedQueryMap, [key, value]) => {
      try {
        const _key = ValidSearchFilterSchema.parse(key);
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
  console.log(params);
  return buildFilterMap(
    validateQueryParams(
      params.reduce((acc: QueryParams, param) => {
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
