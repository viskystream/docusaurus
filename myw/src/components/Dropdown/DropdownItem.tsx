import React, { ComponentPropsWithoutRef, ElementType, MouseEventHandler } from 'react';
import { Menu } from '@headlessui/react';
import clsx from 'clsx';
import { DropdownBase } from './Dropdown';

interface DropdownItemProps<T extends ElementType = 'button'> extends Omit<DropdownBase, 'as'> {
  hoverClassName?: string
  onClick?: MouseEventHandler
  as?: T
  id?: number | string
}

function DropdownItem<T extends ElementType = 'button'>({
  as,
  children,
  className = '',
  hoverClassName = 'bg-gray-100',
  onClick,
  ...rest
}: DropdownItemProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof DropdownItemProps>) {
  const Component = as ?? 'button';

  return (
    <Menu.Item>
      {({ active }) => (
        <Component
          className={clsx(active ? hoverClassName : '', className, 'block cursor-pointer text-left w-full px-4 py-2 text-sm text-gray-700')}
          onClick={onClick}
          {...rest}
        >
          {children}
        </Component>
      )}
    </Menu.Item>
  );
}

export default DropdownItem;
