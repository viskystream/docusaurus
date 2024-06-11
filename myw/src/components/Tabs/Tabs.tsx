import React, { ReactNode } from 'react';
import { Tab } from '@headlessui/react';

interface TabsProps {
  children: ReactNode
  defaultIndex?: number
  onChange?: (index: number) => void
}

function Tabs({ children, defaultIndex = 0, onChange }: TabsProps) {
  return (
    <Tab.Group defaultIndex={defaultIndex} onChange={onChange}>
      {children}
    </Tab.Group>
  );
}

export default Tabs;
