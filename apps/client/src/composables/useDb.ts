import { getCardById, getCardsByFilter, getCardsByNumber, getSetById } from '@opcgdb/api/queries';
import type { OPCGDB, OPLang } from '@opcgdb/data';

export const useDb = () => {
  const db: OPCGDB = inject('opcgdb')!;

  const { cards, sets } = db;

  const _getSetById = (id: string, lang: OPLang) => {
    return getSetById(id, sets[lang]);
  };

  const _getCardById = (id: string, lang: OPLang) => {
    return getCardById(id, cards[lang]);
  };

  const _getCardsByNumber = (number: string, lang: OPLang) => {
    return getCardsByNumber(number, cards[lang]);
  };

  const _getCardsByFilter = (filters: Record<string, string | boolean>, lang: OPLang) => {
    return getCardsByFilter(filters, cards[lang]);
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
