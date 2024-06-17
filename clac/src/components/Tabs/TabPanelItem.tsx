import React, { ReactNode } from 'react';
import { Tab } from '@headlessui/react';
import clsx from 'clsx';

interface TabPanelProps {
  children: ReactNode
  className?: string
}

function TabPanel({ children, className = '' }: TabPanelProps) {
  return (
    <Tab.Panel className={clsx(className, 'p-3 focus:outline-primary-600')}>{children}</Tab.Panel>
  );
}

export default TabPanel;
