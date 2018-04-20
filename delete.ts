import * as d from './libs/dynamodb';
import { success, failure, notfound } from './libs/response';
import { Item } from './libs/item';
import { get, deleteItem } from './libs/dao';

export async function main(event, context, callback) {
    try {
        const item = await get(event);
        if (item) {
            await deleteItem(item);
            callback(null, success({status: true}));
        } else {
            callback(null, notfound({status: false}));
        }
    } catch (e) {
        console.log(e);
        callback(null, failure({status: false}));
    }
}
