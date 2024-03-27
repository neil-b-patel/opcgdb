import { APIGatewayProxyHandlerV2 } from 'aws-lambda';

import { cards } from '@opcgdb/data';
import { ApiCardsByNumberParamsSchema, ApiCardsByNumberQuerySchema } from '@opcgdb/types';

import query from '../../queries/getCardsByNumber.js';

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  try {
    const { number } = ApiCardsByNumberQuerySchema.parse(event.pathParameters);
    const {
      lang = 'en',
      pageSize = 20,
      pageNumber = 1,
    } = ApiCardsByNumberParamsSchema.parse(event.queryStringParameters || {});
    if (!number) {
      throw new Error('Number is required');
    }
    const qres = query(number, lang, cards, pageSize, pageNumber);
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
