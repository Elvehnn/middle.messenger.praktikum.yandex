export default function queryStringify(data: Record<string, string>): string {
  const params = Object.entries(data).reduce((acc, [key, value]) => {
    acc += `${key}=${value}&`;
    return acc;
  }, '?');

  return params.slice(0, params.length - 1);
}
