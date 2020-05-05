const response = {status: 200, token: "123456789"};

export function fetchData(api, method, headers, body) {
    return jest.fn().mockImplementation(() => {
        var p = new Promise(() => {
          resolve(response);
        });
    
        return p;
    })
}

