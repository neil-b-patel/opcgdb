import { Api, StackContext } from 'sst/constructs';

import routes from '../apps/api/handlers/routes.js';

export function API({ stack }: StackContext) {
  const api = new Api(stack, 'api', {
    routes,
  });

  stack.addOutputs({
    ApiEndpoint: api.url,
  });
}
