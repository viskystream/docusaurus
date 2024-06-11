import { useEffect } from 'react';
import { LoggerCore, LoggerGlobal } from '@livelyvideo/log-client';
import { useLocation } from 'react-router-dom';
import { useGetConfigValuesQuery, selectFromConfigValuesQueryResult } from './api/endpoints/getConfigValues';
import useGetUserProfile from './oidc/useGetUserProfile';

export const createGlobalLogger = (host: string) => {
  const loggerGlobal = new LoggerGlobal();

  // Only write logs to Kibana when the app is built/deployed
  if (process.env.NODE_ENV === 'production') {
    loggerGlobal.setOptions({
      host,
      interval: 5000,
      level: 'debug',
    });
  }
};

// eslint-disable-next-line import/no-mutable-exports
let logger = new LoggerCore('dev-center-web');

/**
 * Create and extend a logger. Handles setting the chain metadata to allow tracing the parentage of a log.
 *
 * Based on a code snippet from David Jansen.
 */
export const extendLogger = (loggerToExtend: LoggerCore, chainName: string) => {
  const newLogger = new LoggerCore(loggerToExtend.name);
  newLogger.extend(loggerToExtend);

  const currentChain = loggerToExtend.getLoggerMeta('chain');

  newLogger.setLoggerMeta('chain', currentChain ? `${currentChain}:${chainName}` : chainName);
  newLogger.setLoggerMeta('client', 'dev-center-web');

  logger = newLogger;
};

/** The default logger for Dev Center Web */
extendLogger(logger, 'app');

// Force disable printing in tests
if (process.env.NODE_ENV === 'test') {
  // The logger stores console methods in memory and currently has no option/method to disable them
  (logger as any).printer = null;
}

/**
 * React hook for setting the meta chain and aggregates for the specific app
 * This hook must be used inside of a redux Provider and BrowserRouter
 */
export function useSetupLogger(loggerToSetUp: LoggerCore) {
  const { globalHostUrl } = useGetConfigValuesQuery(undefined, {
    selectFromResult: selectFromConfigValuesQueryResult,
  });

  const { name, email } = useGetUserProfile();

  const location = useLocation();

  useEffect(() => {
    if (globalHostUrl) {
      createGlobalLogger(globalHostUrl);
    }
  }, [globalHostUrl]);

  useEffect(() => {
    localStorage.setItem('debug', '*');
    extendLogger(loggerToSetUp, 'umbrella');
  }, []);

  useEffect(() => {
    if (email && name) {
      loggerToSetUp.setMessageAggregate('username', name);
      loggerToSetUp.setMessageAggregate('email', email);
    }
  }, [email, name]);

  useEffect(() => {
    loggerToSetUp.setMessageAggregate('pathname', location.pathname);
  }, [location.pathname]);
}

export default logger;
