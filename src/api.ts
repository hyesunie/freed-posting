import { URL } from './const';

export const readPostInfo = (): Promise<Response> => {
  return fetch(URL.API_POST_INFO, {
    method: 'GET',
  });
};

export default { readPostInfo };
