import React, {
  ReactNode, useEffect, useState,
} from 'react';
import storage from '../../services/storage';
import { useGetConfigValuesQuery } from '../../services/api/endpoints/getConfigValues';
import Spin from '../../components/Spin';

type DashboardConfigSuspenseProps = {
  children: ReactNode;
};

/**
 * Prevent children rendering until stats-api config is loaded.
 *
 * Required for events-client (LS requests require token)
 * `clientToken`
 *
 * Required for stats-client, legacy lgbx-console (LGBX can have custom environments)
 * `brokerUrl`/`brokerPath`
 */
function DashboardConfigSuspense({ children }: DashboardConfigSuspenseProps) {
  const [isError, setIsError] = useState(false);
  const { isLoading: configIsLoading, data: configData, error: configError } = useGetConfigValuesQuery(undefined, {
    // This skip ensures that an infinite loop does not occur if useGetConfigValuesQuery is called somewhere else in the app
    skip: isError,
  });

  useEffect(() => {
    if (configData) {
      storage.set('config', configData);
    }

    if (configError) {
      setIsError(true);
      storage.remove('config');
    }
  }, [configData, configError]);

  /**
   * Only show spinner if no localStorage jwt and request is loading
   */
  if (!configData && configIsLoading) {
    return <Spin className="mt-8" />;
  }

  return children as React.ReactElement;
}

export default DashboardConfigSuspense;
