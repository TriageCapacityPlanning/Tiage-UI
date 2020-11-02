export function parseParams(params: Object) {
    const queryParams: string[] = [];
    for (const key in params) {
      queryParams.push(`${key}=${params[key]}`);
    }
    return queryParams.join('&');
  }