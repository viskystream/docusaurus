import baseAPI from '../baseAPI';

const HOST = process.env.REACT_APP_HOST ?? '';
export interface ConfigValues {
  clientToken: string;
  clientReferrer: string;
  globalHostUrl: string;
  uploadBucket: string;
  uploadServiceDisabled: boolean;
  regionalHostUrls: {
    [key: string]: string;
  };
  regionalOriginUrls: {
    [key: string]: string
  },
  liveServiceDisabled: boolean
  brokerPath: string
  brokerUrl: string
  brokerEndpoint?: string
  npmTokenDisabled: boolean
}

interface ConfigValuesResponse {
  isLoading: boolean,
  data?: ConfigValues
}

interface ConfigValuesResponse {
  isLoading: boolean,
  data?: ConfigValues,
}

interface GlobalHostUrlResponse {
  globalHostUrl: string;
}

interface ShowcasesConfigResponse {
  sportsUrl: string;
}

interface PublicConfigResponse {
  clientId: string;
  keycloakUrl: string;
  globalHostUrl: string;
  companyName: string;
  mixpanelProjectToken?: string;
}

const extendedAPI = baseAPI.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getConfigValues: builder.query<ConfigValues, void>({
      query: () => ({
        url: '/apps/status/api/config',
        method: 'GET',
      }),
      providesTags: ['ConfigValues'],
      transformResponse: (response: ConfigValues) => ({
        clientReferrer: response?.clientReferrer ?? '',
        globalHostUrl: response?.globalHostUrl ?? '',
        clientToken: response?.clientToken ?? '',
        regionalHostUrls: response?.regionalHostUrls ?? {},
        regionalOriginUrls: response?.regionalOriginUrls ?? {},
        uploadServiceDisabled: response?.uploadServiceDisabled ?? true,
        uploadBucket: response?.uploadBucket ?? null,
        liveServiceDisabled: response?.liveServiceDisabled ?? true,
        brokerPath: response?.brokerPath ?? '',
        brokerUrl: response?.brokerUrl ?? '',
        brokerEndpoint: response?.brokerUrl
          ? response?.brokerUrl
          : `${HOST}${response?.brokerPath?.replace(/\/$/, '')}`,
        npmTokenDisabled: response?.npmTokenDisabled ?? false,
      } as ConfigValues),
    }),
    getGlobalHostUrl: builder.query<GlobalHostUrlResponse, void | undefined | { headers: Record<string, string> }>({
      query: (headers = undefined) => ({
        url: '/api/v1/global-host-url',
        method: 'GET',
        headers: headers ? headers.headers : {},
      }),
      providesTags: ['GlobalHostUrl'],
    }),
    getShowcasesConfig: builder.query<ShowcasesConfigResponse, void>({
      query: () => ({
        url: '/api/v1/showcases-config',
        method: 'GET',
      }),
      providesTags: ['GlobalHostUrl'],
    }),
    getPublicConfig: builder.query<PublicConfigResponse, void>({
      query: () => ({
        url: '/api/v1/public-config',
        method: 'GET',
        headers: {
          'skip-auth': 'true',
        },
      }),
      providesTags: ['PublicConfig'],
    }),
  }),
});

export function selectFromConfigValuesQueryResult({
  isLoading,
  data,
}: ConfigValuesResponse) {
  return {
    isLoading,
    clientReferrer: data?.clientReferrer ?? '',
    globalHostUrl: data?.globalHostUrl ?? '',
    clientToken: data?.clientToken ?? '',
    regionalHostUrls: data?.regionalHostUrls ?? {},
    regionalOriginUrls: data?.regionalOriginUrls ?? {},
    uploadServiceDisabled: data?.uploadServiceDisabled ?? true,
    uploadBucket: data?.uploadBucket ?? null,
    liveServiceDisabled: data?.liveServiceDisabled ?? true,
    brokerPath: data?.brokerPath ?? '',
    brokerUrl: data?.brokerUrl ?? '',
    brokerEndpoint: data?.brokerEndpoint ?? '',
    npmTokenDisabled: data?.npmTokenDisabled ?? false,
  };
}

export const {
  useGetConfigValuesQuery, useGetGlobalHostUrlQuery, useGetShowcasesConfigQuery, useGetPublicConfigQuery,
} = extendedAPI;

export default extendedAPI;
