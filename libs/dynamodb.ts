import * as AWS from 'aws-sdk';

AWS.config.update({ region: "us-east-1" });

export function call(action: string, params: any) {
  const dynamoDb = new AWS.DynamoDB.DocumentClient();
  return dynamoDb[action](params).promise();
}
