import { useEffect, useState, useMemo } from 'react';
import axios from '../services/axios';
import { AxiosError } from 'axios';
import logger from '../services/logger';
import { getMessageFromError } from '../utils/errorMessage';

export interface Document {
  key: string
  pageTitle?: string
  route: string
  title: string
  groups: []
}

export interface Section extends Document {
  documents: Document[]
}

export interface Domain extends Document {
  sections: Section[]
}

export type ApiNavigation = Domain[]

const useFetchNavigation = () => {
  const [loading, setLoading] = useState(true);
  const [navigation, setNavigation] = useState<ApiNavigation | []>([]);
  const [error, setError] = useState<AxiosError | Error | null>(null);

  useEffect(() => {
    setLoading(true);

    const load = async () => {
      try {
        const response = await axios.get('/api/v1/markdoc/navigation', {
          withCredentials: true,
        });

        setNavigation(response?.data);
        setLoading(false);
      } catch (err) {
        const errors = err as Error | AxiosError;
        setError(errors);
        setLoading(false);
        logger.error('Error fetching navigation', {
          errorMessage: getMessageFromError(err),
        });
      }
    };

    load();
  }, []);

  return useMemo(
    () => ({
      loading,
      navigation,
      error,
    }),
    [loading, navigation, error],
  );
};

export default useFetchNavigation;
