import { fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';
import storage from '../storage';

const HOST = process.env.REACT_APP_HOST ?? '';
const baseQuery = fetchBaseQuery({
  baseUrl: HOST ?? '/',
  prepareHeaders: (headers) => {
    const jwt = storage.get('jwt');

    if (headers.has('skip-auth')) {
      headers.delete('skip-auth');
      return headers;
    }

    if (jwt) {
      headers.set('Authorization', `bearer ${jwt}`);
    }

    return headers;
  },
  credentials: 'include',
});

export default retry(baseQuery, {
  maxRetries: 1,
});
