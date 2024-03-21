import { APIGatewayProxyHandlerV2 } from 'aws-lambda';

import { cards } from '@opcgdb/data';

import query from '../../queries/getCardsByNumber.js';
import { CardsByNumberParamsSchema, CardsByNumberQuerySchema } from '../../types.js';

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  try {
    const { number } = CardsByNumberQuerySchema.parse(event.pathParameters);
    const { lang = 'en' } = CardsByNumberParamsSchema.parse(event.queryStringParameters || {});
    if (!number) {
      throw new Error('Number is required');
    }
    const qres = query(number, cards[lang]);
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
