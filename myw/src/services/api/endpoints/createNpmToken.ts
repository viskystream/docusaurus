import baseAPI from '../baseAPI';

const extendedAPI = baseAPI.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    createToken: builder.mutation({
      query: ({ body }) => ({
        url: '/apps/status/api/npm/tokens',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useCreateTokenMutation } = extendedAPI;

export default extendedAPI;
