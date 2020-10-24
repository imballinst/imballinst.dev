import { useEffect, useRef, useState } from 'react';
import algoliasearch, { SearchIndex } from 'algoliasearch/lite';
import { SearchResponse } from '@algolia/client-search';

export function useAlgolia(searchQuery: string) {
  const searchIndex = useRef<SearchIndex | undefined>(undefined);
  const [searchResults, setSearchResults] = useState<
    SearchResponse | undefined
  >();

  if (searchIndex.current === undefined) {
    searchIndex.current = createClient();
  }

  useEffect(() => {
    async function search() {
      if (searchQuery !== '' && searchIndex.current !== undefined) {
        const response = await searchIndex.current.search(searchQuery, {
          hitsPerPage: 5
        });
        console.log(response);
        setSearchResults(response);
      }
    }

    search();
  }, [searchQuery, searchIndex.current]);

  return searchResults;
}

// Local helpers.
function createClient() {
  if (
    process.env.GATSBY_ALGOLIA_APP_ID === undefined ||
    process.env.GATSBY_ALGOLIA_SEARCH_KEY === undefined ||
    process.env.GATSBY_ALGOLIA_INDEX_NAME === undefined
  ) {
    throw new Error(
      'GATSBY_ALGOLIA_APP_ID, GATSBY_ALGOLIA_SEARCH_KEY, and GATSBY_ALGOLIA_INDEX_NAME should be set as environment variables.'
    );
  }

  const searchClient = algoliasearch(
    process.env.GATSBY_ALGOLIA_APP_ID,
    process.env.GATSBY_ALGOLIA_SEARCH_KEY
  );

  return searchClient.initIndex(process.env.GATSBY_ALGOLIA_INDEX_NAME);
}
