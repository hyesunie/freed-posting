const readPostInfo = (): Promise<Response> => {
  return fetch('https://jsonplaceholder.typicode.com/albums', {
    method: 'GET',
  });
};

export default { readPostInfo };
