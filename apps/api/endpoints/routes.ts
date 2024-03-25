import type { RouteMap } from '@opcgdb/types';

import cardIdGet from './card/[id].get.js';
import cardsNumberGet from './cards/[number].get.js';
import cardsSearchGet from './cards/search.get.js';
import setIdGet from './set/[id].get.js';

const routes: RouteMap = [
  { path: '/api/card/:id', handler: cardIdGet },
  { path: '/api/cards/search', handler: cardsSearchGet },
  { path: '/api/cards/:number', handler: cardsNumberGet },
  { path: '/api/set/:id', handler: setIdGet },
];

export default routes;
