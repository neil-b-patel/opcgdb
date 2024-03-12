import { APIGatewayProxyHandlerV2 } from 'aws-lambda';

import query from '../../queries/getCardsByFilter.js';
import { SearchCardQuerySchema } from '../../types.js';

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  try {
    if (!event.queryStringParameters) {
      throw new Error(
        'No filters were passed. At least one filtes is necessary to perform a search.'
      );
    }
    const {
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
      trigger,
    } = SearchCardQuerySchema.parse(event.queryStringParameters);

    const filters = {
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
      counter: counter === '1',
      trigger: trigger === '1',
    };
    const qres = query(filters, lang);
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
