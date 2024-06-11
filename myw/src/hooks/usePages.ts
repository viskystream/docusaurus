import { useMemo } from 'react';
import { Document } from '../services/api/endpoints/getDocsNavigation';
import { useLocation } from 'react-router-dom';
import useContextNavigation from './useContextNavigation';

type Pages = {
  activePage: Document | null
  nextPage: Document | null
  prevPage: Document | null
}

const usePages = () => {
  const location = useLocation();
  const { navigation } = useContextNavigation();

  const allPages = useMemo(() => {
    const pages: Document[] = [];
    if (!navigation) {
      return pages;
    }

    const traverseTree = (node: Document) => {
      const docKeys = Object.keys(node.documents);
      docKeys.forEach((key) => {
        pages.push(node.documents[key]);
        traverseTree(node.documents[key]);
      });
    };
    if (navigation) {
      traverseTree(navigation);
    }

    return pages;
  }, [navigation]);

  const pages: Pages = useMemo(() => {
    const pagesObj: Pages = {
      activePage: null,
      nextPage: null,
      prevPage: null,
    };

    if (!allPages.length) {
      return pagesObj;
    }

    const index = allPages.findIndex((doc) => `/docs${doc.route}` === location.pathname);

    pagesObj.activePage = allPages[index] || null;
    pagesObj.nextPage = allPages[index + 1] || null;
    pagesObj.prevPage = allPages[index - 1] || null;

    return pagesObj;
  }, [allPages, location.pathname]);

  return pages;
};

export default usePages;
