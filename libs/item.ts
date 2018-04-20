import * as uuid from 'uuid';

export class Item {
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


