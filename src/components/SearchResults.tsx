import React from 'react';
import styled from '@emotion/styled';
import { useAlgolia } from '../helpers/algolia';
import { Paper } from './Paper';
import { peepoTheme } from '../theme';

const SearchList = styled(Paper)`
  padding: 0;
`;

const SearchItem = styled.li`
  :not(:first-child) {
    margin-top: 8px;
    border-top: 1px solid ${peepoTheme.borderColorSets.dark.main.hex};
  }
`;

type Props = {
  query: string;
};

export function SearchResults({ query }: Props) {
  const searchResults = useAlgolia(query);

  return (
    <SearchList Component="ol" className="mt-4 rounded">
      {searchResults?.hits.map(hit => (
        <SearchItem className="p-4">{JSON.stringify(hit)}</SearchItem>
      ))}
    </SearchList>
  );
}
