import * as d from './dynamodb';
import { Item } from './item';

export async function get(event) {
    const params = {
        TableName: 'notes',
        Key: {
            userId: event.requestContext.identity.cognitoIdentityId,
            noteId: event.pathParameters.id
        }
    };

    const result = await d.call('get', params);
    if (result.Item) {
        return result.Item;
    } else {
        return null;
    }
}

export async function update(item: Item, event: any) {
    const data = JSON.parse(event.body);

    const params = {
        TableName: 'notes',
        Key: {
            userId: event.requestContext.identity.cognitoIdentityId,
            noteId: event.pathParameters.id
        },
        UpdateExpression: "SET content = :content, attachment = :attachment",
        ExpressionAttributeValues: {
            ":attachment": data.attachment ? data.attachment : null,
            ":content": data.content ? data.content : null,
        },
        ReturnValues: "ALL_NEW"
    };

    return await d.call('update', params);
}

export async function list(event) {
    const params = {
        TableName:  'notes',
        KeyConditionExpression: "userId = :userId",
        ExpressionAttributeValues: {
            ":userId": event.requestContext.identity.cognitoIdentityId
        }
    };

    const result = await d.call('query', params);
    return result.Items;
}

export async function deleteItem(item: Item) {
    const params = {
        TableName: 'notes',
        Key: {
            userId: item.userId,
            noteId: item.noteId
        }
    };

    return await d.call('delete', params);
}
