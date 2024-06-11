import { Menu, Transition } from '@headlessui/react';
import clsx from 'clsx';
import React, { Fragment } from 'react';
import { DropdownBase } from './Dropdown';

interface DropdownItemsProps extends DropdownBase {
  enter?: string;
  enterFrom?: string;
  enterTo?: string;
  leave?: string;
  leaveFrom?: string;
  leaveTo?: string;
  position?: 'left' | 'right'
}

function DropdownItems({
  className,
  children,
  as,
  enter,
  enterFrom,
  enterTo,
  leave,
  leaveFrom,
  leaveTo,
  position = 'left',
}: DropdownItemsProps) {
  return (
    <Transition
      as={Fragment}
      enter={enter ?? 'transition ease-out duration-100'}
      enterFrom={enterFrom ?? 'transform opacity-0 scale-95'}
      enterTo={enterTo ?? 'transform opacity-100 scale-100'}
      leave={leave ?? 'transition ease-in duration-75'}
      leaveFrom={leaveFrom ?? 'transform opacity-100 scale-100'}
      leaveTo={leaveTo ?? 'transform opacity-0 scale-95'}
    >
      <Menu.Items
        as={as ?? 'div'}
        className={clsx(
          className,
          'w-max absolute mt-2 rounded-md shadow-lg overflow-hidden focus:outline-none bg-white z-10 border pb-1',
          {
            'right-0': position === 'right',
            'left-0': position === 'left',
          },
        )}
      >
        {children}
      </Menu.Items>
    </Transition>
  );
}

export default DropdownItems;
