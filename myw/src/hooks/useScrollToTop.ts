import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const useScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const el = document.querySelector('#content');

    if (el) {
      el.scrollTo(0, 0);
    }
  }, [pathname]);
};

export default useScrollToTop;
