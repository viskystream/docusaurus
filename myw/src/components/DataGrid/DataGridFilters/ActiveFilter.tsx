import { XMarkIcon } from '@heroicons/react/24/solid';
import React from 'react';
import clsx from 'clsx';
import { FiltersVariant } from './Filters';

interface ActiveFilterProps {
  value: string | number;
  onClick?: (value: string | number) => void;
  variant: FiltersVariant;
}

function ActiveFilter({ value, onClick, variant }: ActiveFilterProps) {
  return (
    <button
      type="button"
      className={clsx('text-xs text-white flex items-center w-fit rounded pl-1 cursor-pointer', {
        'bg-secondary-500 hover:bg-secondary-700': variant === 'primary',
        'bg-navy-600 hover:bg-navy-700': variant === 'navy',
      })}
      onClick={() => onClick?.(value)}
    >
      {value}
      <XMarkIcon width={17} className="ml-1" />
    </button>
  );
}

export default ActiveFilter;
