import * as acm from 'aws-cdk-lib/aws-certificatemanager';
import { Api, Function, StackContext, use } from 'sst/constructs';

import routes from '../apps/api/handlers/routes.js';
import { DbStack } from './DbStack.js';

export function ApiStack({ stack }: StackContext) {
  const { stage } = stack;
  const isProd = stage === 'production' && process.env.API_DOMAIN !== undefined;
  const disableApiKeys =
    process.env.DISABLE_API_KEYS === 'true' || process.env.DISABLE_API_KEYS === '1';

  let db;
  if (!disableApiKeys) {
    db = use(DbStack).db;
  }

  const api = new Api(stack, 'api', {
    // List of routes
    customDomain: {
      domainName: isProd ? process.env.API_DOMAIN! : `local.${process.env.API_DOMAIN!}`,
      path: 'api/v1',
      hostedZone: process.env.API_DOMAIN!,
      cdk: {
        certificate: acm.Certificate.fromCertificateArn(
          stack,
          'Certificate',
          process.env.AWS_CERTIFICATE_ARN!
        ),
      },
    },
    authorizers: disableApiKeys
      ? {}
      : {
          lambda: {
            type: 'lambda',
            responseTypes: ['simple'],
            function: new Function(stack, 'api-authorizer', {
              handler: 'apps/api/handlers/authorizer.handler',
              // Make sure the authorizer can access the database
              bind: [db!],
            }),
          },
        },
    defaults: {
      // Authorizer for all routes
      authorizer: disableApiKeys ? undefined : 'lambda',
      // Rate limit and throttling settings
      throttle: {
        rate: 10,
        burst: 100,
      },
    },
    routes,
  });

  stack.addOutputs({
    ApiEndpoint: api.url,
    ApiDomain: api.customDomainUrl,
  });

  return {
    api,
  };
}
