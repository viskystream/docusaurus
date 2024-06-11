import baseAPI from '../baseAPI';

export interface ApiSpec {
  name: string
  key: string
  description: string
  link: string
  category: {
    name: string
    key: string
  }
  type: string
  groups: string[]
}

const extendedAPI = baseAPI.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getApiSpec: builder.query({
      query: ({ project }) => ({
        url: `/api/v1/docs/spec${project ? `/${project}` : ''}`,
        method: 'GET',
      }),
      providesTags: ['ApiSpec'],
    }),
  }),
});

export const { useGetApiSpecQuery } = extendedAPI;

export default extendedAPI;
