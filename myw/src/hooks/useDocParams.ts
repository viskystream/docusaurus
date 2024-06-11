import { useMemo } from 'react';
import { useLocation, useMatch } from 'react-router-dom';

const useDocParams = () => {
  const matchSection = useMatch('/docs/:section/*');
  const sectionParam = matchSection?.params?.section || '';
  const section = sectionParam.split('-').join(' ');

  const location = useLocation();
  // slice off ['', 'docs'] after the split
  const urlParams = location.pathname.split('/').slice(2);
  const path = `/${urlParams.join('/')}`;

  return useMemo(() => ({
    section,
    path,
  }), [section, path]);
};

export default useDocParams;
