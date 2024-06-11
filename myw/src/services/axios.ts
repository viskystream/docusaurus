import axios, { InternalAxiosRequestConfig } from 'axios';
import storage from './storage';

const HOST = process.env.REACT_APP_HOST ?? '';
const BASENAME = process.env.BASENAME ?? '/';

/**
 * ! We should RTK Query whenever possible.
 *
 * Clients currently using this service:
 * @dev-center/umbrella-client
 * @dev-center/stream-monitor-client
 */
const instance = axios.create({
  baseURL: HOST ? `${HOST}${BASENAME}` : BASENAME,
});

const { CancelToken } = axios;

instance.interceptors.request.use((options: InternalAxiosRequestConfig) => {
  if (options?.signal && !options?.cancelToken) {
    const { signal } = options;
    const source = CancelToken.source();

    options.cancelToken = source.token;

    if (signal.addEventListener) {
      signal.addEventListener('abort', () => source.cancel());
    }
  }

  if (storage.get('jwt')) {
    options.headers.Authorization = `bearer ${storage.get('jwt')}`;
  }

  return options;
});

export { CancelToken };
export default instance;
