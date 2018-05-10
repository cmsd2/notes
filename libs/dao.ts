import * as d from './dynamodb';
import { Item } from './item';
import * as auth from './auth';

export async function create(item: Item): Promise<Item> {
    const params = {
        TableName: d.table_name(), 
        Item: item
    }

    await d.call('put', params);

    return item;
}

export async function get(event) {
    console.log(event.pathParameters);
    const params = {
        TableName: d.table_name(),
        Key: {
            userId: auth.user_id(event),
            noteId: decodeURIComponent(event.pathParameters.id)
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
    console.log(event.pathParameters);
    const data = JSON.parse(event.body);

    const params = {
        TableName: d.table_name(),
        Key: {
            userId: auth.user_id(event),
            noteId: decodeURIComponent(event.pathParameters.id)
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
        TableName:  d.table_name(),
        KeyConditionExpression: "userId = :userId",
        ExpressionAttributeValues: {
            ":userId": auth.user_id(event)
        }
    };

    const result = await d.call('query', params);
    return result.Items;
}

export async function deleteItem(item: Item) {
    const params = {
        TableName: d.table_name(),
        Key: {
            userId: item.userId,
            noteId: item.noteId
        }
    };

    return await d.call('delete', params);
}
