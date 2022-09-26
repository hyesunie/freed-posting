import { URL } from './const';

export const readPostInfo = async <T>(): Promise<T> => {
  const res = await fetch(URL.API_POST_INFO, {
    method: 'GET',
  });

  if (res.ok) {
    return res.json();
  }

  throw Error(`에러가 발생했습니다. ${res.status}`);
};

export default { readPostInfo };
