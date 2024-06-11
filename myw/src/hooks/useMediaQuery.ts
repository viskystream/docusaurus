import { useMemo, useState, useEffect } from 'react';

const screens = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

type ScreenType = keyof typeof screens
type WidthType = 'min' | 'max'

const useMediaQuery = (size: ScreenType = 'sm', type: WidthType = 'min'): boolean => {
  const mediaQueryString = useMemo(() => `(${type}-width: ${screens[size]})`, [size, type]);
  const mediaQuery: MediaQueryList = useMemo(() => window.matchMedia(mediaQueryString), [mediaQueryString]);
  const [matches, setMatches] = useState(mediaQuery.matches);

  useEffect(() => {
    const onMediaQueryChange = (event: MediaQueryListEvent) => {
      if (matches !== event.matches) {
        setMatches(event.matches);
      }
    };

    mediaQuery.addListener(onMediaQueryChange);

    if (matches !== mediaQuery.matches) {
      setMatches(mediaQuery.matches);
    }

    return () => {
      mediaQuery.removeListener(onMediaQueryChange);
    };
  }, [matches, mediaQuery]);

  return matches;
};

export default useMediaQuery;
