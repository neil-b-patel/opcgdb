import { getCardById, getCardsByFilter, getCardsByNumber, getSetById } from '@opcgdb/api/queries';
import type { OPCGDB, OPLang } from '@opcgdb/types';

export const useDb = () => {
  const db: OPCGDB = inject('opcgdb')!;

  const { cards, sets } = db;

  const _getSetById = (id: string, lang: OPLang) => {
    return getSetById(id, sets[lang]);
  };

  const _getCardById = (id: string, lang: OPLang) => {
    return getCardById(id, cards[lang]);
  };

  const _getCardsByNumber = (number: string, lang: OPLang, page: number) => {
    return getCardsByNumber(number, cards[lang], 60, page);
  };

  const _getCardsByFilter = (
    filters: Record<string, string | boolean>,
    lang: OPLang,
    page: number
  ) => {
    return getCardsByFilter(filters, cards[lang], 60, page);
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
