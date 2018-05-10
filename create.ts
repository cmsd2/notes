import { success, failure } from './libs/response';
import { Item } from './libs/item';
import { create } from './libs/dao';
import * as auth from './libs/auth';

export async function main(event, context, callback) {
    try {
        auth.init(event);

        const data = JSON.parse(event.body);

        var item = new Item();
        item.userId = auth.user_id(event);
        item.content = data.content;
        item.attachment = data.attachment;

        item = await create(item);
        callback(null, success(item));
    } catch (e) {
        console.log(e);
        callback(null, failure({status: false}));
    }
}
