import { Menu } from '@headlessui/react';
import clsx from 'clsx';
import React from 'react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { DropdownBase } from './Dropdown';

interface DropdownButtonProps extends DropdownBase {
  hideIcon?: boolean
  icon?: React.ComponentType
  iconClassName?: string
  iconPosition?: 'left' | 'right'
}

function DropdownButton({
  children,
  as,
  className = '',
  hideIcon = false,
  icon,
  iconClassName,
  iconPosition = 'right',
}: DropdownButtonProps) {
  const Icon = icon ?? ChevronDownIcon;

  return (
    <Menu.Button
      as={as ?? 'button'}
      className={clsx(className, 'inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-gray-100')}
    >
      {(!hideIcon && iconPosition === 'left') && (
        <Icon className={clsx(iconClassName, '-ml-1 mr-2 h-5 w-5')} />
      )}
      {children}
      {(!hideIcon && iconPosition === 'right') && (
        <Icon className={clsx(iconClassName, '-mr-1 ml-2 h-5 w-5')} />
      )}
    </Menu.Button>
  );
}

export default DropdownButton;
