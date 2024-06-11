import { createApi } from '@reduxjs/toolkit/query/react';
import baseQuery from './baseQuery';

export default createApi({
  reducerPath: '@shared/api',
  baseQuery,
  refetchOnReconnect: true,
  refetchOnFocus: true,
  endpoints: () => ({}),
  tagTypes: [
    'UserInfo',
    'UserRoutes',
    'ApiSpec',
    'UserConfig',
    'DocsNavigation',
    'ConfigValues',
    'NpmToken',
    'DocsSearch',
    'JWKS',
    'GlobalHostUrl',
    'PublicConfig',
  ],
});
