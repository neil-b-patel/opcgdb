import { APIGatewayProxyHandlerV2 } from 'aws-lambda';

import { sets } from '@opcgdb/data';

import query from '../../queries/getSetByID.js';
import { SetByIdParamsSchema, SetByIdQuerySchema } from '../../types.js';

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  try {
    const { id } = SetByIdParamsSchema.parse(event.pathParameters);
    const { lang = 'en' } = SetByIdQuerySchema.parse(event.queryStringParameters || {});

    const qres = query(id!, sets[lang]); // Adding ! is safe as if it's underfined zod will throw an error and we won't get here
    return {
      statusCode: qres.status,
      body: JSON.stringify({ ...qres }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error }),
    };
  }
};
