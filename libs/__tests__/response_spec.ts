import {success, failure, notfound} from '../response';

describe('success', () => {
    it('returns 200 response', () => {
        const body = {test: true};

        expect(success(body)).toEqual(
            expect.objectContaining({
                statusCode: 200
            })
        );
    })
})

describe('failure', () => {
    it('returns 500 response', () => {
        const body = {test: true};

        expect(failure(body)).toEqual(
            expect.objectContaining({
                statusCode: 500
            })
        );
    })
})

describe('notfound', () => {
    it('returns 404 response', () => {
        const body = {test: true};

        expect(notfound(body)).toEqual(
            expect.objectContaining({
                statusCode: 404
            })
        );
    })
})
