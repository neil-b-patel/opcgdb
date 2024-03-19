const routes = {
  'GET /card/{id}': 'apps/api/handlers/card/[id].get.handler',
  'GET /cards/search': 'apps/api/handlers/cards/search.get.handler',
  'GET /cards/{number}': 'apps/api/handlers/cards/[number].get.handler',
  'GET /set/{id}': 'apps/api/handlers/set/[id].get.handler',
};

export default routes;
