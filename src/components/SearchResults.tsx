import React from 'react';
import { useAlgolia } from '../helpers/algolia';

type Props = {
  query: string;
};

export function SearchResults({ query }: Props) {
  const searchResults = useAlgolia(query);

  return (
    <div>
      {searchResults?.hits.map(hit => (
        <span>{JSON.stringify(hit)}</span>
      ))}
    </div>
  );
}
