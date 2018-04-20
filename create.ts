import * as d from './libs/dynamodb';
import { success, failure } from './libs/response';
import { Item } from './libs/item';

export async function main(event, context, callback) {
    const data = JSON.parse(event.body);

    var item = new Item();
    item.userId = event.requestContext.identity.cognitoIdentityId;
    item.content = data.content;
    item.attachment = data.attachment;

    const params = {
        TableName: 'notes',
        Item: item
    }

    try {
      await d.call('put', params);
      callback(null, success(item));
    } catch (e) {
      console.log(e);
      callback(null, failure({status: false}));
    }
}
