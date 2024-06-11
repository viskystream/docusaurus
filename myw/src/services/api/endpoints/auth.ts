import baseAPI from '../baseAPI';

// JSON Web Key
export type JWK = {
  kid: string;
  alias: string;
  disabled: boolean;
  passive: boolean;
  aud: string;
  alg?: string;
  e?: string;
  kty?: string;
  n?: string;
  use?: string;
}

// JSON Web Key Set
type JWKS = {
  keys: Array<{
    alg: string;
    kty: string;
    use: string;
    n: string;
    e: string;
    kid: string;
    meta: {
      alias: string;
      aud: string;
      created: string;
      passive: boolean;
      disabled: boolean;
      claims: any;
      permissions: number;
    };
  }>
}

// JSON Web Token
type JWT = {
  token: string;
}

type JWKCreateBody = { alias: string, disabled: boolean, passive: boolean }

const extendedAPI = baseAPI.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getJWKS: builder.query<JWK[], string>({
      query: (globalHostUrl) => ({
        url: `${globalHostUrl}/auth/v1/jwks`,
        method: 'GET',
      }),
      transformResponse: (response: JWKS) => {
        const filteredKeys = response.keys.filter((key) => key.meta?.aud === 'service-account');
        const JWKArray = [] as JWK[];
        for (const jwk of filteredKeys) {
          const newJWK: JWK = {
            alias: jwk.meta?.alias,
            aud: jwk.meta?.aud,
            passive: jwk.meta?.passive,
            disabled: jwk.meta?.disabled,
            kid: jwk.kid,
          };
          JWKArray.push(newJWK);
        }
        return JWKArray;
      },
      providesTags: ['JWKS'],
    }),
    generateJWK: builder.mutation<JWK, { JWTBody: JWKCreateBody, globalHostUrl: string }>({
      query: ({ JWTBody, globalHostUrl }) => ({
        url: `${globalHostUrl}/auth/v1/jwks`,
        method: 'POST',
        // only allow service-account tokens
        // NOTE: we may allow `user` tokens in the future
        body: { aud: 'service-account', ...JWTBody },
      }),
      invalidatesTags: ['JWKS'],
    }),
    updateJWK: builder.mutation<JWK, { JWK: JWK, globalHostUrl: string }>({
      query: ({ JWK, globalHostUrl }) => {
        const { kid, ...rest } = JWK;
        return {
          url: `${globalHostUrl}/auth/v1/jwks/${kid}`,
          method: 'PUT',
          body: rest,
        };
      },
      invalidatesTags: ['JWKS'],
    }),
    generateJWT: builder.mutation<JWT, { kid: string, globalHostUrl: string }>({
      query: ({ kid, globalHostUrl }) => ({
        url: `${globalHostUrl}/auth/v1/jwt`,
        method: 'POST',
        body: { kid },
      }),
    }),
  }),
});

export const {
  useGetJWKSQuery, useGenerateJWKMutation, useGenerateJWTMutation, useUpdateJWKMutation,
} = extendedAPI;

export default extendedAPI;
