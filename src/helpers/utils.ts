import qs from 'qs';
import { FormState } from '../components/Blog/Filter';

export function createId(limit: number = 5) {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let result = '';

  for (let i = 0; i < limit; i += 1) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}

export function stringify(obj: FormState) {
  return qs.stringify(obj, { addQueryPrefix: true });
}

export function parseQueryParams<T>(queryParams: string): Partial<T> {
  return qs.parse(queryParams, { ignoreQueryPrefix: true });
}
