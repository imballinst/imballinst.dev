import React from 'react';
import styled from '@emotion/styled';
import { useAlgolia } from '../helpers/algolia';
import { Paper } from './Paper';
import { peepoTheme } from '../theme';
import { PeepoLink } from './Links';
import { TagsIcon } from '../icons/TagsIcon';
import { hexToRGB } from '../helpers/styles';

const SearchList = styled(Paper)`
  padding: 0;
`;

const SearchItem = styled.li`
  :not(:first-child) {
    border-top: 1px solid ${peepoTheme.borderColorSets.dark.main.hex};
  }

  & em {
    background: ${peepoTheme.colorSets.dark.light.hex};
    color: ${peepoTheme.colorSets.dark.contrastText.hex};
    font-style: normal;
  }
`;

const SearchLink = styled(PeepoLink)`
  color: unset;
  &:hover {
    color: unset;
  }
  &:hover {
    background: ${hexToRGB(peepoTheme.colorSets.dark.light.hex, 0.1)};
  }
  display: block;
`;

const SearchTagIconWrapper = styled.div`
  color: ${peepoTheme.colorSets.dark.main.hex};
`;

type Props = {
  query: string;
};

type PeepoHit = {
  title: string;
  description: string;
  objectID: string;
  tags: string[];
  slug: string;
  excerpt: string;
  _snippetResult: any;
  _highlightResult: any;
};

export function SearchResults({ query }: Props) {
  const searchResults = useAlgolia(query);
  const hits = (searchResults?.hits || []) as PeepoHit[];

  return (
    <SearchList Component="ol" className="mt-4 rounded">
      {hits.map(hit => (
        <SearchItem>
          <SearchLink to={hit.slug} className="p-4">
            <div>
              {hit._highlightResult.title ? (
                <h2
                  className="font-bold text-lg"
                  dangerouslySetInnerHTML={{
                    __html: hit._highlightResult.title.value
                  }}
                />
              ) : (
                hit.title
              )}

              {hit._highlightResult.description ? (
                <p
                  className="mt-2"
                  dangerouslySetInnerHTML={{
                    __html: hit._highlightResult.description.value
                  }}
                />
              ) : (
                hit.description
              )}

              {hit.tags && (
                <div className="flex flex-row items-center text-sm mt-4">
                  <SearchTagIconWrapper>
                    <TagsIcon size={12} />
                  </SearchTagIconWrapper>

                  <span className="ml-1">{hit.tags.join(', ')}</span>
                </div>
              )}
            </div>
          </SearchLink>
        </SearchItem>
      ))}
    </SearchList>
  );
}
