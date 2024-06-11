import React, { ReactElement, ReactNode, useMemo } from 'react';

/**
 * Clone children with props - strips strings
 *
 * @param {children: JSX.Element} children
 * @param {object} props
 */
const useCloneElements = (children: ReactNode, props: any) => {
  const elements = useMemo(() => {
    const array = React.Children.toArray(children);
    const clones: ReactElement[] = [];

    array.forEach((child) => {
      if (typeof child === 'string') {
        return;
      }

      clones.push(React.cloneElement(child as ReactElement, { ...props }));
    });

    return clones;
  }, [children, props]);

  return elements;
};

export default useCloneElements;
