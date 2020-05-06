const response = { status: 200, json: () => Promise.resolve({ token: '123456789' }) }

export function fetchData(api, method, headers, body) {
  

  return Promise.resolve(response)
}
