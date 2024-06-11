import baseAPI from '../baseAPI';

const extendedAPI = baseAPI.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getXcodeRegion: builder.query({
      query: () => ({
        url: '/api/v1/lgbx/admin/hosts/xcode/region',
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetXcodeRegionQuery } = extendedAPI;

export default extendedAPI;
