
export function init(event) {
    console.log('claims', claims(event));
}

export function user_id(event) {
    return claims(event)['sub'];
}

export function claims(event) {
    return event.requestContext.authorizer.claims;
}
