import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, GetCommand, UpdateCommand } from '@aws-sdk/lib-dynamodb';
import { APIGatewayRequestSimpleAuthorizerHandlerV2 } from 'aws-lambda';
import { Table } from 'sst/node/table';

import isNextMonthOrLater from '../utils/isNextMonthOrLater.js';

export const handler: APIGatewayRequestSimpleAuthorizerHandlerV2 = async (event) => {
  const authHeader = event.headers?.authorization;
  if (!authHeader) {
    return {
      isAuthorized: false,
      context: {
        message: 'Please provide an API key',
      },
    };
  }

  const apiKey = authHeader.split(' ')[1];
  if (!apiKey || !apiKey.length) {
    return {
      isAuthorized: false,
      context: {
        message: 'Please provide an API key',
      },
    };
  }

  const db = DynamoDBDocumentClient.from(new DynamoDBClient({}));
  const get = new GetCommand({
    TableName: Table.apikeys.tableName,
    Key: {
      apiKey,
    },
  });

  const results = await db.send(get);
  if (!results.Item) {
    return {
      isAuthorized: false,
      context: {
        message: 'Invalid API key',
      },
    };
  }

  const record = results.Item;

  // Update the latest request time and increment the request count
  const upddate = new UpdateCommand({
    TableName: Table.apikeys.tableName,
    Key: {
      apiKey,
    },
    UpdateExpression: 'SET requests = :inc, lastRequest = :now',
    ExpressionAttributeValues: {
      ':inc': isNextMonthOrLater(record.lastRequest) ? 0 : record.requests + 1,
      ':now': new Date().toISOString(),
    },
  });
  await db.send(upddate);

  if (record.requests >= record.requestQuota) {
    return {
      isAuthorized: false,
      context: {
        message: 'API key has exceeded request quota',
      },
    };
  }

  return {
    isAuthorized: true,
  };
};
