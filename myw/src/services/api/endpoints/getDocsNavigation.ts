import baseAPI from '../baseAPI';

export type DocKind = 'quickstart' | 'guide' | 'concept'
export interface Document {
  key: string
  pageTitle?: string
  linkTitle?: string
  route: string
  title: string
  groups: []
  kind: DocKind
  documents: {
    [key: string]: Document
  }
}

export type ApiNavigation = Document

const extendedAPI = baseAPI.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getDocsNavigation: builder.query<ApiNavigation, void>({
      query: () => ({
        url: '/api/v1/markdoc/navigation',
        method: 'GET',
      }),
      providesTags: ['DocsNavigation'],
    }),
  }),
});

export const { useGetDocsNavigationQuery } = extendedAPI;

export default extendedAPI;
