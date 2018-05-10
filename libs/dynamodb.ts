import * as AWS from 'aws-sdk';

AWS.config.update({ region: "us-east-1" });

export function table_name(): string {
  const t = process.env.TABLE_NAME;
  if (!t) {
    throw Error("no table name configured");
  }
  return t;
}

export function call(action: string, params: any) {
  const dynamoDb = new AWS.DynamoDB.DocumentClient();
  return dynamoDb[action](params).promise();
}
