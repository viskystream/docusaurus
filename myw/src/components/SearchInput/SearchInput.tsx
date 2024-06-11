/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { ChangeEvent, useCallback, useState } from 'react';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import debounce from 'lodash.debounce';
import Input from '../Input';
import { useLazyGetDocsSearchQuery } from '../../services/api/endpoints/getDocsSearch';
import SearchResult from './SearchResult';

function SearchInput() {
  const [query, setQuery] = useState('');
  const [fetchDocs, searchResults] = useLazyGetDocsSearchQuery();

  const submitSearch = useCallback(debounce(async (q: string) => {
    fetchDocs({ q });
  }, 500), []);

  const noResults = searchResults.data && searchResults.data.length === 0;
  return (
    <div className="min-w-[160px] md:min-w-[405px] relative group">
      <Input
        placeholder="Search"
        value={query}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          const { value } = event.target;
          setQuery(value);
          if (value.length > 2) {
            submitSearch(value.toLowerCase());
          }
        }}
        // @ts-ignore
        icon={!query.length ? MagnifyingGlassIcon : undefined}
        iconPosition="end"
      />
      {!!query && (
        <button
          type="button"
          onClick={() => setQuery('')}
          className="absolute top-[3px] right-1 p-1 border-none bg-transparent h-8 w-8 focus:outline-primary-500"
        >
          <XMarkIcon className="text-gray-400" />
        </button>
      )}
      {query && !!searchResults?.data?.length && (
        <div className="group-focus-within:block hidden absolute rounded bg-white border mt-2 shadow w-full overflow-y-scroll max-h-96 scrollbar-hide">
          {searchResults.data.map((doc, i) => <SearchResult doc={doc} query={query.toLowerCase()} setQuery={setQuery} key={`${i}-${doc.uuid}`} />)}
        </div>
      )}
      {query && noResults && (
        <div className="group-focus-within:block hidden absolute rounded bg-white border mt-2 shadow w-full overflow-y-scroll max-h-96 scrollbar-hide p-4">
          <p>No results found</p>
        </div>
      )}
    </div>
  );
}

export default SearchInput;
