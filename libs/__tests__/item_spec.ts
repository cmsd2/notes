import {Item} from '../item';

describe('Item', () => {
    it('can be created', () => {
        const before = new Date();
        const item = new Item();
        const after = new Date();

        expect(item.createdAt().getTime()).toBeGreaterThanOrEqual(before.getTime());
        expect(item.createdAt().getTime()).toBeLessThanOrEqual(after.getTime());
    })

    it('has date in id field', () => {
        const item = new Item();
        const createdAt = item.createdAt();
        const parts = item.noteId.split('_');

        expect(parts[0]).toBe(createdAt.toISOString());
    })
})
