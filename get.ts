import * as d from './libs/dynamodb';
import { success, failure, notfound } from './libs/response';
import { get } from './libs/dao';
import * as auth from './libs/auth';

export async function main(event, context, callback) {
    try {
        auth.init(event);

        const item = await get(event);
        if (item) {
            callback(null, success(item));
        } else {
            callback(null, notfound({status: false, error: "Item not found."}))
        }
    } catch (e) {
        console.log(e);
        callback(null, failure({status: false}));
    }
}
