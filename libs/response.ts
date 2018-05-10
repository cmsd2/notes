
export function success(body: any): any {
  return buildResponse(200, body)
}

export function failure(body: any): any {
  return buildResponse(500, body)
}

export function notfound(body: any): any {
  return buildResponse(404, body)
}

function buildResponse(statusCode: number, body: any): any {
  return {
    statusCode: statusCode,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true
    },
    body: JSON.stringify(body)
  };
}
