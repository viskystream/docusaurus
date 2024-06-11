import React, { ReactNode } from 'react';
import { Tabs } from '../components/Tabs';
import { useSearchParams } from 'react-router-dom';

interface DocsTabsProps {
  children: ReactNode
}

/**
 * Use and set ?tabIndex in search params
 */
function DocsTabs({ children }: DocsTabsProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const defaultIndex = parseInt(searchParams.get('tabIndex') ?? '0');
  const onChange = (tabIndex: number) => setSearchParams(`tabIndex=${tabIndex}`);

  return (
    <Tabs defaultIndex={defaultIndex} onChange={onChange}>
      {children}
    </Tabs>
  );
}

export default DocsTabs;
