import * as acm from 'aws-cdk-lib/aws-certificatemanager';
import { StackContext, StaticSite } from 'sst/constructs';

export function CdnStack({ stack }: StackContext) {
  const { stage } = stack;
  const isProd =
    stage === 'production' &&
    process.env.MAIN_DOMAIN !== undefined &&
    process.env.CDN_DOMAIN !== undefined;

  // Look up hosted zone
  // const hostedZone = isProd
  //   ? route53.HostedZone.fromLookup(stack, 'HostedZone', {
  //       domainName: process.env.MAIN_DOMAIN!,
  //     })
  //   : undefined;

  const cdn = new StaticSite(stack, 'opcgdb-cdn', {
    path: 'apps/cdn',
    buildOutput: 'assets/public',
    assets: {
      fileOptions: [
        {
          files: '**',
          cacheControl: 'max-age=604800, stale-while-revalidate=86400',
        },
        {
          files: ['**/*.json', '**/*.webp'],
          cacheControl: 'max-age=31536000,public,immutable',
        },
      ],
    },
    customDomain: isProd
      ? {
          domainName: process.env.CDN_DOMAIN!,
          alternateNames: [`www.${process.env.CDN_DOMAIN}`],
          //hostedZone: hostedZone?.hostedZoneArn,
          cdk: {
            certificate: acm.Certificate.fromCertificateArn(
              stack,
              'Certificate',
              process.env.AWS_CERTIFICATE_ARN!
            ),
          },
        }
      : undefined,
  });

  // if (isProd && cdn.cdk) {
  //   // Create A and AAAA records for the alternate domain names
  //   const recordProps = {
  //     recordName: process.env.CDN_DOMAIN!,
  //     zone: hostedZone!, // Guaranteeing it exists in production
  //     target: route53.RecordTarget.fromAlias(
  //       new route53Targets.CloudFrontTarget(cdn.cdk.distribution)
  //     ),
  //   };
  //   new route53.ARecord(stack, 'AlternateARecord', recordProps);
  //   new route53.AaaaRecord(stack, 'AlternateAAAARecord', recordProps);
  // }

  stack.addOutputs({
    CdnEndpoint: cdn.url,
    CdnDomain: cdn.customDomainUrl,
  });

  return {
    cdn,
  };
}
