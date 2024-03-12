import { APIGatewayProxyHandlerV2 } from 'aws-lambda';

import query from '../../queries/getCardsByNumber.js';
import { CardsByNumberParamsSchema, CardsByNumberQuerySchema } from '../../types.js';

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  try {
    const { number } = CardsByNumberQuerySchema.parse(event.pathParameters);
    const { lang } = CardsByNumberParamsSchema.parse(event.queryStringParameters || {}); // Fallback to {} if no query params are available since they are all optional
    if (!number) {
      throw new Error('Number is required');
    }
    const qres = query(number, lang);
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
