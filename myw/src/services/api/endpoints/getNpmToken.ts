import baseAPI from '../baseAPI';

export type NpmToken = string;

const extendedAPI = baseAPI.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getNpmToken: builder.query<NpmToken, any>({
      query: () => ({
        url: '/apps/status/api/npm/token',
        method: 'GET',
      }),
      providesTags: ['NpmToken'],
    }),
  }),
});

export const { useGetNpmTokenQuery } = extendedAPI;

export default extendedAPI;
