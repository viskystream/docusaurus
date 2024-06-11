import { useEffect, useState } from 'react';

const useResizeObserver = (element: Element | null, callback: () => void) => {
  const [observer, setObserver] = useState<ResizeObserver | null>(null);

  useEffect(() => {
    const o = new ResizeObserver(callback);

    setObserver(o);
  }, [callback]);

  useEffect(() => {
    if (!observer || !element) return undefined;

    observer.observe(element);

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [element, observer]);
};

export default useResizeObserver;
