import { Menu } from '@headlessui/react';
import clsx from 'clsx';
import React, { ReactNode } from 'react';

export interface DropdownBase {
  className?: string
  children: ReactNode
  as?: React.ElementType<any>
}

type DropdownProps = DropdownBase

function Dropdown({ className, children }: DropdownProps) {
  return (
    <Menu as="div" className={clsx('relative inline-block text-left', className)}>
      {children}
    </Menu>
  );
}

export default Dropdown;
