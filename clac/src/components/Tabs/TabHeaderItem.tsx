import React, { ReactNode } from 'react';
import { Tab } from '@headlessui/react';
import clsx from 'clsx';

interface TabHeaderItemProps {
  children: ReactNode
  className?: string
  disabled?: boolean
  selectedClassName?: string
}

function TabHeaderItem({
  children, className = '', disabled, selectedClassName = '',
}: TabHeaderItemProps) {
  return (
    <Tab
      disabled={disabled}
      className={({ selected }) => clsx(className, 'py-2 px-3 border-b-3 focus:outline-primary-600 font-medium', {
        'text-gray-600 hover:text-gray-800 hover:border-gray-300': !selected && !disabled,
        'text-primary-600 border-primary-500': selected,
        'border-transparent': !selected,
        'text-gray-400': disabled,
        ...(selectedClassName && { [selectedClassName]: selected }),
      })}
    >
      {children}
    </Tab>
  );
}

export default TabHeaderItem;
