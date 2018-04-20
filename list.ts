import * as d from './libs/dynamodb';
import { success, failure } from './libs/response';
import { Item } from './libs/item';
import { list } from './libs/dao';

export async function main(event, context, callback) {
    try {
        const items = await list(event);
        callback(null, success(items));
    } catch (e) {
        console.log(e);
        callback(null, failure({status: false}));
    }
}
