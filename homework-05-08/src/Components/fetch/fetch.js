export function fetchData(api, method, headers, body) {
  return fetch(api, {
    headers: headers,
    method: method,
    body: JSON.stringify(body),
  });
}
