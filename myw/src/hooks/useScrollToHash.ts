import { useEffect } from 'react';

const useScrollToHash = (trigger: boolean) => {
  useEffect(() => {
    // Using a timeout because getElementById will find the element before the first page is fully loaded
    // Without it, the "On this page" section will not work properly
    const timeout = setTimeout(() => {
      if (trigger && window.location.hash) {
        const el = document.getElementById(window.location.hash.replace('#', ''));

        if (el) {
          el.scrollIntoView();
        }
      }
    }, 5);

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [trigger]);
};

export default useScrollToHash;
