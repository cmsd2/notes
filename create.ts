import uuid from 'uuid';
import * as AWS from 'aws-sdk';

AWS.config.update({ region: 'us-east-1' });
const dynamoDb = new AWS.DynamoDB.DocumentClient();

class Item {
    userId: string;
    noteId: string;
    content: any;
    attachment: any;
    static noteIdSeparator = '_';

    constructor() {
        const now = new Date();
        this.noteId = now.toISOString() + Item.noteIdSeparator + uuid.v4();
    }

    createdAt(): Date {
        const parts = this.noteId.split(Item.noteIdSeparator);
        return new Date(parts[0])
    }
}

export function main(event, context, callback) {
    const data = JSON.parse(event.body);

    var item = new Item();
    item.userId = event.requestContext.identity.cognitoIdentityId;
    item.content = data.content;
    item.attachment = data.attachment;

    const params = {
        TableName: 'notes',
        Item: item
    }

    dynamoDb.put(params, (error, data) => {
        const headers = {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true
        };
 
            
        if (error) {
            const response = {
                statusCode: 500,
                headers: headers,
                body: JSON.stringify({status: false})
            };

            callback(null, response);

            return;
        }

        const response = {
            statusCode: 200,
            headers: headers,
            body: JSON.stringify(item)
        };

        callback(null, response);
    });
}