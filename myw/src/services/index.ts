import store from './store';
import axios from './axios';
import middleware from './middleware';
import reducer from './reducer';
import storage from './storage';
import logger, { useSetupLogger } from './logger';

const services = {
  reducer,
  middleware,
  storage,
};

export * from './api';
export * from './oidc';

export {
  axios,
  reducer,
  middleware,
  storage,
  store,
  logger,
  useSetupLogger,
};

// export { CancelToken } from './axios';

export type {
  RootState, AppDispatch, DeveloperState, NotificationType, NotificationsState,
} from './types';

export default services;
