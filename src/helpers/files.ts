import type { MarkdownContent } from '../types';

export async function getAllContents(record: Record<string, () => Promise<unknown>>) {
  return Promise.all(Object.values(record).map((post) => post())) as Promise<MarkdownContent[]>;
}
