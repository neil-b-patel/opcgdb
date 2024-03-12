const routes = {
  'GET /api/card/{id}': 'apps/api/handlers/card/[id].get.handler',
  'GET /api/cards/search': 'apps/api/handlers/cards/search.get.handler',
  'GET /api/cards/{number}': 'apps/api/handlers/cards/[number].get.handler',
  'GET /api/set/{id}': 'apps/api/handlers/set/[id].get.handler',
};

export default routes;
