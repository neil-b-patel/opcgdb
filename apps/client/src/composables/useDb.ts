import { getCardById, getCardsByFilter, getCardsByNumber, getSetById } from '@opcgdb/api/queries';
import type { ApiOrder, ApiSort, OPCGDB, OPLang } from '@opcgdb/types';

export const useDb = () => {
  const db: OPCGDB = inject('opcgdb')!;

  const { cards, sets } = db;

  const _getSetById = (id: string, lang: OPLang) => {
    return getSetById(id, sets, lang);
  };

  const _getCardById = (id: string, lang: OPLang) => {
    return getCardById(id, cards, lang);
  };

  const _getCardsByNumber = (
    number: string,
    lang: OPLang,
    page: number,
    sort: ApiSort = 'name',
    order: ApiOrder = 'asc'
  ) => {
    return getCardsByNumber(number, lang, cards, 60, page, sort, order);
  };

  const _getCardsByFilter = (
    filters: Record<string, string | boolean>,
    page: number,
    sort: ApiSort = 'name',
    order: ApiOrder = 'asc'
  ) => {
    return getCardsByFilter(filters, cards, 60, page, sort, order);
  };

  return {
    sets,
    cards,
    getSetById: _getSetById,
    getCardById: _getCardById,
    getCardsByNumber: _getCardsByNumber,
    getCardsByFilter: _getCardsByFilter,
  };
};
