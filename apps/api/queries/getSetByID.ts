import { sets } from '@optcgdb/data';

import { type ApiResponse } from '../types.js';

const getSetById = (id: string): ApiResponse => {
  const set = sets.find((set) => set.id === id);
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
