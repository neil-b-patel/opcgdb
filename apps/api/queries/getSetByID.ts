import type { OPSet, OPSetList } from '@opcgdb/data';

import { type ApiResponse } from '../types.js';

const getSetById = (id: string, sets: OPSetList): ApiResponse => {
  const set = sets.find((set: OPSet) => set.id === id);
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
