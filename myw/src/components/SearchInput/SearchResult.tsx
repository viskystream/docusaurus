/* eslint-disable camelcase */
import React from 'react';
import { Link } from 'react-router-dom';
import { ESDocument } from '../../services/api/endpoints/getDocsSearch';
import stringReplace from './util/stringReplace';

interface MatchProps {
  match: string
  query: string
}
const BASENAME = process.env.BASENAME || '/';
const queryReplacer = (queryMatch: string, i: number) => <span className="bg-primary-100 text-primary-600 font-semibold" key={`${queryMatch}-${i}`}>{queryMatch}</span>;
const boldReplacer = (queryMatch: string, i: number) => <span className="font-bold" key={`${queryMatch}-${i}`}>{queryMatch}</span>;

function SearchMatch({ match, query }: MatchProps) {
  const replacedQuery = stringReplace(match, query, queryReplacer);
  const replacedQueryAndBold = stringReplace(replacedQuery, /\*\*(.*?)\*\*/gm, boldReplacer);

  return (
    <p className="prose">{replacedQueryAndBold}</p>
  );
}

interface ResultProps {
  doc: ESDocument
  query: string
  setQuery: React.Dispatch<React.SetStateAction<string>>
}

function SearchResult({ doc, query, setQuery }: ResultProps) {
  const title = doc.page_title;
  const {
    route, content, file_type, project,
  } = doc;
  const contentLower = content.toLowerCase();
  let match = '';
  if (title.toLowerCase().indexOf(query) > -1) {
    match = title;
  } else if (contentLower.indexOf(query)) {
    const index = contentLower.indexOf(query);

    const startIndex = index - 30 > 0 ? index - 30 : 0;
    const endIndex = index + 30;
    match = content.substring(startIndex, endIndex);
  }

  const routeText = route
    .split('/')
    .slice(1)
    .map((string) => `${string[0].toUpperCase()}${string.slice(1)}`)
    .join('/')
    .split('-')
    .join(' ');

  const r = file_type === 'yaml'
    ? `/apis/${project}`
    : route;

  if (BASENAME === '/apps/demos') {
    return (
      <a href={`${window.location.origin}/docs${r}`} className="focus-visible:outline-primary-500 outline-offset-[-2px] inline-block w-full">
        <div className="p-4 hover:bg-primary-50">
          <p className="text-sm text-gray-500">{routeText}</p>
          <SearchMatch match={match} query={query} />
        </div>
      </a>
    );
  }

  return (
    <Link to={`/docs${r}`} className="focus-visible:outline-primary-500 outline-offset-[-2px] inline-block w-full" onClick={() => setQuery('')}>
      <div className="p-4 hover:bg-primary-50">
        <p className="text-sm text-gray-500">{routeText}</p>
        <SearchMatch match={match} query={query} />
      </div>
    </Link>
  );
}

export default SearchResult;
