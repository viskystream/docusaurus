import baseAPI from './baseAPI';

export * from './endpoints';

export const {
  updateQueryData,
  invalidateTags,
  resetApiState,
} = baseAPI.util;

const {
  reducerPath,
  middleware,
  reducer,
} = baseAPI;

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  reducerPath,
  middleware,
  reducer,
};
