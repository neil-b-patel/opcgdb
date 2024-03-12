import { APIGatewayProxyHandlerV2 } from 'aws-lambda';

import query from '../../queries/getSetByID.js';
import { SetByIdParamsSchema } from '../../types.js';

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  try {
    const { id } = SetByIdParamsSchema.parse(event.pathParameters);
    const qres = query(id!); // Adding ! is safe as if it's underfined zod will throw an error and we won't get here
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
