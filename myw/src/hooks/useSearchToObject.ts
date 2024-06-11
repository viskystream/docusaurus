import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

function searchToObject(search: URLSearchParams) {
  const params: Record<string, string> = {};
  for (const p of search) {
    const key = p[0];
    params[key] = p[1];
  }
  return params;
}

function useSearchToObject() {
  const [searchParams] = useSearchParams();
  const [searchObject, setSearchObject] = useState(searchToObject(searchParams));

  useEffect(() => {
    const params = searchToObject(searchParams);
    setSearchObject(params);
  }, [searchParams]);

  return searchObject;
}

export default useSearchToObject;
