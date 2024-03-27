import { APIGatewayProxyHandlerV2 } from 'aws-lambda';

import { cards } from '@opcgdb/data';
import { ApiSearchCardQuerySchema } from '@opcgdb/types';

import query from '../../queries/getCardsByFilter.js';

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  try {
    if (!event.queryStringParameters) {
      throw new Error(
        'No filters were passed. At least one filtes is necessary to perform a search.'
      );
    }
    const {
      lang,
      pageSize = 20,
      pageNumber = 1,
      number,
      set,
      rarity,
      color,
      category,
      life,
      attribute,
      power,
      cost,
      type,
      name,
      counter,
      trigger,
    } = ApiSearchCardQuerySchema.parse(event.queryStringParameters);

    const filters = {
      lang,
      number,
      set,
      rarity,
      color,
      category,
      life,
      attribute,
      power,
      cost,
      type,
      name,
      counter,
      trigger: trigger === '1',
    };
    const qres = query(filters, cards, pageSize, pageNumber);
    return {
      statusCode: qres.status,
      body: JSON.stringify({ ...qres }),
    };
  } catch (error: any) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
