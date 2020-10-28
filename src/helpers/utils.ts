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

export function stringify(obj: Partial<FormState>) {
  const filterText = obj.filterText || null;
  const filterTags = obj.filterTags || null;

  return qs.stringify(
    { filterText, filterTags },
    { addQueryPrefix: true, skipNulls: true }
  );
}

export function parseQueryParams(queryParams: string): qs.ParsedQs {
  return qs.parse(queryParams, { ignoreQueryPrefix: true });
}
