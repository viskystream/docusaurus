import React, { ReactNode } from 'react';
import { Tab } from '@headlessui/react';
import clsx from 'clsx';

interface TabHeaderProps {
  children: ReactNode
  className?: string
  spacing?: 'gap-0' | 'gap-1' | 'gap-2' | 'gap-3' | 'gap-4' | 'gap-6' | 'gap-8' | 'gap-9' | 'gap-10'
}

function TabHeader({ children, spacing = 'gap-6', className }: TabHeaderProps) {
  return (
    <Tab.List
      className={clsx(className, 'border-b border-gray-200 flex not-prose', spacing)}
    >
      {children}
    </Tab.List>
  );
}

export default TabHeader;
