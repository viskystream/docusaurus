import baseAPI from '../baseAPI';

export type ESDocKind = 'quickstart' | 'guide' | 'concept' | 'api';

export interface ESDocument {
  uuid: string;
  active: boolean;
  access_role: string;
  project: string;
  repo_version: string;
  published: string;
  page_title: string;
  route: string;
  content: string;
  kind: ESDocKind;
  file_type: string;
}

const extendedAPI = baseAPI.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getDocsSearch: builder.query<ESDocument[], { q: string }>({
      query: ({ q }) => ({
        url: `/api/v1/docs/search?q=${encodeURIComponent(q)}`,
        method: 'GET',
      }),
      providesTags: ['DocsSearch'],
    }),
  }),
});

export const { useGetDocsSearchQuery, endpoints: { getDocsSearch }, useLazyGetDocsSearchQuery } = extendedAPI;

export default extendedAPI;
