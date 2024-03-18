import { Api, StackContext } from 'sst/constructs';

import routes from '../apps/api/handlers/routes.js';

export function ApiStack({ stack }: StackContext) {
  const api = new Api(stack, 'opcgdb-api', {
    // List of routes
    routes,
    defaults: {
      // Rate limit and throttling settings
      throttle: {
        rate: 2000,
        burst: 100,
      },
    },
  });

  stack.addOutputs({
    ApiEndpoint: api.url,
  });

  return {
    api,
  };
}
