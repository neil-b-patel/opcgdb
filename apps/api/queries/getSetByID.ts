import type { ApiResponse, OPLang, OPSet, OPSetList } from '@opcgdb/types';

const getSetById = (id: string, sets: OPSetList, lang: OPLang): ApiResponse & { data?: OPSet } => {
  const set = sets.find((set: OPSet) => set.id === id && set.lang === lang);
  if (!set) {
    return {
      status: 404,
      error: 'No said found for the given id',
    };
  }
  return {
    status: 200,
    data: set || {},
  };
};

export default getSetById;
