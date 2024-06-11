import React, {
  useEffect, useState, useMemo, useCallback,
} from 'react';
import Markdoc from '@markdoc/markdoc';
import axios from '../services/axios';
import { getMessageFromError } from '../utils/errorMessage';
import { AxiosError } from 'axios';

/**
 * Components
 */
import Callout from '../components/Callout';
import { LinkGrid, LinkGridLink } from '../components/LinkGrid';
import Fence from '../components/Fence';
import Image from '../components/Image';
import Video from '../components/Video';
import CompanyName from '../components/CompanyName';
import CompanyEmail from '../components/CompanyEmail';
import {
  TabHeader, TabHeaderItem, TabPanel, TabPanelItem,
} from '../components/Tabs';
import NumberedListItem from '../components/NumberedListItem';
import NumberedList from '../components/NumberedList';
import Feedback from '../components/Feedback';
import DefinitionHover from '../components/DefinitionHover';
import LinkCard from '../components/LinkCard';

/**
 * Utils
 */
import logger from '../services/logger';
import Tabs from '../components/DocsTabs';
import generateTableOfContents, { TableOfContents } from '../utils/generateTableOfContents';

const components = {
  Fence,
  Image,
  CompanyName,
  CompanyEmail,
  Callout,
  LinkGrid,
  LinkGridLink,
  Tabs,
  TabHeader,
  TabHeaderItem,
  TabPanel,
  TabPanelItem,
  NumberedList,
  NumberedListItem,
  Feedback,
  Video,
  DefinitionHover,
  LinkCard,
};

export interface FrontMatter {
  route: string
  pageTitle: string
  kind: string
  uuid: string
  access_role: string
}

const defaultFM = {
  route: '',
  pageTitle: '',
  kind: '',
  uuid: '',
  access_role: '',
};

const useFetchMarkdoc = ({ path = '', local = false }) => {
  const [loadedPath, setLoadedPath] = useState('');
  const [loading, setLoading] = useState(true);
  const [tableOfContents, setTableOfContents] = useState<TableOfContents | null>(null);
  const [content, setContent] = useState(null);
  const [roles, setRoles] = useState<string[]>([]);
  const [error, setError] = useState<AxiosError | Error | null>(null);
  const [frontmatter, setFrontMatter] = useState<FrontMatter>(defaultFM);

  const loadDoc = useCallback(async () => {
    setError(null);
    setFrontMatter(defaultFM);
    setRoles([]);
    setContent(null);

    try {
      let endpoint = `/api/v1/markdoc?path=${path}`;
      if (path.includes('/glossary')) endpoint = `/api/v1/markdoc${path}`;
      if (local) endpoint = `/api/v1/markdoc-local?path=${path}`;

      const response = await axios.get(endpoint, {
        withCredentials: true,
      });

      const nodes = response?.data?.markdoc?.content?.children ?? [];
      const accessRoles = response?.data?.frontmatter?.access_role;

      let frontmatterRoles: string[] = [];

      if (Array.isArray(accessRoles)) {
        frontmatterRoles = accessRoles;
      } else if (typeof accessRoles === 'string') {
        frontmatterRoles = [accessRoles];
      }

      setContent(nodes);
      setTableOfContents(generateTableOfContents(nodes));
      setError(null);
      setLoading(false);
      setLoadedPath(path);
      setRoles(frontmatterRoles);
      setFrontMatter(response?.data?.frontmatter || {});
    } catch (err) {
      const errors = err as Error | AxiosError;
      setError(errors);
      setLoading(false);
      setLoadedPath('');
      logger.error('Error fetching Markdocs', {
        errorMessage: getMessageFromError(err),
      });
    }
  }, [path, local]);

  useEffect(() => {
    if (!path || path === loadedPath) {
      return;
    }

    setLoading(true);

    loadDoc();
  }, [path, loadedPath, loadDoc]);

  const render = useMemo(() => Markdoc.renderers.react(content, React, { components }), [content]);

  return useMemo(
    () => ({
      loadedPath,
      loading,
      tableOfContents,
      render,
      error,
      roles,
      frontmatter,
      loadDoc,
    }),
    [loadedPath, loading, tableOfContents, render, error, roles, frontmatter, loadDoc],
  );
};

export default useFetchMarkdoc;
