import * as acm from 'aws-cdk-lib/aws-certificatemanager';
import { Api, StackContext } from 'sst/constructs';

import routes from '../apps/api/handlers/routes.js';

export function ApiStack({ stack }: StackContext) {
  const { stage } = stack;
  const isProd =
    stage === 'production' &&
    process.env.MAIN_DOMAIN !== undefined &&
    process.env.API_DOMAIN !== undefined;

  // const hostedZone = isProd
  //   ? route53.HostedZone.fromLookup(stack, 'HostedZone', {
  //       domainName: process.env.MAIN_DOMAIN!,
  //     })
  //   : undefined;

  const api = new Api(stack, 'opcgdb-api', {
    // List of routes
    customDomain: {
      domainName: isProd ? process.env.API_DOMAIN! : `local.${process.env.API_DOMAIN!}`,
      // hostedZone: hostedZone?.hostedZoneArn,
      path: 'api/v1',
      cdk: {
        certificate: acm.Certificate.fromCertificateArn(
          stack,
          'Certificate',
          process.env.AWS_CERTIFICATE_ARN!
        ),
      },
    },
    routes,
    defaults: {
      // Rate limit and throttling settings
      throttle: {
        rate: 10,
        burst: 100,
      },
    },
  });

  stack.addOutputs({
    ApiEndpoint: api.url,
    ApiDomain: api.customDomainUrl,
  });

  return {
    api,
  };
}
