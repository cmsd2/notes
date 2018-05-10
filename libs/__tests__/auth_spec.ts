import {user_id} from '../auth';

describe('user_id', () => {
    it('returns sub claim', () => {
        const claims = {
            requestContext: {
                authorizer: {
                    claims: {
                        sub: 'test-subject'
                    }
                }
            }
        };

        expect(user_id(claims)).toEqual('test-subject');
    })
})
