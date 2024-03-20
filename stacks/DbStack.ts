import { StackContext, Table } from 'sst/constructs';

export function DbStack({ stack }: StackContext) {
  const db = new Table(stack, 'apikeys', {
    fields: {
      apiKey: 'string',
      userId: 'string',
      requests: 'number',
      requestQuota: 'number',
      lastRequest: 'string',
      created: 'string',
    },
    primaryIndex: { partitionKey: 'apiKey' },
  });

  stack.addOutputs({
    TableName: db.tableName,
  });

  return {
    db,
  };
}
