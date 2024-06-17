import React, { ReactNode } from 'react';
import { Tab } from '@headlessui/react';
import clsx from 'clsx';

interface TabPanelProps {
  children: ReactNode
  className?: string
}

function TabPanel({ children, className = '' }: TabPanelProps) {
  return (
    <Tab.Panels className={clsx(className)}>
      {children}
    </Tab.Panels>
  );
}

export default TabPanel;
