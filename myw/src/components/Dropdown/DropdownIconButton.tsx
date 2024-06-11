import { Menu } from '@headlessui/react';
import React from 'react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

interface DropdownIconButtonProps {
  icon?: React.ComponentType
}

function DropdownIconButton({
  icon,
}: DropdownIconButtonProps) {
  const Icon = icon ?? ChevronDownIcon;

  return (
    <Menu.Button className="flex items-center">
      <Icon className="hover:bg-gray-100 rounded h-5 w-5 text-gray-400" />
    </Menu.Button>
  );
}

export default DropdownIconButton;
