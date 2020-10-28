import React, { useEffect, useState } from 'react';
import { navigate } from 'gatsby';
import styled from '@emotion/styled';
import { useAlgolia } from '../helpers/algolia';
import { Paper } from './Paper';
import { peepoTheme } from '../theme';
import { PeepoLink } from './Links';
import { TagsIcon } from '../icons/TagsIcon';
import { cls, hexToRGB } from '../helpers/styles';

const SearchList = styled(Paper)`
  padding: 0;
`;

const SearchItem = styled.li`
  & + li {
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
  &.active,
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
  onBlur: () => void;
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

export function SearchResults({ query, onBlur }: Props) {
  const searchResults = useAlgolia(query);
  const hits = (searchResults?.hits || []) as PeepoHit[];

  const numOfHits = hits.length;

  const [currentHitIdx, setCurrentHitIdx] = useState(0);

  useEffect(() => {
    function onKeyUpDown(e: KeyboardEvent) {
      const key = e.key;

      if (key === 'ArrowUp' || key === 'ArrowDown') {
        setCurrentHitIdx(oldHit => {
          const addition = key === 'ArrowUp' ? -1 : 1;
          const nextHit = oldHit + addition;

          if (nextHit === numOfHits) {
            return 0;
          }

          if (nextHit < 0) {
            return numOfHits - 1;
          }

          return nextHit;
        });
      } else if (key === 'Enter') {
        if (hits[currentHitIdx] !== undefined) {
          navigate(hits[currentHitIdx].slug);
          onBlur();
        }
      }
    }

    // Arrow keys are only triggered on `keydown`, not `keypress`.
    // Source: https://stackoverflow.com/a/5597114.
    window.addEventListener('keydown', onKeyUpDown);

    return () => {
      window.removeEventListener('keydown', onKeyUpDown);
    };
  }, [hits, currentHitIdx, onBlur, numOfHits]);

  return (
    <SearchList Component="ol" className="mt-4 rounded">
      {hits.length === 0 ? (
        <p className="m-0 p-4">No results found.</p>
      ) : (
        hits.map((hit, idx) => (
          <SearchItem key={hit.slug}>
            <SearchLink
              to={hit.slug}
              className={cls(
                'p-4',
                currentHitIdx === idx ? 'active' : undefined
              )}
            >
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
        ))
      )}
    </SearchList>
  );
}
