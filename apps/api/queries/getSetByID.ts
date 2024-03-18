import { OPTCGLanguage, OPTCGSet, sets } from '@opcgdb/data';

import { type ApiResponse } from '../types.js';

const getSetById = (id: string, lang: OPTCGLanguage = 'en'): ApiResponse => {
  const set = sets[lang].find((set: OPTCGSet) => set.id === id);
  if (!set) {
    return {
      status: 404,
      data: { error: 'No said found for the given id' },
    };
  }
  return {
    status: 200,
    data: set || {},
  };
};

export default getSetById;
