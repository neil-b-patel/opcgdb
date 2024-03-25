import { APIGatewayProxyHandlerV2 } from 'aws-lambda';

import { cards } from '@opcgdb/data';
import { ApiCardByIdParamsSchema, ApiCardsByIdQuerySchema } from '@opcgdb/types';

import query from '../../queries/getCardByID.js';

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  try {
    const { id } = ApiCardByIdParamsSchema.parse(event.pathParameters);
    const { lang = 'en' } = ApiCardsByIdQuerySchema.parse(event.queryStringParameters || {});
    const qres = query(id!, cards[lang]);
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
